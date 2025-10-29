<script setup lang="ts">
import type { TmdbMovie, TmdbTvShow, TmdbMedia } from '@shared/types/tmdb.d.ts'

defineProps<{
  title: string
  items: (TmdbMovie | TmdbTvShow)[]
  loading?: boolean
  error?: string | null
}>()

const isMovie = (m: TmdbMedia): m is TmdbMovie => 'title' in m

const getPosterUrl = (path: string | null) => {
  if (!path) return 'https://via.placeholder.com/154x231/1f2937/6b7280?text=No+Poster'
  return `https://image.tmdb.org/t/p/w154${path}`
}

const getItemTitle = (item: TmdbMovie | TmdbTvShow): string => ('title' in item ? item.title : item.name) || '—'

const getItemYear = (item: TmdbMovie | TmdbTvShow): string => {
  const date = 'release_date' in item ? item.release_date : item.first_air_date
  if (!date) return '—'
  const year = date.split('-')[0]
  return year || '—'
}

const getItemRating = (item: TmdbMovie | TmdbTvShow): string => {
  const n = Number(item.vote_average)
  if (Number.isFinite(n)) return n.toFixed(1)
  return '—'
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="text-xl font-bold text-zinc-100">{{ title }}</h2>

    <div v-if="loading" class="flex h-64 items-center justify-center">
      <div class="text-zinc-400">Chargement...</div>
    </div>

    <div v-else-if="error" class="flex h-64 items-center justify-center">
      <div class="text-red-400">{{ error }}</div>
    </div>
    <div v-else-if="items && items.length" class="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500">
      <div
        v-for="item in items"
        :key="item.id"
        class="group flex-shrink-0"
      >
          <router-link
            :to="{ name: 'media-detail', params: { id: item.id }, query: { type: isMovie(item) ? 'movie' : 'tv' } }"
            class="block"
          >
            <div class="relative h-[231px] w-[154px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
              <div class="h-full w-full transition-transform duration-300 group-hover:scale-105">
                <img
                  :src="getPosterUrl(item.poster_path)"
                  :alt="getItemTitle(item)"
                  class="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-zinc-950/80 to-transparent p-2 text-white">
                <p class="text-xs font-semibold line-clamp-1">{{ getItemTitle(item) }}</p>
                <p class="text-[10px] text-zinc-300">{{ getItemYear(item) }}</p>
              </div>
              <div class="absolute right-1 top-1 rounded bg-zinc-950/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
                {{ getItemRating(item) }}
              </div>
            </div>
          </router-link>
        </div>
    </div>
    <div v-else class="flex h-32 items-center justify-center text-zinc-500">Aucun élément</div>
  </div>
</template>
