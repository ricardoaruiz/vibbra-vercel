import { NextApiRequest, NextApiResponse } from 'next'
import { AuthenticationRequest, AuthenticationResponse } from './types'
import { findUserByLoginAndPassword, generateJWT } from 'services'

export default (
  req: NextApiRequest,
  res: NextApiResponse<AuthenticationResponse | string | undefined>
) => {
  try {
    if (req.method !== 'POST') return res.status(405).send(undefined)

    const { login, password }: AuthenticationRequest = req.body

    if (!login || !password) {
      return res.status(400).send(undefined)
    }

    const foundUser = findUserByLoginAndPassword(login, password)

    if (foundUser) {
      const { id, login, name } = foundUser

      const token = generateJWT({ id, login, name })
      return res.status(200).json({ token, user: foundUser })
    }

    res.status(401).json(undefined)
  } catch (error) {
    res.status(500).json('Internal Error. Please try again later.')
  }
}
