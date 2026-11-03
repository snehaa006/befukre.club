import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { door } from '../data/content.ts'
import './Door.css'
import { useRange } from '../useRange.ts'

/**
 * You look through a keyhole, and then you walk through it. A pinned scene:
 * the corridor photo sits behind a keyhole mask that grows until it swallows
 * the screen, then the camera keeps walking toward the door at the end.
 */
export function Door() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const mask = useTransform(p, [0, 0.62], ['30vh', '1300vh'])
  const imgScale = useTransform(p, [0, 0.6, 1], [1.5, 1, 1.45])
  const imgY = useTransform(p, [0.6, 1], ['0%', '6%'])
  const leftX = useTransform(p, [0, 0.55], ['0vw', '-60vw'])
  const rightX = useTransform(p, [0, 0.55], ['0vw', '60vw'])
  const titleOpacity = useRange(p, [0.35, 0.55], [1, 0])
  const scriptOpacity = useRange(p, [0.64, 0.78], [0, 1])
  const scriptScale = useTransform(p, [0.66, 1], [0.7, 1.15])
  const dim = useRange(p, [0.7, 1], [0, 0.35])

  return (
    <section className="door" ref={ref} aria-label={door.label}>
      <div className="door__sticky">
        <span className="door__label bracket">
          <span className="bracket__n">[04]</span> {door.label}
        </span>

        <motion.div className="door__mask" style={{ WebkitMaskSize: mask, maskSize: mask }}>
          <motion.img
            className="door__img"
            src={door.image}
            alt="A vaulted corridor lit red, lined with palms, ending in an arched door"
            style={{ scale: imgScale, y: imgY }}
          />
          <motion.div className="door__dim" style={{ opacity: dim }} />
        </motion.div>

        <motion.h2 className="door__title poster" style={{ opacity: titleOpacity }}>
          <motion.span className="door__half door__half--l" style={{ x: leftX }}>
            {door.left}
          </motion.span>
          <motion.span className="door__half door__half--r" style={{ x: rightX }}>
            {door.right}
          </motion.span>
        </motion.h2>

        <motion.span className="door__script script" style={{ opacity: scriptOpacity, scale: scriptScale, rotate: -8 }} aria-hidden="true">
          {door.script}
        </motion.span>
      </div>
    </section>
  )
}
