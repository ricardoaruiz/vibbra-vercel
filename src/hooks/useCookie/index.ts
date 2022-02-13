import { UseCookies } from './types'
import Cookies from 'js-cookie'

export const TOKEN_KEY = 'vibbra_token'

export const useCookie = (): UseCookies => {
  const setToken = (token: string | null | undefined) => {
    token && Cookies.set(TOKEN_KEY, token)
  }

  const getToken = (): string | undefined => {
    return Cookies.get(TOKEN_KEY)
  }

  const removeToken = () => {
    Cookies.remove(TOKEN_KEY)
  }

  return { setToken, getToken, removeToken }
}
