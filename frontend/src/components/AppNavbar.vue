<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

const isOpen = ref(false)

const handleLogout = () => {
  authStore.logout()
  router.push('/')
  isOpen.value = false
}
</script>

<template>
  <nav class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="text-xl font-bold">CineDiary</RouterLink>

        <div class="hidden md:flex space-x-6">
          <template v-if="!authStore.isAuthenticated">
            <RouterLink to="/login" class="hover:text-blue-400">Se connecter</RouterLink>
          </template>
          <template v-else>
            <button @click="handleLogout" class="hover:text-red-400">Se déconnecter</button>
            <span>connecté en tant que {{ authStore.user?.email }}</span>
          </template>
        </div>

        <div class="md:hidden">
          <button @click="isOpen = !isOpen" class="focus:outline-none">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              aria-label="Menu"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="isOpen" class="md:hidden px-4 pb-4 space-y-2 bg-gray-800">
      <RouterLink @click="isOpen = false" to="/" class="block hover:text-blue-400">Home</RouterLink>
      <template v-if="!authStore.isAuthenticated">
        <RouterLink @click="isOpen = false" to="/login" class="block hover:text-blue-400"
          >Se connecter</RouterLink
        >
      </template>
      <template v-else>
        <button @click="handleLogout" aria-label="Logout" class="block hover:text-red-400">
          Se déconnecter
        </button>
      </template>
    </div>
  </nav>
</template>
