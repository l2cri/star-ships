import type { StarShip } from '@/services/star-ship/types'
import type { APIResponse } from '@/services/types'
import { ref } from 'vue'

export default function usePagination() {
  const prev = ref<number | null>(null)
  const next = ref<number | null>(null)

  const extractIdFromUrl = (url: string | null): number | null => {
    if (url === null) {
      return null
    }
    const match = url.match(/\d+$/)

    if (match === null) {
      return null
    }

    return parseInt(match[0])
  }

  const getPaginationPrevNext = (list: APIResponse<StarShip[]>) => {
    prev.value = extractIdFromUrl(list.previous)
    next.value = extractIdFromUrl(list.next)
  }

  return {
    prev,
    next,
    getPaginationPrevNext
  }
}
