import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Header } from './components/Header'
import { Alert, Loading } from 'components'
import { useToken } from 'hooks'
import { validateJWT } from 'services'
import { usePageContext } from 'context'
import { TemplateProps } from './types'

import * as S from './styles'

const Template: React.FC<TemplateProps> = ({ children, urlBack, title }) => {
  const { alert, hideAlert, isLoading } = usePageContext()
  const router = useRouter()
  const { getToken } = useToken()

  const handleCloseMessage = React.useCallback(() => {
    hideAlert()
  }, [hideAlert])

  React.useEffect(() => {
    if (!validateJWT(getToken())) {
      router.push('/')
    }
  }, [getToken, router])

  return (
    <>
      <Header />

      <S.Content>
        <S.Back style={{ visibility: urlBack ? 'visible' : 'hidden' }}>
          <Link href={urlBack || '/'}>
            <a>{`< Voltar`}</a>
          </Link>
        </S.Back>

        <S.Title style={{ visibility: title ? 'visible' : 'hidden' }}>
          {title}
        </S.Title>

        {children}
      </S.Content>

      <Alert
        message={alert?.message}
        variant={alert?.type}
        show={!!alert?.message}
        onClose={handleCloseMessage}
      />

      <Loading isShow={isLoading} />
    </>
  )
}

export { Template }
