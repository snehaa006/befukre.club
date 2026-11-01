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
        noir: { name: 'Noir', value: '#070405' },
        wine: { name: 'Wine', value: '#3D0C16' },
        bone: { name: 'Bone', value: '#F6F0E7' },
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
