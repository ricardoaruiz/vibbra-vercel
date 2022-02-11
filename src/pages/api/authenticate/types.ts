import { User } from 'services/user/types'

export type AuthenticationRequest = {
  login: string
  password: string
}

export type AuthenticationSSORequest = {
  login: string
  app_token: string
}

export type AuthenticationResponse = {
  token: string
  user: User
}
