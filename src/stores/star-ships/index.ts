import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { StarShip } from '../../services/star-ship/types'
import type { APIResponse, APIStatus } from '../../services/types'
import { API } from '../../services'
import { AxiosError } from 'axios'

export const useStarShipStore = defineStore('startShipStore', () => {
  const list = ref<APIResponse<StarShip[]>>({
    results: [],
    count: 0,
    previous: null,
    next: null
  })

  const item = ref<StarShip>()
  const isLoading = ref(true)
  const isError = ref(false)

  const setSuccess = () => {
    isLoading.value = false
    isError.value = false
  }

  const setError = () => {
    isLoading.value = false
    isError.value = true
  }

  function initStarShops(data: APIResponse<StarShip[]>) {
    list.value = data
    setSuccess()
  }

  function initItem(data: StarShip) {
    item.value = data
    setSuccess()
  }

  async function getList(page = 1, query?: string): Promise<APIStatus> {
    try {
      const { data } = await API.starShips.getStarShips(page, query)

      initStarShops(data)
      return {
        success: true
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      setError()
      return {
        success: false,
        status: _error.response?.status
      }
    }
  }

  async function getItem(id: number): Promise<APIStatus> {
    try {
      const { data } = await API.starShips.getStarShip(id)

      initItem(data)
      return {
        success: true
      }
    } catch (error) {
      const _error = error as AxiosError<string>
      setError()
      return {
        success: false,
        status: _error.response?.status
      }
    }
  }

  return {
    list,
    item,
    isLoading,
    isError,
    initStarShops,
    getList,
    getItem
  }
})
