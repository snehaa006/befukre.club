import { motion, type Variants } from 'framer-motion'
import { useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { cx } from '../../utils/cx.ts'
import { shapeMask, type MaskedShape } from './shapes.ts'
import './Sticker.css'

export type StickerShape =
  | 'cutout'
  | 'rect'
  | 'arch'
  | 'oval'
  | 'circle'
  | 'polaroid'
  | 'label'
  | MaskedShape

export interface StickerProps {
  /** Image. For `cutout` this is a transparent PNG/WebP that already has its white die-cut edge. */
  src?: string
  alt?: string
  /** Silhouette. `cutout` uses the image's own alpha; the rest frame a photo in white paper. */
  shape?: StickerShape
  /** Text or any node in place of a photo — used by `label` stickers. */
  children?: ReactNode
  /** CSS width of the sticker. Height follows `ratio` (or the image for cutouts). */
  width?: string
  /** Aspect ratio for framed photo stickers, e.g. `"3/4"`. */
  ratio?: string
  /** Resting tilt in degrees. */
  rotate?: number
  /** Handwritten line under a `polaroid`. */
  caption?: string
  /** Lets visitors pick it up and move it. */
  draggable?: boolean
  /** Keeps a dragged sticker inside this element. */
  bounds?: RefObject<Element | null>
  /** Slaps onto the page when it scrolls into view. */
  slap?: boolean
  /** Seconds before the slap. */
  delay?: number
  /** Paper colour behind framed photos and labels. */
  paper?: 'white' | 'cream' | 'cherry' | 'olive' | 'wine'
  className?: string
  style?: CSSProperties
}

/** Stickers stack in the order they were last touched. */
let topZ = 40
export const nextStickerZ = (): number => ++topZ

const paperVariants: Variants = {
  rest: { y: 0, scale: 1 },
  hover: { y: -6, scale: 1.04, transition: { type: 'spring', stiffness: 420, damping: 18 } },
  drag: { y: -10, scale: 1.1, transition: { type: 'spring', stiffness: 420, damping: 18 } },
}

/**
 * A sticker. Either a die-cut cutout (subject + white edge, from
 * `scripts/extract-references.py`) or a photo framed in white paper and cut
 * to a shape — rect, arch, oval, keyhole, scallop, ticket, polaroid.
 *
 * Purely decorative unless given `alt`. Dragging is a pointer toy, so
 * stickers never carry information that isn't also elsewhere on the page.
 */
export function Sticker({
  src,
  alt = '',
  shape = 'cutout',
  children,
  width,
  ratio,
  rotate = 0,
  caption,
  draggable = false,
  bounds,
  slap = true,
  delay = 0,
  paper = 'white',
  className,
  style,
}: StickerProps) {
  const [z, setZ] = useState<number | undefined>(undefined)
  const [dragging, setDragging] = useState(false)
  const masked = shape in shapeMask ? shapeMask[shape as MaskedShape] : undefined
  const decorative = alt === '' && !children

  const vars = {
    width,
    zIndex: z,
    '--sticker-ratio': ratio,
    '--sticker-mask': masked,
  } as CSSProperties

  return (
    <motion.div
      className={cx(
        'bfk-sticker',
        `bfk-sticker--${shape}`,
        `bfk-sticker--paper-${paper}`,
        draggable && 'bfk-sticker--draggable',
        dragging && 'is-dragging',
        className,
      )}
      style={{ ...vars, ...style }}
      aria-hidden={decorative || undefined}
      data-cursor={draggable ? 'Drag' : undefined}
      initial={slap ? { opacity: 0, scale: 1.7, rotate: rotate - 18, y: -30 } : { rotate }}
      whileInView={{ opacity: 1, scale: 1, rotate, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ type: 'spring', stiffness: 520, damping: 24, mass: 0.9, delay }}
      drag={draggable}
      dragConstraints={bounds}
      dragElastic={0.18}
      dragTransition={{ power: 0.25, timeConstant: 220 }}
      onPointerDown={draggable ? () => setZ(nextStickerZ()) : undefined}
      onDragStart={() => setDragging(true)}
      onDragEnd={() => setDragging(false)}
    >
      <motion.div
        className="bfk-sticker__paper"
        variants={paperVariants}
        initial="rest"
        animate={dragging ? 'drag' : 'rest'}
        whileHover={draggable ? 'hover' : undefined}
      >
        {shape === 'label' ? (
          <span className="bfk-sticker__label">{children}</span>
        ) : (
          <>
            {src && (
              <img
                className="bfk-sticker__img"
                src={src}
                alt={alt}
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            )}
            {children}
            {caption && <span className="bfk-sticker__caption">{caption}</span>}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
