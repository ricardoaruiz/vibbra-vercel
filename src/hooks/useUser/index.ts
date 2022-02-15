import React from 'react'

import { useApi } from '../useApi'
import {
  CreateInviteResponse,
  InviteListResponse,
  UpdateInviteResponse
} from 'pages/api/user/[userId]/invite/types'
import {
  MaintainUserInviteParams,
  GetSimpleUsersResult,
  InviteResult,
  UseUser,
  UpdateUserInviteParams
} from './types'
import { GetUsersResponse } from 'pages/api/user/types'

const USER_BASE_URL = '/user'

export const useUser = (): UseUser => {
  const { get, post, put, del } = useApi()

  /**
   *
   */
  const getSimpleUsers = React.useCallback(async (): Promise<
    GetSimpleUsersResult | undefined
  > => {
    const response = await get<GetUsersResponse>(USER_BASE_URL)
    return response?.data
  }, [get])

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

  /**
   *
   */
  const createUserInvite = React.useCallback(
    async (
      params: MaintainUserInviteParams
    ): Promise<InviteResult | undefined> => {
      const response = await post<CreateInviteResponse>(
        `${USER_BASE_URL}/${params.user}/invite`,
        { ...params }
      )
      return response?.data
    },
    [post]
  )

  /**
   *
   */
  const updateUserInvite = React.useCallback(
    async (
      params: UpdateUserInviteParams
    ): Promise<InviteResult | undefined> => {
      const response = await put<UpdateInviteResponse>(
        `${USER_BASE_URL}/${params.user}/invite/${params.originalInvited}`,
        { ...params }
      )
      return response?.data
    },
    [put]
  )

  /**
   *
   */
  const removeUserInvite = React.useCallback(
    async (
      userId: number,
      invitedUserId: number
    ): Promise<void | undefined> => {
      await del(`${USER_BASE_URL}/${userId}/invite/${invitedUserId}`)
      return
    },
    [del]
  )

  return {
    createUserInvite,
    getSimpleUsers,
    getUserInvites,
    updateUserInvite,
    removeUserInvite
  }
}
