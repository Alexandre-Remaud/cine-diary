<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center h-full text-center p-6">
    <h1 class="text-6xl font-bold text-red-500 mb-4">404</h1>
    <p class="text-lg mb-6">Oups, cette page n’existe pas.</p>
    <BaseButton to="/" variant="text"> Retour à l’accueil </BaseButton>
  </div>
</template>
