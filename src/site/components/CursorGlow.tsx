import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@ds/hooks/usePrefersReducedMotion.ts'
import './CursorGlow.css'

/**
 * A warm light that trails the pointer, as if the room were lit by one lamp.
 * Mouse-only: skipped on touch and when reduced motion is requested.
 */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.4 })

  useEffect(() => {
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, x, y])

  if (!enabled) return null

  return <motion.div className="cursorGlow" style={{ x: sx, y: sy }} aria-hidden="true" />
}
