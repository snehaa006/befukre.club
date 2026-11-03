import { MotionConfig } from 'framer-motion'
import { useState } from 'react'
import { useLenis } from '@ds/hooks/useLenis.ts'
import { Cursor } from '@site/components/Cursor.tsx'
import { Preloader } from '@site/components/Preloader.tsx'
import { ReadyContext } from '@site/ready.ts'
import { Door } from '@site/sections/Door.tsx'
import { Footer } from '@site/sections/Footer.tsx'
import { Hero } from '@site/sections/Hero.tsx'
import { Invitation } from '@site/sections/Invitation.tsx'
import { Manifesto } from '@site/sections/Manifesto.tsx'
import { Nav } from '@site/sections/Nav.tsx'
import { Nights } from '@site/sections/Nights.tsx'
import { Pours } from '@site/sections/Pours.tsx'
import { Reserve } from '@site/sections/Reserve.tsx'
import { Ticker } from '@site/sections/Ticker.tsx'
import { Wall } from '@site/sections/Wall.tsx'
import '@site/site.css'

export function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  return (
    // `reducedMotion="user"` makes every motion component respect the OS setting.
    <MotionConfig reducedMotion="user">
      <ReadyContext.Provider value={ready}>
        <Preloader onReveal={() => setReady(true)} />
        <Cursor />
        <div className="site-grain" aria-hidden="true" />
        <Nav />
        <main>
          <Hero />
          <Ticker />
          <Manifesto />
          <Door />
          <Pours />
          <Invitation />
          <Nights />
          <Wall />
          <Reserve />
        </main>
        <Footer />
      </ReadyContext.Provider>
    </MotionConfig>
  )
}
