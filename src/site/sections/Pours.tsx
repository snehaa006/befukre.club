import { Accordion } from '@ds/components/Accordion/index.ts'
import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Plate } from '@ds/components/Plate/index.ts'
import { Reveal } from '@ds/components/Reveal/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { pours } from '../data/content.ts'
import './Pours.css'

/** Three pours worth looking at, in a film-strip row. */
const featured = pours.slice(0, 3)

/**
 * The menu. A triptych sets the mood, then every pour is listed as a row that
 * opens to its recipe — the card stays short and the detail stays available.
 */
export function Pours() {
  return (
    <section className="pours bfk-section" id="pours">
      <div className="bfk-container">
        <header className="pours__header">
          <Reveal effect="fade">
            <Eyebrow rule="both" tone="gold">
              The Pours
            </Eyebrow>
          </Reveal>

          <Reveal effect="mask" delay={0.1}>
            <Text variant="script" className="pours__script">
              Signature
            </Text>
          </Reveal>

          <Reveal effect="rise" delay={0.2}>
            <Text variant="lead" align="center" measure className="pours__intro">
              Fourteen on the card, six of them ours. Nothing takes longer than four minutes
              and nothing arrives with a story you did not ask for.
            </Text>
          </Reveal>
        </header>

        <div className="pours__strip">
          {featured.map((pour, index) => (
            <Reveal
              effect="wipe"
              delay={index * 0.14}
              key={pour.id}
              className={`pours__frame pours__frame--${index + 1}`}
            >
              <Plate
                subject={pour.subject}
                ratio="2/3"
                tone={index === 1 ? 'ember' : 'noir'}
                frame="hairline"
                parallax
                interactive
                corner={pour.price}
                caption={pour.name}
              />
            </Reveal>
          ))}
        </div>

        <Reveal effect="rise" className="pours__list">
          <Accordion
            mode="single"
            defaultOpen={[pours[0].id]}
            items={pours.map((pour) => ({
              id: pour.id,
              title: pour.name,
              meta: pour.price,
              content: (
                <>
                  <Text variant="eyebrow" tone="gold" className="pours__spec">
                    {pour.spec}
                  </Text>
                  <Text variant="body" className="pours__note">
                    {pour.note}
                  </Text>
                </>
              ),
            }))}
          />
        </Reveal>
      </div>
    </section>
  )
}
