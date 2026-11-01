import { AnimatePresence, motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { ArchFrame } from '@ds/components/ArchFrame/index.ts'
import { Button } from '@ds/components/Button/index.ts'
import { Card } from '@ds/components/Card/index.ts'
import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Input, Select, Textarea } from '@ds/components/Field/index.ts'
import { Ornament } from '@ds/components/Ornament/index.ts'
import { Reveal } from '@ds/components/Reveal/index.ts'
import { SplitText } from '@ds/components/SplitText/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { club, reserve } from '../data/content.ts'
import './Reserve.css'

/**
 * Booking request.
 *
 * NOTE: the submit handler is front-end only — it acknowledges the request
 * locally. Point it at the booking endpoint (or an email service) before this
 * goes live, and surface the failure case here.
 */
export function Reserve() {
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="reserve bfk-grain" id="reserve">
      <div className="bfk-container reserve__grid">
        <div className="reserve__intro">
          <Reveal effect="fade">
            <Eyebrow rule="after" tone="gold">
              {reserve.eyebrow}
            </Eyebrow>
          </Reveal>

          <SplitText as="h2" text={reserve.title} className="reserve__title" />

          <Reveal effect="rise" delay={0.1}>
            <Text variant="body-lg" measure className="reserve__body">
              {reserve.body}
            </Text>
          </Reveal>

          <Reveal effect="fade" delay={0.15} className="reserve__divider">
            <Ornament variant="crest" />
          </Reveal>

          <Reveal effect="rise" delay={0.2}>
            <dl className="reserve__hours">
              {club.hours.map((slot) => (
                <div className="reserve__hoursRow" key={slot.days}>
                  <dt>{slot.days}</dt>
                  <dd>{slot.time}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal effect="rise" delay={0.1} className="reserve__panel">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArchFrame tone="wine" className="reserve__done">
                  <Text variant="script" tone="gold">
                    Noted
                  </Text>
                  <Text variant="body" align="center">
                    We will confirm by WhatsApp on the number you left. If the night is full,
                    we will offer you the counter.
                  </Text>
                  <Button variant="ghost" size="sm" onClick={() => setSent(false)}>
                    Send another
                  </Button>
                </ArchFrame>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <Card tone="outline" padding="lg">
                  <form className="reserve__form" onSubmit={onSubmit}>
                    <Input label="Name" name="name" autoComplete="name" required />
                    <Input
                      label="Phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={club.phone}
                      required
                    />
                    <Input label="Date" name="date" type="date" required />
                    <Input label="Time" name="time" type="time" required />
                    <Select
                      label="Guests"
                      name="guests"
                      options={reserve.guestOptions}
                      defaultValue="2"
                      className="reserve__span"
                    />
                    <Textarea
                      label="Anything we should know"
                      name="note"
                      rows={3}
                      placeholder="Birthday, allergy, a seat at the counter…"
                      className="reserve__span"
                    />
                    <div className="reserve__submit">
                      <Button type="submit" variant="solid" size="lg" fullWidth withArrow>
                        Request a table
                      </Button>
                    </div>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  )
}
