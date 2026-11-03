import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../Text/Text.tsx'
import { Card } from './Card.tsx'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: { tone: 'ink', padding: 'md', interactive: false },
  argTypes: {
    tone: { control: 'inline-radio', options: ['ink', 'wine', 'outline', 'cream'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg'] },
  },
  decorators: [(Story) => <div style={{ width: 'min(26rem, 100%)' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Card>

const Body = () => (
  <>
    <Text variant="title-sm">Velvet Hour</Text>
    <Text variant="caption" tone="olive">Rye · Amaro · Burnt orange · Cherrywood smoke</Text>
  </>
)

export const Ink: Story = { args: { children: <Body /> } }
export const Wine: Story = { args: { tone: 'wine', children: <Body /> } }
export const Outline: Story = { args: { tone: 'outline', children: <Body /> } }
export const Cream: Story = { args: { tone: 'cream', children: <Body /> } }
export const Interactive: Story = { args: { interactive: true, children: <Body /> } }
