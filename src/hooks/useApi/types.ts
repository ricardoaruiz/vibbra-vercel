import { AxiosRequestConfig } from 'axios'

export type UseAPI = {
  /**
   * Performe GET requests
   */
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<APIResponse<T> | undefined>

  /**
   * Perform POST requests
   */
  post: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<APIResponse<T> | undefined>

  /**
   * Perform PUT requests
   */
  put: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<APIResponse<T> | undefined>

  /**
   * Perform DELETE requests
   */
  del: <T>(
    url: string,
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
  message: string
}
