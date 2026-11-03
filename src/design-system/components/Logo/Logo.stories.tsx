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
  args: { variant: 'lockup', size: 'md', tone: 'cream', tagline: 'cocktail club' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['mark', 'wordmark', 'lockup'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['cream', 'olive', 'ink'] },
  },
}
export default meta
type Story = StoryObj<typeof Logo>

export const Lockup: Story = {}
export const Wordmark: Story = { args: { variant: 'wordmark' } }
export const Mark: Story = { args: { variant: 'mark' } }
export const Olive: Story = { args: { tone: 'olive', size: 'lg' } }
export const OnCream: Story = {
  args: { tone: 'ink', size: 'lg' },
  globals: { backgrounds: { value: 'cream' } },
}
