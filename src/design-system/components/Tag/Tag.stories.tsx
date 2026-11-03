import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag.tsx'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: '21:30', tone: 'olive', fill: false },
  argTypes: {
    tone: { control: 'inline-radio', options: ['olive', 'wine', 'cherry', 'neutral'] },
  },
}
export default meta
type Story = StoryObj<typeof Tag>

export const Outline: Story = {}
export const Filled: Story = { args: { fill: true, tone: 'wine', children: 'Sold out' } }

export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
      <Tag tone="olive">Olive</Tag>
      <Tag tone="wine">Wine</Tag>
      <Tag tone="cherry">Cherry</Tag>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="olive" fill>Olive filled</Tag>
      <Tag tone="wine" fill>Wine filled</Tag>
      <Tag tone="cherry" fill>Cherry filled</Tag>
    </div>
  ),
}
