<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { UserIcon, LogOutIcon, LogInIcon } from '@/icons/icons'
import { useUiStore } from '@/stores/uiStore'

const authStore = useAuthStore()
const uiStore = useUiStore()
const router = useRouter()

const { isLoading } = storeToRefs(uiStore)
const isOpen = ref(false)

const handleLogout = () => {
  uiStore.startLoading()
  try {
    authStore.logout()
    uiStore.addToast('info', 'Déconnexion réussie 👋')
    router.push('/')
  } finally {
    uiStore.stopLoading()
    isOpen.value = false
  }
}
</script>

<template>
  <nav class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <RouterLink to="/" class="text-xl font-bold">CineDiary</RouterLink>

        <!-- Desktop -->
        <div class="hidden md:flex space-x-6 items-center">
          <template v-if="!authStore.isAuthenticated">
            <RouterLink to="/login" class="flex items-center space-x-2 hover:text-blue-400">
              <LogInIcon class="w-5 h-5" />
              <span>Se connecter</span>
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/profile" class="flex items-center space-x-2 hover:text-blue-400">
              <span>{{ authStore.user?.email }}</span>
              <UserIcon class="w-5 h-5" />
            </RouterLink>
            <button @click="handleLogout" class="flex items-center space-x-2 hover:text-red-400">
              <LogOutIcon class="w-5 h-5" />
              <span>Se déconnecter</span>
            </button>
          </template>
        </div>

        <!-- Mobile toggle -->
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

    <!-- Mobile -->
    <div v-if="isOpen" class="md:hidden px-4 pb-4 space-y-2 bg-gray-800">
      <RouterLink @click="isOpen = false" to="/" class="block hover:text-blue-400">Home</RouterLink>
      <template v-if="!authStore.isAuthenticated">
        <RouterLink
          @click="isOpen = false"
          to="/login"
          class="flex items-center space-x-2 hover:text-blue-400"
        >
          <LogInIcon class="w-5 h-5" />
          <span>Se connecter</span>
        </RouterLink>
      </template>
      <template v-else>
        <RouterLink
          @click="isOpen = false"
          to="/profile"
          class="flex items-center space-x-2 hover:text-blue-400"
        >
          <span>{{ authStore.user?.email }}</span>
          <UserIcon class="w-5 h-5" />
        </RouterLink>
        <button
          @click="handleLogout"
          aria-label="Logout"
          class="flex items-center space-x-2 hover:text-red-400"
        >
          <LogOutIcon class="w-5 h-5" />
          <span v-if="isLoading">Déconneion...</span>
          <span v-else>Se déconnecter</span>
        </button>
      </template>
    </div>
  </nav>
</template>
