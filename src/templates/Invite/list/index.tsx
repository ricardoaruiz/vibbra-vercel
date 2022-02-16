import React from 'react'
import Link from 'next/link'

import {
  ConfirmModal,
  PlusIcon,
  Template,
  EditIcon,
  TrashIcon,
  Button
} from 'components'
import {} from 'components'

import useListInviteLogic from './useListInviteLogic'

import * as S from './styles'

export const InviteListTemplate: React.VFC = () => {
  const {
    invites,
    isOpenDeleteModal,
    handleDeleteClick,
    handleEditClick,
    handleConfirmDeleteClick,
    handleCancelDeleteClick
  } = useListInviteLogic()

  return (
    <Template title="My Invites">
      <S.List>
        <Link href="/invites/create" passHref>
          <Button>
            <PlusIcon />
            Create
          </Button>
        </Link>

        {invites.map((item) => (
          <S.ListItem key={`${item.invite.user}_${item.invite.user_invited}`}>
            {item.invite.name}
            <S.Actions>
              <EditIcon
                onClick={() => handleEditClick(item.invite.user_invited)}
              />
              <TrashIcon onClick={() => handleDeleteClick(item)} />
            </S.Actions>
          </S.ListItem>
        ))}
      </S.List>

      <ConfirmModal
        open={isOpenDeleteModal}
        message="Do you really want to remove the invite?"
        onConfirm={handleConfirmDeleteClick}
        onCancel={handleCancelDeleteClick}
      />
    </Template>
  )
}
