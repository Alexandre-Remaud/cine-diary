export interface TmdbMovie {
  id: number
  title: string
  original_title: string
  overview: string
  release_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  adult: boolean
  genre_ids: number[]
  runtime?: number
  tagline?: string
  genres?: { id: number; name: string }[]
  production_companies?: { id: number; name: string; logo_path: string | null }[]
}

export interface TmdbTvShow {
  id: number
  name: string
  original_name: string
  overview: string
  first_air_date: string
  poster_path: string | null
  backdrop_path: string | null
  vote_average: number
  vote_count: number
  popularity: number
  genre_ids: number[]
  episode_run_time?: number[]
  number_of_seasons?: number
  number_of_episodes?: number
  tagline?: string
  genres?: { id: number; name: string }[]
  production_companies?: { id: number; name: string; logo_path: string | null }[]
}

export interface TmdbTvSeason {
  id: number
  season_number: number
  name: string
  overview: string
  air_date: string | null
  episode_count: number
  poster_path: string | null
  episodes?: TmdbEpisode[]
}

export interface TmdbEpisode {
  id: number
  name: string
  episode_number: number
  air_date: string
  overview: string
  still_path: string | null
  runtime?: number
}

export type TmdbMedia = TmdbMovie | TmdbTvShow