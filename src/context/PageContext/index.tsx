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
  const { getUserIdFromToken, getUserNameFromToken } = useToken()
  const { signout } = useAuth()

  const [userId, setUserId] = React.useState<number>(0)
  const [userName, setUserName] = React.useState<string>('')
  const [message, setMessage] = React.useState('')
  const [messageType, setMessageType] = React.useState<AlertVariant>('success')

  const logoff = React.useCallback(() => {
    setUserId(0)
    signout()
  }, [signout])

  const showSuccessAlert = React.useCallback((message: string) => {
    setMessage(message)
    setMessageType('success')
  }, [])

  const showWarningAlert = React.useCallback((message: string) => {
    setMessage(message)
    setMessageType('warning')
  }, [])

  const showErrorAlert = React.useCallback((message: string) => {
    setMessage(message)
    setMessageType('error')
  }, [])

  const hideAlert = React.useCallback(() => {
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
    const userName = getUserNameFromToken()
    if (!userId) {
      signout()
    } else {
      setUserId(userId)
      setUserName(userName)
    }
  }, [getUserIdFromToken, getUserNameFromToken, signout])

  const contextValues = {
    userId,
    userName,
    logoff,
    showSuccessAlert,
    showWarningAlert,
    showErrorAlert,
    hideAlert,
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
