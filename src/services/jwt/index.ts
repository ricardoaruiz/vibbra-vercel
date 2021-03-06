/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { TokenData } from './types'

/**
 *
 */
const PRIVATE_KEY = 'chave-privada-para-geracao-do-jwt'

/**
 *
 */
const TOKEN_LIFE_TIME = '10m'

/**
 * Open JWT and return data
 * @param token
 * @returns jwt data
 */
const openJWT = (token: string | undefined): TokenData | null => {
  try {
    if (!token) return null
    const decode: any = jwt.verify(token, PRIVATE_KEY)
    return decode.data as TokenData
  } catch (error) {
    return null
  }
}

/**
 *
 * @param data
 * @returns
 */
export const generateJWT = (data: unknown): string => {
  return jwt.sign({ data }, PRIVATE_KEY, { expiresIn: TOKEN_LIFE_TIME })
}

/**
 *
 * @param token
 * @param userId
 * @returns
 */
export const validateJWT = (
  token: string | undefined,
  userId?: number
): boolean => {
  try {
    if (!token) return false

    const decode: any = jwt.verify(token, PRIVATE_KEY)

    const { id } = decode.data as TokenData

    if (userId) {
      return userId === id
    }

    return true
  } catch (error) {
    return false
  }
}

/**
 * Get user id from token
 * @param token
 * @returns user id
 */
export const getUserIdFromtoken = (
  token: string | undefined
): number | null => {
  if (!token) return null
  const tokenData = openJWT(token)
  return tokenData?.id || null
}

/**
 * Get user name id from token
 * @param token
 * @returns user id
 */
export const getUserNameFromtoken = (
  token: string | undefined
): string | null => {
  if (!token) return null
  const tokenData = openJWT(token)
  return tokenData?.name || null
}
