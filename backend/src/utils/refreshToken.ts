import crypto from 'crypto'
import { RefreshTokenPayload } from '@shared-types/Auth'
import UserType from '@shared-types/User'
import AppError from '@utils/AppError'

export function generateRefreshToken(userAgent?: string): RefreshTokenPayload {
  return {
    token: crypto.randomBytes(40).toString('hex'),
    createdAt: new Date(),
    userAgent,
  }
}

export async function rotateRefreshToken(
  user: UserType,
  oldToken: string,
  userAgent?: string,
): Promise<RefreshTokenPayload> {
  const storedToken = user.refreshTokens.find((rt) => rt.token === oldToken)
  if (!storedToken) {
    throw new AppError('Refresh token invalide', 401)
  }

  user.refreshTokens = user.refreshTokens.filter((rt) => rt.token !== oldToken)

  const newToken = generateRefreshToken(userAgent)
  user.refreshTokens.push(newToken)

  if (user.refreshTokens.length > 5) {
    user.refreshTokens.shift()
  }

  await user.save()
  return newToken
}
