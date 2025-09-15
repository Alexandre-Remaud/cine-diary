import User from '@models/User'
import { AuthResponse, PublicUser } from '@shared-types/Auth'
import AppError from '@utils/AppError'
import bcrypt from 'bcryptjs'
import { generateAccessToken } from '@utils/jwt'
import { generateRefreshToken, rotateRefreshToken } from '@utils/refreshToken'
import IUser from '@shared-types/User'

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const user = await User.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Email ou mot de passe incorrect', 400)
  }
  return issueTokens(user)
}

export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new AppError('Email déjà utilisé', 409)

  const user = new User({ email, password })
  await user.save()
  return issueTokens(user)
}

export const logoutUser = async (
  userId: string,
  refreshToken: string,
): Promise<{ message: string }> => {
  const user = await User.findById(userId)
  if (!user) throw new AppError('Utilisateur non trouvé', 401)
  user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== refreshToken)
  await user.save()
  return { message: 'Déconnecté avec succès' }
}

export const logoutAllUser = async (userId: string): Promise<{ message: string }> => {
  const user = await User.findById(userId)
  if (!user) throw new AppError('Utilisateur non trouvé', 401)
  user.refreshTokens = []
  await user.save()
  return { message: 'Déconnecté de tous les appareils avec succès' }
}

export const refreshAccessToken = async (
  userId: string,
  refreshToken: string,
  userAgent?: string,
): Promise<AuthResponse> => {
  const user = await User.findById(userId)
  if (!user) throw new AppError('Utilisateur non trouvé', 401)
  const newRefreshToken = await rotateRefreshToken(user, refreshToken, userAgent)
  const accessToken = generateAccessToken(user)

  return {
    user: toPublicUser(user),
    tokens: {
      accessToken,
      refreshToken: newRefreshToken,
    },
  }
}

async function issueTokens(user: IUser): Promise<AuthResponse> {
  const refreshToken = generateRefreshToken()
  user.refreshTokens.push(refreshToken)
  await user.save()

  const accessToken = generateAccessToken(user)
  return {
    user: toPublicUser(user),
    tokens: { accessToken, refreshToken },
  }
}

function toPublicUser(user: IUser): PublicUser {
  return { id: user._id.toString(), email: user.email }
}
