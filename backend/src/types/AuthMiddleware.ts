import { Role } from '@constants/Roles'
import { Request } from 'express'

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: Role }
}

export default AuthenticatedRequest
