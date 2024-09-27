<template>
  <ThePaginator :prev="prev" :next="next" @change-page="doPaginate" />
  <SearchShip :search="props.search" @set-page="updateSearch" />

  <ContentSkeleton v-if="starShipsStore.isLoading" />
  <ContentError v-else-if="starShipsStore.isError" />
  <StarShipList v-else :items="starShipsStore.list.results" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStarShipStore } from '../stores/star-ships'
import usePaginate from '../composable/pagination'
import { useRouter } from 'vue-router'
import ThePaginator from '../components/ui/ThePaginator.vue'
import StarShipList from '../components/star-ship/StarShipList.vue'
import SearchShip from '../components/search-ship/SearchShip.vue'
import ContentSkeleton from '../components/ui/ContentSkeleton.vue'
import ContentError from '../components/ui/ContentError.vue'
import type { HomeQueryInterface } from '@/router/pageInterface'

const router = useRouter()
const starShipsStore = useStarShipStore()
const { getPaginationPrevNext, prev, next } = usePaginate()

const props = defineProps<HomeQueryInterface>()
const searchStr = ref<string>(props.search ? props.search : '')

async function setDataPage(page = 1, query?: string) {
  await starShipsStore.getList(page, query)
  getPaginationPrevNext(starShipsStore.list)
}

onMounted(() => {
  setDataPage(props.page, props.search)
})

function doPaginate(page: number | null): void {
  if (page === null) {
    return
  }

  setDataPage(page, searchStr.value)
  let query: HomeQueryInterface = {}

  if (searchStr.value) {
    query['search'] = String(searchStr.value)
  }
  if (page > 1) {
    query['page'] = page
  }

  router.push({ name: 'home', query: { ...query } })
}

function updateSearch(query: string) {
  searchStr.value = query
  setDataPage(1, searchStr.value)
}
</script>
