<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref<string>('')

const handleRegister = async () => {
  if (!email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Veuillez remplir tous les champs'
    return
  }
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Les mots de passe ne correspondent pas'
    return
  }

  try {
    await authStore.register(email.value, password.value)
    router.push('/profile')
  } catch (e) {
    const error = e as AxiosError<{ message?: string }>
    errorMessage.value = error.response?.data?.message || 'Erreur lors de l’inscription'
  }
}
</script>

<template>
  <form class="flex flex-col w-full max-w-md gap-4 px-4" @submit.prevent="handleRegister">
    <h1 class="text-2xl font-bold mb-4">Créer un compte</h1>
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="email">Email</label>
      <input
        v-model="email"
        type="email"
        id="email"
        placeholder="Entrez votre email"
        class="p-2 border rounded w-full focus:ring-2 ring-blue-300"
      />
    </div>
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="password">Mot de passe</label>
      <input
        v-model="password"
        type="password"
        id="password"
        placeholder="Entrez votre mot de passe"
        class="p-2 border rounded w-full focus:ring-2 ring-blue-300"
      />
    </div>
    <div class="w-full max-w-md mb-2 space-y-2">
      <label class="font-semibold" for="confirmPassword">Confirmer le mot de passe</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="confirmPassword"
        placeholder="Confirmez votre mot de passe"
        class="p-2 border rounded w-full focus:ring-2 ring-blue-300"
      />
    </div>
    <button
      aria-label="Créer un compte"
      class="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full max-w-md"
      type="submit"
    >
      S’inscrire
    </button>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </form>
</template>
