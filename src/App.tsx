import { MotionConfig } from 'framer-motion'
import { useLenis } from '@ds/hooks/useLenis.ts'
import { CursorGlow } from '@site/components/CursorGlow.tsx'
import { Ambience } from '@site/sections/Ambience.tsx'
import { Footer } from '@site/sections/Footer.tsx'
import { Hero } from '@site/sections/Hero.tsx'
import { Invitation } from '@site/sections/Invitation.tsx'
import { Nav } from '@site/sections/Nav.tsx'
import { Nights } from '@site/sections/Nights.tsx'
import { Pours } from '@site/sections/Pours.tsx'
import { Reserve } from '@site/sections/Reserve.tsx'
import { Room } from '@site/sections/Room.tsx'
import { Ticker } from '@site/sections/Ticker.tsx'

export function App() {
  useLenis()

  return (
    // `reducedMotion="user"` makes every motion component respect the OS setting.
    <MotionConfig reducedMotion="user">
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Room />
        <Pours />
        <Invitation />
        <Nights />
        <Ambience />
        <Reserve />
      </main>
      <Footer />
    </MotionConfig>
  )
}
