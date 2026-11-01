import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input, Select, Textarea } from './Field.tsx'

const meta: Meta<typeof Input> = {
  title: 'Components/Field',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Underline fields on dark. Label, control and message share generated ids, so the control is always described and errors are announced.',
      },
    },
  },
  args: { label: 'Name', placeholder: '' },
}
export default meta
type Story = StoryObj<typeof Input>

const framed = [(Story: () => React.ReactElement) => <div style={{ width: 'min(26rem, 100%)' }}><Story /></div>]

export const TextInput: Story = { name: 'Input', decorators: framed }

export const WithHint: Story = {
  decorators: framed,
  args: { label: 'Phone', type: 'tel', hint: 'We confirm by WhatsApp.', placeholder: '+91 98110 40026' },
}

export const Invalid: Story = {
  decorators: framed,
  args: { label: 'Phone', type: 'tel', error: 'Enter a number we can reach you on.' },
}

export const Area: Story = {
  decorators: framed,
  name: 'Textarea',
  render: (args) => (
    <Textarea
      label="Anything we should know"
      rows={3}
      placeholder="Birthday, allergy, a seat at the counter…"
      {...(args as object)}
    />
  ),
}

export const Dropdown: Story = {
  decorators: framed,
  name: 'Select',
  render: () => (
    <Select
      label="Guests"
      defaultValue="2"
      options={[
        { value: '2', label: 'Two' },
        { value: '4', label: 'Four' },
        { value: '6', label: 'Six' },
        { value: '6+', label: 'More than six' },
      ]}
    />
  ),
}

export const FullForm: Story = {
  parameters: { controls: { disable: true }, layout: 'padded' },
  render: () => (
    <form style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem', width: 'min(34rem, 100%)' }}>
      <Input label="Name" required />
      <Input label="Phone" type="tel" required />
      <Input label="Date" type="date" required />
      <Input label="Time" type="time" required />
      <div style={{ gridColumn: '1 / -1' }}>
        <Select label="Guests" defaultValue="2" options={[{ value: '2', label: 'Two' }, { value: '4', label: 'Four' }]} />
      </div>
    </form>
  ),
}
