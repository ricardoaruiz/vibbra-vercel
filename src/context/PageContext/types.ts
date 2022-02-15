import { AlertVariant } from 'components/Alert/types'

export type PageContextProviderType = {
  userId: number
  userName: string
  logoff: () => void

  showSuccessAlert: (message: string) => void
  showWarningAlert: (message: string) => void
  showErrorAlert: (message: string) => void
  hideAlert: () => void
  alert: Alert | null

  isLoading: boolean
  showLoading: () => void
  hideLoading: () => void
}

export type Alert = {
  message: string
  type: AlertVariant
}
