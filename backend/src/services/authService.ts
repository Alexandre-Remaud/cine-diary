import User from '@models/User'
import { LoginResponse } from '@shared-types/Auth'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const user = await User.findOne({ email })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Email ou mot de passe incorrect')
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('Erreur de configuration du serveur')
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
  return { user, token }
}
