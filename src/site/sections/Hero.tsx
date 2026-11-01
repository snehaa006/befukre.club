import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@ds/components/Button/index.ts'
import { Eyebrow } from '@ds/components/Eyebrow/index.ts'
import { Plate } from '@ds/components/Plate/index.ts'
import { SplitText } from '@ds/components/SplitText/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { hero, club } from '../data/content.ts'
import './Hero.css'

const RISE = {
  hidden: { y: 24, opacity: 0 },
  shown: { y: 0, opacity: 1 },
}

/**
 * Full-height opening. The backdrop drifts and dims as the page scrolls away,
 * so the hero reads as a room you are stepping out of rather than a banner.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const backdropScale = useTransform(scrollYProgress, [0, 1], [1, 1.14])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90])
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section className="hero bfk-vignette" id="top" ref={ref}>
      <motion.div className="hero__backdrop" style={{ y: backdropY, scale: backdropScale }}>
        <Plate subject="smoke" ratio="1/1" tone="noir" className="hero__plate" />
      </motion.div>

      <motion.div className="hero__content" style={{ y: contentY, opacity: contentFade }}>
        <motion.div initial="hidden" animate="shown" variants={RISE} transition={{ duration: 0.9, delay: 0.2 }}>
          <Eyebrow rule="both" tone="gold">
            {hero.eyebrow}
          </Eyebrow>
        </motion.div>

        <SplitText
          as="h1"
          text={hero.headline}
          className="hero__headline"
          accentIndices={[hero.accentWord]}
          accentClassName="hero__accent"
          delay={0.45}
          gap={0.07}
        />

        <motion.div
          className="hero__lead"
          initial="hidden"
          animate="shown"
          variants={RISE}
          transition={{ duration: 1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <Text variant="lead" align="center" tone="secondary">
            {hero.lead}
          </Text>
        </motion.div>

        <motion.div
          className="hero__actions"
          initial="hidden"
          animate="shown"
          variants={RISE}
          transition={{ duration: 1, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <Button href="#reserve" variant="solid" size="lg" magnetic withArrow>
            Reserve a table
          </Button>
          <Button href="#pours" variant="ghost" size="lg">
            See the pours
          </Button>
        </motion.div>
      </motion.div>

      {/* Corner captions, lifted straight from the reference sheets. */}
      <motion.div
        className="hero__corners"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
      >
        <a className="hero__corner" href={club.instagramUrl} target="_blank" rel="noreferrer noopener">
          {hero.cornerLeft}
        </a>
        <span className="hero__scroll" aria-hidden="true">
          <span className="hero__scrollLine" />
          Scroll
        </span>
        <span className="hero__corner">{hero.cornerRight}</span>
      </motion.div>
    </section>
  )
}
