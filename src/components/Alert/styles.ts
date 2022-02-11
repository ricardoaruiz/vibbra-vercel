import styled, { css } from 'styled-components'

import { AlertProps } from './types'

type AlertStyledProps = Omit<AlertProps, 'message'>

const alertModifiers = {
  success: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.success};
    `};
  `,
  error: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.danger};
    `};
  `,
  warning: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.warning};
    `};
  `,
  visible: css`
    top: 0;
    opacity: 1;
    visibility: visible;
  `,
  invisible: css`
    top: -20px;
    opacity: 0;
    visibility: hidden;
  `
}

export const Alert = styled.div<AlertStyledProps>`
  ${({ theme, variant, show = false }) => css`
    position: relative;
    color: ${theme.colors.white};
    padding: 1rem 2rem;
    width: 100%;
    border-radius: ${theme.border.radius};
    transition: all 0.3s;

    ${alertModifiers[variant]}
    ${show ? alertModifiers.visible : alertModifiers.invisible};
  `};
`
