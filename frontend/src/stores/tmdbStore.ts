import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { AxiosError } from 'axios'
import type { TmdbMovie, TmdbTvShow } from '@shared/types/tmdb.d.ts'
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
  }),

  actions: {
    async getTrendingMovies() {
      const res = await api.get<TmdbMovie[]>('/tmdb/trending-movies')
      this.rails.trendingMovies = res.data
    },

    async getTrendingTv() {
      const res = await api.get<TmdbTvShow[]>('/tmdb/trending-tv')
      this.rails.trendingTv = res.data
    },

    async getTopRated() {
      const res = await api.get<TmdbMovie[]>('/tmdb/top-rated')
      this.rails.topRated = res.data
    },

    async getUpcoming() {
      const res = await api.get<TmdbMovie[]>('/tmdb/upcoming')
      this.rails.upcoming = res.data
    },

    async loadAllRails() {
      this.loading = true
      this.error = null
      try {
        await Promise.all([
          this.getTrendingMovies(),
          this.getTrendingTv(),
          this.getTopRated(),
          this.getUpcoming(),
        ])
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>
        this.error = error.response?.data?.message || 'Error loading rails'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
  },
})
