import styled, { css } from 'styled-components'
import { darken, lighten } from 'polished'

export const Button = styled.button`
  ${({ theme }) => css`
    border: none;
    border-radius: 0.5rem;
    padding: 1rem 0.5rem;
    outline: none;
    background-color: ${theme.colors.primary};
    color: ${theme.colors.white};
    font-size: 1.625rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: ${darken(0.15, theme.colors.primary)};
    }
    &:active {
      background-color: ${darken(0.3, theme.colors.primary)};
    }
    &:disabled {
      background-color: ${lighten(0.15, theme.colors.primary)};
      cursor: default;
      pointer-events: none;
    }
  `};
`