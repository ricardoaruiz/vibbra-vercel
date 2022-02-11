import { AuthenticationResponse } from 'pages/api/authenticate/types'

export type UseAuthType = {
  /**
   * Perform basic login
   * @param login
   * @param password
   * @returns logged user data and token
   */ signin: (
    login: string,
    password: string
  ) => Promise<AuthenticationResponse | undefined>

  /**
   * Perform SSO login
   * @param login
   * @param appToken
   * @returns logged user data and token
   */
  signinSSO: (
    login: string,
    appToken: string
  ) => Promise<AuthenticationResponse | undefined>
}
