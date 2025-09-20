<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'vue-router'
import { validateEmail, validatePassword, validatePasswordConfirmation } from '@/utils/validation'

const authStore = useAuthStore()
const uiStore = useUiStore()
const router = useRouter()
const { isLoading } = storeToRefs(uiStore)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref<{
  email: string | null
  password: string | null
  confirmPassword: string | null
}>({
  email: null,
  password: null,
  confirmPassword: null,
})
const handleRegister = async () => {
  errors.value = { email: null, password: null, confirmPassword: null }
  errors.value.email = validateEmail(email.value)
  errors.value.password = validatePassword(password.value)
  errors.value.confirmPassword = validatePasswordConfirmation(password.value, confirmPassword.value)

  if (errors.value.email || errors.value.password || errors.value.confirmPassword) {
    uiStore.addToast('error', 'Veuillez corriger les erreurs dans le formulaire')
    return
  }

  uiStore.startLoading()
  try {
    await authStore.register(email.value, password.value)
    uiStore.addToast('success', 'Inscription réussie 🎉')
    router.push('/profile')
  } catch (e) {
    const error = e as AxiosError<{ message?: string }>
    const msg = error.response?.data?.message || 'Erreur lors de l’inscription'
    uiStore.addToast('error', msg)
  } finally {
    uiStore.stopLoading()
  }
}
</script>

<template>
  <form
    class="flex flex-col w-full max-w-md gap-4 px-4"
    @submit.prevent="handleRegister"
    novalidate
  >
    <h1 class="text-2xl font-bold mb-4">Créer un compte</h1>
    <div>
      <label class="font-semibold" for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.email }"
      />
      <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
    </div>

    <div>
      <label class="font-semibold" for="password">Mot de passe</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="Mot de passe"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.password }"
      />
      <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
    </div>
    <div>
      <label class="font-semibold" for="confirmPassword">Confirmer le mot de passe</label>
      <input
        id="confirmPassword"
        v-model="confirmPassword"
        type="password"
        placeholder="Confirmer le mot de passe"
        class="w-full p-2 border rounded"
        :class="{ 'border-red-500': errors.confirmPassword }"
      />
      <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
        {{ errors.confirmPassword }}
      </p>
    </div>
    <button
      aria-label="Créer un compte"
      class="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      type="submit"
      :disabled="isLoading"
    >
      <span v-if="isLoading">Inscription...</span>
      <span v-else>S'inscrire</span>
    </button>
  </form>
</template>
