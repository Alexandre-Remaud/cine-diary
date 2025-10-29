import type { TmdbMovie, TmdbTvShow } from '@shared/types/tmdb.d.ts'

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
}
