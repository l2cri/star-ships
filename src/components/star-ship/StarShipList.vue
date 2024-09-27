<template>
  <div :key="starShips.url" v-for="starShips in props.items">
    <RouterLink :to="goToDetailPage(starShips.url)">{{ starShips.name }}</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { type Props } from './interface'
import { RouterLink, type RouteLocationRaw } from 'vue-router'

const props = defineProps<Props>()

function goToDetailPage(url: string): RouteLocationRaw | {} {
  const match = url.match(/\d+\/$/)
  if (match === null) {
    return {}
  }

  const id = parseInt(match[0])

  return { name: 'star-ship', params: { id } }
}
</script>
