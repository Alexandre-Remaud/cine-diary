<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'vue-router'
import { validateEmail, validatePassword } from '@/utils/validation'

const router = useRouter()
const authStore = useAuthStore()
const uiStore = useUiStore()
const { isLoading } = storeToRefs(uiStore)
const email = ref('')
const password = ref('')
const errors = ref<{
  email: string | null
  password: string | null
}>({
  email: null,
  password: null,
})
const handleForm = async () => {
  errors.value = { email: null, password: null }
  errors.value.email = validateEmail(email.value)
  errors.value.password = validatePassword(password.value)

  if (errors.value.email || errors.value.password) {
    uiStore.addToast('error', 'Veuillez corriger les erreurs dans le formulaire')
    return
  }

  uiStore.startLoading()
  try {
    await authStore.login(email.value, password.value)
    uiStore.addToast('success', 'Connexion réussie 🎉')
    router.push('/')
  } catch (e) {
    const error = e as AxiosError<{ message?: string }>
    const msg = error.response?.data?.message || 'Erreur lors de la connexion'
    uiStore.addToast('error', msg)
  } finally {
    uiStore.stopLoading()
  }
}
</script>

<template>
  <form class="flex flex-col w-full max-w-md gap-4 px-4" @submit.prevent="handleForm" novalidate>
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="email">Email</label>
      <input
        class="p-2 border rounded w-full max-w-md focus:ring-2 ring-blue-300"
        type="email"
        name="email"
        id="email"
        v-model="email"
        placeholder="Entrez votre email"
        autocomplete="email"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="password">Mot de passe</label>
      <input
        class="p-2 border rounded w-full max-w-md focus:ring-2 ring-blue-300"
        type="password"
        name="password"
        id="password"
        v-model="password"
        autocomplete="current-password"
        placeholder="Entrez votre mot de passe"
        :class="{ 'border-red-500': errors.password }"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>
    <button
      aria-label="Se connecter"
      class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      type="submit"
      :disabled="isLoading"
    >
      <span v-if="isLoading">Connexion en cours...</span>
      <span v-else>Se connecter</span>
    </button>
  </form>
  <div class="p-2">
    <RouterLink to="/register" class="hover:text-blue-400"
      >Pas encore inscrit ? → S’inscrire</RouterLink
    >
  </div>
</template>
