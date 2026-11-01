import type { Meta, StoryObj } from '@storybook/react-vite'
import { radius, shadow, glow, space } from '../tokens/tokens.ts'
import { Row, Sheet } from './Specimen.tsx'

const meta: Meta = {
  title: 'Foundations/Space & Surface',
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj

export const Spacing: Story = {
  parameters: { docs: { description: { story: 'A 4px base scale. Section rhythm comes from `--bfk-layout-section`, not from these.' } } },
  render: () => (
    <Sheet>
      {Object.entries(space).map(([step, value]) => (
        <Row key={step} label={`space.${step}`} hint={`${value}px`}>
          <div style={{ width: value, height: 18, background: 'var(--bfk-accent-wine)', minWidth: 1 }} />
        </Row>
      ))}
    </Sheet>
  ),
}

export const Radius: Story = {
  render: () => (
    <Sheet>
      {Object.entries(radius).map(([name, value]) => (
        <Row key={name} label={name} hint={value}>
          <div
            style={{
              width: name === 'arch' ? 120 : 92,
              height: name === 'arch' ? 150 : 92,
              borderRadius: value,
              background: 'linear-gradient(160deg, var(--bfk-color-burgundy-600), var(--bfk-color-burgundy-900))',
              border: '1px solid var(--bfk-line-hairline)',
            }}
          />
        </Row>
      ))}
    </Sheet>
  ),
}

export const Elevation: Story = {
  render: () => (
    <Sheet>
      {Object.entries(shadow).map(([name, value]) => (
        <Row key={name} label={`shadow.${name}`} hint={value}>
          <div style={{ width: 160, height: 92, background: 'var(--bfk-bg-raised)', boxShadow: value, borderRadius: 4 }} />
        </Row>
      ))}
      {Object.entries(glow).map(([name, value]) => (
        <Row key={name} label={`glow.${name}`} hint={value}>
          <div style={{ width: 160, height: 92, background: 'var(--bfk-bg-raised)', boxShadow: value, borderRadius: 4 }} />
        </Row>
      ))}
    </Sheet>
  ),
}
