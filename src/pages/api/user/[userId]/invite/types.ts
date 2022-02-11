export type InviteListResponse =
  | { invite: Invite }[]
  | string
  | undefined
  | null

export type InviteResponse = { invite: Invite } | string | undefined | null

export type CreateInviteRequest = Invite
export type CreateInviteResponse =
  | { invite: Invite }
  | string
  | undefined
  | null

export type UpdateInviteRequest = Invite
export type UpdateInviteResponse =
  | { invite: Invite }
  | string
  | undefined
  | null

export type Invite = {
  name: string
  email: string
  user: number
  user_invited: number
}
