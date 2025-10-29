import type { TmdbMovie, TmdbTvShow } from '@shared/types/tmdb.d.ts'

export interface TmdbHomeRails {
  trendingMovies: TmdbMovie[]
  trendingTv: TmdbTvShow[]
  topRated: TmdbMovie[]
  upcoming: TmdbMovie[]
}
