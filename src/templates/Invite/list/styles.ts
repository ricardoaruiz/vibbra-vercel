import styled, { css } from 'styled-components'
import { IconContainer } from 'components/icons/styles'
import { Button } from 'components/Button/styles'

export const List = styled.ul`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    list-style: none;
    margin-top: ${theme.spacings.large};

    ${Button} {
      margin-bottom: 1rem;
      align-self: flex-end;
      padding: 0.5rem 1rem;

      ${IconContainer} {
        color: ${theme.colors.white};
        margin-right: 0.5rem;
      }
    }
  `};
`

export const ListItem = styled.li`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;
    border: 1px solid ${theme.colors.primary};
    border-radius: ${theme.border.radius};
    font-size: ${theme.font.sizes.large};
    font-weight: ${theme.font.bold};
    background-color: ${theme.colors.primary};
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.3);

    & + li {
      margin-top: 1rem;
    }

    &:hover {
      color: ${theme.colors.white};
    }
  `};
`

export const Actions = styled.div`
  ${({ theme }) => css`
    display: flex;

    ${IconContainer} + ${IconContainer} {
      margin-left: 1rem;
    }

    ${IconContainer}:hover {
      color: ${theme.colors.white};
      cursor: pointer;
    }
  `};
`
