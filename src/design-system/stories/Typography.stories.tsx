import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, type TextVariant } from '../components/Text/index.ts'
import { font, fontSize, tracking } from '../tokens/tokens.ts'
import { Row, Sheet } from './Specimen.tsx'

const meta: Meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Four families with one job each. Bebas Neue shouts, Imbue sets the numbers, Instrument Sans reads and labels, and Pinyon Script signs — one word at a time.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const SCALE: { variant: TextVariant; sample: string }[] = [
  { variant: 'display-xl', sample: 'Befukre' },
  { variant: 'display-lg', sample: 'Leave your worries' },
  { variant: 'display-md', sample: 'Behind the arch' },
  { variant: 'display-sm', sample: 'Midnight Flight' },
  { variant: 'title-lg', sample: 'Velvet Hour' },
  { variant: 'title-md', sample: 'Velvet Hour' },
  { variant: 'title-sm', sample: 'Velvet Hour' },
  { variant: 'lead', sample: 'A low-lit room, a short menu, and no reason to hurry.' },
  { variant: 'body-lg', sample: 'We took a narrow room and painted it the colour of old wine.' },
  { variant: 'body', sample: 'We took a narrow room and painted it the colour of old wine.' },
  { variant: 'body-sm', sample: 'We took a narrow room and painted it the colour of old wine.' },
  { variant: 'caption', sample: 'Rye · Amaro · Burnt orange' },
  { variant: 'eyebrow', sample: 'No tricks, just taste' },
  { variant: 'script', sample: 'Signature' },
]

export const Scale: Story = {
  render: () => (
    <Sheet>
      {SCALE.map(({ variant, sample }) => (
        <Row key={variant} label={variant} hint={`<Text variant="${variant}" />`}>
          <Text variant={variant} as="div">
            {sample}
          </Text>
        </Row>
      ))}
    </Sheet>
  ),
}

export const Families: Story = {
  render: () => (
    <Sheet>
      {Object.entries(font).map(([name, stack]) => (
        <Row key={name} label={name} hint={stack}>
          <div style={{ fontFamily: stack, fontSize: '2rem', color: 'var(--bfk-text-primary)' }}>
            Carefree since 2026
          </div>
        </Row>
      ))}
    </Sheet>
  ),
}

export const Tracking: Story = {
  parameters: {
    docs: { description: { story: 'Wide tracking on micro caps is the signature move — use `widest` for corner labels.' } },
  },
  render: () => (
    <Sheet>
      {Object.entries(tracking).map(([name, value]) => (
        <Row key={name} label={name} hint={value}>
          <span
            style={{
              fontFamily: 'var(--bfk-font-sans)',
              fontSize: '0.75rem',
              letterSpacing: value,
              textTransform: 'uppercase',
              color: 'var(--bfk-text-primary)',
            }}
          >
            Leave your worries at the door
          </span>
        </Row>
      ))}
    </Sheet>
  ),
}

export const Sizes: Story = {
  render: () => (
    <Sheet>
      {Object.entries(fontSize).map(([name, value]) => (
        <Row key={name} label={name} hint={value}>
          <span style={{ fontFamily: 'var(--bfk-font-display)', fontSize: value, color: 'var(--bfk-text-primary)', lineHeight: 1.1 }}>
            Aa
          </span>
        </Row>
      ))}
    </Sheet>
  ),
}
