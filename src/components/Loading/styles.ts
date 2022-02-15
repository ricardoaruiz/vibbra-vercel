import styled, { css } from 'styled-components'

import { IconContainer } from 'components/icons/styles'
import { LoadingProps } from './types'

export const LoadingWrapper = styled.main<LoadingProps>`
  ${({ theme, isShow }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);

    display: ${isShow ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;

    & ${IconContainer} {
      width: 8rem;
      color: ${theme.colors.primary};
    }
  `};
`
