import { Types, Document } from 'mongoose'

interface User extends Document {
  email: string
  password: string
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export default User
