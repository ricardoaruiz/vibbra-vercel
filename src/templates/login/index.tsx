import React from 'react'

import { Alert, Button, Input, Logo } from 'components'
import useLoginLogic from './useLoginLogic'

import * as S from './styles'

export const LoginTemplate = () => {
  const {
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
  } = useLoginLogic()

  return (
    <S.Main>
      <S.LeftSide>
        <Logo />
      </S.LeftSide>
      <S.RightSide>
        <S.Form onSubmit={form.handleSubmit(handleSignin)}>
          <h2>Login</h2>

          <Input
            type="text"
            id="login"
            placeholder="Login"
            autoComplete="off"
            value={login}
            {...form.register('login')}
            onInput={(event) => {
              setLogin((event.target as HTMLInputElement).value)
            }}
            error={form.formState.errors.login?.message || userError}
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            autoComplete="off"
            {...form.register('password')}
            error={form.formState.errors.password?.message}
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
