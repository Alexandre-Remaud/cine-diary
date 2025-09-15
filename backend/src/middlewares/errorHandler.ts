import { Request, Response, NextFunction } from 'express'
import AppError from '@utils/AppError'

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    })
  }

  console.error('Unexpected error:', err)
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: 'Erreur interne du serveur',
  })
}

export default errorHandler
