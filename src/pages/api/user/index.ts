import { NextApiRequest, NextApiResponse } from 'next'

import { getSimpleUsers } from 'services'

import { GetUsersResponse } from './types'

export default (
  req: NextApiRequest,
  res: NextApiResponse<GetUsersResponse | string | undefined>
) => {
  switch (req.method) {
    case 'GET':
      getAllUsers(req, res)
      break
    default:
      res.status(405).send(undefined)
      break
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
const getAllUsers = (
  req: NextApiRequest,
  res: NextApiResponse<GetUsersResponse | string>
) => {
  try {
    const users = getSimpleUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json('Internal Error. Please try again later.')
  }
}
