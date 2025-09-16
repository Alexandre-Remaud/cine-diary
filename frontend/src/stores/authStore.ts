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
    async login(email: string, password: string) {
      const res = await api.post('/auth/login', { email, password }, { withCredentials: true })
      this.token = res.data.accessToken
      this.user = res.data.user
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
    },
  },
})
