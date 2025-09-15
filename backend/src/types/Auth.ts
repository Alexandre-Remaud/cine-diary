export type PublicUser = {
  id: string
  email: string
}

export type RefreshTokenPayload = {
  token: string
  createdAt: Date
  userAgent?: string
}

export type AuthResponse = {
  user: PublicUser
  tokens: {
    accessToken: string
    refreshToken: RefreshTokenPayload
  }
}

export type JwtPayload = { id: string }
