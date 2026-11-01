import { motion, type Variants } from 'framer-motion'
import { cx } from '../../utils/cx.ts'
import './SplitText.css'

/* Stable motion components — creating them during render would remount the
 * element on every pass and restart the animation. */
const TAGS = {
  span: motion.span,
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
} as const

export type SplitTextTag = keyof typeof TAGS

export interface SplitTextProps {
  text: string
  /** Split granularity. `word` is the safe default — `char` only for short lines. */
  by?: 'word' | 'char'
  as?: SplitTextTag
  /** Seconds between units. */
  gap?: number
  delay?: number
  repeat?: boolean
  /** Word indices (0-based) to style differently — e.g. an italic accent word. */
  accentIndices?: number[]
  accentClassName?: string
  className?: string
}

const container = (gap: number, delay: number): Variants => ({
  hidden: {},
  shown: { transition: { staggerChildren: gap, delayChildren: delay } },
})

const unit: Variants = {
  hidden: { y: '115%', opacity: 0 },
  shown: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] },
  },
}

/**
 * Headline that climbs out from behind its own baseline, unit by unit.
 * Reads as one string to screen readers; the split halves are hidden from them.
 */
export function SplitText({
  text,
  by = 'word',
  as = 'span',
  gap = 0.055,
  delay = 0,
  repeat = false,
  accentIndices = [],
  accentClassName,
  className,
}: SplitTextProps) {
  const Tag = TAGS[as]
  const units = by === 'word' ? text.split(' ') : Array.from(text)
  const accent = new Set(accentIndices)

  return (
    <Tag
      className={cx('bfk-split', `bfk-split--${by}`, className)}
      variants={container(gap, delay)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: !repeat, margin: '-8% 0px -8% 0px' }}
    >
      <span className="bfk-sr-only">{text}</span>
      {units.map((value, index) => (
        <span className="bfk-split__clip" key={`${value}-${index}`} aria-hidden="true">
          <motion.span
            className={cx('bfk-split__unit', accent.has(index) && accentClassName)}
            variants={unit}
          >
            {value === ' ' ? ' ' : value}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
