import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button.tsx'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'The hover fill rises from the bottom edge. `solid` is the house burgundy; keep `ember` for the single most important action on a screen.',
      },
    },
  },
  args: { children: 'Reserve a table', variant: 'solid', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['solid', 'ember', 'outline', 'ghost', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
}
export default meta
type Story = StoryObj<typeof Button>

export const Solid: Story = {}

export const Ember: Story = {
  args: { variant: 'ember', children: 'Hold me a seat' },
}

export const Outline: Story = {
  args: { variant: 'outline', children: 'See the pours' },
}

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Read the menu' },
}

export const TextLink: Story = {
  name: 'Link',
  args: { variant: 'link', children: 'View all nights', withArrow: true },
}

export const WithArrow: Story = {
  args: { withArrow: true, size: 'lg' },
}

export const Magnetic: Story = {
  parameters: {
    docs: { description: { story: 'Drifts toward the cursor. Reserve it for the primary action — it stops being special if everything does it.' } },
  },
  args: { magnetic: true, withArrow: true, size: 'lg' },
}

export const AsLink: Story = {
  args: { href: '#reserve', children: 'Anchor, not button' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button variant="solid">Solid</Button>
      <Button variant="ember">Ember</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
