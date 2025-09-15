import express from 'express'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'
import authMiddleware from '@middlewares/authMiddleware'
import { loginUser } from '@services/authService'
import User from '@models/User'
import AppError from '@utils/AppError'

const router = express.Router()

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return next(new AppError('Email et mot de passe requis', 400))
  }

  try {
    const { user, token } = await loginUser(email, password)
    return res.json({ token, user: { id: user.id, email: user.email } })
  } catch (e: unknown) {
    if (e instanceof Error && e.message === 'Email ou mot de passe incorrect') {
      return next(new AppError(e.message, 401))
    }
    console.error('Erreur login:', e instanceof Error ? e.message : e)
    return next(new AppError('Erreur serveur lors de la connexion', 500))
  }
})

router.get('/me', authMiddleware, async (req: AuthenticatedRequest, res, next) => {
  const user = await User.findById(req.userId)
  if (!user) {
    return next(new AppError('Utilisateur non trouvé', 404))
  }
  return res.json({
    email: user.email,
    id: user.id,
    createdAt: user.createdAt,
  })
})

export default router
