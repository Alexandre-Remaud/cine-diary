import { ZodType, z } from 'zod'
import { Request, Response, NextFunction } from 'express'

export const validate =
  <T extends ZodType<any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body) as z.infer<T>
      next()
    } catch (err) {
      next(err)
    }
  }
