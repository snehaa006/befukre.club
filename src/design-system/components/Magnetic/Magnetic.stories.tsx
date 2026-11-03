import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../Button/Button.tsx'
import { Magnetic } from './Magnetic.tsx'

const meta: Meta<typeof Magnetic> = {
  title: 'Motion/Magnetic',
  component: Magnetic,
  parameters: {
    docs: {
      description: {
        component:
          'Wraps a control so it drifts toward the cursor. Spring-damped, and completely inert when the visitor prefers reduced motion.',
      },
    },
  },
  args: { strength: 0.35 },
  argTypes: { strength: { control: { type: 'range', min: 0, max: 1, step: 0.05 } } },
}
export default meta
type Story = StoryObj<typeof Magnetic>

export const AroundAButton: Story = {
  args: { children: <Button variant="solid" size="lg" withArrow>Reserve a table</Button> },
}

export const Strong: Story = {
  args: { strength: 0.8, children: <Button variant="cherry" size="lg">Pulls harder</Button> },
}

export const Subtle: Story = {
  args: { strength: 0.12, children: <Button variant="outline" size="lg">Barely moves</Button> },
}
