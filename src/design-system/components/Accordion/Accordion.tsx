import { AnimatePresence, motion } from 'framer-motion'
import { useId, useState, type ReactNode } from 'react'
import { cx } from '../../utils/cx.ts'
import './Accordion.css'

export interface AccordionItem {
  id: string
  title: string
  /** Right-aligned detail — a price, an ABV, a time. */
  meta?: ReactNode
  content: ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  /** `single` closes the open row when another opens. */
  mode?: 'single' | 'multiple'
  /** Ids open on first render. */
  defaultOpen?: string[]
  className?: string
}

/** Expandable rows — used for the menu, where each pour hides its recipe. */
export function Accordion({ items, mode = 'single', defaultOpen = [], className }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(defaultOpen)
  const base = `a${useId().replace(/:/g, '')}`

  const toggle = (id: string) =>
    setOpen((current) => {
      if (current.includes(id)) return current.filter((x) => x !== id)
      return mode === 'single' ? [id] : [...current, id]
    })

  return (
    <div className={cx('bfk-accordion', className)}>
      {items.map((item) => {
        const expanded = open.includes(item.id)
        const panelId = `${base}-${item.id}`

        return (
          <div className={cx('bfk-accordion__row', expanded && 'is-open')} key={item.id}>
            <h3 className="bfk-accordion__heading">
              <button
                type="button"
                className="bfk-accordion__trigger"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="bfk-accordion__title">{item.title}</span>
                {item.meta && <span className="bfk-accordion__meta">{item.meta}</span>}
                <span className="bfk-accordion__sign" aria-hidden="true" />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  className="bfk-accordion__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="bfk-accordion__content">{item.content}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
