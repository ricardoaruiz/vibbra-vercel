import React from 'react'

import * as S from '../styles'
import { IconProps } from '../types'

const ExitIcon: React.VFC<IconProps> = ({
  size = '2.4rem',
  color,
  ...rest
}) => {
  return (
    <S.IconContainer size={size} color={color} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
    </S.IconContainer>
  )
}

export { ExitIcon }
