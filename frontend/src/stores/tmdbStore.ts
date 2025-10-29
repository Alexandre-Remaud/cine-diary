import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { AxiosError } from 'axios'
import type { TmdbMovie, TmdbTvShow, TmdbMedia } from '@shared/types/tmdb.d.ts'
import type { TmdbRails } from '@/types/Tmdb.ts'
import { FilmIcon, StarIcon, TvIcon, CalendarIcon, PopcornIcon } from '@/icons/icons'

export const useTmdbStore = defineStore('tmdb', {
  state: () => ({
    rails: {
      trendingMovies: [],
      topRatedMovies: [],
      upcomingMovies: [],
      nowPlayingMovies: [],
      trendingTv: [],
      airingTodayTv: [],
      onTheAirTv: [],
      popularTv: [],
      topRatedTv: []
    } as TmdbRails,
    loading: false,
    error: null as string | null,
    currentMedia: null as TmdbMedia | null,
    loadingDetail: false,
  }),

  actions: {
    async _fetchTrendingMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/trending')
      this.rails.trendingMovies = res.data
    },
    async _fetchTopRatedMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/top-rated')
      this.rails.topRatedMovies = res.data
    },
    async _fetchUpcomingMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/upcoming')
      this.rails.upcomingMovies = res.data
    },
    async _fetchNowPlayingMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/now-playing')
      this.rails.nowPlayingMovies = res.data
    },
    async _fetchTrendingTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/tv/trending')
      this.rails.trendingTv = res.data
    },
    async _fetchTopRatedTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/tv/top-rated')
      this.rails.topRatedTv = res.data
    },
    async _fetchAiringTodayTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/tv/airing-today')
      this.rails.airingTodayTv = res.data
    },
    async _fetchOnTheAirTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/tv/on-the-air')
      this.rails.onTheAirTv = res.data
    },
    async _fetchPopularTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/tv/popular')
      this.rails.popularTv = res.data
    },

    async loadHomeRails() {
      this.loading = true
      this.error = null
      try {
        await Promise.all([
          this._fetchTrendingMovies(),
          this._fetchTrendingTv(),
          this._fetchTopRatedMovies(),
          this._fetchUpcomingMovies(),
        ])
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Erreur lors du chargement de l’accueil'
      } finally {
        this.loading = false
      }
    },

    async loadMovieRails() {
      this.loading = true
      this.error = null
      try {
        await Promise.all([
          this._fetchTrendingMovies(),
          this._fetchTopRatedMovies(),
          this._fetchUpcomingMovies(),
          this._fetchNowPlayingMovies(),
        ])
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Erreur lors du chargement des films'
      } finally {
        this.loading = false
      }
    },

    async loadTvShowRails() {
      this.loading = true
      this.error = null
      try {
        await Promise.all([
          this._fetchTrendingTv(),
          this._fetchTopRatedTv(),
          this._fetchAiringTodayTv(),
          this._fetchOnTheAirTv(),
          this._fetchPopularTv(),
        ])
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Erreur lors du chargement des films'
      } finally {
        this.loading = false
      }
    },

    async loadMediaDetail(id: number, type: 'movie' | 'tv') {
      this.loadingDetail = true
      this.error = null
      try {
        const res = await api.get<TmdbMedia>(`/tmdb/${type}/${id}`)
        this.currentMedia = res.data
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Erreur lors du chargement du média'
      } finally {
        this.loadingDetail = false
      }
    },
  },

  getters: {
    homeRails(): Pick<TmdbRails, 'trendingMovies' | 'trendingTv' | 'topRatedMovies' | 'upcomingMovies'> {
      return [
        {title: 'Films tendances', items: this.rails.trendingMovies, icon: FilmIcon },
        {title: 'Séries tendances', items: this.rails.trendingTv, icon: TvIcon},
        {title: 'Films les mieux notés', items: this.rails.topRatedMovies, icon: StarIcon},
        {title: 'Film à venir', items: this.rails.upcomingMovies, icon: CalendarIcon},
      ]
    },

    movieRails(): Pick<TmdbRails, 'trendingMovies' | 'topRatedMovies' | 'upcomingMovies' | 'nowPlayingMovies'> {
      return [
        {title: 'Films tendances', items: this.rails.trendingMovies, icon: FilmIcon},
        {title: 'Films les mieux notés', items: this.rails.topRatedMovies, icon: StarIcon},
        {title: 'Films à venir', items: this.rails.upcomingMovies, icon: CalendarIcon},
        {title: 'Films au cinéma', items: this.rails.nowPlayingMovies, icon: PopcornIcon },
      ]
    },

    tvShowRails(): Pick<TmdbRails, 'trendingTv' | 'topRatedTv' | 'airingTodayTv' | 'onTheAirTv' | 'popularTv'> {
      return [
        {title: 'Séries tendances', items: this.rails.trendingTv, icon: FilmIcon},
        {title: 'Séries les mieux notés', items: this.rails.topRatedTv, icon: StarIcon},
        {title: 'Diffusé aujourd"hui', items: this.rails.airingTodayTv, icon: CalendarIcon},
        {title: 'Diffusé cette semaine', items: this.rails.onTheAirTv, icon: PopcornIcon },
        {title: 'Séries populaires', items: this.rails.popularTv, icon: PopcornIcon },
      ]
    },
  }
})
