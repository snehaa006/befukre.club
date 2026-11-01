import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Reveal, Stagger, StaggerItem } from '@ds/components/Reveal/index.ts'
import { SplitText } from '@ds/components/SplitText/index.ts'
import { Tag } from '@ds/components/Tag/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { nights } from '../data/content.ts'
import './Nights.css'

/** The programme — one row per night, in the order they happen. */
export function Nights() {
  return (
    <section className="nights bfk-section" id="nights">
      <div className="bfk-container">
        <header className="nights__header">
          <Reveal effect="fade">
            <Eyebrow rule="after" tone="gold">
              What's on
            </Eyebrow>
          </Reveal>
          <SplitText as="h2" text="Nights" className="nights__title" />
        </header>

        <Stagger gap={0.1} className="nights__list">
          {nights.map((night) => (
            <StaggerItem key={night.title}>
              <a className="nights__row" href="#reserve">
                <span className="nights__date">
                  <span className="nights__day">{night.day}</span>
                  <span className="nights__month">
                    {night.month} · {night.weekday}
                  </span>
                </span>

                <span className="nights__body">
                  <span className="nights__name">{night.title}</span>
                  <Text variant="caption" as="span" className="nights__kind">
                    {night.kind}
                  </Text>
                </span>

                <span className="nights__meta">
                  <Tag tone="gold">{night.time}</Tag>
                  <svg className="nights__arrow" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  )
}
