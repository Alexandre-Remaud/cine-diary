import jwt from 'jsonwebtoken'
import AppError from '@utils/AppError'

export function generateAccessToken(userId: string): string {
  if (!process.env.JWT_SECRET) {
    throw new AppError('Erreur de configuration du serveur', 500)
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' })
}
