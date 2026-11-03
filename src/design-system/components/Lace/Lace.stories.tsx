import type { Meta, StoryObj } from '@storybook/react-vite'
import { Lace } from './Lace.tsx'

const meta: Meta<typeof Lace> = {
  title: 'Components/Lace',
  component: Lace,
  parameters: {
    docs: {
      description: {
        component:
          'Paper doily frame from the sticker moodboard — scalloped edge, two rings of punched eyelets and a stitch line. Drawn to the element’s measured size so the scallops stay round at any aspect ratio.',
      },
    },
  },
  args: { scallop: 12, tone: 'cream' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['cream', 'white', 'wine'] },
    scallop: { control: { type: 'range', min: 6, max: 24, step: 1 } },
  },
}
export default meta
type Story = StoryObj<typeof Lace>

const swatches = [
  ['Espresso', '#2E1A15', '/photos/highball.webp'],
  ['Cherry', '#5A0701', '/photos/cherry-cake.webp'],
  ['Burgundy', '#320B11', '/photos/velvet-curtain.webp'],
  ['Chocolate', '#5F3A2F', '/photos/whisky.webp'],
] as const

export const PaletteCard: Story = {
  render: (args) => (
    <Lace {...args} style={{ width: '18rem' }}>
      {swatches.map(([name, hex, src]) => (
        <div key={name} style={{ display: 'grid', placeItems: 'center', gap: 6, background: hex, aspectRatio: '1', padding: '1.5rem' }}>
          <img src={src} alt="" style={{ width: '45%', aspectRatio: '1', objectFit: 'cover' }} />
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#E6D8C3' }}>{name}</span>
        </div>
      ))}
    </Lace>
  ),
}

export const Card: Story = {
  render: (args) => (
    <Lace {...args} style={{ width: '24rem' }}>
      <p style={{ margin: 0, fontFamily: 'var(--bfk-font-script)', fontSize: '3rem', color: 'var(--bfk-color-burgundy-600)', textAlign: 'center' }}>
        Take a seat
      </p>
    </Lace>
  ),
}
