import type { Meta, StoryObj } from '@storybook/react-vite'
import { accent, bg, color, line, text } from '../tokens/tokens.ts'
import { Grid, Sheet, Swatch, Row } from './Specimen.tsx'

const meta: Meta = {
  title: 'Foundations/Colour',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Three leathers — olive, burgundy, cream — from the owner’s swatch card, with espresso, cherry and chocolate from the sticker moodboard. Sections are colour-blocked in one leather at a time; cherry is the pop.',
      },
    },
  },
}
export default meta
type Story = StoryObj

const ramp = (family: Record<string | number, string>, group: string) =>
  Object.entries(family).map(([step, value]) => (
    <Swatch key={step} name={`${group} ${step}`} token={`--bfk-color-${group}-${step}`} value={value} />
  ))

export const Palette: Story = {
  render: () => (
    <Sheet>
      <Row label="Ink" hint="Espresso darks. 600 is the moodboard espresso; 900 is the page floor.">
        <Grid>{ramp(color.ink, 'ink')}</Grid>
      </Row>
      <Row label="Burgundy" hint="The house leather. 600 is the one to reach for.">
        <Grid>{ramp(color.burgundy, 'burgundy')}</Grid>
      </Row>
      <Row label="Cherry" hint="The pop — stickers, prices, the cursor.">
        <Grid>{ramp(color.cherry, 'cherry')}</Grid>
      </Row>
      <Row label="Olive" hint="Full olive fields at 600; 200 is the light accent for type on dark.">
        <Grid>{ramp(color.olive, 'olive')}</Grid>
      </Row>
      <Row label="Cream" hint="Type on dark, warm white through to ash.">
        <Grid>{ramp(color.cream, 'cream')}</Grid>
      </Row>
      <Row label="Chocolate" hint="Warm mid-tones and paper shadows.">
        <Grid>{ramp(color.chocolate, 'chocolate')}</Grid>
      </Row>
    </Sheet>
  ),
}

export const Semantic: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Components reference these, never the raw ramps above.',
      },
    },
  },
  render: () => (
    <Sheet>
      <Row label="Surfaces">
        <Grid>
          {Object.entries(bg).map(([name, value]) => (
            <Swatch key={name} name={name} token={`--bfk-bg-${name}`} value={value} />
          ))}
        </Grid>
      </Row>
      <Row label="Type">
        <Grid>
          {Object.entries(text).map(([name, value]) => (
            <Swatch key={name} name={name} token={`--bfk-text-${name}`} value={value} />
          ))}
        </Grid>
      </Row>
      <Row label="Lines & accents">
        <Grid>
          {Object.entries(line).map(([name, value]) => (
            <Swatch key={name} name={name} token={`--bfk-line-${name}`} value={value} />
          ))}
          {Object.entries(accent).map(([name, value]) => (
            <Swatch key={name} name={name} token={`--bfk-accent-${name}`} value={value} />
          ))}
        </Grid>
      </Row>
    </Sheet>
  ),
}
