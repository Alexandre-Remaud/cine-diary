import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { AxiosError } from 'axios'
import type { TmdbMovie, TmdbTvShow, TmdbMedia } from '@shared/types/tmdb.d.ts'
import type { TmdbRails, RailConfig } from '@/types/Tmdb.ts'
import {
  TrendingUp,
  Star,
  Clock,
  Calendar,
  CalendarDays,
  Popcorn,
  Flame,
  Sparkles
} from 'lucide-vue-next'
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
      topRatedTv: [],
      recommendations: []
    } as TmdbRails,
    loading: false,
    error: null as string | null,
    currentMedia: null as TmdbMedia | null,
    loadingDetail: false,
    loadingRecommendations: false,
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
    async _fetchRecommendations(id: number, type: 'movie' | 'tv') {
      this.loadingRecommendations = true
      try {
        const res = await api.get<TmdbMedia[]>(`/tmdb/${type}/${id}/recommendations`)
        this.rails.recommendations = res.data
        return res
      } finally {
        this.loadingRecommendations = false
      }
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
        const [detailRes] = await Promise.all([
          api.get<TmdbMedia>(`/tmdb/${type}/${id}`),
          this._fetchRecommendations(id, type)
        ])
        this.currentMedia = detailRes.data
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Erreur lors du chargement du média'
      } finally {
        this.loadingDetail = false
      }
    },
  },

  getters: {
    homeRails(): RailConfig[] {
      return [
        {title: 'Films tendances', items: this.rails.trendingMovies, icon: TrendingUp},
        {title: 'Séries tendances', items: this.rails.trendingTv, icon: TrendingUp},
        {title: 'Films les mieux notés', items: this.rails.topRatedMovies, icon: Star},
        {title: 'Film à venir', items: this.rails.upcomingMovies, icon: Calendar},
      ]
    },

    movieRails(): RailConfig[] {
      return [
        {title: 'Films tendances', items: this.rails.trendingMovies, icon: TrendingUp},
        {title: 'Films les mieux notés', items: this.rails.topRatedMovies, icon: Star},
        {title: 'Films à venir', items: this.rails.upcomingMovies, icon: Clock},
        {title: 'Films au cinéma', items: this.rails.nowPlayingMovies, icon: Popcorn},
      ]
    },

    tvShowRails(): RailConfig[] {
      return [
        {title: 'Séries tendances', items: this.rails.trendingTv, icon: TrendingUp},
        {title: 'Séries les mieux notés', items: this.rails.topRatedTv, icon: Star},
        {title: 'Diffusé aujourd"hui', items: this.rails.airingTodayTv, icon: Calendar},
        {title: 'Diffusé cette semaine', items: this.rails.onTheAirTv, icon: CalendarDays},
        {title: 'Séries populaires', items: this.rails.popularTv, icon: Flame},
      ]
    },

    recommendationsRail(): RailConfig[] {
      return this.rails.recommendations.length > 0
      ? [{ title: 'Recommandations', items: this.rails.recommendations, icon: Sparkles }]
      : []
    }
  }
})
