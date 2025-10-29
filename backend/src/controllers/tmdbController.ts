import { Request, Response, NextFunction } from 'express'
import { 
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getNowPlayingMovies,
  getMovieDetail,
  getTrendingTv,
  getAiringTodayTv,
  getOnTheAirTv,
  getPopularTv,
  getTopRatedTv,
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

export const getTopRatedMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const topRated = await getTopRatedMovies()
    return res.json(topRated)
  } catch (err) {
    next(err)
  }
}

export const getUpcomingMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const upcoming = await getUpcomingMovies()
    return res.json(upcoming)
  } catch (err) {
    next(err)
  }
}

export const getNowPlayingMoviesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const nowPlaying = await getNowPlayingMovies()
    return res.json(nowPlaying)
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

export const getTrendingTvController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const trendingTv = await getTrendingTv()
    return res.json(trendingTv)
  } catch (err) {
    next(err)
  }
}

export const getTopRatedTvController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const topRatedTv = await getTopRatedTv()
    return res.json(topRatedTv)
  } catch (err) {
    next(err)
  }
}

export const getAiringTodayTvController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const airingTodayTv = await getAiringTodayTv()
    return res.json(airingTodayTv)
  } catch (err) {
    next(err)
  }
}

export const getOnTheAirTvController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const onTheAirTv = await getOnTheAirTv()
    return res.json(onTheAirTv)
  } catch (err) {
    next(err)
  }
}

export const getPopularTvController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const popularTv = await getPopularTv()
    return res.json(popularTv)
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