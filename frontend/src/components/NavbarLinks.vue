<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useUiStore } from '@/stores/uiStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { User, LogOut, LogIn } from 'lucide-vue-next'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps<{
  isMobile?: boolean
  onLinkClick?: () => void
}>()

const authStore = useAuthStore()
const uiStore = useUiStore()
const router = useRouter()
const { isLoading } = storeToRefs(uiStore)

const handleLogout = () => {
  uiStore.startLoading()
  try {
    authStore.logout()
    uiStore.addToast('info', 'Déconnexion réussie 👋')
    router.push('/')
  } finally {
    uiStore.stopLoading()
    props.onLinkClick?.()
  }
}

const handleLinkClick = () => {
  props.onLinkClick?.()
}
</script>

<template>
  <div :class="isMobile ? 'flex flex-col space-y-2' : 'flex space-x-6 items-center'">
    <template v-if="!authStore.isAuthenticated">
      <BaseButton
        to="/login"
        type="button"
        variant="text"
        :icon="LogIn"
        @click="handleLinkClick"
      >
        Se connecter
      </BaseButton>
    </template>

    <template v-else>
      <BaseButton
        to="/profile"
        type="button"
        variant="text"
        :icon="User"
        @click="handleLinkClick"
      >
        {{ authStore.user?.email }}
      </BaseButton>

      <BaseButton
        @click="handleLogout"
        type="button"
        :loading="isLoading"
        ariaLabel="Se déconnecter"
        variant="danger"
        :icon="LogOut"
      >
        Déconnexion
      </BaseButton>
    </template>
  </div>
</template>
