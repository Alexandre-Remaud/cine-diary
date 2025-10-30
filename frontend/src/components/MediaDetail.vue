<script setup lang="ts">
import type { TmdbMedia, TmdbMovie } from '@shared/types/tmdb'

defineProps<{
  media: TmdbMedia | null
  loading: boolean
}>()

const isMovie = (m: TmdbMedia): m is TmdbMovie => 'title' in m
</script>

<template>
  <div v-if="loading">Chargement...</div>
  <div v-else-if="media" class="max-w-4xl mx-auto p-6">
    <div class="flex gap-6">
      <img
        :src="`https://image.tmdb.org/t/p/w500${media.poster_path}`"
        class="w-64 rounded-lg shadow-lg"
      />
      <div class="flex-1">
        <h1 class="text-3xl font-bold">
          {{ isMovie(media) ? media.title : media.name }}
        </h1>
        <p class="text-gray-500">
          {{ isMovie(media) ? media.release_date.split('-')[0] : media.first_air_date.split('-')[0] }}
          • {{ media.vote_average.toFixed(1) }} / 10
        </p>
        <div class="inline-flex flex-wrap gap-2 mt-2">
            <span
              v-for="genre in media.genres"
              :key="genre.id"
              class="px-3 py-1 text-xs font-medium text-white bg-blue-600/20 rounded-full"
            >
              {{ genre.name }}
            </span>
          </div>
        <p class="mt-4 italic">{{ media.tagline }}</p>
        <p class="mt-4">{{ media.overview }}</p>

        <div class="mt-6">
          <p v-if="isMovie(media)">Durée : {{ media.runtime }} min</p>
          <p v-else>
            Saisons : {{ media.number_of_seasons }} •
            Épisodes : {{ media.number_of_episodes }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-500">
    Film/Série non trouvé
  </div>
</template>
