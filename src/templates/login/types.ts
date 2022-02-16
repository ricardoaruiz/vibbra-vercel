import { UseFormReturn } from 'react-hook-form'

export type UseLoginLogic = {
  form: UseFormReturn<LoginFormData, object>
  login: string
  userError: string
  setLogin: React.Dispatch<React.SetStateAction<string>>
  loginError: string
  isLogging: boolean
  isLoggingSSO: boolean

  handleSignin: (data: LoginFormData) => Promise<void>
  handleSigninSSO: () => Promise<void>
  handleCloseError: () => void
}

export type LoginFormData = {
  login: string
  password: string
}
