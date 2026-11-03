import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { useRef, type PointerEvent } from 'react'
import { Badge } from '@ds/components/Badge/index.ts'
import { Sticker } from '@ds/components/Sticker/index.ts'
import { useFinePointer } from '@ds/hooks/useFinePointer.ts'
import { useReady } from '../ready.ts'
import { club, hero, photo, sticker } from '../data/content.ts'
import './Hero.css'
import { useRange } from '../useRange.ts'

const line: Variants = {
  hidden: {},
  shown: (i: number) => ({ transition: { staggerChildren: 0.035, delayChildren: 0.25 + i * 0.12 } }),
}

const char: Variants = {
  hidden: { y: '105%', rotate: 10, opacity: 0 },
  shown: { y: '0%', rotate: 0, opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
}

const Arrow = () => (
  <svg className="cta__arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M2 10 10 2M4 2h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/**
 * The first screen. Velvet behind, a cherry spotlight that follows the mouse,
 * a photo cut into an arch and a pile of stickers slapped round it. The
 * headline is set enormous along the bottom edge and the lines shear apart as
 * the page scrolls away.
 */
export function Hero() {
  const ready = useReady()
  const fine = useFinePointer()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const x0 = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const shifts = [x0, x1, x2]
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const archY = useTransform(scrollYProgress, [0, 1], [0, -160])
  const archRotate = useTransform(scrollYProgress, [0, 1], [0, 14])
  const fade = useRange(scrollYProgress, [0, 0.8], [1, 0.2])

  const onMove = (event: PointerEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width) * 100}%`)
    el.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  }

  const state = ready ? 'shown' : 'hidden'

  return (
    <section className="hero" id="top" ref={ref} onPointerMove={fine ? onMove : undefined}>
      <motion.div className="hero__bg" style={{ y: bgY }} aria-hidden="true">
        <motion.img
          src={photo('velvet-curtain')}
          alt=""
          initial={{ scale: 1.3 }}
          animate={{ scale: ready ? 1.05 : 1.3 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
      <div className="hero__spot" aria-hidden="true" />

      <motion.div
        className="hero__top"
        initial={{ opacity: 0, y: 20 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.9 }}
        style={{ opacity: fade }}
      >
        <p className="hero__intro">
          <span className="bracket"><span className="bracket__n">[01]</span></span> {hero.intro}
        </p>
        <p className="hero__note">
          <span className="bracket"><span className="bracket__n">[02]</span></span> {hero.note}
        </p>
      </motion.div>

      {/* The arch and its sticker pile travel together. */}
      <motion.div className="hero__arch" style={{ y: archY, rotate: archRotate }}>
        {ready && (
          <>
            <Sticker
              className="hero__archPhoto"
              shape="arch"
              src={hero.arch}
              alt="A woman in a copper dress stands still in a blur of moving guests"
              ratio="3/4"
              width="100%"
              rotate={-4}
              draggable={fine}
              delay={0.35}
            />
            <Badge
              className="hero__badge"
              text="EST. 2026 ✦ HAUZ KHAS VILLAGE ✦ NEW DELHI ✦ "
              tone="cream"
              size={128}
              rotate={-10}
            >
              <span className="hero__badgeMark">✦</span>
            </Badge>
            <Sticker className="hero__s hero__s--coupe" src={sticker('cherry-coupe')} width="clamp(5.5rem, 10vw, 10rem)" rotate={-14} draggable={fine} delay={0.6} />
            <Sticker className="hero__s hero__s--stem" src={sticker('cherry-stem')} width="clamp(2.4rem, 3.6vw, 3.6rem)" rotate={18} draggable={fine} delay={0.75} />
            <Sticker className="hero__s hero__s--lamp" src={sticker('lamp')} width="clamp(3.6rem, 5vw, 5.2rem)" rotate={8} draggable={fine} delay={0.85} />
            <Sticker className="hero__s hero__s--tag" shape="label" paper="cherry" rotate={-7} draggable={fine} delay={0.95}>
              No tricks, just taste
            </Sticker>
            <Sticker className="hero__s hero__s--hours" shape="label" paper="olive" rotate={6} draggable={fine} delay={1.05}>
              Pouring till 3am
            </Sticker>
          </>
        )}
      </motion.div>

      <h1 className="hero__title">
        <span className="bfk-sr-only">{hero.lines.join(' ')}</span>
        {hero.lines.map((text, i) => (
          <motion.span className={`hero__line hero__line--${i}`} key={text} style={{ x: shifts[i] }} aria-hidden="true">
            <motion.span className="hero__clip" variants={line} custom={i} initial="hidden" animate={state}>
              {Array.from(text).map((c, j) => (
                <motion.span className="hero__char" variants={char} key={`${c}-${j}`}>
                  {c === ' ' ? ' ' : c}
                </motion.span>
              ))}
            </motion.span>
          </motion.span>
        ))}
        <motion.span
          className="hero__script script"
          aria-hidden="true"
          initial={{ clipPath: 'inset(-20% 100% -20% 0%)' }}
          animate={ready ? { clipPath: 'inset(-20% 0% -20% 0%)' } : {}}
          transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 1.1 }}
        >
          {hero.script}
        </motion.span>
      </h1>

      <motion.div
        className="hero__actions"
        initial={{ opacity: 0, y: 30 }}
        animate={ready ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="hero__meaning">{club.meaning}</p>
        <a className="cta" href="#room">
          {hero.cta} <Arrow />
        </a>
      </motion.div>
    </section>
  )
}
