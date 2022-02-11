import { UserBD } from 'services/bd/types'
import bd from '../bd'

import { User } from './types'

type UserAppToken = {
  [key: string]: string[]
}

/**
 *
 * @param user
 * @returns
 */
const buildUser = (user: UserBD | undefined): User | undefined => {
  if (!user) return undefined

  const { id, name, email, login, password, location } = user
  const { lat, lng, address, city, state, zip_code } = location

  return {
    id,
    name,
    email,
    login,
    password,
    location: {
      lat,
      lng,
      address,
      city,
      state,
      zip_code
    }
  } as User
}

/**
 * Get a user by id
 * @param id
 * @returns
 */
export const findUserById = (id: number): User | undefined => {
  const user = bd.users.find((user) => user.id === id)
  return buildUser(user)
}

/**
 * Find a User by login and password
 * @param login
 * @param password
 * @returns User or undefined
 */
export const findUserByLoginAndPassword = (
  login: string,
  password: string
): User | undefined => {
  return buildUser(
    bd.users.find((user) => user.login === login && user.password === password)
  )
}

/**
 * Find a User by login and appToken
 * @param login
 * @param appToken
 * @returns User or undefined
 */
export const findUserByLoginAndAppToken = (
  login: string,
  appToken: string
): User | undefined => {
  const foundUser = buildUser(bd.users.find((user) => user.login === login))

  if (foundUser) {
    const isAppTokenValid = (bd.userAppToken as UserAppToken)[login].includes(
      appToken
    )

    return isAppTokenValid ? foundUser : undefined
  }

  return undefined
}
