import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Lace.css'

export interface LaceProps {
  children: ReactNode
  /** Radius of each scallop, px. Everything else scales from it. */
  scallop?: number
  tone?: 'cream' | 'white' | 'wine'
  className?: string
  style?: CSSProperties
}

/** One lap of clockwise scallops along a straight edge. */
const edge = (x0: number, y0: number, x1: number, y1: number, r: number) => {
  const len = Math.hypot(x1 - x0, y1 - y0)
  const n = Math.max(1, Math.round(len / (r * 2)))
  const step = len / n
  const ux = (x1 - x0) / len
  const uy = (y1 - y0) / len
  let d = ''
  for (let i = 1; i <= n; i += 1) {
    const x = x0 + ux * step * i
    const y = y0 + uy * step * i
    d += ` A${(step / 2).toFixed(2)} ${(step / 2).toFixed(2)} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`
  }
  return d
}

const hole = (cx: number, cy: number, r: number) =>
  ` M${(cx - r).toFixed(2)} ${cy.toFixed(2)} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`

/** Eyelets punched in a ring, `inset` px in from the scallop base. */
const ring = (w: number, h: number, inset: number, gap: number, r: number) => {
  let d = ''
  const x0 = inset
  const y0 = inset
  const x1 = w - inset
  const y1 = h - inset
  const lap = (ax: number, ay: number, bx: number, by: number) => {
    const len = Math.hypot(bx - ax, by - ay)
    const n = Math.max(1, Math.round(len / gap))
    for (let i = 0; i < n; i += 1) {
      d += hole(ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n, r)
    }
  }
  lap(x0, y0, x1, y0)
  lap(x1, y0, x1, y1)
  lap(x1, y1, x0, y1)
  lap(x0, y1, x0, y0)
  return d
}

const build = (w: number, h: number, r: number) => {
  const o = r
  let d = `M${o} ${o}`
  d += edge(o, o, w - o, o, r)
  d += edge(w - o, o, w - o, h - o, r)
  d += edge(w - o, h - o, o, h - o, r)
  d += edge(o, h - o, o, o, r)
  d += ' Z'
  // Two rows of eyelets — big then fine — read as crochet at a glance.
  d += ring(w, h, o + r * 1.15, r * 1.3, r * 0.34)
  d += ring(w, h, o + r * 2.15, r * 0.95, r * 0.16)
  return d
}

/**
 * Paper doily frame — scalloped edge and punched eyelets — after the lace
 * card in the sticker moodboard. The outline is drawn to the element's real
 * size, so scallops stay round at any aspect ratio.
 */
export function Lace({ children, scallop = 12, tone = 'cream', className, style }: LaceProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => setSize({ w: el.offsetWidth, h: el.offsetHeight })
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cx('bfk-lace', `bfk-lace--${tone}`, className)}
      style={{ ['--lace-r' as string]: `${scallop}px`, ...style }}
    >
      {size && (
        <svg
          className="bfk-lace__paper"
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          aria-hidden="true"
          focusable="false"
        >
          <path d={build(size.w, size.h, scallop)} fillRule="evenodd" />
          <rect
            x={scallop * 3.8}
            y={scallop * 3.8}
            width={Math.max(0, size.w - scallop * 7.6)}
            height={Math.max(0, size.h - scallop * 7.6)}
            className="bfk-lace__stitch"
          />
        </svg>
      )}
      <div className="bfk-lace__content">{children}</div>
    </div>
  )
}
