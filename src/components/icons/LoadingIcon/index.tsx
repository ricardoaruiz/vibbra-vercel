import React from 'react'

import { IconProps } from '../types'

import * as S from '../styles'

const LoadIcon: React.VFC<IconProps> = ({
  size = '2.4rem',
  color,
  ...rest
}) => {
  return (
    <S.IconContainer size={size} color={color} {...rest}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <g>
          <path
            d="M50 25A25 25 0 1 0 74.30924800994191 44.16386590360238"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
          ></path>
          <path d="M49 15L49 35L59 25L49 15" fill="currentColor"></path>
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1.0204081632653061s"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
          ></animateTransform>
        </g>
      </svg>
    </S.IconContainer>
  )
}

export { LoadIcon }
