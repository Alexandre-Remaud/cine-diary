import { Request, Response, NextFunction } from 'express'
import { loginUser, refreshAccessToken, registerUser } from '@services/authService'
import { registerSchema, loginSchema } from '@shared-types/AuthSchemas'
import AppError from '@utils/AppError'
import User from '@models/User'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = registerSchema.parse(req.body)
    const { user, tokens } = await registerUser(email, password)
    return res.json({ user, tokens })
  } catch (err) {
    next(err)
  }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const { user, tokens } = await loginUser(email, password)
    return res.json({ user, tokens })
  } catch (err) {
    next(err)
  }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, refreshToken } = req.body

  if (!userId || !refreshToken) {
    return next(new AppError('userId et refreshToken requis', 400))
  }

  try {
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
