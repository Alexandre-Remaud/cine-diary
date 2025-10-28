import express from 'express'
import { getTrendingMoviesController, getTrendingTvController, getTopRatedController, getUpcomingController } from '@controllers/tmdbController'

const router = express.Router()

router.get('/trending-movies', getTrendingMoviesController)

router.get('/trending-tv', getTrendingTvController)

router.get('/top-rated', getTopRatedController)

router.get('/upcoming', getUpcomingController)

export default router
