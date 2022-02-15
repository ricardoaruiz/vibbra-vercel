import React from 'react'

import { useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { usePageContext } from 'context'
import { ServiceError, useUser } from 'hooks'
import { User } from 'hooks/model/user'
import { MaintainUserInviteParams } from 'hooks/useUser/types'

type UseInviteLogic = {
  selectedUser: number | undefined
  users: User[] | undefined
  isConfirmModalOpen: boolean

  userNameRef: React.RefObject<HTMLInputElement>
  userEmailRef: React.RefObject<HTMLInputElement>
  form: UseFormReturn<FormData, object>

  handleConfirm: () => Promise<void>
  handleUserSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleConfirmClick: () => void
  handleConfirmOperation: () => void
  handleCancelOperation: () => void
}

const schema = yup.object().shape({
  selectedUser: yup.string().required('Select an user to invite')
})

type FormData = {
  selectedUser: number
}
export type LogicOperation = 'create' | 'update'

const useInviteLogic = (
  invitedUserId?: number,
  operation: LogicOperation = 'create'
): UseInviteLogic => {
  const { userId, showSuccessAlert, showErrorAlert, showLoading, hideLoading } =
    usePageContext()
  const { getSimpleUsers, createUserInvite, updateUserInvite } = useUser()

  const [users, setUsers] = React.useState<User[]>()
  const [user, setUser] = React.useState<User>()
  const [selectedUser, setSelectedUser] = React.useState<number | undefined>(
    invitedUserId
  )
  const [originalInvited, setOriginalInvited] = React.useState<
    number | undefined
  >(invitedUserId)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false)

  const userNameRef = React.createRef<HTMLInputElement>()
  const userEmailRef = React.createRef<HTMLInputElement>()

  const form = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  /**
   *
   */
  const handleUserSelect = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const invitedUserId = event.target.value || undefined
      setSelectedUser(invitedUserId ? +invitedUserId : undefined)
    },
    []
  )

  /**
   *
   */
  const handleConfirm = React.useCallback(async () => {
    try {
      showLoading()
      const maintainUserInviteRequest = {
        user: userId,
        name: user?.name,
        email: user?.email,
        user_invited: selectedUser
      } as MaintainUserInviteParams

      if (operation === 'create') {
        await createUserInvite(maintainUserInviteRequest)
        setSelectedUser(undefined)
        form.reset()
      }
      if (operation === 'update' && originalInvited) {
        await updateUserInvite({
          originalInvited,
          ...maintainUserInviteRequest
        })
        setOriginalInvited(selectedUser)
      }

      showSuccessAlert(`Invite ${operation}d with success`)
    } catch (error) {
      const serviceError = error as ServiceError
      showErrorAlert(serviceError.message)
    } finally {
      hideLoading()
    }
  }, [
    createUserInvite,
    form,
    hideLoading,
    operation,
    originalInvited,
    selectedUser,
    showErrorAlert,
    showLoading,
    showSuccessAlert,
    updateUserInvite,
    user?.email,
    user?.name,
    userId
  ])

  /**
   *
   */
  const handleConfirmClick = React.useCallback(() => {
    setIsConfirmModalOpen(true)
  }, [])

  /**
   *
   */
  const handleConfirmOperation = React.useCallback(() => {
    form.handleSubmit(handleConfirm)()
    setIsConfirmModalOpen(false)
  }, [form, handleConfirm])

  /**
   *
   */
  const handleCancelOperation = React.useCallback(() => {
    setIsConfirmModalOpen(false)
  }, [])

  /**
   *
   */
  React.useEffect(() => {
    const loadUsers = async () => {
      setUsers(await getSimpleUsers())
    }
    loadUsers()
  }, [getSimpleUsers])

  /**
   *
   */
  React.useEffect(() => {
    const user = selectedUser
      ? users?.find((user) => user.id === +selectedUser)
      : undefined

    setUser(user)
    form.setValue('selectedUser', selectedUser || 0)
    if (userNameRef.current) userNameRef.current.value = user?.name || ''
    if (userEmailRef.current) userEmailRef.current.value = user?.email || ''
  }, [form, selectedUser, userEmailRef, userNameRef, users])

  return {
    selectedUser,
    users,
    userNameRef,
    userEmailRef,
    form,
    handleConfirm,
    handleUserSelect,
    isConfirmModalOpen,
    handleConfirmClick,
    handleConfirmOperation,
    handleCancelOperation
  }
}

export default useInviteLogic
