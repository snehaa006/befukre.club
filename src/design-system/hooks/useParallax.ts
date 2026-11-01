import { useRef } from 'react'
import { useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.ts'

export interface ParallaxResult<T extends HTMLElement = HTMLDivElement> {
  ref: React.RefObject<T | null>
  /** Spring-smoothed pixel offset to feed a `style={{ y }}`. */
  y: MotionValue<number>
  /** Raw 0→1 progress of the element through the viewport. */
  progress: MotionValue<number>
}

/**
 * Vertical parallax tied to an element's travel through the viewport.
 *
 * @param distance peak offset in px; negative moves against the scroll.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  distance = 80,
): ParallaxResult<T> {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  const springY = useSpring(raw, { stiffness: 120, damping: 28, mass: 0.6 })
  // Hooks must run unconditionally, so build both and choose after.
  const still = useTransform(scrollYProgress, () => 0)

  return { ref, y: reduced ? still : springY, progress: scrollYProgress }
}
