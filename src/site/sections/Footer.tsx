import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { club, footer } from '../data/content.ts'
import './Footer.css'

/**
 * Olive leather, the logo set as wide as the page, and a handful of stickers
 * that drop out of the sky when you arrive — then stay where you throw them.
 */
export function Footer() {
  const fine = useFinePointer()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] })
  const logoY = useTransform(scrollYProgress, [0, 1], ['40%', '0%'])
  const logoScale = useTransform(scrollYProgress, [0, 1], [0.86, 1])
  // The drops start far above their box, so trigger them off the footer itself.
  const raining = useInView(ref, { once: true, amount: 0.2 })

  return (
    <footer className="footer leather leather--olive" ref={ref}>
      <div className="footer__rain" aria-hidden="true">
        {footer.rain.map((s, i) => (
          <motion.div
            key={s.src}
            className="footer__drop"
            style={{ left: `${s.x}%` }}
            initial={{ y: '-70vh', rotate: s.r * 4, opacity: 0 }}
            animate={raining ? { y: 0, rotate: s.r, opacity: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 90, damping: 11, mass: 1.1, delay: i * 0.09 }}
          >
            <Sticker src={s.src} width={s.width} slap={false} draggable={fine} bounds={ref} />
          </motion.div>
        ))}
      </div>

      <div className="footer__cols">
        <div className="footer__col">
          <span className="bracket"><span className="bracket__n">[V]</span> Visit</span>
          <p>
            {club.address[0]}
            <br />
            {club.address[1]}
          </p>
        </div>
        <div className="footer__col">
          <span className="bracket"><span className="bracket__n">[H]</span> Hours</span>
          <p>
            {club.hours.map((h) => (
              <span key={h.days}>
                {h.days} — {h.time}
                <br />
              </span>
            ))}
          </p>
        </div>
        <div className="footer__col">
          <span className="bracket"><span className="bracket__n">[W]</span> Write</span>
          <p>
            <a href={`mailto:${club.email}`}>{club.email}</a>
            <br />
            <a href={`tel:${club.phone.replace(/\s/g, '')}`}>{club.phone}</a>
          </p>
        </div>
        <div className="footer__col">
          <span className="bracket"><span className="bracket__n">[F]</span> Follow</span>
          <p>
            <a href={club.instagramUrl} target="_blank" rel="noreferrer noopener">
              @{club.instagram}
            </a>
          </p>
        </div>
      </div>

      <motion.div className="footer__logo" style={{ y: logoY, scale: logoScale }}>
        <img src="/brand/logo-cream.webp" alt="BEFUKRE Club" width="1351" height="591" loading="lazy" />
      </motion.div>

      <div className="footer__base">
        <span>© 2026 BEFUKRE Club. {footer.line}</span>
        <span>{footer.legal}</span>
        <a href="#top">Back to the door ↑</a>
      </div>
    </footer>
  )
}
