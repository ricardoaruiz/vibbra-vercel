import React from 'react'

import { Button, CheckIcon, ConfirmModal, Input, Template } from 'components'
import useMaintainInviteLogic from './useMaintainInviteLogic'
import { MaintainInviteProps } from './types'

import * as S from './styles'

export const MaintainInviteTemplate: React.VFC<MaintainInviteProps> = ({
  operation = 'create'
}) => {
  const {
    form,
    users,
    selectedUser,
    isConfirmModalOpen,
    userNameRef,
    userEmailRef,
    handleConfirm,
    handleUserSelect,
    handleConfirmClick,
    handleConfirmOperation,
    handleCancelOperation
  } = useMaintainInviteLogic(operation)

  return (
    <Template title={`Invite [${operation}]`} urlBack="/invites">
      <S.Form onSubmit={form.handleSubmit(handleConfirm)}>
        <Button
          type="button"
          onClick={handleConfirmClick}
          disabled={!selectedUser}
        >
          <CheckIcon />
          Confirm
        </Button>

        <S.SelectWrapper>
          <S.Select
            onChangeCapture={handleUserSelect}
            value={selectedUser}
            {...form.register('selectedUser')}
            className={`${
              form.formState.errors.selectedUser?.message ? 'error' : ''
            }`}
          >
            <option value="0">Select an user to invite</option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </S.Select>
          <div>{form.formState.errors.selectedUser?.message || ''}</div>
        </S.SelectWrapper>

        <Input ref={userNameRef} placeholder="Invited User name" readOnly />
        <Input ref={userEmailRef} placeholder="Invited User e-mail" readOnly />
      </S.Form>

      <ConfirmModal
        open={isConfirmModalOpen}
        message={`Do you really want to ${operation} the invite?`}
        onConfirm={handleConfirmOperation}
        onCancel={handleCancelOperation}
      />
    </Template>
  )
}
