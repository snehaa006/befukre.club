import { ScrollMarquee } from '../components/ScrollMarquee.tsx'
import { sticker, ticker } from '../data/content.ts'
import './Ticker.css'

const Run = ({ cherry }: { cherry: string }) => (
  <>
    {ticker.map((phrase) => (
      <span className="ticker__item" key={phrase}>
        {phrase}
        <img className="ticker__sep" src={cherry} alt="" />
      </span>
    ))}
  </>
)

/**
 * Two tickers crossing in an X, cherry over cream. They run against each
 * other, speed up with the scroll and reverse when you scroll back.
 */
export function Ticker() {
  return (
    <section className="ticker" aria-label="House rules">
      <ul className="bfk-sr-only">
        {ticker.map((phrase) => (
          <li key={phrase}>{phrase}</li>
        ))}
      </ul>
      <div className="ticker__band ticker__band--cream" aria-hidden="true">
        <ScrollMarquee baseVelocity={2.2}>
          <Run cherry={sticker('cherry-stem')} />
        </ScrollMarquee>
      </div>
      <div className="ticker__band ticker__band--cherry" aria-hidden="true">
        <ScrollMarquee baseVelocity={-2.6}>
          <Run cherry={sticker('cherry')} />
        </ScrollMarquee>
      </div>
    </section>
  )
}
