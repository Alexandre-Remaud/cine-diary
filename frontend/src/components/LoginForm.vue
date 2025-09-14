<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')

const handleForm = () => {
  console.log(email.value, password.value)
}
</script>

<template>
  <form
    class="flex flex-col items-center justify-center min-h-screen gap-4"
    @submit.prevent="handleForm"
  >
    <div class="w-full max-w-md mb-2">
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
    <div class="w-full max-w-md mb-2">
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
  </form>
</template>

<style scoped></style>
