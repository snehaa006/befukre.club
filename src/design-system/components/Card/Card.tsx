import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Card.css'

export type CardTone = 'ink' | 'wine' | 'outline' | 'cream'

export interface CardProps {
  children: ReactNode
  tone?: CardTone
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  className?: string
}

/** Generic raised surface. Menu entries, event rows and stat blocks sit on it. */
export function Card({
  children,
  tone = 'ink',
  padding = 'md',
  interactive = false,
  className,
}: CardProps) {
  return (
    <div
      className={cx(
        'bfk-card',
        `bfk-card--${tone}`,
        `bfk-card--pad-${padding}`,
        interactive && 'bfk-card--interactive',
        className,
      )}
    >
      {children}
    </div>
  )
}
