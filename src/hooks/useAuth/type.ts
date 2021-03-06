import { User } from 'hooks/model/user'

export type UseAuthType = {
  /**
   * Perform basic login
   * @param login
   * @param password
   * @returns logged user data and token
   */
  signin: (
    login: string,
    password: string
  ) => Promise<AuthenticationResult | undefined>

  /**
   * Perform SSO login
   * @param login
   * @param appToken
   * @returns logged user data and token
   */
  signinSSO: (
    login: string,
    appToken: string
  ) => Promise<AuthenticationResult | undefined>

  /**
   * Perform logoff
   */
  signout: () => void
}

export type AuthenticationResult = {
  token: string
  user: User
}
