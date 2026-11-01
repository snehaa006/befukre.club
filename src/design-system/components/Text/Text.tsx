import type { ElementType } from 'react'
import { cx } from '../../utils/cx.ts'
import type { PolymorphicProps } from '../../utils/polymorphic.ts'
import './Text.css'

export type TextVariant =
  /* Playfair, set tight and large. The club's shouting voice. */
  | 'display-xl'
  | 'display-lg'
  | 'display-md'
  | 'display-sm'
  /* Section and card headings. */
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  /* Cormorant, for the editorial opening line of a section. */
  | 'lead'
  /* Jost, the reading and UI voice. */
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  /* Wide-tracked micro caps — corner labels, nav, overlines. */
  | 'eyebrow'
  /* Mrs Saint Delafield. One word at a time. */
  | 'script'

export type TextTone =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'faint'
  | 'gold'
  | 'ember'
  | 'wine'
  | 'onBone'
  | 'inherit'

export interface TextOwnProps {
  variant?: TextVariant
  tone?: TextTone
  align?: 'start' | 'center' | 'end'
  italic?: boolean
  /** Constrains the measure to a comfortable reading width. */
  measure?: boolean
  className?: string
}

const DEFAULT_TAG = {
  'display-xl': 'h1',
  'display-lg': 'h1',
  'display-md': 'h2',
  'display-sm': 'h2',
  'title-lg': 'h3',
  'title-md': 'h3',
  'title-sm': 'h4',
  lead: 'p',
  'body-lg': 'p',
  body: 'p',
  'body-sm': 'p',
  caption: 'p',
  eyebrow: 'span',
  script: 'span',
} as const satisfies Record<TextVariant, ElementType>

/**
 * The single typography primitive. Everything that sets type goes through it,
 * so the scale stays closed and nothing invents its own font-size.
 */
export function Text<E extends ElementType = 'p'>({
  as,
  variant = 'body',
  tone = 'inherit',
  align,
  italic,
  measure,
  className,
  ...rest
}: PolymorphicProps<E, TextOwnProps>) {
  const Tag = (as ?? DEFAULT_TAG[variant]) as ElementType

  return (
    <Tag
      className={cx(
        'bfk-text',
        `bfk-text--${variant}`,
        tone !== 'inherit' && `bfk-text--tone-${tone}`,
        align && `bfk-text--align-${align}`,
        italic && 'bfk-text--italic',
        measure && 'bfk-text--measure',
        className,
      )}
      {...rest}
    />
  )
}
