import type { TmdbMovie, TmdbTvShow, TmdbMedia } from '@shared/types/tmdb.d.ts'
import type { Component } from 'vue'

export interface TmdbRails {
  trendingMovies: TmdbMovie[]
  topRatedMovies: TmdbMovie[]
  upcomingMovies: TmdbMovie[]
  nowPlayingMovies: TmdbMovie[]
  trendingTv: TmdbTvShow[]
  airingTodayTv: TmdbTvShow[]
  onTheAirTv: TmdbTvShow[]
  popularTv: TmdbTvShow[]
  topRatedTv: TmdbTvShow[]
  recommendations: TmdbMedia[]
}

export interface RailConfig {
  title: string
  items: TmdbMedia[]
  icon?: Component
}
