import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text.tsx'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'The only way type is set in this system. Keeping every size behind a `variant` is what stops the scale drifting.',
      },
    },
  },
  args: { children: 'Leave your worries at the door', variant: 'body', tone: 'inherit' },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display-xl', 'display-lg', 'display-md', 'display-sm',
        'title-lg', 'title-md', 'title-sm',
        'lead', 'body-lg', 'body', 'body-sm', 'caption', 'eyebrow', 'script',
      ],
    },
    tone: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'faint', 'olive', 'cherry', 'wine', 'onCream', 'inherit'],
    },
    align: { control: 'inline-radio', options: ['start', 'center', 'end'] },
  },
}
export default meta
type Story = StoryObj<typeof Text>

export const Body: Story = {}

export const Display: Story = {
  args: { variant: 'display-md', tone: 'primary' },
}

export const Lead: Story = {
  args: { variant: 'lead', children: 'A low-lit room, a short menu, and no reason to hurry.' },
}

export const Eyebrow: Story = {
  args: { variant: 'eyebrow', children: 'Est. 2026 — after dark', tone: 'olive' },
}

export const Script: Story = {
  parameters: { docs: { description: { story: 'One word at a time. It is a signature, not a typeface for sentences.' } } },
  args: { variant: 'script', children: 'Signature' },
}

export const Measured: Story = {
  parameters: { docs: { description: { story: '`measure` caps the line length at a comfortable reading width.' } } },
  args: {
    variant: 'body-lg',
    measure: true,
    children:
      'We took a narrow room, painted it the colour of old wine, and left the lighting low enough that nobody checks their phone. There is no sign outside. There is an arch, and then there is us.',
  },
}

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      {(['primary', 'secondary', 'muted', 'faint', 'olive', 'cherry', 'wine'] as const).map((tone) => (
        <Text key={tone} variant="title-sm" tone={tone}>
          {tone}
        </Text>
      ))}
    </div>
  ),
}
