import type { Meta, StoryObj } from '@storybook/react-vite'
import { motion } from 'framer-motion'
import { duration, ease } from '../tokens/tokens.ts'
import { Row, Sheet } from './Specimen.tsx'

const meta: Meta = {
  title: 'Foundations/Motion',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Long, eased, and never bouncy. Entrances run slow enough to feel deliberate; everything respects `prefers-reduced-motion` through the app-level MotionConfig.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const Puck = ({ seconds, easing }: { seconds: number; easing: string }) => (
  <div style={{ width: '100%', maxWidth: 420, height: 26, background: 'var(--bfk-bg-raised)', borderRadius: 999 }}>
    <motion.div
      style={{ width: 26, height: 26, borderRadius: 999, background: 'var(--bfk-accent-ember)' }}
      animate={{ x: [0, 394, 0] }}
      transition={{ duration: seconds * 2, ease: easing as never, repeat: Infinity, repeatDelay: 0.4 }}
    />
  </div>
)

export const Durations: Story = {
  render: () => (
    <Sheet>
      {Object.entries(duration).map(([name, ms]) => (
        <Row key={name} label={name} hint={`${ms}ms`}>
          <Puck seconds={ms / 1000} easing={ease.standard} />
        </Row>
      ))}
    </Sheet>
  ),
}

export const Easings: Story = {
  render: () => (
    <Sheet>
      {Object.entries(ease).map(([name, curve]) => (
        <Row key={name} label={name} hint={curve}>
          <Puck seconds={duration.slow / 1000} easing={curve} />
        </Row>
      ))}
    </Sheet>
  ),
}
