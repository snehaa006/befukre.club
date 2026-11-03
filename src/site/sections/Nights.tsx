import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useState, type PointerEvent } from 'react'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { nights } from '../data/content.ts'
import './Nights.css'

/**
 * What's on, as a Lumen-style index. On a mouse, the night's photograph
 * follows the pointer as a polaroid and tilts with the speed of the hand.
 */
export function Nights() {
  const fine = useFinePointer()
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 })
  const vx = useVelocity(sx)
  const tilt = useTransform(vx, [-2000, 0, 2000], [-16, 0, 16], { clamp: true })

  const onMove = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  return (
    <section className="nights" id="nights" onPointerMove={fine ? onMove : undefined} onPointerLeave={() => setActive(null)}>
      <header className="nights__head">
        <span className="bracket">
          <span className="bracket__n">[07]</span> Nights
        </span>
        <h2 className="nights__title poster">
          What&rsquo;s <span>on</span>
        </h2>
        <p className="nights__lede">Every Friday and Saturday something happens at the counter. Seats go to whoever books first.</p>
      </header>

      <ul className="nights__list">
        {nights.map((n, i) => (
          <motion.li
            key={n.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <a className="night" href="#reserve" data-cursor="Book" onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
              <span className="night__date">
                <span className="night__day">{n.day}</span>
                <span className="night__month">
                  {n.month} · {n.weekday}
                </span>
              </span>
              <span className="night__title">{n.title}</span>
              <span className="night__kind">{n.kind}</span>
              <span className="night__time">{n.time}</span>
              <img className="night__thumb" src={n.image} alt="" loading="lazy" />
              <svg className="night__arrow" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </a>
          </motion.li>
        ))}
      </ul>

      {fine && (
        <motion.div className="nights__float" style={{ x: sx, y: sy, rotate: tilt }} aria-hidden="true">
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                className="nights__polaroid"
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={{ opacity: 1, scale: 1, rotate: active % 2 ? 5 : -5 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <img src={nights[active].image} alt="" />
                <span className="script">{nights[active].kind}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  )
}
