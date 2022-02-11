import React from 'react'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { APIResponse, APIError, UseAPI } from './types'
import { useLocalStorage } from 'service'

const API = axios.create({
  baseURL: '/api'
})

export const useApi = (): UseAPI => {
  const { getToken } = useLocalStorage()

  React.useEffect(() => {
    API.interceptors.request.use((config: AxiosRequestConfig) => {
      const token = getToken()

      return !token
        ? config
        : {
            ...config,
            headers: {
              Authorization: token
            }
          }
    })
  }, [getToken])

  /**
   *
   * @param error
   */
  const handleError = (error: unknown) => {
    const axiosError = error as AxiosError

    throw {
      status: axiosError.response?.status || '500',
      statusText: axiosError.response?.statusText || 'Internal Server Error'
    } as APIError
  }

  /**
   * Perform post requests on API
   */
  const post = React.useCallback(
    async <T>(
      url: string,
      body: unknown,
      config?: AxiosRequestConfig
    ): Promise<APIResponse<T> | undefined> => {
      try {
        const response = await API.post<T>(url, body, config)

        return {
          data: response.data,
          status: response.status,
          statusText: response.statusText
        } as APIResponse<T>
      } catch (error) {
        handleError(error)
      }
    },
    []
  )

  return { post }
}
