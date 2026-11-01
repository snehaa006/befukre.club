import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import { duration, ease, seconds } from '../../tokens/tokens.ts'
import './Reveal.css'

export type RevealEffect = 'rise' | 'fade' | 'mask' | 'blur' | 'scale' | 'wipe'

export interface RevealProps {
  children: ReactNode
  effect?: RevealEffect
  /** Seconds of hold before the animation starts. */
  delay?: number
  /** Replay every time it re-enters the viewport. */
  repeat?: boolean
  /** How far into the viewport before it fires (CSS margin syntax). */
  margin?: string
  className?: string
}

const EASE = [0.16, 1, 0.3, 1] as const

const effects: Record<RevealEffect, Variants> = {
  rise: {
    hidden: { opacity: 0, y: 36 },
    shown: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    shown: { opacity: 1 },
  },
  /* Type climbs out from behind its own edge. Needs overflow clipping. */
  mask: {
    hidden: { y: '110%' },
    shown: { y: '0%' },
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(14px)', y: 18 },
    shown: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 1.08 },
    shown: { opacity: 1, scale: 1 },
  },
  /* Curtain lift — reveals an image from the bottom up. */
  wipe: {
    hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
    shown: { clipPath: 'inset(0% 0% 0% 0%)' },
  },
}

/**
 * Animates its children in as they scroll into view.
 * Honours reduced-motion through the app-level `MotionConfig`.
 */
export function Reveal({
  children,
  effect = 'rise',
  delay = 0,
  repeat = false,
  margin = '-12% 0px -12% 0px',
  className,
}: RevealProps) {
  const clips = effect === 'mask' || effect === 'wipe'

  return (
    <motion.div
      className={cx('bfk-reveal', clips && 'bfk-reveal--clip', className)}
      variants={effects[effect]}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: !repeat, margin }}
      transition={{
        duration: seconds(effect === 'wipe' ? duration.cinematic : duration.slower),
        ease: EASE,
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

export { ease as revealEase }
