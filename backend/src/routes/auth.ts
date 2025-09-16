import express from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import { validate } from '@middlewares/validate'
import { authorize } from '@middlewares/authorize'
import { loginRateLimiter } from '@middlewares/loginRateLimiter'
import { login, refresh, register, getMe, logout, logoutAll } from '@controllers/authController'
import { loginSchema, registerSchema } from '@shared-types/AuthSchemas'

const router = express.Router()

router.post('/register', validate(registerSchema), register)

router.post('/login', loginRateLimiter, validate(loginSchema), login)

router.post('/logout', authMiddleware, authorize(['user']), logout)

router.post('/logout-all', authMiddleware, authorize(['user']), logoutAll)

router.post('/refresh', refresh)

router.get('/me', authMiddleware, getMe)

export default router
