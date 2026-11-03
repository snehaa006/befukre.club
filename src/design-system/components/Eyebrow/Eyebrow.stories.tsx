import type { Meta, StoryObj } from '@storybook/react-vite'
import { Eyebrow } from './Eyebrow.tsx'

const meta: Meta<typeof Eyebrow> = {
  title: 'Components/Eyebrow',
  component: Eyebrow,
  parameters: {
    docs: {
      description: {
        component: 'The wide-tracked micro caption that labels almost everything here — corners, section openers, nav groups.',
      },
    },
  },
  args: { children: 'The Pours', rule: 'none', tone: 'muted' },
  argTypes: {
    rule: { control: 'inline-radio', options: ['none', 'before', 'after', 'both'] },
    tone: { control: 'inline-radio', options: ['muted', 'olive', 'cherry', 'primary'] },
  },
}
export default meta
type Story = StoryObj<typeof Eyebrow>

export const Plain: Story = {}
export const RuleAfter: Story = { args: { rule: 'after', tone: 'olive' } }
export const RuleBoth: Story = { args: { rule: 'both', tone: 'olive', children: 'Est. 2026 — after dark' } }

export const Tones: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', justifyItems: 'start' }}>
      <Eyebrow rule="both" tone="muted">Muted</Eyebrow>
      <Eyebrow rule="both" tone="olive">Olive</Eyebrow>
      <Eyebrow rule="both" tone="cherry">Cherry</Eyebrow>
      <Eyebrow rule="both" tone="primary">Primary</Eyebrow>
    </div>
  ),
}
