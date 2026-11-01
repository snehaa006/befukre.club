import type { Meta, StoryObj } from '@storybook/react-vite'
import { Marquee } from './Marquee.tsx'

const meta: Meta<typeof Marquee> = {
  title: 'Components/Marquee',
  component: Marquee,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The track is rendered twice and translated by exactly its own width, so the seam never shows. The clone is hidden from assistive tech and from reduced-motion users.',
      },
    },
  },
  args: { speed: 30, direction: 'left', pauseOnHover: true, fade: true },
  argTypes: {
    speed: { control: { type: 'range', min: 8, max: 90, step: 2 } },
    direction: { control: 'inline-radio', options: ['left', 'right'] },
  },
  decorators: [(Story) => <div style={{ padding: '2rem 0', background: 'var(--bfk-color-burgundy-800)' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Marquee>

const Phrase = ({ children }: { children: string }) => (
  <span style={{ fontFamily: 'var(--bfk-font-display)', fontStyle: 'italic', fontSize: '1.6rem', color: 'var(--bfk-text-primary)', whiteSpace: 'nowrap' }}>
    {children}
  </span>
)

const Mark = () => (
  <span style={{ display: 'inline-block', width: 6, height: 6, background: 'var(--bfk-accent-gold)', transform: 'rotate(45deg)', marginInline: '2.5rem' }} />
)

export const Ticker: Story = {
  args: {
    separator: <Mark />,
    children: [
      <Phrase key="a">No tricks, just taste</Phrase>,
      <Phrase key="b">Carefree by design</Phrase>,
      <Phrase key="c">Open till late</Phrase>,
    ],
  },
}

export const Reversed: Story = {
  args: { ...Ticker.args, direction: 'right' },
}

export const NoFade: Story = {
  args: { ...Ticker.args, fade: false },
}
