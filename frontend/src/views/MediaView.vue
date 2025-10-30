<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTmdbStore } from '@/stores/tmdbStore'
import MediaDetail from '@/components/MediaDetail.vue'
import Rail from '@/components/TmdbRail.vue'

const route = useRoute()
const tmdbStore = useTmdbStore()
const { similarRail, loading, error } = storeToRefs(tmdbStore)
const mediaId = Number(route.params.id)
const mediaType = route.params.type as 'movie' | 'tv'

onMounted(async () => {
  await tmdbStore.loadMediaDetail(mediaId, mediaType)
})
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <MediaDetail :media="tmdbStore.currentMedia" :loading="tmdbStore.loadingDetail" />
  </div>
  <div class="w-full space-y-8 py-8">
    <Rail
      v-for="(rail, index) in similarRail"
      :key="index"
      :title="rail.title"
      :items="rail.items"
      :loading="loading"
      :error="error"
      :icon="rail.icon"
    />
  </div>
</template>
