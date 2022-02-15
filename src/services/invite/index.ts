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
    (invite) => invite.user === userId && invite.user_invited === inviteId
  )
  console.log('7', bd.invites, userId, inviteId)

  if (!userInvite) return null

  const invitedUser = bd.users.find(
    (user) => user.id === userInvite.user_invited
  )

  console.log('8', userId, inviteId)

  return invitedUser
    ? {
        user_invited: invitedUser.id,
        name: invitedUser.name,
        email: invitedUser.email,
        user: userId
      }
    : null
}

/**
 *
 * @param userId
 * @param userInvitedId
 * @returns
 */
export const getUserInviteByInvitedUser = (
  userId: number,
  userInvitedId: number
) => {
  const foundUser = bd.users.find((user) => user.id === userId)
  if (!foundUser) return null

  const userInvites = bd.invites.filter(
    (invite) => invite.user === userId && invite.user_invited === userInvitedId
  )

  if (!userInvites.length) return null

  const invitedUser = bd.users.find(
    (user) => user.id === userInvites[0].user_invited
  )

  return invitedUser
    ? {
        user_invited: invitedUser.id,
        name: invitedUser.name,
        email: invitedUser.email,
        user: userId
      }
    : null
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
  const inviteToUpdate = bd.invites.find(
    (invite) =>
      invite.user === invite.user && invite.user_invited === invite.user_invited
  )

  bd.invites = bd.invites.map((currentInvite) => {
    return currentInvite.id === inviteToUpdate?.id
      ? { id: currentInvite.id, ...invite }
      : currentInvite
  })

  return inviteToUpdate
}

/**
 *
 * @param userId
 * @param invitedUserId
 */
export const removeUserInvite = (userId: number, invitedUserId: number) => {
  const inviteToRemove = bd.invites.find(
    (invite) => invite.user === userId && invite.user_invited === invitedUserId
  )

  bd.invites = bd.invites.filter((invite) => invite.id !== inviteToRemove?.id)
}
