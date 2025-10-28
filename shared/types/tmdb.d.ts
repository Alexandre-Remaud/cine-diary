export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  genre_ids: number[];
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
}

export type TmdbItem = TmdbMovie | TmdbTvShow