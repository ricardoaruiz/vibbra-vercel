import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button, Input, Logo } from 'components'
import { useAuth, ServiceError, useLocalStorage } from 'service'
import { AuthenticationResponse } from './api/authenticate/types'

const schema = yup.object().shape({
  login: yup.string().required('User is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .required('This field is required')
})

type FormData = {
  login: string
  password: string
}

import * as S from '../styles/login'

export default function Login() {
  const router = useRouter()
  const { signin, signinSSO } = useAuth()
  const { setToken } = useLocalStorage()
  const [login, setLogin] = React.useState('')
  const [userError, setUserError] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  /**
   * Handle login successfuly
   */
  const handleLoginSuccess = React.useCallback(
    (response: AuthenticationResponse | undefined) => {
      setToken(response?.token)
      setLogin('')
      reset()

      router.push('/home')
    },
    [reset, router, setToken]
  )

  /**
   * Signin with user and password
   */
  const handleSignin = React.useCallback(
    async (data: FormData) => {
      try {
        const { login, password } = data
        const response = await signin(login, password)
        handleLoginSuccess(response)
      } catch (error) {
        // TODO tratar o erro
        const serviceError = error as ServiceError
        console.log('deu erro', serviceError)
      }
    },
    [handleLoginSuccess, signin]
  )

  /**
   * SSO signin
   */
  const handleSigninSSO = React.useCallback(async () => {
    try {
      if (!login) {
        setUserError('User is required')
        return
      }

      // Passando o app_token fixo
      const response = await signinSSO(login, `${login}AppToken1`)
      handleLoginSuccess(response)
    } catch (error) {
      // TODO tratar o erro
      const serviceError = error as ServiceError
      console.log('deu erro', serviceError)
    }
  }, [login, signinSSO, handleLoginSuccess])

  /**
   *
   */
  React.useEffect(() => {
    login && setUserError('')
  }, [login])

  return (
    <S.Main>
      <S.LeftSide>
        <Logo />
      </S.LeftSide>
      <S.RightSide>
        <S.Form onSubmit={handleSubmit(handleSignin)}>
          <h2>Login</h2>

          <Input
            type="text"
            id="login"
            placeholder="User"
            value={login}
            {...register('login')}
            onInput={(event) => {
              setLogin((event.target as HTMLInputElement).value)
            }}
            error={errors.login?.message || userError}
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button>Signin</Button>

          <Button type="button" onClick={handleSigninSSO}>
            Signin with SSO
          </Button>
        </S.Form>
      </S.RightSide>
    </S.Main>
  )
}
