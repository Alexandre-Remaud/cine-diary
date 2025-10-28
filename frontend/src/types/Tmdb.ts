import type { TmdbMovie, TmdbTvShow } from '@shared/types/tmdb.d.ts'

export interface TmdbRails {
  trendingMovies: TmdbMovie[]
  trendingTv: TmdbTvShow[]
  topRated: TmdbMovie[]
  upcoming: TmdbMovie[]
}
