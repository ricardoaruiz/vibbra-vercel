import React from 'react'

import { Template } from 'components'
import { ServiceError, useUser } from 'hooks'
import { InviteResult } from 'hooks/useUser/types'
import { usePageContext } from 'context'

const Invites = () => {
  const { userId, showErrorAlert } = usePageContext()
  const { getUserInvites } = useUser()
  const [invites, setInvites] = React.useState<InviteResult[]>([])

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
    loadInvites()
  }, [getUserInvites, showErrorAlert, userId])

  return (
    <Template>
      <ul>
        {invites.map((item, index) => (
          <li key={index}>{item.invite.name}</li>
        ))}
      </ul>
    </Template>
  )
}

export default Invites
