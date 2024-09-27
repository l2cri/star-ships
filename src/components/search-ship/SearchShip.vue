<template>
  <input v-model="searchStr" type="text" />
</template>

<script setup lang="ts">
import debounce from '../../utils/debounce'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  search: String
})

type EmitType = {
  (event: 'setPage', value: string): void
}

const emit = defineEmits<EmitType>()

const searchStr = ref<string>(props.search ? props.search : '')

watch(
  searchStr,
  debounce((query: string) => {
    emit('setPage', query)
    if (query === '') {
      return router.push({ name: 'home' })
    }
    router.push({ name: 'home', query: { search: query } })
  }, 1000)
)
</script>
