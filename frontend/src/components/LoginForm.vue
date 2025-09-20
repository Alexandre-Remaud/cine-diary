<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const errorMessage = ref<string>('')

const handleForm = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }
  try {
    authStore.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    const error = e as AxiosError<{ error?: string }>
    errorMessage.value = error.response?.data?.error || 'Erreur lors de la connexion'
  }
}
</script>

<template>
  <form class="flex flex-col w-full max-w-md gap-4 px-4" @submit.prevent="handleForm">
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="email">Email</label>
      <input
        class="p-2 border rounded w-full max-w-md focus:ring-2 ring-blue-300"
        type="email"
        name="email"
        id="email"
        v-model="email"
        placeholder="Entrez votre email"
      />
    </div>
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="password">Mot de passe</label>
      <input
        class="p-2 border rounded w-full max-w-md focus:ring-2 ring-blue-300"
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="Entrez votre mot de passe"
      />
    </div>
    <button
      aria-label="Se connecter"
      class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      type="submit"
    >
      Se connecter
    </button>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </form>
  <div class="p-2">
    <RouterLink to="/register" class="hover:text-blue-400"
      >Pas encore inscrit ? → S’inscrire</RouterLink
    >
  </div>
</template>

<style scoped></style>
