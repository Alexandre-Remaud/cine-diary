import mongoose from 'mongoose'
import { LoginAttempt } from '@shared-types/LoginAttempt'
const { Schema } = mongoose

const LoginAttemptSchema = new Schema<LoginAttempt>({
  email: String,
  ip: String,
  userAgent: String,
  success: Boolean,
  createdAt: { type: Date, default: Date.now },
})

const LoginAttemptModel = mongoose.model<LoginAttempt>('LoginAttempt', LoginAttemptSchema)

export default LoginAttemptModel
