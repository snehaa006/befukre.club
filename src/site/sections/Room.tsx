import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Ornament } from '@ds/components/Ornament/index.ts'
import { Plate } from '@ds/components/Plate/index.ts'
import { Reveal, Stagger, StaggerItem } from '@ds/components/Reveal/index.ts'
import { SplitText } from '@ds/components/SplitText/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { room } from '../data/content.ts'
import './Room.css'

/** The manifesto: an arched doorway on the left, the house position on the right. */
export function Room() {
  return (
    <section className="room bfk-section" id="room">
      <div className="bfk-container room__grid">
        <Reveal effect="wipe" className="room__figure">
          <Plate
            subject="arch"
            ratio="3/4"
            tone="wine"
            arch
            frame="inset"
            parallax
            caption="No sign, just the arch"
          />
        </Reveal>

        <div className="room__body">
          <Reveal effect="fade">
            <Eyebrow rule="after" tone="gold">
              {room.eyebrow}
            </Eyebrow>
          </Reveal>

          <SplitText as="h2" text={room.title} className="room__title" gap={0.045} />

          <Stagger gap={0.12} className="room__prose">
            {room.body.map((paragraph) => (
              <StaggerItem key={paragraph.slice(0, 24)}>
                <Text variant="body-lg" measure className="room__paragraph">
                  {paragraph}
                </Text>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal effect="fade" delay={0.1} className="room__divider">
            <Ornament variant="diamond" />
          </Reveal>

          <Stagger gap={0.1} className="room__stats">
            {room.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="room__stat">
                  <span className="room__statValue">{stat.value}</span>
                  <Text variant="eyebrow" tone="muted">
                    {stat.label}
                  </Text>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  )
}
