import { Response, NextFunction } from 'express'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '@shared-types/Auth'
import AppError from '@utils/AppError'

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new AppError('Token requis ou mal formé', 401))
  }

  const token = authHeader.split(' ')[1]

  if (!process.env.JWT_SECRET) {
    return next(new AppError('Erreur de configuration du serveur', 500))
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    req.user = { id: payload.id, role: payload.role }
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AppError('Token expiré', 401))
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AppError('Token invalide', 401))
    }
    return next(new AppError('Erreur interne de vérification du token', 500))
  }
}

export default authMiddleware
