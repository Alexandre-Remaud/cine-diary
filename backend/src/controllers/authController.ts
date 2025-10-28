import { Request, Response, NextFunction } from 'express'
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  logoutAllUser,
} from '@services/authService'
import { RegisterInput, LoginInput } from '@shared-types/AuthSchemas'
import AppError from '@utils/AppError'
import User from '@models/User'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body
    const { user, accessToken, refreshToken } = await registerUser(email, password)
    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.json({ user, accessToken })
  } catch (err) {
    next(err)
  }
}

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body
    const ip = req.ip || 'unknown'
    const userAgent = req.headers['user-agent']
    const { user, accessToken, refreshToken } = await loginUser(email, password, ip, userAgent)
    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.json({ user, accessToken })
  } catch (err) {
    next(err)
  }
}

export const logout = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new AppError('Non authentifié', 401))
    const refreshToken = req.cookies?.refreshToken
    if (!refreshToken) return next(new AppError('Aucun refresh token fourni', 401))
    const { message } = await logoutUser(req.user.id, refreshToken)
    clearRefreshTokenCookie(res)
    return res.json({ success: true, message })
  } catch (err) {
    next(err)
  }
}

export const logoutAll = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) return next(new AppError('Non authentifié', 401))
    const { message } = await logoutAllUser(req.user.id)
    clearRefreshTokenCookie(res)
    return res.json({ success: true, message })
  } catch (err) {
    next(err)
  }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken
    if (!oldRefreshToken) throw new AppError('Aucun refresh token fourni', 401)
    const { user, accessToken, refreshToken } = await refreshAccessToken(
      oldRefreshToken,
      String(req.headers['user-agent'] ?? 'unknown'),
    )
    res.cookie('refreshToken', refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.json({ user, accessToken })
  } catch (err) {
    next(err)
  }
}

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req?.user?.id)
    if (!user) return next(new AppError('Utilisateur non trouvé', 404))
    return res.json({ user, tokens: null })
  } catch (err) {
    next(err)
  }
}

function clearRefreshTokenCookie(res: Response) {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}
