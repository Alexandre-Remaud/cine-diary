export interface LoginAttempt extends Document {
  email: string
  ip: string
  userAgent?: string
  success: boolean
  createdAt: Date
}
