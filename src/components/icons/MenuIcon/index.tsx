import React from 'react'

import * as S from '../styles'
import { IconProps } from '../types'

const MenuIcon: React.VFC<IconProps> = ({
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
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </S.IconContainer>
  )
}

export { MenuIcon }
