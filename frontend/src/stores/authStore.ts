import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as { id: string; email: string } | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async initAuth() {
      this.token = localStorage.getItem('token')
      if (this.token) {
        try {
          await this.fetchMe()
        } catch {
          await this.logout()
        }
      }
    },

    async login(email: string, password: string) {
      const res = await api.post('/auth/login', { email, password }, { withCredentials: true })
      this.token = res.data.accessToken
      this.user = res.data.user
      localStorage.setItem('token', res.data.accessToken)
    },

    async register(email: string, password: string) {
      const res = await api.post('/auth/register', { email, password })
      this.token = res.data.accessToken
      this.user = res.data.user
      localStorage.setItem('token', res.data.accessToken)
    },

    async fetchMe() {
      if (!this.token) return
      const res = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${this.token}` },
        withCredentials: true,
      })
      this.user = res.data.user
    },

    async logout() {
      await api.post('/auth/logout', {}, { withCredentials: true })
      this.token = null
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
