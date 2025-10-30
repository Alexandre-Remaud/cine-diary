import type { RouteLocationNormalized } from 'vue-router'

export interface MediaDetailRoute extends RouteLocationNormalized {
  params: {id: string, type: string}
}