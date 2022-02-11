export type AlertProps = {
  message: string
  variant?: AlertVariant
  show?: boolean
  onClose?: () => void
}

export type AlertVariant = 'error' | 'success' | 'warning'
