import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitText } from './SplitText.tsx'
import './splitText.stories.css'

const meta: Meta<typeof SplitText> = {
  title: 'Motion/SplitText',
  component: SplitText,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Each unit climbs out from behind its own baseline. The full string is rendered once for screen readers and the split halves are hidden from them, so the headline is never read letter by letter.',
      },
    },
  },
  args: {
    text: 'Leave your worries at the door',
    by: 'word',
    gap: 0.06,
    delay: 0,
    repeat: true,
    className: 'sbSplit',
  },
  argTypes: {
    by: { control: 'inline-radio', options: ['word', 'char'] },
    gap: { control: { type: 'range', min: 0.01, max: 0.3, step: 0.01 } },
    as: { control: 'select', options: ['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(44rem, 100%)' }}>
        <div style={{ display: 'grid', placeItems: 'center', height: '60vh', border: '1px dashed var(--bfk-line-subtle)', color: 'var(--bfk-text-faint)', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          Scroll down
        </div>
        <div style={{ paddingBlock: '4rem' }}><Story /></div>
        <div style={{ height: '50vh' }} />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof SplitText>

export const ByWord: Story = {}

export const ByCharacter: Story = {
  parameters: { docs: { description: { story: 'Only for short lines — a long string becomes a very long queue of animations.' } } },
  args: { text: 'Signature', by: 'char', gap: 0.04 },
}

export const WithAccent: Story = {
  parameters: { docs: { description: { story: 'Pick individual words out of the line — here the one that carries the brand.' } } },
  args: { accentIndices: [2], accentClassName: 'sbSplit__accent' },
}

export const Slow: Story = {
  args: { gap: 0.16 },
}
