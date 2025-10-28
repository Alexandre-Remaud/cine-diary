<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useTmdbStore } from '@/stores/tmdbStore'
import type { TmdbMovie, TmdbTvShow } from '@shared/types/tmdb.d.ts'

const tmdbStore = useTmdbStore()

onMounted(async () => {
  await tmdbStore.loadAllRails()
})

const getPosterUrl = (path: string | null) => {
  if (!path) return 'https://via.placeholder.com/154x231/1f2937/6b7280?text=No+Poster'
  return `https://image.tmdb.org/t/p/w154${path}`
}

type Rail = {
  title: string
  items: (TmdbMovie | TmdbTvShow)[]
}

const rails = computed<Rail[]>(() => [
  { title: 'Tendances du jour', items: tmdbStore.rails.trendingMovies },
  { title: 'Tendances de la semaine', items: tmdbStore.rails.trendingTv },
  { title: 'Films populaires', items: tmdbStore.rails.topRated },
  { title: 'Prochainement', items: tmdbStore.rails.upcoming },
])
</script>

<template>
  <div class="w-full space-y-8 px-6 py-8">
    <div v-for="(rail, index) in rails" :key="index" class="space-y-4">
      <h2 class="text-xl font-bold text-zinc-100">{{ rail.title }}</h2>

      <div v-if="tmdbStore.loading" class="flex h-64 items-center justify-center">
        <div class="text-zinc-400">Chargement...</div>
      </div>

      <div v-else-if="tmdbStore.error" class="flex h-64 items-center justify-center">
        <div class="text-red-400">{{ tmdbStore.error }}</div>
      </div>

      <div
        v-else
        class="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500"
      >
        <div
          v-for="item in rail.items"
          :key="item.id"
          class="group relative flex-shrink-0 cursor-pointer transition-all hover:scale-105"
        >
          <div class="relative h-[231px] w-[154px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
            <img
              :src="getPosterUrl(item.poster_path)"
              :alt="'title' in item ? item.title : item.name"
              class="h-full w-full object-cover"
              loading="lazy"
            />
            <div
              class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950/80 to-transparent p-2 text-white"
            >
              <p class="text-xs font-semibold line-clamp-1">
                {{ 'title' in item ? item.title : item.name }}
              </p>
              <p class="text-[10px] text-zinc-300">
                {{ 'release_date' in item ? item.release_date.split('-')[0] : item.first_air_date.split('-')[0] }}
              </p>
            </div>
            <div
              class="absolute right-1 top-1 rounded bg-zinc-950/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm"
            >
              {{ item.vote_average.toFixed(1) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
