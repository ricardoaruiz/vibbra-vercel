import React from 'react'

import { ButtonProps } from './types'

import * as S from './styles'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...rest }, ref) => (
    <S.Button {...rest} ref={ref}>
      {children}
    </S.Button>
  )
)
Button.displayName = 'Button'

export { Button }
