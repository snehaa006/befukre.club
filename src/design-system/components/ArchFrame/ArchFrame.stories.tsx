import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '../Text/Text.tsx'
import { ArchFrame } from './ArchFrame.tsx'

const meta: Meta<typeof ArchFrame> = {
  title: 'Components/ArchFrame',
  component: ArchFrame,
  parameters: {
    docs: {
      description: {
        component:
          'The doorway. Used wherever the site wants to frame something as an invitation — the confirmation panel, a featured quote, a landing card.',
      },
    },
  },
  args: { tone: 'wine', bordered: true, keyhole: false },
  argTypes: { tone: { control: 'inline-radio', options: ['wine', 'ink', 'bone'] } },
  decorators: [(Story) => <div style={{ width: 'min(22rem, 100%)', minHeight: '24rem', display: 'flex' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ArchFrame>

const Body = () => (
  <>
    <Text variant="script" tone="gold">Noted</Text>
    <Text variant="body" align="center">
      We will confirm by WhatsApp on the number you left.
    </Text>
  </>
)

export const Wine: Story = { args: { children: <Body /> } }
export const Ink: Story = { args: { tone: 'ink', children: <Body /> } }
export const Bone: Story = { args: { tone: 'bone', children: <Body /> } }
export const Keyhole: Story = { args: { keyhole: true, children: <Body /> } }
export const Unbordered: Story = { args: { bordered: false, children: <Body /> } }
