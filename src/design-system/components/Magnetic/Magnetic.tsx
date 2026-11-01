import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic.ts'
import { cx } from '../../utils/cx.ts'
import './Magnetic.css'

export interface MagneticProps {
  children: ReactNode
  /** Fraction of the cursor offset the element follows (0–1). */
  strength?: number
  className?: string
}

/**
 * Wraps a control so it drifts toward the cursor on hover.
 * Inert when the visitor prefers reduced motion.
 */
export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const { ref, x, y, onPointerMove, onPointerLeave } = useMagnetic<HTMLSpanElement>(strength)

  return (
    <motion.span
      ref={ref}
      className={cx('bfk-magnetic', className)}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.span>
  )
}
