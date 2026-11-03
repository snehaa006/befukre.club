import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Badge } from '@ds/components/Badge/index.ts'
import { Photo } from '@ds/components/Photo/index.ts'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { invitation, photo } from '../data/content.ts'
import './Invitation.css'

/**
 * The monthly tasting, set like an invitation card: the date and the time are
 * the artwork, sliding in from opposite edges and crossing the photograph.
 */
export function Invitation() {
  const fine = useFinePointer()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const dateX = useTransform(p, [0, 0.5], ['-40%', '0%'])
  const timeX = useTransform(p, [0.1, 0.6], ['40%', '0%'])
  const glassY = useTransform(p, [0, 1], [120, -120])
  const glassR = useTransform(p, [0, 1], [-14, 10])

  return (
    <section className="invite leather leather--burgundy" ref={ref} aria-labelledby="invite-title">
      <span className="invite__label bracket">
        <span className="bracket__n">[06]</span> {invitation.label}
      </span>

      <div className="invite__stage">
        <motion.p className="invite__date" style={{ x: dateX }} aria-label={`${invitation.date[0]} November`}>
          {invitation.date[0]}
          <span className="invite__slash">/</span>
          {invitation.date[1]}
        </motion.p>

        <div className="invite__frame">
          <Photo className="invite__photo" src={invitation.image} alt="Rose petals drifting in lit water" ratio="3/4" reveal="wipe" parallax={0.12} />
        </div>

        <motion.div className="invite__glass" style={{ y: glassY, rotate: glassR }}>
          <Sticker src={invitation.sticker} width="100%" draggable={fine} rotate={0} />
        </motion.div>

        <motion.p className="invite__time" style={{ x: timeX }}>
          {invitation.time}
        </motion.p>
      </div>

      <div className="invite__copy">
        <h2 className="invite__title script" id="invite-title">
          {invitation.title}
        </h2>
        <p className="invite__lead poster">{invitation.lead}</p>
        <p className="invite__body">{invitation.body}</p>
      </div>

      <Sticker className="invite__ticket" shape="ticket" src={photo('amber-coupe-flower')} ratio="5/2" width="clamp(13rem, 22vw, 19rem)" rotate={-6} draggable={fine}>
        <span className="invite__ticketText">Admit one ✦ 12 seats</span>
      </Sticker>

      <Badge className="invite__cta" href="#reserve" text="HOLD ME A SEAT ✦ HOLD ME A SEAT ✦ " label={invitation.cta} tone="cherry" size={150} rotate={8}>
        <span className="invite__ctaMark script">Yes</span>
      </Badge>
    </section>
  )
}
