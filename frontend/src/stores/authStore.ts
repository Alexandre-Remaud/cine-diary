import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: null as string | null, isAuthenticated: false }),
  actions: {
    setToken(token: string) {
      this.token = token
      this.isAuthenticated = true
      localStorage.setItem('token', token)
    },
    logout() {
      this.token = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
    },
    async initAuth() {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          axios.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
          if (token) {
            this.token = token
            this.isAuthenticated = true
          }
        } catch (e) {
          this.logout()
        }
      }
    },
  },
})
