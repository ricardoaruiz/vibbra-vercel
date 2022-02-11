import { NextApiRequest, NextApiResponse } from 'next'
import { AuthenticationResponse, AuthenticationSSORequest } from './types'
import { findUserByLoginAndAppToken, generateJWT } from 'services'

export default (
  req: NextApiRequest,
  res: NextApiResponse<AuthenticationResponse | string | undefined>
) => {
  try {
    if (req.method !== 'POST') return res.status(405).send(undefined)

    const { login, app_token }: AuthenticationSSORequest = req.body

    if (!login || !app_token) {
      return res.status(400).send(undefined)
    }

    const foundUser = findUserByLoginAndAppToken(login, app_token)

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
