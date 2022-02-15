import { User } from 'hooks/model/user'

export type UseUser = {
  /**
   *
   */
  createUserInvite: (
    params: MaintainUserInviteParams
  ) => Promise<InviteResult | undefined>

  /**
   *
   */
  getUserInvites: (userId: number) => Promise<InviteResult[] | undefined>

  /**
   *
   */
  getSimpleUsers: () => Promise<GetSimpleUsersResult | undefined>

  /**
   *
   */
  updateUserInvite: (
    params: MaintainUserInviteParams
  ) => Promise<InviteResult | undefined>

  /**
   *
   */
  removeUserInvite: (
    userId: number,
    invitedUserId: number
  ) => Promise<void | undefined>
}

export type GetSimpleUsersResult = User[]
export type MaintainUserInviteParams = Invite

export type InviteResult = {
  invite: Invite
}

type Invite = {
  user_invited: number
  name: string
  email: string
  user: number
}
