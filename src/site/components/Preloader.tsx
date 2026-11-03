import { animate, AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { lenisRef } from '@ds/hooks/useLenis.ts'
import { usePrefersReducedMotion } from '@ds/hooks/usePrefersReducedMotion.ts'
import { photo } from '../data/content.ts'
import './Preloader.css'

interface PreloaderProps {
  /** Fires as the curtains begin to part — the hero animates in behind them. */
  onReveal: () => void
}

const EASE = [0.76, 0, 0.24, 1] as const

/**
 * Velvet curtain over the first screen. A counter runs while fonts and the
 * hero load, the logo blooms, then the two halves of the curtain are drawn
 * apart and the room is behind them.
 */
export function Preloader({ onReveal }: PreloaderProps) {
  const reduced = usePrefersReducedMotion()
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'opening' | 'done'>('loading')
  const revealed = useRef(onReveal)
  revealed.current = onReveal

  useEffect(() => {
    const html = document.documentElement
    html.classList.add('is-loading')
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const minimum = reduced ? 300 : 1900
    const counter = animate(0, 100, {
      duration: minimum / 1000,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    const fonts = document.fonts?.ready ?? Promise.resolve()
    const timer = new Promise((resolve) => setTimeout(resolve, minimum))
    let cancelled = false
    let doneTimer = 0

    Promise.all([fonts, timer]).then(() => {
      if (cancelled) return
      setPhase('opening')
      revealed.current()
      html.classList.remove('is-loading')
      lenisRef.current?.start()
      doneTimer = window.setTimeout(() => setPhase('done'), reduced ? 200 : 1500)
    })

    return () => {
      cancelled = true
      counter.stop()
      clearTimeout(doneTimer)
      html.classList.remove('is-loading')
    }
  }, [reduced])

  const opening = phase === 'opening'

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div className="preloader" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <motion.div
            className="preloader__curtain preloader__curtain--left"
            style={{ backgroundImage: `url(${photo('velvet-curtain')})` }}
            animate={opening ? { x: '-102%', skewX: 4 } : { x: '0%', skewX: 0 }}
            transition={{ duration: 1.25, ease: EASE }}
          />
          <motion.div
            className="preloader__curtain preloader__curtain--right"
            style={{ backgroundImage: `url(${photo('velvet-curtain')})` }}
            animate={opening ? { x: '102%', skewX: -4 } : { x: '0%', skewX: 0 }}
            transition={{ duration: 1.25, ease: EASE }}
          />

          <motion.div
            className="preloader__center"
            animate={opening ? { opacity: 0, scale: 1.25, filter: 'blur(10px)' } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <motion.img
              className="preloader__logo"
              src="/brand/logo-crimson.webp"
              alt=""
              initial={{ opacity: 0, scale: 0.86, clipPath: 'inset(0 50% 0 50%)' }}
              animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0%)' }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
            <span className="preloader__count">{String(count).padStart(3, '0')}</span>
            <span className="preloader__line">Leave your worries at the door</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
