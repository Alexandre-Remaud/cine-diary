import jwt from 'jsonwebtoken'
import AppError from '@utils/AppError'
import IUser from '@shared-types/User'

export const generateAccessToken = (user: IUser): string => {
  if (!process.env.JWT_SECRET) {
    throw new AppError('Erreur de configuration du serveur', 500)
  }
  if (!user) throw new AppError('Utilisateur non trouvé', 404)
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' })
}
