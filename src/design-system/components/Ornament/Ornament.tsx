import { cx } from '../../utils/cx.ts'
import './Ornament.css'

export type OrnamentVariant = 'rule' | 'diamond' | 'crest' | 'dots'

export interface OrnamentProps {
  variant?: OrnamentVariant
  tone?: 'gold' | 'subtle' | 'ember'
  className?: string
}

/**
 * Hairline dividers and small gilt marks. The references separate blocks with
 * a thin gold line and a centred motif rather than whitespace alone.
 */
export function Ornament({ variant = 'rule', tone = 'gold', className }: OrnamentProps) {
  return (
    <div
      className={cx('bfk-ornament', `bfk-ornament--${variant}`, `bfk-ornament--${tone}`, className)}
      role="separator"
    >
      {variant === 'diamond' && <span className="bfk-ornament__mark" aria-hidden="true" />}
      {variant === 'crest' && (
        <svg className="bfk-ornament__crest" viewBox="0 0 40 24" aria-hidden="true">
          {/* A doorway in miniature — the house motif. */}
          <path
            d="M20 2c-5 0-9 4-9 9v11h18V11c0-5-4-9-9-9Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M20 8v14M14 13h12" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
        </svg>
      )}
      {variant === 'dots' && (
        <span className="bfk-ornament__dots" aria-hidden="true">
          <i /><i /><i />
        </span>
      )}
    </div>
  )
}
