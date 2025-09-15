export type PublicUser = {
  id: string
  email: string
}
export type AuthResponse = {
  user: PublicUser
  token: string
}

export type JwtPayload = { id: string }
