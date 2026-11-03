import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { cx } from '@ds/utils/cx.ts'
import { useReady } from '../ready.ts'
import { nav, photo, sticker } from '../data/content.ts'
import './Nav.css'

/** Label that rolls up to a copy of itself on hover. */
const Roll = ({ children }: { children: string }) => (
  <span className="roll">
    <span className="roll__a">{children}</span>
    <span className="roll__b" aria-hidden="true">
      {children}
    </span>
  </span>
)

/**
 * Lumen-style bar: links spread to the edges, the logo in the middle. The bar
 * blends by difference, so it reads cream on the dark sections and ink on the
 * cream ones without switching themes. Retreats on scroll down.
 */
export function Nav() {
  const ready = useReady()
  const { scrollY, scrollYProgress } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [tone, setTone] = useState<'light' | 'dark'>('light')

  // Ink the bar for whatever section is under it: cream sections get dark type.
  useEffect(() => {
    let frame = 0
    const probe = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const under = document
          .elementsFromPoint(window.innerWidth / 2, 40)
          .map((el) => el.closest('[data-nav]'))
          .find(Boolean)
        setTone(under?.getAttribute('data-nav') === 'dark' ? 'dark' : 'light')
      })
    }
    probe()
    window.addEventListener('scroll', probe, { passive: true })
    window.addEventListener('resize', probe)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', probe)
      window.removeEventListener('resize', probe)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(!open && y > previous && y > 260)
  })

  const slide = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: ready && !hidden ? 0.5 : 0 }
  const left = nav.slice(0, 2)
  const right = nav.slice(2)

  return (
    <>
      {/* Two fixed layers: the bar, and the coloured actions (kept separate so they never retreat behind the menu). */}
      <motion.header
        className={cx('nav', tone === 'dark' && !open && 'nav--dark')}
        initial={{ y: -120 }}
        animate={{ y: !ready || hidden ? -120 : 0 }}
        transition={slide}
      >
        <nav className="nav__links nav__links--left" aria-label="Primary">
          {left.map((item) => (
            <a className="nav__link" href={item.href} key={item.href}>
              <Roll>{item.label}</Roll>
            </a>
          ))}
        </nav>
        <a className="nav__brand" href="#top" aria-label="BEFUKRE Club — back to top">
          <img className="nav__logo nav__logo--cream" src="/brand/logo-cream.webp" alt="" width="1351" height="591" />
          <img className="nav__logo nav__logo--crimson" src="/brand/logo-crimson.webp" alt="" width="1351" height="591" />
        </a>
        <nav className="nav__links nav__links--right" aria-label="More">
          {right.map((item) => (
            <a className="nav__link" href={item.href} key={item.href}>
              <Roll>{item.label}</Roll>
            </a>
          ))}
        </nav>
      </motion.header>

      <motion.div
        className="nav-actions"
        initial={{ y: -120 }}
        animate={{ y: !ready || (hidden && !open) ? -120 : 0 }}
        transition={slide}
      >
        <a className="nav__reserve" href="#reserve">
          <Roll>Reserve</Roll>
        </a>
        <button
          type="button"
          className={cx('nav__burger', open && 'is-open')}
          aria-expanded={open}
          aria-controls="nav-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="bfk-sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span className="nav__burgerBar" aria-hidden="true" />
          <span className="nav__burgerBar" aria-hidden="true" />
        </button>
      </motion.div>

      <motion.div className="nav__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />

      <AnimatePresence>
        {open && (
          <motion.div
            id="nav-menu"
            className="menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="menu__links" aria-label="Menu">
              {[...nav, { label: 'Reserve', href: '#reserve' }].map((item, i) => (
                <motion.a
                  className="menu__link"
                  href={item.href}
                  key={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ y: '110%', rotate: 6 }}
                  animate={{ y: '0%', rotate: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <Sticker className="menu__sticker menu__sticker--a" src={sticker('cherry-coupe')} width="7rem" rotate={-12} delay={0.5} />
            <Sticker className="menu__sticker menu__sticker--b" shape="polaroid" src={photo('candle-table')} caption="See you tonight" width="9rem" ratio="4/5" rotate={8} delay={0.6} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
