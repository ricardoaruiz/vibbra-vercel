import React from 'react'
import { Header } from './components/Header'
import { useRouter } from 'next/router'

import { useCookie } from 'hooks'
import { validateJWT } from 'services'

import * as S from './styles'

const Template: React.FC = ({ children }) => {
  const router = useRouter()
  const { getToken } = useCookie()

  React.useEffect(() => {
    if (!validateJWT(getToken())) {
      router.push('/')
    }
  }, [getToken, router])

  return (
    <>
      <Header />
      <S.Content>{children}</S.Content>
    </>
  )
}

export { Template }
