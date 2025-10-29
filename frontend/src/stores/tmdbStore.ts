import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { AxiosError } from 'axios'
import type { TmdbMovie, TmdbTvShow, TmdbMedia } from '@shared/types/tmdb.d.ts'
import type { TmdbRails } from '@/types/Tmdb'

export const useTmdbStore = defineStore('tmdb', {
  state: () => ({
    rails: {
      trendingMovies: [],
      trendingTv: [],
      topRated: [],
      upcoming: [],
    } as TmdbRails,
    loading: false,
    error: null as string | null,
    currentMedia: null as TmdbMedia | null,
    loadingDetail: false,
  }),

  actions: {
    async getTrendingMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/trending')
      this.rails.trendingMovies = res.data
    },

    async getTrendingTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/tv/trending')
      this.rails.trendingTv = res.data
    },

    async getTopRatedMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/top-rated')
      this.rails.topRated = res.data
    },

    async getUpcomingMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/movie/upcoming')
      this.rails.upcoming = res.data
    },

    async loadHomeRails() {
      this.loading = true
      this.error = null
      try {
        await Promise.all([
          this.getTrendingMovies(),
          this.getTrendingTv(),
          this.getTopRatedMovies(),
          this.getUpcomingMovies(),
        ])
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Error loading rails'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    async loadMediaDetail(id: number, type: 'movie' | 'tv') {
      this.loadingDetail = true
      try {
        const res = await api.get<TmdbMedia>(`/tmdb/${type}/${id}`)
        this.currentMedia = res.data
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Error loading media details'
        console.error(err)
      } finally {
        this.loadingDetail = false
      }
    }
  },
})
