import { NextApiRequest, NextApiResponse } from 'next'

import {
  addInvite,
  findUserById,
  getUserInvites,
  getNextId,
  getUserInviteByInvitedUser
} from 'services'

import {
  CreateInviteRequest,
  CreateInviteResponse,
  InviteListResponse
} from './types'

export default (
  req: NextApiRequest,
  res: NextApiResponse<
    InviteListResponse | CreateInviteResponse | string | undefined
  >
) => {
  switch (req.method) {
    case 'GET':
      getInviteList(req, res)
      break
    case 'POST':
      createInvite(req, res)
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
const getInviteList = (
  req: NextApiRequest,
  res: NextApiResponse<InviteListResponse | string>
) => {
  try {
    const { userId } = req.query
    const invites = getUserInvites(+userId)
    res.status(200).json(invites?.length ? invites.map((invite) => invite) : [])
  } catch (error) {
    res.status(500).json('Internal Error. Please try again later.')
  }
}

/**
 *
 * @param req
 * @param res
 */
const createInvite = (
  req: NextApiRequest,
  res: NextApiResponse<CreateInviteResponse | string | undefined>
) => {
  try {
    const { userId } = req.query
    const { name, email, user, user_invited }: CreateInviteRequest = req.body

    if (!name || !email || !user || !user_invited) {
      return res.status(400).send(undefined)
    }

    if (+userId === user_invited) {
      return res.status(422).send("Can't invite yourself")
    }

    if (getUserInviteByInvitedUser(+userId, user_invited)) {
      return res.status(422).send('This user has already been invited')
    }

    if (findUserById(+user_invited)) {
      addInvite({ id: getNextId(), user: +userId, user_invited })
      res.status(201).send({ invite: { name, email, user, user_invited } })
    }
  } catch (error) {
    res.status(500).json('Internal Error. Please try again later.')
  }
}
