<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useTmdbStore } from '@/stores/tmdbStore'
import MediaDetail from '@/components/MediaDetail.vue'

const route = useRoute()
const tmdbStore = useTmdbStore()
const mediaId = Number(route.params.id)
const mediaType = route.query.type as 'movie' | 'tv'

onMounted(async () => {
  await tmdbStore.loadMediaDetail(mediaId, mediaType)
})
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <MediaDetail :media="tmdbStore.currentMedia" :loading="tmdbStore.loadingDetail" />
  </div>
</template>
