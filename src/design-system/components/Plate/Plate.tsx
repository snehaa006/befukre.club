import { motion } from 'framer-motion'
import { useId, type ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import { useParallax } from '../../hooks/useParallax.ts'
import { SUBJECTS, type PlateSubject } from './subjects.tsx'
import './Plate.css'

export type PlateRatio = '2/3' | '3/4' | '4/5' | '1/1' | '4/3' | '16/9' | '21/9'
export type PlateTone = 'noir' | 'ember' | 'wine' | 'gold'

export interface PlateProps {
  subject?: PlateSubject
  ratio?: PlateRatio
  tone?: PlateTone
  /** Micro caption pinned to the bottom edge, as in the reference sheets. */
  caption?: ReactNode
  /** Micro label pinned to the top-right corner. */
  corner?: ReactNode
  frame?: 'none' | 'hairline' | 'inset'
  /** Doorway silhouette — crops the top into an arch. */
  arch?: boolean
  /** Drifts the art against the scroll. */
  parallax?: boolean
  /** Lifts and warms on hover. Use for anything clickable. */
  interactive?: boolean
  className?: string
}

/**
 * The image surface of the site. Each plate renders a drawn subject over a
 * graded field with grain on top, so artwork always matches the palette.
 */
export function Plate({
  subject = 'coupe',
  ratio = '3/4',
  tone = 'noir',
  caption,
  corner,
  frame = 'none',
  arch = false,
  parallax = false,
  interactive = false,
  className,
}: PlateProps) {
  // React ids contain colons, which are unsafe inside SVG url() references.
  const id = `p${useId().replace(/:/g, '')}`
  const Subject = SUBJECTS[subject]
  const { ref, y } = useParallax<HTMLDivElement>(parallax ? 44 : 0)

  return (
    <figure
      ref={ref}
      className={cx(
        'bfk-plate',
        `bfk-plate--${tone}`,
        `bfk-plate--frame-${frame}`,
        arch && 'bfk-plate--arch',
        interactive && 'bfk-plate--interactive',
        'bfk-grain',
        className,
      )}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      <motion.div className="bfk-plate__field" style={parallax ? { y } : undefined}>
        <svg
          className="bfk-plate__art"
          viewBox="0 0 400 520"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          focusable="false"
        >
          <Subject id={id} />
        </svg>
      </motion.div>

      {corner && <span className="bfk-plate__corner">{corner}</span>}
      {caption && <figcaption className="bfk-plate__caption">{caption}</figcaption>}
    </figure>
  )
}

export type { PlateSubject }
