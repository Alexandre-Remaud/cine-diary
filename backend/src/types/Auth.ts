import { Document } from 'mongoose'
import IUser from '@shared-types/User'

export type LoginResponse = {
  user: Omit<IUser, 'password'> & Document
  token: string
}

export type JwtPayload = { id: string }
