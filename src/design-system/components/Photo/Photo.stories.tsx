import type { Meta, StoryObj } from '@storybook/react-vite'
import { Photo } from './Photo.tsx'

const meta: Meta<typeof Photo> = {
  title: 'Components/Photo',
  component: Photo,
  parameters: {
    docs: {
      description: {
        component:
          'A photograph in a frame. Uncovers as it scrolls in (`wipe` or `iris`), then drifts inside its own crop. All photography is cut from the reference set by `scripts/extract-references.py`.',
      },
    },
  },
  args: {
    src: '/photos/dropper-coupe.webp',
    alt: 'A bartender drops bitters into a coupe',
    ratio: '3/4',
    reveal: 'wipe',
    parallax: 0.1,
    caption: '[01] The Door',
  },
  argTypes: {
    reveal: { control: 'inline-radio', options: ['wipe', 'iris', 'none'] },
    parallax: { control: { type: 'range', min: 0, max: 0.3, step: 0.02 } },
  },
  decorators: [(Story) => <div style={{ width: 'min(22rem, 90vw)' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Photo>

export const Wipe: Story = {}
export const Iris: Story = { args: { reveal: 'iris', src: '/photos/corridor.webp', alt: 'A vaulted corridor ending in an arched door' } }
