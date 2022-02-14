import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { LogoContainer } from 'components/Logo/styles'
import { IconContainer } from 'components/icons/styles'

export const HeaderContainer = styled.header`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: ${theme.colors.primary};
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);

    ${LogoContainer} {
      width: 10rem;
      color: ${theme.colors.white};

      ${media.greaterThan('medium')`
      width: 12rem;
      `}
    }

    ${IconContainer}.menu_icon {
      ${({ theme }) => css`
        display: block;
        width: 4.5rem;
        color: ${theme.colors.white};
        cursor: pointer;

        ${media.greaterThan('medium')`
          display: none;
        `}
      `};
    }
  `};
`

const mobileNavMofiers = {
  opened: css`
    left: 0;
  `,
  closed: css`
    left: -70rem;
  `
}

export const MobileNav = styled.nav<{ isOpened?: boolean }>`
  ${({ theme, isOpened = false }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    position: fixed;
    top: 9rem;
    width: 80%;
    height: 100vh;
    background-color: ${theme.colors.primary};
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;

    ${isOpened ? mobileNavMofiers.opened : mobileNavMofiers.closed};

    ${media.greaterThan('medium')`
      display: none;
    `}
  `};
`

export const DesktopNav = styled.nav`
  display: none;

  ${media.greaterThan('medium')`
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: flex-end;
      align-self: stretch;
    `}
`

export const LoggedUser = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.white};
    margin: 5rem 0 0;

    ${media.greaterThan('medium')`
      margin: 0 0 auto;
      font-size: ${theme.font.sizes.medium};
    `}
  `};
`

export const Menu = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;

  ${media.greaterThan('medium')`
    flex-direction: row;
    margin-top: 0;
  `}
`

export const MenuItem = styled.li`
  ${({ theme }) => css`
    margin-bottom: 2rem;

    & a {
      text-decoration: none;
      font-size: ${theme.font.sizes.xlarge};
      color: ${theme.colors.white};
      transition: all 0.3s;
      margin-right: 1.5rem;
      padding: 1rem;
      cursor: pointer;

      &:hover {
        color: ${theme.colors.secondary};
      }
    }

    ${IconContainer}.menu_exit {
      color: ${theme.colors.white};
      width: 3rem;
      cursor: pointer;

      &:hover {
        color: ${theme.colors.secondary};
      }
    }

    ${media.greaterThan('medium')`
      margin-bottom: unset;
    `}
  `};
`
