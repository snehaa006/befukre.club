import { cx } from '../../utils/cx.ts'
import './Logo.css'

export interface LogoProps {
  variant?: 'mark' | 'wordmark' | 'lockup'
  size?: 'sm' | 'md' | 'lg'
  tone?: 'cream' | 'olive' | 'ink'
  /** Sub-line under the wordmark. */
  tagline?: string
  className?: string
}

/** Nested arches — the doorway motif reduced to three strokes. */
const Mark = () => (
  <svg className="bfk-logo__mark" viewBox="0 0 48 58" aria-hidden="true" focusable="false">
    <path d="M3 58V23a21 21 0 0 1 42 0v35" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 58V26a10 10 0 0 1 20 0v32" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <path d="M24 58V16" fill="none" stroke="currentColor" strokeWidth="1.1" />
  </svg>
)

/**
 * The house identity. `lockup` is the full stacked signature for the hero and
 * footer; `wordmark` is for the nav bar.
 */
export function Logo({
  variant = 'lockup',
  size = 'md',
  tone = 'cream',
  tagline = 'cocktail club',
  className,
}: LogoProps) {
  return (
    <span
      className={cx('bfk-logo', `bfk-logo--${variant}`, `bfk-logo--${size}`, `bfk-logo--${tone}`, className)}
    >
      {variant !== 'wordmark' && <Mark />}
      {variant !== 'mark' && (
        <span className="bfk-logo__text">
          <span className="bfk-logo__word">BEFUKRE</span>
          {variant === 'lockup' && tagline && <span className="bfk-logo__tagline">{tagline}</span>}
        </span>
      )}
      <span className="bfk-sr-only">BEFUKRE cocktail club</span>
    </span>
  )
}
