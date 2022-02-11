import { AuthenticationResponse } from 'pages/api/authenticate/types'
import { UseAuthType } from './type'
import { useApi } from '../useApi'

const AUTH_BASE_URL = '/authenticate'

export const useAuth = (): UseAuthType => {
  const { post } = useApi()

  /**
   * Perform basic login
   * @param login
   * @param password
   * @returns logged user data and token
   */
  const signin = async (
    login: string,
    password: string
  ): Promise<AuthenticationResponse | undefined> => {
    const resp = await post<AuthenticationResponse>(AUTH_BASE_URL, {
      login,
      password
    })

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
  ): Promise<AuthenticationResponse | undefined> => {
    const resp = await post<AuthenticationResponse>(`${AUTH_BASE_URL}/sso`, {
      login,
      app_token: appToken
    })

    return resp?.data
  }

  return { signin, signinSSO }
}