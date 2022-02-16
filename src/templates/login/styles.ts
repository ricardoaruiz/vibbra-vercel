import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { Button } from 'components/Button/styles'
import { Alert } from 'components/Alert/styles'

import { LogoContainer } from 'components/Logo/styles'

export const Main = styled.main`
  display: flex;
  flex-direction: column;

  ${media.greaterThan('medium')`
    flex-direction: row;
    height: 100vh;
    width: 100%;
  `}
`

export const LeftSide = styled.section`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10rem 0 5rem 0;

    & img {
      width: 20rem;
    }

    ${LogoContainer} {
      width: 20rem;
      color: ${theme.colors.primary};

      ${media.greaterThan('medium')`
        width: 30rem;
        color: ${theme.colors.white};
      `}
    }

    ${media.greaterThan('medium')`
      flex: 1;
      background-color: ${theme.colors.primary};
      margin: 0;
    `}
  `};
`

export const RightSide = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 1rem;
`

export const Form = styled.form`
  ${({ theme }) => css`
    width: 100%;
    min-height: 330px;
    max-width: 35rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    & h2 {
      text-align: center;
      margin-bottom: 2rem;
      font-size: 3rem;
      color: ${theme.colors.primary};
    }

    ${Button}:first-of-type {
      margin-top: 1rem;
    }

    ${Button} + ${Button} {
      margin-top: 1rem;
    }

    ${Alert} {
      margin-top: 2rem;
    }
  `};
`
