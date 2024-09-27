export type APIResponse<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T
}

export type APIStatus = {
  status?: number
  success: boolean
}
