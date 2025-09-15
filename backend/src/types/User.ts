import { Types, Document } from 'mongoose'

export interface RefreshToken {
  token: string
  createdAt: Date
  userAgent?: string
}

export interface User extends Document {
  email: string
  password: string
  refreshTokens: RefreshToken[]
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export default User
