<template>
  <ContentSkeleton v-if="starShipsStore.isLoading" />
  <ContentError v-else-if="starShipsStore.isError" />
  <div v-else>
    <pre>
        {{ starShipsStore.item }}
    </pre>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useStarShipStore } from '../stores/star-ships'
import ContentSkeleton from '../components/ui/ContentSkeleton.vue'
import ContentError from '../components/ui/ContentError.vue'
import type { StarShipDetailProps } from '@/router/pageInterface'

const starShipsStore = useStarShipStore()

const props = defineProps<StarShipDetailProps>()

onMounted(() => {
  starShipsStore.getItem(props.id)
})
</script>
