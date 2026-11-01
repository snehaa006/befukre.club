import type { ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './ArchFrame.css'

export interface ArchFrameProps {
  children: ReactNode
  tone?: 'wine' | 'ink' | 'bone'
  /** Gilt rule held inside the edge. */
  bordered?: boolean
  /** Narrower shoulders — reads as a keyhole rather than a doorway. */
  keyhole?: boolean
  className?: string
}

/**
 * The doorway. Borrowed from the arched-entrance references and used wherever
 * the site wants to frame something as an invitation.
 */
export function ArchFrame({
  children,
  tone = 'wine',
  bordered = true,
  keyhole = false,
  className,
}: ArchFrameProps) {
  return (
    <div
      className={cx(
        'bfk-arch',
        `bfk-arch--${tone}`,
        bordered && 'bfk-arch--bordered',
        keyhole && 'bfk-arch--keyhole',
        'bfk-grain',
        className,
      )}
    >
      <div className="bfk-arch__inner">{children}</div>
    </div>
  )
}
