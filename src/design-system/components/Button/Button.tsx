import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import { Magnetic } from '../Magnetic/Magnetic.tsx'
import './Button.css'

export type ButtonVariant = 'solid' | 'cherry' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  /** Trailing arrow that slides on hover. */
  withArrow?: boolean
  /** Drifts toward the cursor on hover. Reserve it for primary actions. */
  magnetic?: boolean
  fullWidth?: boolean
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const Arrow = () => (
  <svg className="bfk-button__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

/**
 * The club's call to action. `solid` is the house burgundy; keep `cherry`
 * for the single most important action on a screen.
 */
export function Button({
  children,
  variant = 'solid',
  size = 'md',
  withArrow = false,
  magnetic = false,
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cx(
    'bfk-button',
    `bfk-button--${variant}`,
    `bfk-button--${size}`,
    fullWidth && 'bfk-button--full',
    className,
  )

  const inner = (
    <>
      {/* Sweep layer for the hover fill — sits under the label. */}
      <span className="bfk-button__sweep" aria-hidden="true" />
      <span className="bfk-button__label">{children}</span>
      {withArrow && <Arrow />}
    </>
  )

  const element =
    rest.href !== undefined ? (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    ) : (
      <button
        type="button"
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {inner}
      </button>
    )

  return magnetic ? <Magnetic strength={0.3}>{element}</Magnetic> : element
}
