import { Request, Response, NextFunction } from 'express'
import {
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  logoutAllUser,
} from '@services/authService'
import { RegisterInput, LoginInput, TokenInput, LogoutAllInput } from '@shared-types/AuthSchemas'
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
    const { user, tokens } = await registerUser(email, password)
    return res.json({ user, tokens })
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
    const { user, tokens } = await loginUser(email, password)
    return res.json({ user, tokens })
  } catch (err) {
    next(err)
  }
}

export const logout = async (
  req: Request<{}, {}, TokenInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, refreshToken } = req.body
    const { message } = await logoutUser(userId, refreshToken)
    return res.json({ success: true, message })
  } catch (err) {
    next(err)
  }
}

export const logoutAll = async (
  req: Request<{}, {}, LogoutAllInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId } = req.body
    const { message } = await logoutAllUser(userId)
    return res.json({ success: true, message })
  } catch (err) {
    next(err)
  }
}

export const refresh = async (
  req: Request<{}, {}, TokenInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { userId, refreshToken } = req.body
    const { user, tokens } = await refreshAccessToken(
      userId,
      refreshToken,
      req.headers['user-agent'],
    )
    return res.json({ user, tokens })
  } catch (err) {
    next(err)
  }
}

export const getMe = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return next(new AppError('Utilisateur non trouvé', 404))
    }
    return res.json({ user, tokens: null })
  } catch (err) {
    next(err)
  }
}
