import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Alert, Button, Input, Logo } from 'components'
import { useAuth, ServiceError, useLocalStorage } from 'service'
import { AuthenticationResult } from 'service/useAuth/type'

// Constante error messages from page
const ERROR_MESSAGES = {
  login: {
    required: 'Login is required'
  },
  password: {
    minLength: 'Password must be at least 4 characters long'
  },
  generic: {
    review: 'Review this information',
    invalidCredential: 'Incorrect user or password',
    invalidaAppToken: 'Incorrect user or app token'
  }
}

const schema = yup.object().shape({
  login: yup.string().required(ERROR_MESSAGES.login.required),
  password: yup.string().min(4, ERROR_MESSAGES.password.minLength)
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
  const [isLogging, setIsLogging] = React.useState(false)
  const [isLoggingSSO, setIsLoggingSSO] = React.useState(false)
  const [loginError, setLoginError] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  /**
   * Handle login successfuly
   */
  const handleLoginSuccess = React.useCallback(
    (response: AuthenticationResult | undefined) => {
      setToken(response?.token)
      setLogin('')
      reset()

      router.push('/home')
    },
    [reset, router, setToken]
  )

  /**
   * Handle login error
   */
  const handleLoginError = React.useCallback(
    (error: unknown, isSSO = false) => {
      const serviceError = error as ServiceError
      if (+serviceError.status === 401) {
        setError('login', { message: ERROR_MESSAGES.generic.review })
        !isSSO &&
          setError('password', { message: ERROR_MESSAGES.generic.review })
        setLoginError(
          !isSSO
            ? ERROR_MESSAGES.generic.invalidCredential
            : ERROR_MESSAGES.generic.invalidaAppToken
        )
        return
      }
      setLoginError(serviceError.statusText)
    },
    [setError]
  )

  /**
   * Signin with user and password
   */
  const handleSignin = React.useCallback(
    async (data: FormData) => {
      try {
        setIsLogging(true)
        const { login, password } = data
        const response = await signin(login, password)
        handleLoginSuccess(response)
      } catch (error) {
        handleLoginError(error)
      } finally {
        setIsLogging(false)
      }
    },
    [handleLoginError, handleLoginSuccess, signin]
  )

  /**
   * SSO signin
   */
  const handleSigninSSO = React.useCallback(async () => {
    try {
      reset()

      if (!login) {
        setUserError(ERROR_MESSAGES.login.required)
        return
      }

      setIsLoggingSSO(true)
      const response = await signinSSO(login, `${login}AppToken1`)
      handleLoginSuccess(response)
    } catch (error) {
      handleLoginError(error, true)
    } finally {
      setIsLoggingSSO(false)
    }
  }, [reset, login, signinSSO, handleLoginSuccess, handleLoginError])

  /**
   *
   */
  const handleCloseError = React.useCallback(() => {
    setLoginError('')
  }, [])

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
            placeholder="Login"
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

          <Button disabled={!!loginError || isLogging || isLoggingSSO}>
            {isLogging ? 'Signin...' : 'Signin'}
          </Button>

          <Button
            type="button"
            onClick={handleSigninSSO}
            disabled={!!loginError || isLogging || isLoggingSSO}
          >
            {isLoggingSSO ? 'Signin with SSO...' : 'Signin with SSO'}
          </Button>

          <Alert
            message={loginError}
            variant="error"
            show={!!loginError}
            onClose={handleCloseError}
          />
        </S.Form>
      </S.RightSide>
    </S.Main>
  )
}
