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

router.get('/trending-movies', getTrendingMoviesController)

router.get('/trending-tv', getTrendingTvController)

router.get('/top-rated', getTopRatedMoviesController)

router.get('/upcoming', getUpcomingMoviesController)

router.get('/movie/:id', getMovieDetailController);

router.get('/tv/:id', getTvDetailController);

export default router
