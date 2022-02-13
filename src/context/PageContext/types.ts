import { AlertVariant } from 'components/Alert/types'

export type PageContextProviderType = {
  userId: number
  logoff: () => void

  setSuccessAlert: (message: string) => void
  setWarningAlert: (message: string) => void
  setErrorAlert: (message: string) => void
  closeAlert: () => void
  alert: Alert | null
}

export type Alert = {
  message: string
  type: AlertVariant
}
