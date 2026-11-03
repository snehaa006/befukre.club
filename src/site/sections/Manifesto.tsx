import { animate, motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { manifesto, manifestoImages, sticker } from '../data/content.ts'
import './Manifesto.css'
import { useRange } from '../useRange.ts'

type Token = { kind: 'word'; text: string } | { kind: 'image'; name: string }

const tokens: Token[] = manifesto.text.split(' ').map((part) => {
  const m = part.match(/^\{(\w+)\}$/)
  return m ? { kind: 'image', name: m[1] } : { kind: 'word', text: part }
})

const Word = ({ text, progress, range }: { text: string; progress: MotionValue<number>; range: [number, number] }) => {
  const opacity = useRange(progress, range, [0.13, 1])
  const y = useTransform(progress, range, ['0.12em', '0em'])
  return (
    <motion.span className="manifesto__word" style={{ opacity, y }}>
      {text}
    </motion.span>
  )
}

/** A photo that opens up inside the sentence as it is read. */
const Inline = ({ name, progress, range }: { name: string; progress: MotionValue<number>; range: [number, number] }) => {
  const image = manifestoImages[name]
  const cutout = image?.cutout ?? false
  const width = useTransform(progress, range, ['0em', cutout ? '1.1em' : '1.9em'])
  const rotate = useTransform(progress, range, [-20, cutout ? -8 : 0])
  if (!image) return null
  return (
    <motion.span className={`manifesto__img ${cutout ? 'is-cutout' : ''}`} style={{ width, rotate }} aria-hidden="true">
      <img src={image.src} alt="" loading="lazy" />
    </motion.span>
  )
}

const Count = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const [shown, setShown] = useState(value.replace(/\d/g, '0'))

  useEffect(() => {
    if (!inView) return
    const target = Number(value.replace(/\D/g, ''))
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const digits = String(Math.round(v)).padStart(value.replace(/\D/g, '').length, '0')
        // Re-insert any separators (03:00).
        let k = 0
        setShown(value.replace(/\d/g, () => digits[k++] ?? '0'))
      },
    })
    return () => controls.stop()
  }, [inView, value])

  return <span ref={ref}>{shown}</span>
}

/**
 * The room, as one sentence. Words light up as you read down the page and
 * photographs open inside the line between them.
 */
export function Manifesto() {
  const fine = useFinePointer()
  const section = useRef<HTMLElement>(null)
  const text = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: text, offset: ['start 0.85', 'end 0.5'] })
  const step = 1 / tokens.length

  return (
    <section className="manifesto leather leather--cream" id="room" ref={section} data-nav="dark">
      <header className="manifesto__head">
        <span className="bracket" style={{ ['--bracket-accent' as string]: 'var(--bfk-color-cherry-400)' }}>
          <span className="bracket__n">[03]</span> {manifesto.label}
        </span>
        <span className="manifesto__script script">behind the arch</span>
      </header>

      <p className="manifesto__text poster" ref={text}>
        <span className="bfk-sr-only">{manifesto.text.replace(/\s?\{\w+\}/g, '')}</span>
        <span aria-hidden="true">
          {tokens.map((t, i) => {
            const range: [number, number] = [i * step, Math.min(1, i * step + step * 3)]
            return t.kind === 'word' ? (
              <Word key={i} text={t.text} progress={scrollYProgress} range={range} />
            ) : (
              <Inline key={i} name={t.name} progress={scrollYProgress} range={range} />
            )
          })}
        </span>
      </p>

      <dl className="manifesto__stats">
        {manifesto.stats.map((s) => (
          <div className="manifesto__stat" key={s.label}>
            <dt>{s.label}</dt>
            <dd>
              <Count value={s.value} />
            </dd>
          </div>
        ))}
      </dl>

      <Sticker className="manifesto__s manifesto__s--coupe" src={sticker('spotlight-coupe')} width="clamp(7rem, 12vw, 12rem)" rotate={9} draggable={fine} bounds={section} />
      <Sticker className="manifesto__s manifesto__s--label" shape="label" paper="wine" rotate={-6} draggable={fine} bounds={section} delay={0.2}>
        No sign outside
      </Sticker>
    </section>
  )
}
