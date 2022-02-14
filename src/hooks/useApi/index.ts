import React from 'react'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { APIResponse, APIError, UseAPI } from './types'
import { useToken } from 'hooks'

const API = axios.create({
  baseURL: '/api'
})

export const useApi = (): UseAPI => {
  const { getToken } = useToken()

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
   * @param response
   * @returns
   */
  const buildAPIResponse = <T>(response: AxiosResponse) => {
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText
    } as APIResponse<T>
  }

  /**
   *
   * @param error
   */
  const handleError = (error: unknown) => {
    const axiosError = error as AxiosError
    throw {
      status: axiosError.response?.status || '500',
      statusText: axiosError.response?.statusText || 'Internal Server Error',
      message: axiosError.response?.data
    } as APIError
  }

  /**
   * Perform GET requests on API
   */
  const get = React.useCallback(
    async <T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<APIResponse<T> | undefined> => {
      try {
        const response = await API.get<T>(url, config)
        return buildAPIResponse(response)
      } catch (error) {
        handleError(error)
      }
    },
    []
  )

  /**
   * Perform POST requests on API
   */
  const post = React.useCallback(
    async <T>(
      url: string,
      body: unknown,
      config?: AxiosRequestConfig
    ): Promise<APIResponse<T> | undefined> => {
      try {
        const response = await API.post<T>(url, body, config)
        return buildAPIResponse(response)
      } catch (error) {
        handleError(error)
      }
    },
    []
  )

  return { get, post }
}
