<script setup lang="ts">
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { useRouter } from 'vue-router'
import { validateEmail, validatePassword } from '@/utils/validation'
import BaseButton from '@/components/BaseButton.vue'
import BaseInput from '@/components/BaseInput.vue'
import { MailIcon, LockIcon } from '@/icons/icons'

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

    <BaseButton aria-label="Se connecter" type="submit" :loading="isLoading" variant="primary">
      Se connecter
    </BaseButton>
  </form>
  <div class="p-2">
    <BaseButton to="/register" variant="text">Pas encore inscrit ? → S’inscrire</BaseButton>
  </div>
</template>
