import axios from 'axios'
import type { TmdbMovie, TmdbTvShow } from '@shared/types/tmdb.d.ts'

const TMDB_BASE = 'https://api.themoviedb.org/3'
const API_KEY = process.env.TMDB_API_KEY

if (!API_KEY) {
  throw new Error('TMDB_API_KEY is missing in .env')
}

const tmdbApi = axios.create({
  baseURL: TMDB_BASE,
  params: { 
    api_key: API_KEY,
    language: 'fr-FR',
  },
})

export const getTrendingMovies = async (): Promise<TmdbMovie[]> => {
  const { data } = await tmdbApi.get('/trending/movie/day')
  return data.results
}

export const getTrendingTv = async (): Promise<TmdbTvShow[]> => {
  const { data } = await tmdbApi.get('/trending/tv/week')
  return data.results
}

export const getTopRated = async (): Promise<TmdbMovie[]> => {
  const { data } = await tmdbApi.get('/movie/top_rated')
  return data.results
}

export const getUpcoming = async (): Promise<TmdbMovie[]> => {
  const { data } = await tmdbApi.get('/movie/upcoming')
  return data.results
}