<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'vue-router'
import { validateEmail, validatePassword, validatePasswordConfirmation } from '@/utils/validation'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { MailIcon, LockIcon } from '@/icons/icons'

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
    <BaseInput
      label="Email"
      type="email"
      v-model="email"
      placeholder="Entrez votre email"
      :icon="MailIcon"
      :error="errors.email"
      @blur="errors.email = validateEmail(email)"
    />

    <BaseInput
      label="Mot de passe"
      type="password"
      v-model="password"
      placeholder="Entrez votre mot de passe"
      :icon="LockIcon"
      :error="errors.password"
      @blur="errors.password = validatePassword(password)"
    />

    <BaseInput
      label="Confirmer le mot de passe"
      type="password"
      v-model="confirmPassword"
      placeholder="Confirmer le votre mot de passe"
      :icon="LockIcon"
      :error="errors.confirmPassword"
      @blur="errors.confirmPassword = validatePasswordConfirmation(password, confirmPassword)"
    />
    <BaseButton aria-label="Créer un compte" type="submit" :loading="isLoading" variant="primary">
      S'inscrire
    </BaseButton>
  </form>
  <div class="p-2">
    <BaseButton to="/login" aria-label="lien pour se connecter" variant="text"
      >Déjà un compte ? → Se connecter</BaseButton
    >
  </div>
</template>
