<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full text-center p-6">
    <h1 class="text-6xl font-bold text-blue-500 mb-4">404</h1>
    <p class="text-lg mb-6">Oups, cette page n’existe pas.</p>
    <RouterLink to="/" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Retour à l’accueil
    </RouterLink>
  </div>
</template>
