import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { usePrefersReducedMotion } from '@ds/hooks/usePrefersReducedMotion.ts'
import './Cursor.css'

type Mode = 'idle' | 'link' | 'label'

/**
 * A cherry dot with a trailing ring. Over anything marked `data-cursor` the
 * ring swells and says what will happen — Drag, Book, Slap. Mouse only.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })
  const [mode, setMode] = useState<Mode>('idle')
  const [label, setLabel] = useState('')
  const [down, setDown] = useState(false)
  const active = fine && !reduced

  useEffect(() => {
    if (!active) return
    const html = document.documentElement
    html.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const el = e.target as HTMLElement | null
      const tagged = el?.closest<HTMLElement>('[data-cursor]')
      if (tagged) {
        setMode('label')
        setLabel(tagged.dataset.cursor ?? '')
        return
      }
      setMode(el?.closest('a, button, label, [role="button"]') ? 'link' : 'idle')
    }
    const press = () => setDown(true)
    const release = () => setDown(false)
    const leave = () => {
      x.set(-100)
      y.set(-100)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    window.addEventListener('pointerdown', press)
    window.addEventListener('pointerup', release)
    document.addEventListener('pointerleave', leave)
    return () => {
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', press)
      window.removeEventListener('pointerup', release)
      document.removeEventListener('pointerleave', leave)
    }
  }, [active, x, y])

  if (!active) return null

  const size = mode === 'label' ? 92 : mode === 'link' ? 54 : 34

  return (
    <div className="cursor" aria-hidden="true">
      <motion.div className="cursor__dot" style={{ x, y }} animate={{ scale: down ? 0.5 : mode === 'label' ? 0 : 1 }} />
      <motion.div
        className={`cursor__ring cursor__ring--${mode}`}
        style={{ x: ringX, y: ringY }}
        animate={{ width: size, height: size, scale: down ? 0.85 : 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {mode === 'label' && <span className="cursor__label">{label}</span>}
      </motion.div>
    </div>
  )
}
