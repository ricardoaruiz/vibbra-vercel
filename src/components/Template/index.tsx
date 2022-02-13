import React from 'react'
import { Header } from './components/Header'
import { useRouter } from 'next/router'

import { Alert } from 'components'
import { useToken } from 'hooks'
import { validateJWT } from 'services'
import { usePageContext } from 'context'

import * as S from './styles'

const Template: React.FC = ({ children }) => {
  const { alert, closeAlert } = usePageContext()
  const router = useRouter()
  const { getToken } = useToken()

  const handleCloseMessage = React.useCallback(() => {
    closeAlert()
  }, [closeAlert])

  React.useEffect(() => {
    if (!validateJWT(getToken())) {
      router.push('/')
    }
  }, [getToken, router])

  return (
    <>
      <Header />
      <S.Content>
        <Alert
          message={alert?.message}
          variant={alert?.type}
          show={!!alert?.message}
          onClose={handleCloseMessage}
        />
        {children}
      </S.Content>
    </>
  )
}

export { Template }
