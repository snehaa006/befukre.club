import type { ComponentPropsWithoutRef, ElementType } from 'react'

/**
 * Props for a component that can render as any element via `as`.
 * Own props win; the rest are inherited from the rendered element.
 */
export type PolymorphicProps<E extends ElementType, OwnProps> = OwnProps & {
  as?: E
} & Omit<ComponentPropsWithoutRef<E>, keyof OwnProps | 'as'>
