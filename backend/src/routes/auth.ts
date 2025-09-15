import express from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import { validate } from '@middlewares/validate'
import { authorize } from '@middlewares/authorize'
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

router.post('/logout', authMiddleware, authorize(['user']), validate(logoutSchema), logout)

router.post(
  '/logout-all',
  authMiddleware,
  authorize(['user']),
  validate(logoutAllSchema),
  logoutAll,
)

router.post('/refresh', validate(refreshSchema), refresh)

router.get('/me', authMiddleware, getMe)

export default router
