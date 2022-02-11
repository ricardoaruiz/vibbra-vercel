import { UseLocalStorage } from './type'

const TOKEN_KEY = 'vibbra@token'

export const useLocalStorage = (): UseLocalStorage => {
  /**
   * Set token on localstorage
   * @param token
   */
  const setToken = (token: string | null | undefined) => {
    token && window.localStorage.setItem(TOKEN_KEY, token)
  }

  /**
   * Get token from localstorage
   * @returns token
   */
  const getToken = () => {
    return window.localStorage.getItem(TOKEN_KEY)
  }

  return { setToken, getToken }
}
