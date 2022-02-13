import bd from '../bd'
import { getNextId } from 'services'
import { Invite } from './types'

export const getAllInvites = () => {
  return bd.invites
}

/**
 *
 * @param id
 * @returns
 */
export const getUserInvites = (id: number) => {
  const foundUser = bd.users.find((user) => user.id === id)
  if (!foundUser) return null

  const userInvites = bd.invites.filter((invite) => invite.user === id)
  if (!userInvites) return null

  return userInvites.map((invite) => {
    const invitedUser = bd.users.find((user) => user.id === invite.user_invited)

    return {
      invite: {
        user_invited: invite.user_invited,
        name: invitedUser?.name || 'Unknown',
        email: invitedUser?.email || 'Unknown',
        user: id
      }
    }
  })
}

/**
 *
 * @param userId
 * @param inviteId
 * @returns
 */
export const getUserInvite = (userId: number, inviteId: number) => {
  const foundUser = bd.users.find((user) => user.id === userId)
  if (!foundUser) return null

  const userInvite = bd.invites.find(
    (invite) => invite.user === userId && invite.id === inviteId
  )
  if (!userInvite) return null

  const invitedUser = bd.users.find(
    (user) => user.id === userInvite.user_invited
  )

  return {
    user_invited: invitedUser?.id || 0,
    name: invitedUser?.name || 'Unknown',
    email: invitedUser?.email || 'Unknown',
    user: userId
  }
}

/**
 *
 * @param invite
 */
export const addInvite = (invite: Invite) => {
  bd.invites = [...bd.invites, { id: getNextId(), ...invite }]
}

/**
 *
 * @param userId
 * @param inviteId
 * @param invite
 */
export const updateInvite = (invite: Invite) => {
  bd.invites = bd.invites.map((currentInvite) => {
    return currentInvite.id === invite.id
      ? { id: currentInvite.id, ...invite }
      : currentInvite
  })
}
