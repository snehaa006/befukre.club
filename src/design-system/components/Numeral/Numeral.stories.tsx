import type { Meta, StoryObj } from '@storybook/react-vite'
import { Numeral } from './Numeral.tsx'

const meta: Meta<typeof Numeral> = {
  title: 'Components/Numeral',
  component: Numeral,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Oversized Playfair figures for dates and times — the invitation treatment, where the numbers are the artwork.',
      },
    },
  },
  args: { children: '28/11', size: 'lg', tone: 'primary' },
  argTypes: {
    size: { control: 'inline-radio', options: ['md', 'lg', 'xl'] },
    tone: { control: 'inline-radio', options: ['primary', 'gold', 'ember', 'outline'] },
  },
}
export default meta
type Story = StoryObj<typeof Numeral>

export const Date: Story = {}
export const Time: Story = { args: { children: '21:30', tone: 'gold' } }
export const Outline: Story = {
  parameters: { docs: { description: { story: 'Hollow figures, so an image can show through behind them.' } } },
  args: { tone: 'outline', size: 'xl' },
}
