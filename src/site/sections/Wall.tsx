import { useRef, useState, type MouseEvent } from 'react'
import { Lace } from '@ds/components/Lace/index.ts'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { slapPool, swatches, wall } from '../data/content.ts'
import './Wall.css'

interface Slapped {
  id: number
  x: number
  y: number
  r: number
  pick: number
}

const MAX_SLAPS = 40

/**
 * The moodboard, made touchable. A cream leather wall with the lace palette
 * card in the middle and the club's stickers all over it — every one can be
 * peeled up and moved, and a click anywhere slaps down another.
 */
export function Wall() {
  const fine = useFinePointer()
  const ref = useRef<HTMLElement>(null)
  const [slaps, setSlaps] = useState<Slapped[]>([])
  const nextId = useRef(0)

  const slapAt = (x: number, y: number) => {
    const id = nextId.current++
    const pick = Math.floor(Math.random() * slapPool.length)
    const r = Math.round(Math.random() * 40 - 20)
    setSlaps((list) => [...list.slice(-(MAX_SLAPS - 1)), { id, x, y, r, pick }])
  }

  const onClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement
    if (target.closest('.bfk-sticker, a, button, .wall__lace')) return
    const rect = event.currentTarget.getBoundingClientRect()
    slapAt(event.clientX - rect.left, event.clientY - rect.top)
  }

  /** Keyboard and screen-reader route to the same toy. */
  const slapRandom = () => {
    const el = ref.current
    if (!el) return
    slapAt(el.offsetWidth * (0.1 + Math.random() * 0.8), el.offsetHeight * (0.2 + Math.random() * 0.7))
  }

  return (
    <section className="wall leather leather--cream" id="wall" ref={ref} onClick={onClick} data-cursor="Slap" data-nav="dark">
      <header className="wall__head">
        <span className="bracket" style={{ ['--bracket-accent' as string]: 'var(--bfk-color-cherry-400)' }}>
          <span className="bracket__n">[08]</span> The wall
        </span>
        <h2 className="wall__title poster" aria-label="The wall">
          The <span>wall</span>
        </h2>
        <p className="wall__hint">
          {fine ? 'Peel anything off and move it. Click the leather to slap down another.' : 'Tap the leather to slap down another sticker.'}{' '}
          <button type="button" className="wall__button" onClick={slapRandom}>
            Slap one
          </button>
          <span className="wall__count" aria-live="polite">
            {slaps.length > 0 && `${slaps.length} added`}
          </span>
        </p>
      </header>

      <div className="wall__lace">
        <Lace scallop={11}>
          <ul className="wall__swatches" aria-label="House colours">
            {swatches.map((s) => (
              <li className="wall__swatch" key={s.name} style={{ background: s.hex }}>
                <img src={s.image} alt="" loading="lazy" />
                <span>{s.name}</span>
              </li>
            ))}
          </ul>
        </Lace>
      </div>

      {wall.map((item, i) => {
        const place = { position: 'absolute', left: `${item.x}%`, top: `${item.y}%` } as const
        const delay = (i % 6) * 0.08
        if (item.kind === 'cutout')
          return <Sticker key={i} className="wall__item" src={item.src} width={item.width} rotate={item.r} draggable={fine} bounds={ref} delay={delay} style={place} />
        if (item.kind === 'label')
          return (
            <Sticker key={i} className="wall__item" shape="label" paper={item.paper} rotate={item.r} draggable={fine} bounds={ref} delay={delay} style={place}>
              {item.text}
            </Sticker>
          )
        return (
          <Sticker
            key={i}
            className="wall__item"
            shape={item.shape}
            src={item.src}
            width={item.width}
            ratio={item.ratio}
            caption={item.caption}
            rotate={item.r}
            draggable={fine}
            bounds={ref}
            delay={delay}
            style={place}
          />
        )
      })}

      {slaps.map((s) => {
        const pick = slapPool[s.pick]
        return (
          <div className="wall__slap" key={s.id} style={{ left: s.x, top: s.y }}>
            <Sticker src={pick.src} shape={pick.shape ?? 'cutout'} ratio={pick.ratio} width={pick.width} rotate={s.r} draggable={fine} bounds={ref} />
          </div>
        )
      })}
    </section>
  )
}
