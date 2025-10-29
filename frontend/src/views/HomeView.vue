<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTmdbStore } from '@/stores/tmdbStore'
import Rail from '@/components/AppRail.vue'

const tmdbStore = useTmdbStore()

onMounted(async () => {
  await tmdbStore.loadAllRails()
})

const rails = computed(() => [
  { title: 'Tendances du jour (Films)', items: tmdbStore.rails.trendingMovies },
  { title: 'Tendances de la semaine (Séries)', items: tmdbStore.rails.trendingTv },
  { title: 'Films populaires', items: tmdbStore.rails.topRated },
  { title: 'Prochainement (Films)', items: tmdbStore.rails.upcoming },
])
</script>

<template>
  <div class="w-full space-y-8 py-8">
    <Rail
      v-for="(rail, index) in rails"
      :key="index"
      :title="rail.title"
      :items="rail.items"
      :loading="tmdbStore.loading"
      :error="tmdbStore.error"
    />
  </div>
</template>

