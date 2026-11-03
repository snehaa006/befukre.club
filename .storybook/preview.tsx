import type { Preview } from '@storybook/react-vite'
import { MotionConfig } from 'framer-motion'
import '../src/design-system/styles/index.css'
import './storybook.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    backgrounds: {
      options: {
        noir: { name: 'Espresso', value: '#120907' },
        wine: { name: 'Burgundy', value: '#551619' },
        olive: { name: 'Olive', value: '#433D1F' },
        cream: { name: 'Cream', value: '#F4EBDD' },
      },
    },
    a11y: { test: 'todo' },
    docs: { toc: true },
  },
  initialGlobals: {
    backgrounds: { value: 'noir' },
  },
  decorators: [
    (Story) => (
      // Mirrors the app shell: reduced motion honoured, dark stage, club type.
      <MotionConfig reducedMotion="user">
        <div className="sb-stage">
          <Story />
        </div>
      </MotionConfig>
    ),
  ],
}

export default preview
