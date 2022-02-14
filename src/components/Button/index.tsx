import React from 'react'

import { ButtonProps } from './types'

import * as S from './styles'

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, ...rest }, ref: React.Ref<HTMLButtonElement>) => (
    <S.Button {...rest} ref={ref}>
      {children}
    </S.Button>
  )
)
Button.displayName = 'Button'

export { Button }
