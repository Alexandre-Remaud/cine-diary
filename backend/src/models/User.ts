import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import IUser from '@shared-types/User'
import { ROLES } from '@constants/Roles'

const { Schema } = mongoose
const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(ROLES), default: ROLES.USER },
    refreshTokens: [
      {
        token: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        userAgent: { type: String, default: null },
      },
    ],
  },
  { timestamps: true },
)

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 10)
  next()
})

const UserModel = mongoose.model<IUser>('User', UserSchema)

export default UserModel
