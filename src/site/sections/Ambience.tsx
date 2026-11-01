import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Plate } from '@ds/components/Plate/index.ts'
import { Reveal } from '@ds/components/Reveal/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { ambience } from '../data/content.ts'
import './Ambience.css'

/**
 * Offset gallery. Frames sit at different heights and drift at different
 * rates, so the grid never reads as a contact sheet.
 */
export function Ambience() {
  return (
    <section className="ambience bfk-section" id="ambience">
      <div className="bfk-container bfk-container--wide">
        <header className="ambience__header">
          <Reveal effect="fade">
            <Eyebrow rule="after" tone="gold">
              Ambience
            </Eyebrow>
          </Reveal>
          <Reveal effect="rise" delay={0.08}>
            <Text variant="title-lg" measure className="ambience__note">
              Low light, loud velvet, and a room that looks better the later it gets.
            </Text>
          </Reveal>
        </header>

        <div className="ambience__grid">
          {ambience.map((frame, index) => (
            <Reveal
              effect="wipe"
              delay={(index % 3) * 0.1}
              key={frame.caption}
              className={`ambience__cell ambience__cell--${index + 1}`}
            >
              <Plate
                subject={frame.subject}
                ratio={frame.ratio}
                tone={frame.tone}
                caption={frame.caption}
                frame="hairline"
                parallax
                interactive
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
