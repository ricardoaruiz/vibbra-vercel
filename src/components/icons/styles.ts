import styled, { css } from 'styled-components'
import { IconProps } from './types'

export const IconContainer = styled.div<IconProps>`
  ${({ theme, size = '2.4rem', color }) => css`
    width: ${size};
    color: ${color || theme.colors.black};
  `};
`
