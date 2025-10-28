import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import corsMiddleware from './middlewares/corsMiddleware'
import mongoose from 'mongoose'
import auth from '@routes/auth'
import errorHandler from '@middlewares/errorHandler'
import cookieParser from 'cookie-parser'
import tmdb from '@routes/tmdb'

const app = express()
const PORT = process.env.PORT || 5000

app.use(corsMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', auth)
app.use('/api/tmdb', tmdb)
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' })
})
app.use(errorHandler)

mongoose
  .connect(process.env.MONGODB_URI as string, {
    dbName: process.env.MONGO_DB_NAME || 'cinediary',
  })
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

export default app
