import { InviteResult } from 'hooks/useUser/types'

export type UseListInvite = {
  invites: InviteResult[]
  isOpenDeleteModal: boolean
  handleDeleteClick: (item: InviteResult) => void
  handleEditClick: (invitedUserId: number) => void
  handleConfirmDeleteClick: () => Promise<void>
  handleCancelDeleteClick: () => void
}
