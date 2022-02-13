export type InviteListResponse = InviteResp[]

export type InviteResponse = InviteResp

export type CreateInviteRequest = Invite
export type CreateInviteResponse = InviteResp

export type UpdateInviteRequest = Invite
export type UpdateInviteResponse = InviteResp

export type InviteResp = {
  invite: Invite
}

export type Invite = {
  name: string
  email: string
  user: number
  user_invited: number
}
