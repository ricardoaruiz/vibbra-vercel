import { AxiosRequestConfig } from 'axios'

export type UseAPI = {
  post: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<APIResponse<T> | undefined>
}

export type APIResponse<T> = {
  data: T
  status: number
  statusText: string
}

export type APIError = {
  status: string
  statusText: string
}
