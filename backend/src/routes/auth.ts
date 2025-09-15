import express from 'express'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'
import authMiddleware from '@middlewares/authMiddleware'
import { loginUser, registerUser } from '@services/authService'
import User from '@models/User'
import AppError from '@utils/AppError'

const router = express.Router()

router.post('/register', async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return next(new AppError('Email et mot de passe requis', 400))
  }
  try {
    const { user, token } = await registerUser(email, password)
    return res.json({ token, user })
  } catch (err) {
    next(err)
  }
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return next(new AppError('Email et mot de passe requis', 400))
  }

  try {
    const { user, token } = await loginUser(email, password)
    return res.json({ token, user })
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
