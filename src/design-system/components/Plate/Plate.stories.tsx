import type { Meta, StoryObj } from '@storybook/react-vite'
import { Plate } from './Plate.tsx'
import type { PlateSubject } from './subjects.tsx'

const SUBJECTS: PlateSubject[] = ['coupe', 'highball', 'rocks', 'bottle', 'arch', 'velvet', 'smoke']

const meta: Meta<typeof Plate> = {
  title: 'Components/Plate',
  component: Plate,
  parameters: {
    docs: {
      description: {
        component:
          'The image surface of the site. Every subject is drawn in SVG over a graded field with grain on top, so artwork is always on-palette and nothing depends on a photo library.',
      },
    },
  },
  args: { subject: 'coupe', ratio: '3/4', tone: 'noir', frame: 'none' },
  argTypes: {
    subject: { control: 'select', options: SUBJECTS },
    ratio: { control: 'select', options: ['2/3', '3/4', '4/5', '1/1', '4/3', '16/9', '21/9'] },
    tone: { control: 'inline-radio', options: ['noir', 'ember', 'wine', 'gold'] },
    frame: { control: 'inline-radio', options: ['none', 'hairline', 'inset'] },
  },
}
export default meta
type Story = StoryObj<typeof Plate>

/** Single plates get a narrow frame; the survey stories want the full canvas. */
const framed = [(Story: () => React.ReactElement) => <div style={{ width: 'min(20rem, 100%)' }}><Story /></div>]

export const Coupe: Story = { decorators: framed }
export const Captioned: Story = { decorators: framed, args: { caption: 'Velvet Hour', corner: '₹850', frame: 'hairline' } }
export const Arch: Story = { decorators: framed, args: { subject: 'arch', tone: 'wine', arch: true, frame: 'inset', caption: 'No sign, just the arch' } }
export const Interactive: Story = { decorators: framed, args: { interactive: true, frame: 'hairline', caption: 'Hover me' } }

export const Subjects: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))', gap: '1rem', width: 'min(60rem, 100%)' }}>
      {SUBJECTS.map((subject) => (
        <Plate key={subject} subject={subject} ratio="3/4" caption={subject} frame="hairline" />
      ))}
    </div>
  ),
}

export const Tones: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(11rem, 1fr))', gap: '1rem', width: 'min(48rem, 100%)' }}>
      {(['noir', 'ember', 'wine', 'gold'] as const).map((tone) => (
        <Plate key={tone} subject="coupe" ratio="3/4" tone={tone} caption={tone} />
      ))}
    </div>
  ),
}
