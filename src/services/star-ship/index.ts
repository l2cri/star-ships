import http from '../api'
import type { APIResponse } from '../types'
import type { StarShip } from './types'

async function getStarShips(page: number, query?: string) {
  const searchParams = new URLSearchParams()
  if (query) {
    searchParams.append('search', query)
  }
  if (page && page > 1) {
    searchParams.append('page', String(page))
  }
  return await http.get<APIResponse<StarShip[]>>(`starships?${searchParams.toString()}`)
}

async function getStarShip(id: number) {
  return await http.get<StarShip>(`starships/${id}`)
}

export default {
  getStarShips,
  getStarShip
}
