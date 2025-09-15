import { Response, NextFunction } from 'express'
import AppError from '@utils/AppError'
import AuthenticatedRequest from '@shared-types/AuthMiddleware'
import { Role } from '@constants/Roles'

export const authorize =
  (roles: Role[]) => (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) return next(new AppError('Non authentifié', 401))
      if (!roles.includes(req.user.role)) return next(new AppError('Accès refusé', 403))
      next()
    } catch (err) {
      next(err)
    }
  }
