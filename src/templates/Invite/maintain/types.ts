import { User } from 'hooks/model/user'
import { UseFormReturn } from 'react-hook-form'

export type UseInviteLogic = {
  users: User[] | undefined
  selectedUser: number | undefined
  isConfirmModalOpen: boolean

  form: UseFormReturn<InviteFormData, object>
  userNameRef: React.RefObject<HTMLInputElement>
  userEmailRef: React.RefObject<HTMLInputElement>

  handleConfirm: () => Promise<void>
  handleUserSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleConfirmClick: () => void
  handleConfirmOperation: () => void
  handleCancelOperation: () => void
}

export type LogicOperation = 'create' | 'update'

export type InviteFormData = {
  selectedUser: number
}

export type MaintainInviteProps = {
  operation?: LogicOperation
}
