import { Button } from '@ds/components/Button/index.ts'
import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Numeral } from '@ds/components/Numeral/index.ts'
import { Plate } from '@ds/components/Plate/index.ts'
import { Reveal } from '@ds/components/Reveal/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { invitation } from '../data/content.ts'
import './Invitation.css'

/**
 * The invitation card, built like the printed references: oversized date and
 * time pinned to opposite corners with the image running between them.
 */
export function Invitation() {
  return (
    <section className="invitation bfk-grain">
      <div className="bfk-container invitation__stage">
        <Reveal effect="fade" className="invitation__eyebrow">
          <Eyebrow rule="both" tone="gold">
            {invitation.eyebrow}
          </Eyebrow>
        </Reveal>

        <div className="invitation__composition">
          <Reveal effect="rise" className="invitation__date">
            <Numeral size="xl">{invitation.date}</Numeral>
          </Reveal>

          <Reveal effect="wipe" delay={0.15} className="invitation__figure">
            <Plate subject="coupe" ratio="2/3" tone="wine" frame="inset" parallax />
          </Reveal>

          <Reveal effect="rise" delay={0.3} className="invitation__time">
            <Numeral size="xl">{invitation.time}</Numeral>
          </Reveal>
        </div>

        <div className="invitation__detail">
          <Reveal effect="mask">
            <Text variant="display-sm" className="invitation__title">
              {invitation.title}
            </Text>
          </Reveal>

          <Reveal effect="rise" delay={0.1}>
            <Text variant="body-lg" align="center" measure className="invitation__body">
              {invitation.body}
            </Text>
          </Reveal>

          <Reveal effect="rise" delay={0.2}>
            <Button href="#reserve" variant="ember" size="lg" magnetic withArrow>
              {invitation.cta}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
