import rateLimit from 'express-rate-limit'
import AppError from '@utils/AppError'

export const loginRateLimiter = rateLimit({
  windowMs: 60000,
  max: 5,
  handler: (req, res, next) => {
    next(new AppError('Trop de tentatives de connexion, réessayez plus tard', 429))
  },
  standardHeaders: true,
  legacyHeaders: false,
})
