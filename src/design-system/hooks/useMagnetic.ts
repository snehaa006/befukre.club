import { useRef } from 'react'
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion'
import { usePrefersReducedMotion } from './usePrefersReducedMotion.ts'

export interface MagneticResult<T extends HTMLElement> {
  ref: React.RefObject<T | null>
  x: MotionValue<number>
  y: MotionValue<number>
  onPointerMove: (event: React.PointerEvent<T>) => void
  onPointerLeave: () => void
}

/**
 * Pulls an element toward the cursor while it hovers — used on the primary
 * calls to action so they feel physically attracted to the pointer.
 *
 * @param strength fraction of the cursor offset to follow (0–1).
 */
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>(
  strength = 0.35,
): MagneticResult<T> {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spring = { stiffness: 260, damping: 20, mass: 0.5 }
  const x = useSpring(mx, spring)
  const y = useSpring(my, spring)

  const onPointerMove = (event: React.PointerEvent<T>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    mx.set((event.clientX - (rect.left + rect.width / 2)) * strength)
    my.set((event.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onPointerLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return { ref, x, y, onPointerMove, onPointerLeave }
}
