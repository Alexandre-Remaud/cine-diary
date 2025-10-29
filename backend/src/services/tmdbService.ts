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

export const getTopRatedMovies = async (): Promise<TmdbMovie[]> => {
  const { data } = await tmdbApi.get('/movie/top_rated')
  return data.results
}

export const getUpcomingMovies = async (): Promise<TmdbMovie[]> => {
  const { data } = await tmdbApi.get('/movie/upcoming')
  return data.results
}

export const getNowPlayingMovies = async (): Promise<TmdbMovie[]> => {
  const { data } = await tmdbApi.get('/movie/now_playing')
  return data.results
}

export const getMovieDetail = async (id: number): Promise<TmdbMovie> => {
  const { data } = await tmdbApi.get(`/movie/${id}`)
  return data
}

export const getTrendingTv = async (): Promise<TmdbTvShow[]> => {
  const { data } = await tmdbApi.get('/trending/tv/week')
  return data.results
}

export const getAiringTodayTv = async (): Promise<TmdbTvShow[]> => {
  const { data } = await tmdbApi.get('/tv/airing_today')
  return data.results
}

export const getOnTheAirTv = async (): Promise<TmdbTvShow[]> => {
  const { data } = await tmdbApi.get('/tv/on_the_air')
  return data.results
}

export const getPopularTv = async (): Promise<TmdbTvShow[]> => {
  const { data } = await tmdbApi.get('/tv/popular')
  return data.results
}

export const getTopRatedTv = async (): Promise<TmdbTvShow[]> => {
  const { data } = await tmdbApi.get('/tv/top_rated')
  return data.results
}


export const getTvDetail = async (id: number): Promise<TmdbTvShow> => {
  const { data } = await tmdbApi.get(`/tv/${id}`)
  return data
}