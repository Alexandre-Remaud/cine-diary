import { Request, Response, NextFunction } from 'express'
import { 
  getTrendingMovies,
  getTrendingTv,
  getTopRated,
  getUpcoming,
  getMovieDetail,
  getTvDetail
} from '@services/tmdbService'

interface DetailParams extends Request {
  params: {id: string}
}

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

export const getMovieDetailController = async (
  req: DetailParams,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID film invalide' })
  }
  try {
    const movieDetail = await getMovieDetail(id)
    return res.json(movieDetail)
  } catch (err) {
    next(err)
  }
}

export const getTvDetailController = async (
  req: DetailParams,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID TV invalide' })
  }
  try {
    const tvDetail = await getTvDetail(id)
    return res.json(tvDetail)
  } catch (err) {
    next(err)
  }
}