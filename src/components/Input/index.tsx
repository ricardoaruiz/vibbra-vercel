import React from 'react'

import { InputProps } from './types'

import * as S from './styles'

const Input: React.VFC<InputProps> = React.forwardRef(
  ({ error, ...rest }, ref: React.Ref<HTMLInputElement>) => (
    <S.Wrapper>
      <S.InternalInput type="text" {...rest} error={error} ref={ref} />
      {error && <S.Error>{error}</S.Error>}
    </S.Wrapper>
  )
)
Input.displayName = 'Input'

export { Input }
