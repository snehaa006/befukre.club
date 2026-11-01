import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag.tsx'

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: '21:30', tone: 'gold', fill: false },
  argTypes: {
    tone: { control: 'inline-radio', options: ['gold', 'wine', 'ember', 'neutral'] },
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
      <Tag tone="gold">Gold</Tag>
      <Tag tone="wine">Wine</Tag>
      <Tag tone="ember">Ember</Tag>
      <Tag tone="neutral">Neutral</Tag>
      <Tag tone="gold" fill>Gold filled</Tag>
      <Tag tone="wine" fill>Wine filled</Tag>
      <Tag tone="ember" fill>Ember filled</Tag>
    </div>
  ),
}
