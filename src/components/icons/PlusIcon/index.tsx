import React from 'react'

import { IconProps } from '../types'

import * as S from '../styles'

const PlusIcon: React.VFC<IconProps> = ({
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
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </S.IconContainer>
  )
}

export { PlusIcon }
