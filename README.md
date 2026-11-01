# BEFUKRE

Design system and marketing site for **BEFUKRE** — a cocktail club in Hauz Khas
Village, New Delhi. Instagram: [@befukre.club](https://instagram.com/befukre.club).

React 19 · TypeScript · Vite · Framer Motion · Lenis · Storybook 9.

---

## Running it

```bash
npm install
npm run dev          # site on :5173
npm run storybook    # design system on :6006
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server |
| `npm run build` | Typecheck, then production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run storybook` | Storybook dev server |
| `npm run build-storybook` | Static Storybook to `storybook-static/` |
| `npm run tokens` | Regenerate `tokens.css` from `tokens.ts` |

---

## The design language

Black first, burgundy second. Ember and gold are accents measured in teaspoons —
a hairline, a numeral, one lit edge — never fields of colour.

**Type** has four families with one job each:

| Family | Job |
| --- | --- |
| Playfair Display | Display voice. Set big and tight. |
| Cormorant Garamond | The reading voice, for lead paragraphs. |
| Jost | Micro labels, nav, UI. Wide tracking is the signature move. |
| Mrs Saint Delafield | The signature. One word at a time, never a sentence. |

Recurring motifs, taken from the reference set: the **arch** (doorway, keyhole,
vaulted corridor), **gilt hairlines** with a small centred mark instead of plain
whitespace, **wide-tracked corner captions**, **oversized numerals** for dates,
and **film grain** over every dark surface so flat blacks breathe.

---

## Layout

```
src/
  design-system/
    tokens/        tokens.ts  ← source of truth; tokens.css is GENERATED
    styles/        fonts, reset, global primitives
    components/    16 components, each with .tsx / .css / .stories.tsx
    hooks/         smooth scroll, parallax, magnetic, reduced-motion
    stories/       Foundations: colour, type, space, motion
    utils/
  site/
    sections/      one file per page section
    components/    site-only pieces (cursor light)
    data/content.ts  ← all site copy lives here
scripts/
  generate-tokens.ts
```

### Tokens

`src/design-system/tokens/tokens.ts` is the single source of truth. The CSS
custom properties in `tokens.css` are **generated** from it:

```bash
npm run tokens   # → 142 custom properties
```

Never hand-edit `tokens.css`. The generator kebab-cases nested keys and appends
units per group, so `color.burgundy[600]` becomes `--bfk-color-burgundy-600` and
`duration.slow` becomes `--bfk-duration-slow: 700ms`.

Components read **semantic** tokens (`--bfk-bg-wine`, `--bfk-text-gold`,
`--bfk-line-hairline`), not the raw ramps.

### Components

`Accordion` · `ArchFrame` · `Button` · `Card` · `Eyebrow` · `Field` (Input,
Textarea, Select) · `Logo` · `Magnetic` · `Marquee` · `Numeral` · `Ornament` ·
`Plate` · `Reveal` + `Stagger` · `SplitText` · `Tag` · `Text`

Two worth knowing about:

- **`Text`** is the only way type is set. Keeping every size behind a `variant`
  is what stops the scale drifting.
- **`Plate`** is the image surface. There is no photography in this repo — each
  subject (`coupe`, `highball`, `rocks`, `bottle`, `arch`, `velvet`, `smoke`) is
  drawn in SVG over a graded field with grain on top, so artwork is always
  on-palette. Swap in real photography by giving `Plate` an `<img>` layer in
  place of the `<svg>`; nothing else has to change.

### Motion

Long, eased, never bouncy. Scroll is driven by Lenis; reveals are
`whileInView` through `Reveal` / `Stagger` / `SplitText`; the hero backdrop and
most plates carry parallax.

Reduced motion is handled in three places and all three matter: `MotionConfig
reducedMotion="user"` in `App.tsx`, the `usePrefersReducedMotion` hook (which
switches Lenis, the cursor light and the magnetic effect off entirely), and a
`@media (prefers-reduced-motion: reduce)` block in `global.css` for the CSS
animations.

---

## Known gaps

- **The booking form does not send anywhere.** `Reserve.tsx` acknowledges the
  request in local state only. Point `onSubmit` at a real endpoint and add the
  failure case before this goes live.
- Social preview image (`og:image`) is not set in `index.html`.
- Copy, prices, address and phone number in `src/site/data/content.ts` are
  placeholders written to fit the design — replace them with the real thing.
