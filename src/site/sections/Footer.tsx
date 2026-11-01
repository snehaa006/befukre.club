import { Logo } from '@ds/components/Logo/index.ts'
import { Marquee } from '@ds/components/Marquee/index.ts'
import { Ornament } from '@ds/components/Ornament/index.ts'
import { Reveal } from '@ds/components/Reveal/index.ts'
import { Text } from '@ds/components/Text/index.ts'
import { club, nav } from '../data/content.ts'
import './Footer.css'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__band">
        <Marquee speed={52} direction="right" separator={<span className="footer__mark">✦</span>}>
          <span className="footer__bandWord">Carefree since 2026</span>
          <span className="footer__bandWord">Leave your worries at the door</span>
        </Marquee>
      </div>

      <div className="bfk-container footer__inner">
        <Reveal effect="rise" className="footer__brand">
          <Logo variant="lockup" size="lg" tone="bone" />
        </Reveal>

        <Ornament variant="diamond" className="footer__rule" />

        <div className="footer__columns">
          <section className="footer__column">
            <Text variant="eyebrow" tone="gold" as="h2">
              Find us
            </Text>
            <address className="footer__address">
              {club.address.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </address>
            <a className="footer__link" href={`mailto:${club.email}`}>
              {club.email}
            </a>
            <a className="footer__link" href={`tel:${club.phone.replace(/\s/g, '')}`}>
              {club.phone}
            </a>
          </section>

          <section className="footer__column">
            <Text variant="eyebrow" tone="gold" as="h2">
              Hours
            </Text>
            {club.hours.map((slot) => (
              <p className="footer__hours" key={slot.days}>
                <span>{slot.days}</span>
                <span>{slot.time}</span>
              </p>
            ))}
          </section>

          <section className="footer__column">
            <Text variant="eyebrow" tone="gold" as="h2">
              Elsewhere
            </Text>
            <a
              className="footer__link footer__link--lead"
              href={club.instagramUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              @{club.instagram}
            </a>
            <nav className="footer__nav" aria-label="Footer">
              {nav.map((item) => (
                <a className="footer__link" href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </section>
        </div>

        <div className="footer__base">
          <Text variant="caption" tone="faint">
            © {year} {club.name} — {club.tagline}
          </Text>
          <Text variant="caption" tone="faint">
            Please drink responsibly. 21+.
          </Text>
        </div>
      </div>
    </footer>
  )
}
