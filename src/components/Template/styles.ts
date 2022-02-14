import styled, { css } from 'styled-components'

export const Content = styled.main`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 2rem 0 2rem;
`

export const Back = styled.div`
  ${({ theme }) => css`
    & a {
      text-decoration: none;
      cursor: pointer;
      font-size: ${theme.font.sizes.medium};
      color: ${theme.colors.black};
      transition: all 0.3s;

      &:hover {
        color: ${theme.colors.secondary};
      }
    }
  `};
`

export const Title = styled.h1`
  ${({ theme }) => css`
    margin-top: 0.5rem;
    font-size: ${theme.font.sizes.xxlarge};
  `};
`
