/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken'
import { TokenData } from './types'

/**
 *
 */
const PRIVATE_KEY = 'chave-privada-para-geracao-do-jwt'

/**
 *
 * @param data
 * @returns
 */
export const generateJWT = (data: unknown): string => {
  return jwt.sign({ data }, PRIVATE_KEY, { expiresIn: '20m' })
}

/**
 *
 * @param token
 * @param userId
 * @returns
 */
export const validateJWT = (token: string, userId?: number): boolean => {
  try {
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
