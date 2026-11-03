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

Built from the owner's reference set in [`/references`](references/): the sticker
moodboard, the olive / burgundy / cream leather swatch card, the Lumen nightlife
layout and the Dribbble nightlife sites.

**Palette** — three leathers, sampled straight off the swatch card, plus three
moodboard colours:

| Colour | Hex | Job |
| --- | --- | --- |
| Olive | `#433D1F` | Full sections (Pours, footer); `olive-200` is the light accent for type on dark |
| Burgundy | `#551619` | Full sections (Invitation, Reserve), cards |
| Cream | `#D2BEA5` | Full sections (The Room, The Wall), lace and paper |
| Espresso | `#2E1A15` | The page floor, Nights |
| Cherry | `#5A0701` → `#B5161A` | The pop — stickers, prices, the cursor |
| Chocolate | `#5F3A2F` | Warm mid-tones |

Sections are colour-blocked in one leather at a time, and the leather swatches
themselves are used as section textures.

**Type** has four families with one job each:

| Family | Job |
| --- | --- |
| Bebas Neue | The loud voice. Condensed caps, set enormous (Lumen). |
| Imbue | Condensed didone, the logo's cousin. Dates, times, prices, stats. |
| Pinyon Script | The "Club" hand. One or two words crossing a headline. |
| Instrument Sans | Body copy, labels, the `[01]` bracket captions. |

**Stickers** are the signature. Three kinds, all in the design system:

- **Cutouts** — real objects cut out of the reference photos (cherry coupe,
  cherries, lamp, smoking coupe…) with a white die-cut edge.
- **Photo stickers** — photos framed in white paper and cut to a shape: arch,
  keyhole, scallop, ticket, oval, polaroid.
- **Labels and seals** — text stickers and scalloped `Badge` seals with
  spinning rim text.

Stickers slap onto the page as they scroll in, and on a mouse every one can be
picked up and thrown. The lace doily from the moodboard is the `Lace` frame.

### Motion

- Velvet-curtain preloader with a counter; the curtains part onto the hero.
- Hero headline rises letter by letter; its lines shear apart on scroll; a
  cherry spotlight follows the mouse.
- Two crossing tickers that speed up and reverse with scroll velocity.
- The Room: words light up as you read and photos open inside the sentence.
- Through the arch: a pinned keyhole mask grows until you walk through the door.
- The pours: pinned horizontal scroll; cards lean into fast scrolls.
- Nights: a polaroid follows the cursor and tilts with hand speed.
- The wall: drag every sticker; click the leather to slap down another.
- Footer: stickers drop out of the sky and land where you can throw them.
- Custom cursor that labels what will happen — Drag, Book, Slap.

Reduced motion is honoured: `MotionConfig reducedMotion="user"`, Lenis, the
cursor, the tickers and the preloader all check `usePrefersReducedMotion`, and
`global.css` stops the CSS animations. Pointer toys (dragging, cursor,
hover-follow) switch on only for mouse/trackpad via `useFinePointer`, so touch
visitors keep native scrolling.

---

## Layout

```
src/
  design-system/
    tokens/        tokens.ts  ← source of truth; tokens.css is GENERATED
    styles/        fonts, reset, global primitives
    components/    19 components, each with .tsx / .css / .stories.tsx
    hooks/         smooth scroll, parallax, magnetic, reduced-motion,
                   fine-pointer, scroll-velocity skew
    stories/       Foundations: colour, type, space, motion
    utils/
  site/
    sections/      one file per page section
    components/    site-only pieces (preloader, cursor, scroll marquee)
    data/content.ts  ← all site copy and image paths live here
public/
  photos/          photographs cut from /references (generated)
  stickers/        die-cut cutouts with white edges (generated)
  brand/           the logo on transparent, crimson and cream (generated)
references/        the owner's reference images — source for everything above
scripts/
  generate-tokens.ts
  extract-references.py
```

### Tokens

`src/design-system/tokens/tokens.ts` is the single source of truth. The CSS
custom properties in `tokens.css` are **generated** from it:

```bash
npm run tokens   # → 161 custom properties
```

Never hand-edit `tokens.css`. The generator kebab-cases nested keys and appends
units per group, so `color.burgundy[600]` becomes `--bfk-color-burgundy-600` and
`duration.slow` becomes `--bfk-duration-slow: 700ms`.

Components read **semantic** tokens (`--bfk-bg-wine`, `--bfk-text-gold`,
`--bfk-line-hairline`), not the raw ramps.

### Components

`Accordion` · `ArchFrame` · `Badge` · `Button` · `Card` · `Eyebrow` · `Field`
(Input, Textarea, Select) · `Lace` · `Logo` · `Magnetic` · `Marquee` · `Numeral`
· `Ornament` · `Photo` · `Reveal` + `Stagger` · `SplitText` · `Sticker` · `Tag`
· `Text`

Worth knowing about:

- **`Sticker`** — `shape="cutout"` takes a die-cut image; `rect`, `arch`,
  `oval`, `circle`, `polaroid`, `keyhole`, `scallop`, `ticket` and `flag` frame
  a photo in white paper; `label` is a text sticker. `draggable` and `bounds`
  make it a toy.
- **`Photo`** — the image surface: a real photograph that uncovers on scroll
  (`wipe` / `iris`) and drifts inside its crop.
- **`Text`** is the way type is set inside the design system. Keeping every
  size behind a `variant` is what stops the scale drifting.

### Imagery

There are no drawn placeholders. Every photo and sticker on the site is cut
out of the reference images by one script:

```bash
pip install pillow numpy scipy rembg onnxruntime
python3 scripts/extract-references.py            # photos + logo + stickers
python3 scripts/extract-references.py --photos   # photos only, no rembg
```

Crop boxes live at the top of the script and are chosen to avoid the overlays
in the screenshots (Pinterest buttons, other brands' wordmarks, captions).
Stickers are cut with `rembg` (`isnet-general-use`) and given a white die-cut
border; the logo is recovered onto transparent from `logo.jpeg`.

---

## Known gaps

- **The photography is not ours yet.** Every image is cropped from the
  reference screenshots (Pinterest and Dribbble pins of other people's work).
  It is here so the site looks the way it should; replace it with the club's
  own photography, or licensed images, before this goes public. Swap files in
  `public/photos` and `public/stickers` (same names) or change the paths in
  `src/site/data/content.ts`.
- Several sources are small screenshots, so a few photos are upscaled and soft
  (the highball, the jazz-club set). Real photography fixes this too.
- **The booking form does not send anywhere.** `Reserve.tsx` acknowledges the
  request in local state only. Point `onSubmit` at a real endpoint and add the
  failure case before this goes live.
- Social preview image (`og:image`) is not set in `index.html`.
- Copy, prices, address and phone number in `src/site/data/content.ts` are
  placeholders written to fit the design — replace them with the real thing.
