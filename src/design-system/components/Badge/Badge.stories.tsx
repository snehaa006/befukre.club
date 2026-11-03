import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge.tsx'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Scalloped seal with text running round the rim. Repeat a short phrase with bullets so the circle closes. With `href` it is a call to action and the rim spins faster on hover.',
      },
    },
  },
  args: { text: 'EST. 2026 ✦ HAUZ KHAS VILLAGE ✦ NEW DELHI ✦ ', tone: 'cherry', size: 160, spin: true, rotate: -8 },
  argTypes: {
    tone: { control: 'inline-radio', options: ['cherry', 'cream', 'olive', 'wine'] },
    size: { control: { type: 'range', min: 80, max: 260, step: 10 } },
  },
}
export default meta
type Story = StoryObj<typeof Badge>

const Star = () => <span style={{ fontSize: '2.4rem' }}>✦</span>

export const Seal: Story = { args: { children: <Star /> } }

export const Cta: Story = {
  args: {
    text: 'RESERVE A TABLE ✦ RESERVE A TABLE ✦ ',
    tone: 'cream',
    href: '#reserve',
    label: 'Reserve a table',
    children: <span style={{ fontFamily: 'var(--bfk-font-script)', fontSize: '2.6rem' }}>Book</span>,
  },
}

export const Tones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {(['cherry', 'cream', 'olive', 'wine'] as const).map((tone) => (
        <Badge key={tone} {...args} tone={tone} size={130}>
          <Star />
        </Badge>
      ))}
    </div>
  ),
}
