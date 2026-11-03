import { motion } from 'framer-motion'
import { useId, type ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Badge.css'

export interface BadgeProps {
  /** Runs round the rim. Repeat a short phrase with bullets so the circle closes. */
  text: string
  /** Sits in the middle — a mark, a word, an arrow. */
  children?: ReactNode
  tone?: 'cherry' | 'cream' | 'olive' | 'wine'
  /** Diameter in px. */
  size?: number
  /** Spins the rim text. */
  spin?: boolean
  /** Seconds per revolution. */
  speed?: number
  /** Resting tilt in degrees. */
  rotate?: number
  /** Turns the badge into a link — the CTA version. */
  href?: string
  label?: string
  className?: string
}

const BUMPS = 26

/** Scalloped disc, like a bottle cap or a cake-shop seal. */
const scallopPath = (() => {
  const r = 92
  const bump = (2 * Math.PI * r) / BUMPS / 2
  let d = ''
  for (let i = 0; i <= BUMPS; i += 1) {
    const a = (i / BUMPS) * Math.PI * 2
    const x = 100 + Math.cos(a) * r
    const y = 100 + Math.sin(a) * r
    d += i === 0 ? `M${x.toFixed(2)} ${y.toFixed(2)}` : ` A${bump.toFixed(2)} ${bump.toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return `${d} Z`
})()

/**
 * Round scalloped seal with text running round the rim — the "EST. 2026"
 * sticker from the moodboard. With `href` it becomes a call to action.
 */
export function Badge({
  text,
  children,
  tone = 'cherry',
  size = 150,
  spin = true,
  speed = 14,
  rotate = 0,
  href,
  label,
  className,
}: BadgeProps) {
  const pathId = `bfk-badge-${useId().replace(/:/g, '')}`

  const body = (
    <>
      <svg className="bfk-badge__svg" viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        {/* White die-cut edge, then the coloured seal. */}
        <path d={scallopPath} className="bfk-badge__edge" />
        <path d={scallopPath} className="bfk-badge__seal" />
        <circle cx="100" cy="100" r="58" className="bfk-badge__ring" />
        <defs>
          <path id={pathId} d="M100 100 m-70 0 a70 70 0 1 1 140 0 a70 70 0 1 1 -140 0" />
        </defs>
        <g className={cx('bfk-badge__rim', spin && 'is-spinning')} style={{ animationDuration: `${speed}s` }}>
          <text className="bfk-badge__text">
            <textPath href={`#${pathId}`} textLength="438" lengthAdjust="spacingAndGlyphs">
              {text}
            </textPath>
          </text>
        </g>
      </svg>
      <span className="bfk-badge__center">{children}</span>
    </>
  )

  const shared = {
    className: cx('bfk-badge', `bfk-badge--${tone}`, href && 'bfk-badge--link', className),
    style: { width: size, height: size },
    initial: { scale: 0, rotate: rotate - 90 },
    whileInView: { scale: 1, rotate },
    viewport: { once: true },
    transition: { type: 'spring' as const, stiffness: 300, damping: 18 },
  }

  return href ? (
    <motion.a href={href} aria-label={label ?? text} data-cursor="Book" whileHover={{ scale: 1.08, rotate: rotate + 8 }} {...shared}>
      {body}
    </motion.a>
  ) : (
    <motion.span aria-hidden={label ? undefined : true} aria-label={label} role={label ? 'img' : undefined} {...shared}>
      {body}
    </motion.span>
  )
}
