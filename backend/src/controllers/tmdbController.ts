import { Request, Response, NextFunction } from 'express'
import { getTrendingMovies, getTrendingTv, getTopRated, getUpcoming } from '@services/tmdbService'

export const getTrendingMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const movies = await getTrendingMovies()
    return res.json(movies)
  } catch (err) {
    next(err)
    }
  }

export const getTrendingTvController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tv = await getTrendingTv()
    return res.json(tv)
  } catch (err) {
    next(err)
  }
}

export const getTopRatedController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const topRated = await getTopRated()
    return res.json(topRated)
  } catch (err) {
    next(err)
  }
}

export const getUpcomingController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const upcoming = await getUpcoming()
    return res.json(upcoming)
  } catch (err) {
    next(err)
  }
}