import styled, { css } from 'styled-components'
import { Button } from 'components/Button/styles'
import { IconContainer } from 'components/icons/styles'

export const Form = styled.form`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-top: 4rem;

    ${Button} {
      align-self: flex-end;
      padding: 0.5rem 1rem;
      color: ${theme.colors.white};
      margin-bottom: 2rem;

      ${IconContainer} {
        color: ${theme.colors.white};
        margin-right: 0.5rem;
      }
    }
  `};
`

export const SelectWrapper = styled.div`
  height: 4rem;
  margin: 0 0 3rem;

  & > div {
    color: red;
  }
`

export const Select = styled.select`
  ${({ theme }) => css`
    border: 1px solid ${theme.colors.gray};
    border-radius: 0.5rem;
    padding: 1rem 0.5rem;
    outline: none;
    font-size: ${theme.font.sizes.medium};
    width: 100%;
    margin-bottom: 0.5rem;
    background-color: transparent;
    font-size: ${theme.font.sizes.large};

    & option {
      font-size: ${theme.font.sizes.large};
      padding: 1rem 0;
    }

    &::placeholder {
      color: ${theme.colors.gray};
    }

    &.error {
      border: 1px solid ${theme.colors.danger};
    }
  `};
`
