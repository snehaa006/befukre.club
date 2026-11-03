import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Eyebrow.css'

export interface EyebrowProps {
  children: ReactNode
  /** Hairline rules flanking the label, as in the reference corner captions. */
  rule?: 'none' | 'before' | 'after' | 'both'
  tone?: 'muted' | 'olive' | 'cherry' | 'primary'
  className?: string
}

/**
 * The wide-tracked micro caption that labels almost everything in this
 * design language — corners, section openers, nav groups.
 */
export function Eyebrow({ children, rule = 'none', tone = 'muted', className }: EyebrowProps) {
  return (
    <span
      className={cx('bfk-eyebrow', `bfk-eyebrow--rule-${rule}`, `bfk-eyebrow--${tone}`, className)}
    >
      <span className="bfk-eyebrow__label">{children}</span>
    </span>
  )
}
