import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type CSSProperties, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion.ts'
import { cx } from '../../utils/cx.ts'
import './Photo.css'

export interface PhotoProps {
  src: string
  alt: string
  /** CSS aspect ratio. Omit to let the parent decide the height. */
  ratio?: string
  /** How the photo arrives as it scrolls in. */
  reveal?: 'wipe' | 'iris' | 'none'
  /** Fraction of travel for the scroll drift inside the frame. 0 disables. */
  parallax?: number
  /** Bracketed corner caption, the "[01]" treatment. */
  caption?: ReactNode
  /** Load eagerly — for the first screen only. */
  priority?: boolean
  /** Film grain on top. */
  grain?: boolean
  className?: string
  style?: CSSProperties
  imgClassName?: string
}

const CLIPS = {
  wipe: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
  iris: { from: 'inset(42% 42% 42% 42% round 999px)', to: 'inset(0% 0% 0% 0% round 0px)' },
} as const

/**
 * A photograph in a frame: it uncovers as it scrolls in, then drifts inside
 * its own crop while the page moves. Photography is the real thing — cut from
 * the reference set by `scripts/extract-references.py`.
 */
export function Photo({
  src,
  alt,
  ratio,
  reveal = 'wipe',
  parallax = 0.1,
  caption,
  priority = false,
  grain = true,
  className,
  style,
  imgClassName,
}: PhotoProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const drift = reduced ? 0 : parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`${-drift * 100}%`, `${drift * 100}%`])
  const clip = reveal === 'none' ? undefined : CLIPS[reveal]

  return (
    <motion.figure
      ref={ref}
      className={cx('bfk-photo', grain && 'bfk-grain', className)}
      style={{ aspectRatio: ratio, ...style }}
      initial={clip ? { clipPath: clip.from } : undefined}
      whileInView={clip ? { clipPath: clip.to } : undefined}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img
        className={cx('bfk-photo__img', imgClassName)}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
        style={{ y, scale: 1 + drift * 2.2 }}
        initial={clip ? { scale: 1.35 } : undefined}
        whileInView={clip ? { scale: 1 + drift * 2.2 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {caption && <figcaption className="bfk-photo__caption">{caption}</figcaption>}
    </motion.figure>
  )
}
