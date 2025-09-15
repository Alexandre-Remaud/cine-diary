import express from 'express'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'
import authMiddleware from '@middlewares/authMiddleware'
import { loginUser, registerUser, refreshAccessToken } from '@services/authService'
import User from '@models/User'
import AppError from '@utils/AppError'
import { registerSchema, loginSchema } from '@shared-types/AuthSchemas'

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = registerSchema.parse(req.body)
    const { user, accessToken, refreshToken } = await registerUser(email, password)
    return res.json({ accessToken, user, refreshToken })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body)
    const { user, accessToken, refreshToken } = await loginUser(email, password)
    return res.json({ accessToken, user, refreshToken })
  } catch (err) {
    next(err)
  }
})

router.post('/refresh', async (req, res, next) => {
  const { userId, refreshToken } = req.body

  if (!userId || !refreshToken) {
    return next(new AppError('userId et refreshToken requis', 400))
  }

  try {
    const authResponse = await refreshAccessToken(userId, refreshToken, req.headers['user-agent'])
    return res.json(authResponse)
  } catch (err) {
    next(err)
  }
})

router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return next(new AppError('Utilisateur non trouvé', 404))
    }
    return res.json({
      user: { id: user.id, email: user.email },
    })
  } catch (err) {
    next(err)
  }
})

export default router
