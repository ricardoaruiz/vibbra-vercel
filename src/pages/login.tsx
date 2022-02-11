import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { Button } from 'components/Button'
import { Input } from 'components/Input'
import { Logo } from 'components/Logo'

const schema = yup.object().shape({
  user: yup.string().required('User is required'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters long')
    .required('This field is required')
})

type FormData = {
  user: string
  password: string
}

import * as S from '../styles/login'

export default function Login() {
  const [user, setUser] = React.useState('')
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
   * Signin with user and password
   */
  const signin = React.useCallback(
    (data: FormData) => {
      // TODO fazer o login
      console.log('vai fazer o login com:', { data })

      setUser('')
      reset()
    },
    [reset]
  )

  /**
   * SSO signin
   */
  const signinSSO = React.useCallback(() => {
    if (!user) {
      setUserError('User is required')
      return
    }

    // TODO fazer o login SSO
    console.log(`vai fazer o login com: ${user} e ${user}AppToken1`)

    setUser('')
    reset()
  }, [reset, user])

  React.useEffect(() => {
    user && setUserError('')
  }, [user])

  return (
    <S.Main>
      <S.LeftSide>
        <Logo />
      </S.LeftSide>
      <S.RightSide>
        <S.Form onSubmit={handleSubmit(signin)}>
          <h2>Login</h2>

          <Input
            type="text"
            id="user"
            placeholder="User"
            value={user}
            {...register('user')}
            onInput={(event) => {
              setUser((event.target as HTMLInputElement).value)
            }}
            error={errors.user?.message || userError}
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button>Signin</Button>

          <Button type="button" onClick={signinSSO}>
            Signin with SSO
          </Button>
        </S.Form>
      </S.RightSide>
    </S.Main>
  )
}
