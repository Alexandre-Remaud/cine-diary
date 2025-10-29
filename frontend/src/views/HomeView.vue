<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTmdbStore } from '@/stores/tmdbStore'
import Rail from '@/components/AppRail.vue'
import { FilmIcon, StarIcon, TvIcon, CalendarIcon } from '@/icons/icons'

const tmdbStore = useTmdbStore()

onMounted(async () => {
  await tmdbStore.loadAllRails()
})

const rails = computed(() => [
  { title: `Tendances du jour`, items: tmdbStore.rails.trendingMovies, icon: FilmIcon },
  { title: 'Séries populaires', items: tmdbStore.rails.trendingTv, icon: TvIcon },
  { title: 'Films les mieux notés', items: tmdbStore.rails.topRated, icon: StarIcon },
  { title: 'À venir', items: tmdbStore.rails.upcoming, icon: CalendarIcon },
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
      :icon="rail.icon"
    />
  </div>
</template>

