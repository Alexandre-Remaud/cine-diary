import express from 'express'
import {
  getTrendingMoviesController,
  getTrendingTvController,
  getTopRatedMoviesController,
  getUpcomingMoviesController,
  getNowPlayingMoviesController,
  getPopularTvController,
  getTopRatedTvController,
  getAiringTodayTvController,
  getOnTheAirTvController,
  getDetailsController,
  getSimilarController
} from '@controllers/tmdbController'

const router = express.Router()

// movies
router.get('/movie/trending', getTrendingMoviesController)
router.get('/movie/now-playing', getNowPlayingMoviesController)
router.get('/movie/top-rated', getTopRatedMoviesController)
router.get('/movie/upcoming', getUpcomingMoviesController)

// tv shows
router.get('/tv/trending', getTrendingTvController)
router.get('/tv/popular', getPopularTvController)
router.get('/tv/top-rated', getTopRatedTvController)
router.get('/tv/airing-today', getAiringTodayTvController)
router.get('/tv/on-the-air', getOnTheAirTvController)

// shared
router.get('/:type/:id', getDetailsController)
router.get('/:type/:id/similar', getSimilarController)

export default router
