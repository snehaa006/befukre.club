import type { Meta, StoryObj } from '@storybook/react-vite'
import { Accordion } from './Accordion.tsx'

const items = [
  {
    id: 'velvet-hour',
    title: 'Velvet Hour',
    meta: '₹850',
    content: 'Stirred long and served over one clear cube. The smoke is caught under the glass at the pass, so it arrives still holding it.',
  },
  {
    id: 'oxblood',
    title: 'Oxblood',
    meta: '₹900',
    content: 'The loudest thing on the card. Sour, smoky and faintly hot at the finish — order it first or not at all.',
  },
  {
    id: 'the-door',
    title: 'The Door',
    meta: '₹820',
    content: 'Our martini. Washed with cold-pressed oil for weight, then frozen for six hours. No garnish, no discussion.',
  },
]

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Used for the menu, where each pour hides its recipe. Triggers carry `aria-expanded` and own their panel by id.',
      },
    },
  },
  args: { items, mode: 'single', defaultOpen: ['velvet-hour'] },
  argTypes: { mode: { control: 'inline-radio', options: ['single', 'multiple'] } },
  decorators: [(Story) => <div style={{ width: 'min(46rem, 100%)' }}><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {}
export const Multiple: Story = { args: { mode: 'multiple', defaultOpen: ['velvet-hour', 'oxblood'] } }
export const AllClosed: Story = { args: { defaultOpen: [] } }
