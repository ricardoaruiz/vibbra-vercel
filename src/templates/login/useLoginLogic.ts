import React from 'react'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { useAuth, ServiceError } from 'hooks'
import { LoginFormData, UseLoginLogic } from './types'
import { ERROR_MESSAGES } from './constants'

const schema = yup.object().shape({
  login: yup.string().required(ERROR_MESSAGES.login.required),
  password: yup.string().min(4, ERROR_MESSAGES.password.minLength)
})

const useLoginLogic = (): UseLoginLogic => {
  const router = useRouter()
  const { signin, signinSSO } = useAuth()

  const [login, setLogin] = React.useState('')
  const [userError, setUserError] = React.useState('')
  const [isLogging, setIsLogging] = React.useState(false)
  const [isLoggingSSO, setIsLoggingSSO] = React.useState(false)
  const [loginError, setLoginError] = React.useState('')

  const form = useForm<LoginFormData>({
    resolver: yupResolver(schema)
  })

  /**
   * Handle login successfuly
   */
  const handleLoginSuccess = React.useCallback(() => {
    setLogin('')
    form.reset()

    router.push('/')
  }, [form, router])

  /**
   * Handle login error
   */
  const handleLoginError = React.useCallback(
    (error: unknown, isSSO = false) => {
      const serviceError = error as ServiceError
      if (+serviceError.status === 401) {
        form.setError('login', { message: ERROR_MESSAGES.generic.review })
        !isSSO &&
          form.setError('password', { message: ERROR_MESSAGES.generic.review })
        setLoginError(
          !isSSO
            ? ERROR_MESSAGES.generic.invalidCredential
            : ERROR_MESSAGES.generic.invalidaAppToken
        )
        return
      }
      setLoginError(serviceError.statusText)
    },
    [form]
  )

  /**
   * Signin with user and password
   */
  const handleSignin = React.useCallback(
    async (data: LoginFormData) => {
      try {
        setIsLogging(true)
        const { login, password } = data
        await signin(login, password)
        handleLoginSuccess()
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
      form.reset()

      if (!login) {
        setUserError(ERROR_MESSAGES.login.required)
        return
      }

      setIsLoggingSSO(true)
      await signinSSO(login, `${login}AppToken1`)
      handleLoginSuccess()
    } catch (error) {
      handleLoginError(error, true)
    } finally {
      setIsLoggingSSO(false)
    }
  }, [form, login, signinSSO, handleLoginSuccess, handleLoginError])

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

  return {
    form,
    login,
    userError,
    setLogin,
    loginError,
    isLogging,
    isLoggingSSO,
    handleSignin,
    handleSigninSSO,
    handleCloseError
  }
}

export default useLoginLogic
