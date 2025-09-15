import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import IUser from '@shared-types/User'

const { Schema } = mongoose
const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
)

User.pre('save', async function (next) {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10)
  next()
})

const UserModel = mongoose.model<IUser>('User', User)

export default UserModel
