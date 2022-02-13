import { Story, Meta } from '@storybook/react'
import { Alert } from '.'

export default {
  title: 'Alert',
  component: Alert
} as Meta

export const Default: Story = () => <Alert message="Teste" />
