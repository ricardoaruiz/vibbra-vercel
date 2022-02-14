import React from 'react'

import { InputProps } from './types'

import * as S from './styles'

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, ...rest }, ref) => (
    <S.Wrapper>
      <S.InternalInput type="text" {...rest} error={error} ref={ref} />
      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
)
Input.displayName = 'Input'

export { Input }
