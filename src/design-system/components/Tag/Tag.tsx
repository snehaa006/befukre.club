import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Tag.css'

export interface TagProps {
  children: ReactNode
  tone?: 'gold' | 'wine' | 'ember' | 'neutral'
  /** Filled reads louder; outline is the default for lists of many. */
  fill?: boolean
  className?: string
}

/** Small capsule for a category, ABV, or an event status. */
export function Tag({ children, tone = 'gold', fill = false, className }: TagProps) {
  return (
    <span className={cx('bfk-tag', `bfk-tag--${tone}`, fill && 'bfk-tag--fill', className)}>
      {children}
    </span>
  )
}
