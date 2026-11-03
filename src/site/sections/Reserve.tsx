import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'
import { Badge } from '@ds/components/Badge/index.ts'
import { Input, Select, Textarea } from '@ds/components/Field/index.ts'
import { Lace } from '@ds/components/Lace/index.ts'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { club, reserve, sticker } from '../data/content.ts'
import './Reserve.css'

/**
 * Booking request, written on a lace card on burgundy leather.
 *
 * NOTE: the submit handler is front-end only — it acknowledges the request
 * locally. Point it at the booking endpoint (or an email service) before this
 * goes live, and surface the failure case here.
 */
export function Reserve() {
  const fine = useFinePointer()
  const section = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <section className="reserve leather leather--burgundy" id="reserve" ref={section}>
      <div className="reserve__intro">
        <span className="bracket">
          <span className="bracket__n">[09]</span> {reserve.label}
        </span>
        <h2 className="reserve__title poster">
          {reserve.title[0]}
          <br />
          <span>{reserve.title[1]}</span>
        </h2>
        <span className="reserve__script script" aria-hidden="true">
          {reserve.script}
        </span>
        <p className="reserve__body">{reserve.body}</p>

        <dl className="reserve__hours">
          {club.hours.map((slot) => (
            <div className="reserve__hoursRow" key={slot.days}>
              <dt>{slot.days}</dt>
              <dd>{slot.time}</dd>
            </div>
          ))}
        </dl>
      </div>

      <motion.div
        className="reserve__card"
        initial={{ y: 80, rotate: 6, opacity: 0 }}
        whileInView={{ y: 0, rotate: -1.5, opacity: 1 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        <Lace scallop={13} tone="cream">
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.div
                key="sent"
                className="reserve__done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                role="status"
              >
                <Badge text="NOTED ✦ SEE YOU SOON ✦ NOTED ✦ " tone="cherry" size={150} rotate={-8}>
                  <span className="reserve__doneMark">✦</span>
                </Badge>
                <p className="reserve__doneScript script">See you soon</p>
                <p className="reserve__doneText">
                  We will confirm by WhatsApp on the number you left. If the night is full, we will offer you the counter.
                </p>
                <button type="button" className="reserve__again" onClick={() => setSent(false)}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form key="form" className="reserve__form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }}>
                <p className="reserve__cardTitle script">Table for you</p>
                <Input label="Name" name="name" autoComplete="name" required />
                <Input label="Phone" name="phone" type="tel" autoComplete="tel" placeholder={club.phone} required />
                <Input label="Date" name="date" type="date" required />
                <Input label="Time" name="time" type="time" required />
                <Select label="Guests" name="guests" options={reserve.guestOptions} defaultValue="2" className="reserve__span" />
                <Textarea label="Anything we should know" name="note" rows={2} placeholder="Birthday, allergy, a seat at the counter…" className="reserve__span" />
                <button type="submit" className="reserve__submit reserve__span" data-cursor="Book">
                  Request the table
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Lace>

        <Sticker className="reserve__s reserve__s--cherry" src={sticker('cherry')} width="clamp(3.6rem, 5vw, 5rem)" rotate={-16} draggable={fine} bounds={section} />
        <Sticker className="reserve__s reserve__s--whisky" src={sticker('whisky')} width="clamp(5rem, 8vw, 8rem)" rotate={10} draggable={fine} bounds={section} delay={0.2} />
      </motion.div>
    </section>
  )
}
