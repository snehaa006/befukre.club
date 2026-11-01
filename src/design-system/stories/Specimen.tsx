import type { ReactNode } from 'react'
import './specimen.css'

/** Shared scaffolding for the foundation stories. Not part of the public API. */

export function Sheet({ children }: { children: ReactNode }) {
  return <div className="spec">{children}</div>
}

export function Row({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="spec__row">
      <div className="spec__meta">
        <span className="spec__label">{label}</span>
        {hint && <span className="spec__hint">{hint}</span>}
      </div>
      <div className="spec__demo">{children}</div>
    </div>
  )
}

export function Grid({ children, min = '12rem' }: { children: ReactNode; min?: string }) {
  return (
    <div className="spec__grid" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${min}, 1fr))` }}>
      {children}
    </div>
  )
}

export function Swatch({ name, value, token }: { name: string; value: string; token: string }) {
  return (
    <figure className="spec__swatch">
      <div className="spec__chip" style={{ background: value }} />
      <figcaption>
        <span className="spec__swatchName">{name}</span>
        <code className="spec__code">{token}</code>
        <span className="spec__hint">{value}</span>
      </figcaption>
    </figure>
  )
}
