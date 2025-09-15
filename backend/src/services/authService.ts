import UserType from '@shared-types/User'
import User from '@models/User'
import { AuthResponse } from '@shared-types/Auth'
import AppError from '@utils/AppError'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Email ou mot de passe incorrect', 400)
  }

  return generateAuthResponse(user)
}

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new AppError('Email déjà utilisé', 409)
  }
  const user = new User({ email, password })
  await user.save()
  return generateAuthResponse(user)
}

const generateAuthResponse = (user: UserType): AuthResponse => {
  if (!process.env.JWT_SECRET) {
    throw new AppError('Erreur de configuration du serveur', 500)
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return { user: { id: user._id.toString(), email: user.email }, token }
}
