import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '@ds/hooks/usePrefersReducedMotion.ts'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

interface ScrollMarqueeProps {
  children: ReactNode
  /** Percent of one copy per second. Sign sets the resting direction. */
  baseVelocity?: number
  className?: string
}

/**
 * Endless ticker that runs faster — and flips direction — with the scroll.
 * Two copies of the content, wrapped at exactly one copy's width.
 */
export function ScrollMarquee({ children, baseVelocity = -2, className }: ScrollMarqueeProps) {
  const reduced = usePrefersReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduced) return
    let move = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    move += direction.current * move * f
    baseX.set(baseX.get() + move)
  })

  return (
    <div className={className} style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
      <motion.div style={{ x, display: 'inline-flex', flexWrap: 'nowrap' }}>
        <span style={{ display: 'inline-flex', flex: 'none' }}>{children}</span>
        <span style={{ display: 'inline-flex', flex: 'none' }} aria-hidden="true">
          {children}
        </span>
      </motion.div>
    </div>
  )
}
