import { Marquee } from '@ds/components/Marquee/index.ts'
import { ticker } from '../data/content.ts'
import './Ticker.css'

/** Burgundy band between the hero and the room — the club clearing its throat. */
export function Ticker() {
  return (
    <div className="ticker bfk-grain">
      <Marquee speed={44} separator={<span className="ticker__mark" aria-hidden="true" />}>
        {ticker.map((phrase) => (
          <span className="ticker__phrase" key={phrase}>
            {phrase}
          </span>
        ))}
      </Marquee>
    </div>
  )
}
