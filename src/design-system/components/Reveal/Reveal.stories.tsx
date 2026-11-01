import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plate } from '../Plate/Plate.tsx'
import { Text } from '../Text/Text.tsx'
import { Reveal } from './Reveal.tsx'
import { Stagger, StaggerItem } from './Stagger.tsx'

/** Stories start already in view, so the demos replay on every re-entry. */
const scrollStage = (Story: () => React.ReactElement) => (
  <div style={{ width: 'min(44rem, 100%)' }}>
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        height: '70vh',
        border: '1px dashed var(--bfk-line-subtle)',
        color: 'var(--bfk-text-faint)',
        fontSize: '0.75rem',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
      }}
    >
      Scroll down
    </div>
    <div style={{ paddingBlock: '4rem' }}>
      <Story />
    </div>
    <div style={{ height: '50vh' }} />
  </div>
)

const meta: Meta<typeof Reveal> = {
  title: 'Motion/Reveal',
  component: Reveal,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animates children in as they scroll into view. `mask` and `wipe` clip their own box — give them something with a definite size.',
      },
    },
  },
  args: { effect: 'rise', delay: 0, repeat: true },
  argTypes: {
    effect: { control: 'inline-radio', options: ['rise', 'fade', 'mask', 'blur', 'scale', 'wipe'] },
    delay: { control: { type: 'range', min: 0, max: 1.5, step: 0.05 } },
  },
  decorators: [scrollStage],
}
export default meta
type Story = StoryObj<typeof Reveal>

export const Rise: Story = {
  args: { children: <Text variant="display-sm">Leave your worries</Text> },
}

export const Fade: Story = {
  args: { effect: 'fade', children: <Text variant="display-sm">Leave your worries</Text> },
}

export const Mask: Story = {
  args: { effect: 'mask', children: <Text variant="display-sm">Leave your worries</Text> },
}

export const Blur: Story = {
  args: { effect: 'blur', children: <Text variant="display-sm">Leave your worries</Text> },
}

export const Wipe: Story = {
  parameters: { docs: { description: { story: 'Curtain lift — the slowest of the set, meant for images.' } } },
  args: {
    effect: 'wipe',
    children: <div style={{ width: '18rem' }}><Plate subject="coupe" ratio="3/4" frame="hairline" /></div>,
  },
}

export const Staggered: Story = {
  name: 'Stagger',
  parameters: {
    controls: { disable: true },
    docs: { description: { story: '`Stagger` is `display: contents` by default so it never disturbs a grid. Give it a layout class when it must carry one.' } },
  },
  render: () => (
    <Stagger gap={0.12} repeat>
      {['Velvet Hour', 'Oxblood', 'The Door', 'Carefree'].map((name) => (
        <StaggerItem key={name}>
          <Text variant="title-md" tone="primary">{name}</Text>
        </StaggerItem>
      ))}
    </Stagger>
  ),
}
