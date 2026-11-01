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
          'Black first, burgundy second. Ember and gold are accents — hairlines, numerals and a single lit edge, never fields of colour.',
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
      <Row label="Ink" hint="The page. Near-black with a red undertone so it never goes cold beside wine.">
        <Grid>{ramp(color.ink, 'ink')}</Grid>
      </Row>
      <Row label="Burgundy" hint="The house colour. 600 is the one to reach for.">
        <Grid>{ramp(color.burgundy, 'burgundy')}</Grid>
      </Row>
      <Row label="Ember" hint="Accent only — the lit glass, one call to action per screen.">
        <Grid>{ramp(color.ember, 'ember')}</Grid>
      </Row>
      <Row label="Gold" hint="Hairlines, ornament and small caps.">
        <Grid>{ramp(color.gold, 'gold')}</Grid>
      </Row>
      <Row label="Bone" hint="Type on dark, warm white through to ash.">
        <Grid>{ramp(color.bone, 'bone')}</Grid>
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
