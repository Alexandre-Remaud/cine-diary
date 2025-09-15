import express from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import { login, refresh, register, getMe } from '@controllers/authController'

const router = express.Router()

router.post('/register', register)

router.post('/login', login)

router.post('/refresh', refresh)

router.get('/me', authMiddleware, getMe)

export default router
