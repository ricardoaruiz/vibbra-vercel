import React from 'react'
import { UseToken } from './types'
import Cookies from 'js-cookie'
import { getUserIdFromtoken, getUserNameFromtoken } from 'services/jwt'

export const TOKEN_KEY = 'vibbra_token'

export const useToken = (): UseToken => {
  /**
   * Set a token on cookie
   * @param token
   */
  const setToken = React.useCallback((token: string | null | undefined) => {
    token && Cookies.set(TOKEN_KEY, token)
  }, [])

  /**
   * Get the token from cookie
   * @returns token
   */
  const getToken = React.useCallback((): string | undefined => {
    return Cookies.get(TOKEN_KEY)
  }, [])

  /**
   * Remove token cookie
   */
  const removeToken = React.useCallback(() => {
    Cookies.remove(TOKEN_KEY)
  }, [])

  /**
   * Get user id from token
   * @returns user id
   */
  const getUserIdFromToken = React.useCallback(() => {
    return getUserIdFromtoken(getToken()) || 0
  }, [getToken])

  /**
   * Get user id from token
   * @returns user id
   */
  const getUserNameFromToken = React.useCallback(() => {
    return getUserNameFromtoken(getToken()) || ''
  }, [getToken])

  return {
    setToken,
    getToken,
    removeToken,
    getUserIdFromToken,
    getUserNameFromToken
  }
}
