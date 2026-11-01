import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@ds/components/Button/index.ts'
import { Logo } from '@ds/components/Logo/index.ts'
import { cx } from '@ds/utils/cx.ts'
import { nav } from '../data/content.ts'
import './Nav.css'

/**
 * Fixed header. Retreats when the visitor scrolls down into the content and
 * returns the moment they scroll back up, so it is never in the way.
 */
export function Nav() {
  const { scrollY, scrollYProgress } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Hold the page still behind the open menu.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  // Close on Escape, as any dialog-like overlay should.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setSolid(y > 40)
    // Never hide while the mobile menu is open.
    setHidden(!menuOpen && y > previous && y > 220)
  })

  return (
    <>
      <motion.header
        className={cx('nav', solid && 'nav--solid')}
        initial={{ y: -100 }}
        animate={{ y: hidden ? -110 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav__inner">
          <a className="nav__brand" href="#top" aria-label="BEFUKRE — home">
            <Logo variant="wordmark" size="sm" />
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.map((item) => (
              <a className="nav__link" href={item.href} key={item.href}>
                <span className="nav__linkLabel">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <Button href="#reserve" variant="outline" size="sm" className="nav__cta">
              Reserve
            </Button>
            <button
              type="button"
              className={cx('nav__burger', menuOpen && 'is-open')}
              aria-expanded={menuOpen}
              aria-controls="nav-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="bfk-sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span className="nav__burgerBar nav__burgerBar--top" aria-hidden="true" />
              <span className="nav__burgerBar nav__burgerBar--bottom" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Reading progress, as a gilt hairline. */}
        <motion.div className="nav__progress" style={{ scaleX: scrollYProgress }} />
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-menu"
            className="nav__overlay bfk-grain"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav className="nav__overlayLinks" aria-label="Primary, expanded">
              {[...nav, { label: 'Reserve', href: '#reserve' }].map((item, i) => (
                <motion.a
                  className="nav__overlayLink"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
