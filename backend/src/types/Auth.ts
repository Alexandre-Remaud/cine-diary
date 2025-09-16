import { Role } from '@constants/Roles'

export type PublicUser = {
  id: string
  email: string
}

export type RefreshTokenPayload = {
  token: string
  createdAt: Date
  expiresAt: Date
  userAgent?: string
}

export type AuthResponse = {
  user: PublicUser
  accessToken: string
  refreshToken: RefreshTokenPayload
}

export type JwtPayload = { id: string; role: Role }
