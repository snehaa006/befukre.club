import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef } from 'react'
import { Sticker } from './Sticker.tsx'

const meta: Meta<typeof Sticker> = {
  title: 'Components/Sticker',
  component: Sticker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The moodboard’s sticker language. `cutout` takes a die-cut image (subject plus white edge, produced by `scripts/extract-references.py`); every other shape frames a photo in white paper and cuts it — rect, arch, oval, circle, polaroid, keyhole, scallop, ticket, flag. `label` is a text sticker. Stickers slap on when they scroll in and can be dragged.',
      },
    },
  },
  args: { rotate: -6, draggable: true, slap: true, width: '14rem' },
  argTypes: {
    shape: {
      control: 'select',
      options: ['cutout', 'rect', 'arch', 'oval', 'circle', 'polaroid', 'keyhole', 'scallop', 'ticket', 'flag', 'label'],
    },
    paper: { control: 'inline-radio', options: ['white', 'cream', 'cherry', 'olive', 'wine'] },
    rotate: { control: { type: 'range', min: -30, max: 30, step: 1 } },
  },
}
export default meta
type Story = StoryObj<typeof Sticker>

export const Cutout: Story = {
  args: { shape: 'cutout', src: '/stickers/cherry-coupe.webp', width: '11rem' },
}

export const Polaroid: Story = {
  args: { shape: 'polaroid', src: '/photos/candle-table.webp', caption: 'Table four, 11pm', ratio: '4/5' },
}

export const Keyhole: Story = {
  args: { shape: 'keyhole', src: '/photos/corridor.webp', ratio: '3/4', width: '12rem' },
}

export const Scallop: Story = {
  args: { shape: 'scallop', src: '/photos/cherry-cake.webp', width: '12rem' },
}

export const Ticket: Story = {
  args: { shape: 'ticket', src: '/photos/amber-coupe.webp', ratio: '2/1', width: '18rem', rotate: 4 },
}

export const Label: Story = {
  args: { shape: 'label', paper: 'cherry', children: 'No tricks, just taste', rotate: -4 },
}

/** Drag them around. The last one touched comes to the top. */
export const Board: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const Board = () => {
      const bounds = useRef<HTMLDivElement>(null)
      return (
        <div
          ref={bounds}
          style={{ position: 'relative', height: '80vh', background: 'var(--bfk-bg-cream)', overflow: 'hidden' }}
        >
          <Sticker bounds={bounds} draggable shape="arch" src="/photos/copper-dress.webp" ratio="3/4" width="13rem" rotate={-5} style={{ position: 'absolute', left: '8%', top: '12%' }} />
          <Sticker bounds={bounds} draggable src="/stickers/lamp.webp" width="7rem" rotate={8} delay={0.15} style={{ position: 'absolute', left: '34%', top: '30%' }} />
          <Sticker bounds={bounds} draggable shape="polaroid" src="/photos/velvet-cake.webp" caption="Red velvet" width="12rem" rotate={6} delay={0.3} style={{ position: 'absolute', left: '50%', top: '10%' }} />
          <Sticker bounds={bounds} draggable shape="label" paper="olive" rotate={-8} delay={0.45} style={{ position: 'absolute', left: '62%', top: '64%' }}>
            Carefree by design
          </Sticker>
          <Sticker bounds={bounds} draggable src="/stickers/cherry.webp" width="5rem" rotate={-12} delay={0.6} style={{ position: 'absolute', left: '22%', top: '62%' }} />
        </div>
      )
    }
    return <Board />
  },
}
