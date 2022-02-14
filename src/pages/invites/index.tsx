import React from 'react'

import { ConfirmModal, PlusIcon, Template } from 'components'
import { ServiceError, useUser } from 'hooks'
import { InviteResult } from 'hooks/useUser/types'
import { usePageContext } from 'context'
import { EditIcon, TrashIcon, Button } from 'components'

import * as S from '../../styles/invites'
import Link from 'next/link'

const Invites = () => {
  const { userId, showErrorAlert } = usePageContext()
  const { getUserInvites } = useUser()
  const [invites, setInvites] = React.useState<InviteResult[]>([])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false)

  const handleConfirmDelete = React.useCallback(() => {
    setIsOpenDeleteModal(false)
  }, [])

  React.useEffect(() => {
    const loadInvites = async () => {
      try {
        const invites = await getUserInvites(userId)
        setInvites(invites || [])
      } catch (error) {
        const serviceError = error as ServiceError
        showErrorAlert(serviceError.statusText)
      }
    }
    if (userId) {
      loadInvites()
    }
  }, [getUserInvites, showErrorAlert, userId])

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
              <EditIcon />
              <TrashIcon
                onClick={() => {
                  setIsOpenDeleteModal(true)
                }}
              />
            </S.Actions>
          </S.ListItem>
        ))}
      </S.List>

      <ConfirmModal
        open={isOpenDeleteModal}
        message="Do you really want to remove the invite?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsOpenDeleteModal(false)}
      />
    </Template>
  )
}

export default Invites
