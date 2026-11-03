import { useScroll, useSpring, useTransform, useVelocity, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.ts'

/**
 * Skew in degrees driven by how fast the page is scrolling — things lean into
 * a fast flick and settle when it stops. Zero under reduced motion.
 *
 * @param max largest lean, in degrees.
 */
export function useScrollSkew(max = 5): MotionValue<number> {
  const reduced = usePrefersReducedMotion()
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { stiffness: 120, damping: 30, mass: 0.4 })
  const limit = reduced ? 0 : max
  return useTransform(smooth, [-2400, 0, 2400], [limit, 0, -limit], { clamp: true })
}
