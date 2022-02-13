import { AuthenticationResponse } from 'pages/api/authenticate/types'
import { AuthenticationResult, UseAuthType } from './type'
import { useApi } from '../useApi'
import { useCookie } from 'hooks'

const AUTH_BASE_URL = '/authenticate'

export const useAuth = (): UseAuthType => {
  const { post } = useApi()
  const { setToken, removeToken } = useCookie()

  /**
   * Perform basic login
   * @param login
   * @param password
   * @returns logged user data and token
   */
  const signin = async (
    login: string,
    password: string
  ): Promise<AuthenticationResult | undefined> => {
    const resp = await post<AuthenticationResponse>(AUTH_BASE_URL, {
      login,
      password
    })

    setToken(resp?.data.token)

    return resp?.data
  }

  /**
   * Perform SSO login
   * @param login
   * @param appToken
   * @returns logged user data and token
   */
  const signinSSO = async (
    login: string,
    appToken: string
  ): Promise<AuthenticationResult | undefined> => {
    const resp = await post<AuthenticationResponse>(`${AUTH_BASE_URL}/sso`, {
      login,
      app_token: appToken
    })

    setToken(resp?.data.token)

    return resp?.data
  }

  /**
   * Perform logoff
   */
  const signout = () => {
    removeToken()
  }

  return { signin, signinSSO, signout }
}
