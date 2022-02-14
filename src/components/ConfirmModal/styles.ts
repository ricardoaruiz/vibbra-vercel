import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { Button } from 'components/Button/styles'
import { ConfirmModalProps } from './types'

type ConfirmModalOverlayProps = Pick<ConfirmModalProps, 'open'>

const confirmModalOverlayModifiers = {
  open: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  close: css`
    display: none;
  `
}

export const ConfirmModalOverlay = styled.div<ConfirmModalOverlayProps>`
  ${({ open = false }) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);

    ${open
      ? confirmModalOverlayModifiers.open
      : confirmModalOverlayModifiers.close}
  `};
`

export const ConfirmModalWindow = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: absolute;
    bottom: 0;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    background-color: ${theme.colors.white};
    width: 100%;
    min-height: 15rem;
    box-shadow: 2px 4px 5px rgba(0, 0, 0, 0.4);

    ${media.greaterThan('medium')`
      position: relative;
      border-radius: ${theme.border.radius};
      max-width: 50rem;
    `}
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
