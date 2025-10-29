import express from 'express'
import {
  getTrendingMoviesController,
  getTrendingTvController,
  getTopRatedMoviesController,
  getUpcomingMoviesController,
  getMovieDetailController,
  getTvDetailController
} from '@controllers/tmdbController'

const router = express.Router()

// movies
router.get('/movie/trending', getTrendingMoviesController)
router.get('/movie/now-playing', getNowPlayingMoviesController)
router.get('/movie/top-rated', getTopRatedMoviesController)
router.get('/movie/upcoming', getUpcomingMoviesController)
router.get('/movie/:id', getMovieDetailController)

// tv shows
router.get('/tv/trending', getTrendingTvController)
router.get('/tv/popular', getPopularTvController)
router.get('/tv/top-rated', getTopRatedTvController)
router.get('/tv/airing-today', getAiringTodayTvController)
router.get('/tv/on-the-air', getOnTheAirTvController)
router.get('/tv/:id', getTvDetailController)

export default router
