import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { Button } from 'components/Button/styles'
import { ConfirmModalProps } from './types'

type ConfirmModalOverlayProps = Pick<ConfirmModalProps, 'open'>

const confirmModalOverlayModifiers = {
  open: css`
    visibility: visible;
    opacity: 1;
    pointer-events: all;
  `,
  close: css`
    visibility: hidden;
    opacity: 0;
    pointer-events: none;
  `
}

export const ConfirmModalOverlay = styled.div<ConfirmModalOverlayProps>`
  ${({ open = false }) => css`
    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;

    ${open
      ? confirmModalOverlayModifiers.open
      : confirmModalOverlayModifiers.close}
  `};
`

type ConfirmModalWindowProps = Pick<ConfirmModalProps, 'open'>

const confirmModalWindowModifiers = {
  open: css`
    bottom: 0px;
  `,
  close: css`
    bottom: -500px;

    ${media.greaterThan('medium')`
      bottom: 500px;
    `}
  `
}

export const ConfirmModalWindow = styled.div<ConfirmModalWindowProps>`
  ${({ theme, open = false }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    background-color: ${theme.colors.white};
    width: 100%;
    min-height: 15rem;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.4);
    transition: all 0.3s ease-in-out;

    ${media.greaterThan('medium')`
      position: relative;
      border-radius: ${theme.border.radius};
      max-width: 50rem;
    `}

    ${open
      ? confirmModalWindowModifiers.open
      : confirmModalWindowModifiers.close}
  `};
`
export const Message = styled.p`
  ${({ theme }) => css`
    margin-top: 5rem;
    font-size: ${theme.font.sizes.large};
  `};
`

export const Actions = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 2rem;

  position: absolute;
  bottom: 0;

  ${Button} {
    width: 10rem;
  }

  ${Button} + ${Button} {
    margin-left: 1rem;
  }
`
