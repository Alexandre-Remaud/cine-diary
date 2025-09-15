import express from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import { validate } from '@middlewares/validate'
import { login, refresh, register, getMe, logout, logoutAll } from '@controllers/authController'
import {
  loginSchema,
  logoutSchema,
  refreshSchema,
  registerSchema,
  logoutAllSchema,
} from '@shared-types/AuthSchemas'

const router = express.Router()

router.post('/register', validate(registerSchema), register)

router.post('/login', validate(loginSchema), login)

router.post('/logout', validate(logoutSchema), logout)

router.post('/logout-all', validate(logoutAllSchema), logoutAll)

router.post('/refresh', validate(refreshSchema), refresh)

router.get('/me', authMiddleware, getMe)

export default router
