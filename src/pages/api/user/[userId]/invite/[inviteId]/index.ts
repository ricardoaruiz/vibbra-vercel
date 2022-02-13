import { NextApiRequest, NextApiResponse } from 'next'
import { getUserInvite, updateInvite } from 'services'
import {
  InviteResponse,
  UpdateInviteRequest,
  UpdateInviteResponse
} from '../types'

export default (
  req: NextApiRequest,
  res: NextApiResponse<
    InviteResponse | UpdateInviteResponse | string | undefined
  >
) => {
  switch (req.method) {
    case 'GET':
      getUserInvite1(req, res)
      break
    case 'PUT':
      updateUserInvite(req, res)
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
 */
const getUserInvite1 = (
  req: NextApiRequest,
  res: NextApiResponse<InviteResponse | string | undefined>
) => {
  try {
    const { userId, inviteId } = req.query
    const foundInvite = getUserInvite(+userId, +inviteId)

    res.status(200).json(foundInvite ? { invite: foundInvite } : undefined)
  } catch (error) {
    res.status(500).json('Internal Error. Please try again later.')
  }
}

/**
 *
 * @param req
 * @param res
 * @returns
 */
const updateUserInvite = (
  req: NextApiRequest,
  res: NextApiResponse<UpdateInviteResponse | string | undefined>
) => {
  try {
    const { userId, inviteId } = req.query
    const { name, email, user, user_invited }: UpdateInviteRequest = req.body

    if (!name || !email || !user || !user_invited) {
      return res.status(400).send(undefined)
    }

    if (getUserInvite(+userId, +inviteId)) {
      updateInvite({
        id: +inviteId,
        user: +userId,
        user_invited
      })
      res.status(201).send({ invite: { name, email, user, user_invited } })
    }
  } catch (error) {
    res.status(500).json('Internal Error. Please try again later.')
  }
}
