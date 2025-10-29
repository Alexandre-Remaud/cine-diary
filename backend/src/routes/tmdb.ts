import express from 'express'
import {
  getTrendingMoviesController,
  getTrendingTvController,
  getTopRatedController,
  getUpcomingController,
  getMovieDetailController,
  getTvDetailController
} from '@controllers/tmdbController'

const router = express.Router()

router.get('/trending-movies', getTrendingMoviesController)

router.get('/trending-tv', getTrendingTvController)

router.get('/top-rated', getTopRatedController)

router.get('/upcoming', getUpcomingController)

router.get('/movie/:id', getMovieDetailController);

router.get('/tv/:id', getTvDetailController);

export default router
