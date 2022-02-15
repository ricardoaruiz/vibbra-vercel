import { Story, Meta } from '@storybook/react'
import { ConfirmModal } from '.'

export default {
  title: 'ConfirmModal',
  component: ConfirmModal
} as Meta

export const Default: Story = () => (
  <ConfirmModal
    message={''}
    onConfirm={function (): void {
      throw new Error('Function not implemented.')
    }}
    onCancel={function (): void {
      throw new Error('Function not implemented.')
    }}
  />
)
