import type { Meta, StoryObj } from '@storybook/react-vite'
import { Logo } from './Logo.tsx'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    docs: {
      description: {
        component: 'Nested arches — the doorway motif reduced to three strokes. `lockup` for hero and footer, `wordmark` for the nav bar.',
      },
    },
  },
  args: { variant: 'lockup', size: 'md', tone: 'bone', tagline: 'cocktail club' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['mark', 'wordmark', 'lockup'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['bone', 'gold', 'ink'] },
  },
}
export default meta
type Story = StoryObj<typeof Logo>

export const Lockup: Story = {}
export const Wordmark: Story = { args: { variant: 'wordmark' } }
export const Mark: Story = { args: { variant: 'mark' } }
export const Gold: Story = { args: { tone: 'gold', size: 'lg' } }
export const OnBone: Story = {
  args: { tone: 'ink', size: 'lg' },
  globals: { backgrounds: { value: 'bone' } },
}
