import styled, { css } from 'styled-components'
import { InputProps } from './types'

export const Wrapper = styled.main`
  height: 60px;
`

type InternalInputProps = Pick<InputProps, 'error'>

export const InternalInput = styled.input<InternalInputProps>`
  ${({ theme, error }) => css`
    border: 1px solid ${error ? theme.colors.danger : theme.colors.gray};
    border-radius: 0.5rem;
    padding: 1rem 0.5rem;
    outline: none;
    font-size: ${theme.font.sizes.medium};
    width: 100%;
    margin-bottom: 0.5rem;

    &::placeholder {
      color: ${error ? theme.colors.danger : theme.colors.gray};
    }

    &:focus {
      border: 1px solid ${theme.colors.secondary};
    }
  `};
`
export const Error = styled.small`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxsmall};
    color: ${theme.colors.danger};
  `};
`
