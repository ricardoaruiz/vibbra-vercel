import { User } from 'hooks/model/user'

export type UseUser = {
  createUserInvite: (
    params: CreateUserInviteParams
  ) => Promise<InviteResult | undefined>
  getUserInvites: (userId: number) => Promise<InviteResult[] | undefined>
  getSimpleUsers: () => Promise<GetSimpleUsersResult | undefined>
}

export type GetSimpleUsersResult = User[]
export type CreateUserInviteParams = Invite

export type InviteResult = {
  invite: Invite
}

type Invite = {
  user_invited: number
  name: string
  email: string
  user: number
}
