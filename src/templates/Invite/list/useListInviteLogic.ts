import React from 'react'
import { useRouter } from 'next/router'

import { ServiceError, useUser } from 'hooks'
import { InviteResult } from 'hooks/useUser/types'
import { usePageContext } from 'context'

import { UseListInvite } from './types'

const useListInviteLogic = (): UseListInvite => {
  const router = useRouter()
  const { userId, showErrorAlert, showLoading, hideLoading } = usePageContext()
  const { getUserInvites, removeUserInvite } = useUser()
  const [invites, setInvites] = React.useState<InviteResult[]>([])
  const [isOpenDeleteModal, setIsOpenDeleteModal] = React.useState(false)
  const [selectedInvite, setSelectedInvite] = React.useState<InviteResult>()

  /**
   *
   */
  const handleDeleteClick = React.useCallback((item: InviteResult) => {
    setSelectedInvite(item)
    setIsOpenDeleteModal(true)
  }, [])

  /**
   *
   */
  const handleEditClick = React.useCallback(
    (invitedUserId: number) => {
      router.push(`/invites/${invitedUserId}/update`)
    },
    [router]
  )

  /**
   *
   */
  const handleConfirmDeleteClick = React.useCallback(async () => {
    try {
      showLoading()
      selectedInvite &&
        (await removeUserInvite(userId, selectedInvite.invite.user_invited))

      setInvites((state) =>
        state.filter(
          (item) =>
            item.invite.user_invited != selectedInvite?.invite.user_invited
        )
      )

      setSelectedInvite(undefined)
      setIsOpenDeleteModal(false)
    } catch (error) {
      const serviceError = error as ServiceError
      showErrorAlert(serviceError.statusText)
    } finally {
      hideLoading()
    }
  }, [
    hideLoading,
    removeUserInvite,
    selectedInvite,
    showErrorAlert,
    showLoading,
    userId
  ])

  /**
   *
   */
  const handleCancelDeleteClick = React.useCallback(() => {
    setSelectedInvite(undefined)
    setIsOpenDeleteModal(false)
  }, [])

  /**
   *
   */
  React.useEffect(() => {
    const loadInvites = async () => {
      try {
        showLoading()
        const invites = await getUserInvites(userId)
        setInvites(invites || [])
      } catch (error) {
        const serviceError = error as ServiceError
        showErrorAlert(serviceError.statusText)
      } finally {
        hideLoading()
      }
    }
    if (userId) {
      loadInvites()
    }
  }, [getUserInvites, hideLoading, showErrorAlert, showLoading, userId])

  return {
    invites,
    isOpenDeleteModal,
    handleDeleteClick,
    handleEditClick,
    handleConfirmDeleteClick,
    handleCancelDeleteClick
  }
}

export default useListInviteLogic
