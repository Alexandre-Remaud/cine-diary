import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  type: ToastType
  message: string
}

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoading: false as boolean,
    toasts: [] as Toast[],
    nextId: 1,
  }),
  actions: {
    startLoading() {
      this.isLoading = true
    },
    stopLoading() {
      this.isLoading = false
    },
    addToast(type: ToastType, message: string) {
      const id = this.nextId++
      this.toasts.push({ id, type, message })
      setTimeout(() => this.removeToast(id), 3000)
    },
    removeToast(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id)
    },
  },
})
