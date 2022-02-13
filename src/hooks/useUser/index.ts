import React from 'react'

import { useApi } from '../useApi'
import { InviteListResponse } from 'pages/api/user/[userId]/invite/types'
import { InviteResult, UseUser } from './types'

const USER_BASE_URL = '/user'

export const useUser = (): UseUser => {
  const { get } = useApi()

  /**
   *
   */
  const getUserInvites = React.useCallback(
    async (userId: number): Promise<InviteResult[] | undefined> => {
      const response = await get<InviteListResponse>(
        `${USER_BASE_URL}/${userId}/invite`
      )
      return response?.data
    },
    [get]
  )

  return { getUserInvites }
}
