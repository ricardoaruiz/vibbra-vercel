import React from 'react'
import { useRouter } from 'next/router'

import MaintainInvite from 'templates/Invite/maintain'

const UpdateInvite = () => {
  const router = useRouter()

  const { invitedUserId } = router.query
  const invitedUser = invitedUserId ? +invitedUserId : 0

  return <MaintainInvite operation="update" invitedUserId={invitedUser} />
}

export default UpdateInvite
