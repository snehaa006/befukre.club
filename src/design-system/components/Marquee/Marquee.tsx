import { Children, type ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Marquee.css'

export interface MarqueeProps {
  children: ReactNode
  /** Seconds for one full pass. Higher is slower. */
  speed?: number
  direction?: 'left' | 'right'
  /** Mark between repeated items. */
  separator?: ReactNode
  pauseOnHover?: boolean
  /** Fades both ends into the background. */
  fade?: boolean
  className?: string
}

/**
 * Endless horizontal ticker. The track is rendered twice and translated by
 * exactly half its width, so the seam never shows.
 */
export function Marquee({
  children,
  speed = 38,
  direction = 'left',
  separator,
  pauseOnHover = true,
  fade = true,
  className,
}: MarqueeProps) {
  const items = Children.toArray(children)

  const track = (key: string) => (
    <div className="bfk-marquee__track" key={key} aria-hidden={key === 'clone'}>
      {items.map((child, i) => (
        <span className="bfk-marquee__item" key={`${key}-${i}`}>
          {child}
          {separator && <span className="bfk-marquee__sep">{separator}</span>}
        </span>
      ))}
    </div>
  )

  return (
    <div
      className={cx(
        'bfk-marquee',
        `bfk-marquee--${direction}`,
        pauseOnHover && 'bfk-marquee--pausable',
        fade && 'bfk-marquee--fade',
        className,
      )}
      style={{ ['--bfk-marquee-speed' as string]: `${speed}s` }}
    >
      {track('a')}
      {track('clone')}
    </div>
  )
}
