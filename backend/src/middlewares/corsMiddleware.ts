import cors, { CorsOptions } from 'cors'

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Origine non autorisée par CORS'))
    }
  },
  credentials: true,
}

export default cors(corsOptions)
