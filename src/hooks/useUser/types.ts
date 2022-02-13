export type UseUser = {
  getUserInvites: (userId: number) => Promise<InviteResult[] | undefined>
}

export type InviteResult = {
  invite: {
    user_invited: number
    name: string
    email: string
    user: number
  }
}
