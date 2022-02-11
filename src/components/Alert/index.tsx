import React from 'react'

import { AlertProps } from './types'

import * as S from './styles'

const Alert: React.VFC<AlertProps> = ({
  message,
  variant = 'success',
  show = false,
  onClose
}) => {
  /**
   *
   */
  React.useEffect(() => {
    if (onClose && show) {
      setTimeout(() => {
        onClose()
      }, 2000)
    }
  }, [onClose, show])

  return (
    <S.Alert variant={variant} show={show}>
      <h1>{message}</h1>
    </S.Alert>
  )
}

const MemoizedAlert = React.memo(Alert)

export { MemoizedAlert as Alert }
