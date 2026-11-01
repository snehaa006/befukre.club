import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Reveal.css'

export interface StaggerProps {
  children: ReactNode
  /** Seconds between each child. */
  gap?: number
  /** Seconds before the first child moves. */
  delay?: number
  repeat?: boolean
  className?: string
}

const container = (gap: number, delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

/** Parent that releases its `StaggerItem` children one after another. */
export function Stagger({ children, gap = 0.09, delay = 0, repeat = false, className }: StaggerProps) {
  return (
    <motion.div
      className={cx('bfk-stagger', className)}
      variants={container(gap, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: !repeat, margin: '-10% 0px -10% 0px' }}
    >
      {children}
    </motion.div>
  )
}

export interface StaggerItemProps {
  children: ReactNode
  className?: string
}

/** A single beat inside a `Stagger`. */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div className={cx('bfk-stagger__item', className)} variants={item}>
      {children}
    </motion.div>
  )
}
