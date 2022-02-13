import React from 'react'
import { createContext, useContext } from 'react'

import { PageContextProviderType, Alert } from './types'
import { AlertVariant } from 'components/Alert/types'
import { useAuth, useToken } from 'hooks'

const PageContext = createContext({} as PageContextProviderType)
PageContext.displayName = 'PageContext'

/**
 * PageContext
 * @param param0
 * @returns
 */
const PageContextProvider: React.FC = ({ children }) => {
  const { getUserIdFromToken } = useToken()
  const { signout } = useAuth()

  const [userId, setUserId] = React.useState<number>(0)
  const [message, setMessage] = React.useState('')
  const [messageType, setMessageType] = React.useState<AlertVariant>('success')

  const logoff = React.useCallback(() => {
    setUserId(0)
    signout()
  }, [signout])

  const setSuccessAlert = React.useCallback((message: string) => {
    setMessage(message)
    setMessageType('success')
  }, [])

  const setWarningAlert = React.useCallback((message: string) => {
    setMessage(message)
    setMessageType('warning')
  }, [])

  const setErrorAlert = React.useCallback((message: string) => {
    setMessage(message)
    setMessageType('error')
  }, [])

  const closeAlert = React.useCallback(() => {
    setMessage('')
    setMessageType('success')
  }, [])

  const alert = React.useMemo(
    () =>
      message
        ? ({
            message: message,
            type: messageType
          } as Alert)
        : null,
    [message, messageType]
  )

  React.useEffect(() => {
    const userId = getUserIdFromToken()
    !userId ? signout() : setUserId(userId)
  }, [getUserIdFromToken, signout])

  const contextValues = {
    userId,
    logoff,
    setSuccessAlert,
    setWarningAlert,
    setErrorAlert,
    closeAlert,
    alert
  }

  return (
    <PageContext.Provider value={contextValues}>
      {children}
    </PageContext.Provider>
  )
}

/**
 * Hook to use PageContext
 * @returns
 */
const usePageContext = () => {
  const context = useContext(PageContext)

  return context
}

export { PageContextProvider, usePageContext }
