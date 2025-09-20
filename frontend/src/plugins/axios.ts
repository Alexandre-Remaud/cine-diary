import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
})

let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token))
  refreshSubscribers = []
}

function addSubscriber(callback: (token: string) => void) {
  refreshSubscribers.push(callback)
}

api.interceptors.request.use((config) => {
  const authStore = useAuthStore()
  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    const uiStore = useUiStore()
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await api.post('/auth/refresh', {})
        const newToken = res.data.accessToken
        authStore.token = newToken

        onRefreshed(newToken)

        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        uiStore.addToast('error', 'Session expirée, veuillez vous reconnecter')
        await authStore.logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    if (error.response) {
      const status = error.response.status
      const msg =
        error.response.data?.message ||
        (status >= 500 ? 'Erreur serveur, veuillez réessayer plus tard' : 'Une erreur est survenue')

      uiStore.addToast('error', msg)
    } else {
      uiStore.addToast('error', 'Impossible de contacter le serveur')
    }

    return Promise.reject(error)
  },
)

export default api
