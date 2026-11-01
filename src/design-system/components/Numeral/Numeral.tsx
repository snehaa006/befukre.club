import { cx } from '../../utils/cx.ts'
import './Numeral.css'

export interface NumeralProps {
  children: string
  size?: 'md' | 'lg' | 'xl'
  tone?: 'primary' | 'gold' | 'ember' | 'outline'
  className?: string
}

/**
 * Oversized Playfair figures for dates and times — the "14/10 … 11:30"
 * treatment from the invitation references.
 */
export function Numeral({ children, size = 'lg', tone = 'primary', className }: NumeralProps) {
  return (
    <span className={cx('bfk-numeral', `bfk-numeral--${size}`, `bfk-numeral--${tone}`, className)}>
      {children}
    </span>
  )
}
