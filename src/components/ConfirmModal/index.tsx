import React from 'react'

import { ConfirmModalProps } from './types'

import * as S from './styles'
import { Button } from 'components/Button/styles'

const ConfirmModal: React.VFC<ConfirmModalProps> = ({
  open = false,
  message,
  onConfirm,
  onCancel
}) => (
  <>
    <S.ConfirmModalOverlay open={open}>
      <S.ConfirmModalWindow open={open}>
        <S.Message>{message}</S.Message>

        <S.Actions>
          <Button onClick={onConfirm}>Yes</Button>
          <Button onClick={onCancel}>No</Button>
        </S.Actions>
      </S.ConfirmModalWindow>
    </S.ConfirmModalOverlay>
  </>
)

export { ConfirmModal }
