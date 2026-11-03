import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { Badge } from '@ds/components/Badge/index.ts'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { useScrollSkew } from '@ds/hooks/useScrollSkew.ts'
import { pours } from '../data/content.ts'
import './Pours.css'

const TONES = ['cream', 'wine', 'espresso'] as const

/**
 * The card, sideways. The section pins and vertical scroll drives a long
 * horizontal track of pour cards; the cards lean into fast scrolls.
 */
export function Pours() {
  const fine = useFinePointer()
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [index, setIndex] = useState(1)
  const skew = useScrollSkew(4)

  useLayoutEffect(() => {
    const el = track.current
    if (!el) return
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(pours.length, Math.max(1, Math.round(v * (pours.length - 1)) + 1)))
  })

  return (
    <section className="pours leather leather--olive" id="pours" ref={section} style={{ height: `calc(100svh + ${distance}px)` }}>
      <div className="pours__sticky">
        <header className="pours__head">
          <span className="bracket">
            <span className="bracket__n">[05]</span> The pours
          </span>
          <span className="pours__count" aria-hidden="true">
            {String(index).padStart(2, '0')} / {String(pours.length).padStart(2, '0')}
          </span>
          <span className="pours__bar" aria-hidden="true">
            <motion.span style={{ scaleX: bar }} />
          </span>
        </header>

        <motion.div className="pours__track" ref={track} style={{ x, skewX: skew }}>
          <div className="pours__intro">
            <h2 className="pours__title poster">
              The <br />
              pours
            </h2>
            <span className="pours__script script">signature</span>
            <p className="pours__lede">
              Fourteen on the card, six of them ours. Nothing takes longer than four minutes, and nothing arrives
              with a story you did not ask for.
            </p>
            <Badge className="pours__badge" text="14 ON THE CARD ✦ 6 OF THEM OURS ✦ " tone="cherry" size={140} rotate={-12}>
              <span className="pours__badgeMark">₹</span>
            </Badge>
          </div>

          {pours.map((p, i) => (
            <article className={`pour pour--${TONES[i % TONES.length]}`} key={p.id}>
              <div className="pour__media">
                <img src={p.image} alt="" loading="lazy" draggable={false} style={{ objectPosition: p.focus }} />
                <span className="pour__num">[{String(i + 1).padStart(2, '0')}]</span>
              </div>
              <div className="pour__body">
                <h3 className="pour__name poster">{p.name}</h3>
                <p className="pour__spec">{p.spec}</p>
                <p className="pour__note">{p.note}</p>
              </div>
              <Sticker className="pour__price" shape="label" paper={i % 2 ? 'olive' : 'cherry'} rotate={i % 2 ? 7 : -8} slap>
                {p.price}
              </Sticker>
              {p.sticker && (
                <Sticker className="pour__sticker" src={p.sticker} width="clamp(4rem, 6vw, 6.5rem)" rotate={i % 2 ? -14 : 12} draggable={fine} delay={0.15} />
              )}
            </article>
          ))}

          <div className="pours__outro">
            <p className="poster">
              Eight more
              <br />
              <span>inside</span>
            </p>
            <a className="cta" href="#reserve">
              Book &amp; taste them
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
