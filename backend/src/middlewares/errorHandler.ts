import { Request, Response, NextFunction } from 'express'
import AppError from '@utils/AppError'
import { ZodError } from 'zod'

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    })
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: 'Erreur de validation',
      details: err.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
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
