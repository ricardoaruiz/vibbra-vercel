import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, CheckIcon, Input, Template } from 'components'
import { ServiceError, useUser } from 'hooks'
import { User } from 'hooks/model/user'

import * as S from '../../styles/invite-create'
import { CreateUserInviteParams } from 'hooks/useUser/types'
import { usePageContext } from 'context'

const schema = yup.object().shape({
  selectedUser: yup.string().required('Select an user to invite')
})

type FormData = {
  selectedUser: number
}

const CreateInvite = () => {
  const { userId, showSuccessAlert, showErrorAlert } = usePageContext()
  const { getSimpleUsers, createUserInvite } = useUser()

  const [users, setUsers] = React.useState<User[]>()
  const [user, setUser] = React.useState<User>()
  const [selectedUser, setSelectedUser] = React.useState<number | undefined>()

  const userNameRef = React.createRef<HTMLInputElement>()
  const userEmailRef = React.createRef<HTMLInputElement>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  /**
   *
   */
  const handleUserSelect = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const invitedUserId = event.target.value || undefined
      setSelectedUser(invitedUserId ? +invitedUserId : undefined)

      const user = invitedUserId
        ? users?.find((user) => user.id === +invitedUserId)
        : undefined

      setUser(user)
      if (userNameRef.current) userNameRef.current.value = user?.name || ''
      if (userEmailRef.current) userEmailRef.current.value = user?.email || ''
    },
    [userEmailRef, userNameRef, users]
  )

  /**
   *
   */
  const handleConfirm = React.useCallback(async () => {
    try {
      const createUserInviteRequest = {
        user: userId,
        name: user?.name,
        email: user?.email,
        user_invited: selectedUser
      } as CreateUserInviteParams

      await createUserInvite(createUserInviteRequest)
      setSelectedUser(undefined)
      reset()
      showSuccessAlert('Invite created with success')
    } catch (error) {
      const serviceError = error as ServiceError
      showErrorAlert(serviceError.message)
    }
  }, [
    createUserInvite,
    reset,
    selectedUser,
    showErrorAlert,
    showSuccessAlert,
    user?.email,
    user?.name,
    userId
  ])

  /**
   *
   */
  React.useEffect(() => {
    const loadUsers = async () => {
      setUsers(await getSimpleUsers())
    }
    loadUsers()
  }, [getSimpleUsers])

  return (
    <Template title="Invite [Create]" urlBack="/invites">
      <S.Form onSubmit={handleSubmit(handleConfirm)}>
        <Button type="submit" disabled={!selectedUser}>
          <CheckIcon />
          Confirm
        </Button>

        <S.SelectWrapper>
          <S.Select
            onChangeCapture={handleUserSelect}
            value={selectedUser}
            {...register('selectedUser')}
            className={`${errors.selectedUser?.message ? 'error' : ''}`}
          >
            <option value="">Select an user to invite</option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </S.Select>
          <div>{errors.selectedUser?.message || ''}</div>
        </S.SelectWrapper>

        <Input ref={userNameRef} placeholder="Invited User name" readOnly />
        <Input ref={userEmailRef} placeholder="Invited User e-mail" readOnly />
      </S.Form>
    </Template>
  )
}

export default CreateInvite
