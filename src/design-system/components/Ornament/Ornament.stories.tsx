import type { Meta, StoryObj } from '@storybook/react-vite'
import { Ornament } from './Ornament.tsx'

const meta: Meta<typeof Ornament> = {
  title: 'Components/Ornament',
  component: Ornament,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Blocks are separated by a thin gilt line and a small mark, not by whitespace alone.',
      },
    },
  },
  args: { variant: 'diamond', tone: 'gold' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['rule', 'diamond', 'crest', 'dots'] },
    tone: { control: 'inline-radio', options: ['gold', 'subtle', 'ember'] },
  },
  decorators: [(Story) => <div style={{ width: 'min(40rem, 100%)' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Ornament>

export const Diamond: Story = {}
export const Rule: Story = { args: { variant: 'rule' } }
export const Crest: Story = { args: { variant: 'crest' } }
export const Dots: Story = { args: { variant: 'dots' } }

export const All: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: '2.5rem' }}>
      <Ornament variant="rule" />
      <Ornament variant="diamond" />
      <Ornament variant="crest" />
      <Ornament variant="dots" />
    </div>
  ),
}
