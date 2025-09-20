<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import { onMounted, ref } from 'vue'
import { useAuthStore } from './stores/authStore'

const isLoading = ref(true)

onMounted(async () => {
  const authStore = useAuthStore()
  await authStore.initAuth()
  isLoading.value = false
})
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppNavbar />
    <main v-if="isLoading" class="flex-1 flex items-center justify-center gap-2">
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
      <div class="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
    </main>
    <main v-else class="flex flex-col flex-1">
      <RouterView :key="$route.fullPath" />
    </main>
  </div>
</template>
