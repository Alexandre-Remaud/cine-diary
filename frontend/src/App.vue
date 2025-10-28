<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/authStore'
import { useUiStore } from './stores/uiStore'
import ToastContainer from './components/ToastContainer.vue'
import AppFooter from './components/AppFooter.vue'

const uiStore = useUiStore()
const authStore = useAuthStore()
const { isLoading } = storeToRefs(uiStore)

onMounted(async () => {
  uiStore.startLoading()
  try {
    await authStore.initAuth()
  } finally {
    uiStore.stopLoading()
  }
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar />
    <ToastContainer />
    <main v-if="isLoading" class="flex-1 flex items-center justify-center gap-2">
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
    </main>
    <main v-else class="flex flex-col flex-1 container mx-auto px-4 py-6">
      <RouterView :key="$route.fullPath" />
    </main>
    <AppFooter />
  </div>
</template>
