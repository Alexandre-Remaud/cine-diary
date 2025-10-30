<script setup lang="ts">
import { onMounted } from 'vue'
import { useTmdbStore } from '@/stores/tmdbStore'
import Rail from '@/components/TmdbRail.vue'
import { storeToRefs } from 'pinia'

const tmdbStore = useTmdbStore()
const { movieRails, loading, error } = storeToRefs(tmdbStore)

onMounted(async () => {
  await tmdbStore.loadMovieRails()
})
</script>

<template>
  <div class="w-full space-y-8 py-8">
    <Rail
      v-for="(rail) in movieRails"
      :key="rail.title"
      :title="rail.title"
      :items="rail.items"
      :loading="loading"
      :error="error"
      :icon="rail.icon"
    />
  </div>
</template>

