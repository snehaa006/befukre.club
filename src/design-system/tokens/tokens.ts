/**
 * BEFUKRE design tokens — the single source of truth.
 *
 * CSS custom properties in `tokens.css` are GENERATED from this file.
 * Run `npm run tokens` after editing. Never hand-edit tokens.css.
 *
 * Palette notes: three leathers — olive, burgundy, cream — lifted straight
 * from the owner's swatch card, plus espresso, cherry and chocolate from the
 * sticker moodboard. Sections are colour-blocked in full fields of one leather
 * at a time; cherry is the pop, used on stickers, prices and the cursor.
 */

/** Raw palette. Lower numbers are lighter. Values marked (ref) were sampled. */
export const color = {
  /** Espresso darks. 600 is the moodboard espresso; 900 is the page floor. */
  ink: {
    900: '#120907',
    800: '#1A0E0B',
    700: '#231410',
    600: '#2E1A15', // (ref) espresso
    500: '#3B241D',
  },
  /** The house leather. 600 is "the" burgundy. */
  burgundy: {
    900: '#22060A',
    800: '#320B11', // (ref) moodboard burgundy
    700: '#490D11', // (ref) leather, shadow side
    600: '#551619', // (ref) leather, lit side
    500: '#6E1D21',
    400: '#8A2A2C',
  },
  /** Glacé cherry. The pop colour — stickers, prices, the cursor. */
  cherry: {
    600: '#5A0701', // (ref) moodboard cherry
    500: '#8E0E0B',
    400: '#B5161A',
    300: '#D8414A',
  },
  /** Olive leather. 600 is the swatch; 200 is the light accent for type on dark. */
  olive: {
    700: '#2E2A14',
    600: '#433D1F', // (ref) olive leather
    500: '#5C5530',
    400: '#7F7746',
    300: '#A69D63',
    200: '#C9C08A',
    100: '#E2DBB0',
  },
  /** Cream leather → lace white, and down to warm ash for muted type. */
  cream: {
    100: '#F4EBDD', // lace
    200: '#E6D8C3',
    300: '#D2BEA5', // (ref) cream leather
    400: '#A8957E',
    500: '#7A6A5A',
    600: '#4E4038',
  },
  /** Milk chocolate, for warm mid-tones and paper shadows. */
  chocolate: {
    500: '#5F3A2F', // (ref) moodboard chocolate
    400: '#7A4D3E',
  },
} as const

/** Semantic surfaces. Components reference these, not the raw palette. */
export const bg = {
  canvas: color.ink[900],
  raised: color.ink[700],
  sunken: '#0B0504',
  espresso: color.ink[600],
  wine: color.burgundy[600],
  wineDeep: color.burgundy[800],
  wineLit: color.burgundy[500],
  olive: color.olive[600],
  oliveDeep: color.olive[700],
  cream: color.cream[300],
  paper: color.cream[100],
  cherry: color.cherry[500],
  scrim: 'rgba(18, 9, 7, 0.72)',
} as const

export const text = {
  primary: color.cream[100],
  secondary: color.cream[200],
  muted: color.cream[400],
  faint: color.cream[500],
  onWine: color.cream[100],
  onCream: color.ink[900],
  onPaper: color.burgundy[800],
  olive: color.olive[200],
  cherry: color.cherry[300],
} as const

export const line = {
  hairline: 'rgba(226, 219, 176, 0.24)',
  hairlineStrong: 'rgba(226, 219, 176, 0.5)',
  subtle: 'rgba(244, 235, 221, 0.14)',
  onCream: 'rgba(50, 11, 17, 0.22)',
} as const

export const accent = {
  wine: color.burgundy[600],
  cherry: color.cherry[400],
  olive: color.olive[200],
  cream: color.cream[100],
} as const

/** Type families. Loaded in `styles/fonts.css`. */
export const font = {
  /** Condensed caps for the loud lines — set enormous. */
  display: '"Bebas Neue", "Oswald", Impact, "Arial Narrow", sans-serif',
  /** Condensed didone, the logo's cousin. Numerals, dates, prices. */
  serif: '"Imbue", "Bodoni 72", Didot, "Times New Roman", serif',
  /** The "Club" hand. One or two words at a time. */
  script: '"Pinyon Script", "Snell Roundhand", cursive',
  sans: '"Instrument Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
} as const

export const fontSize = {
  '3xs': '0.6875rem',
  '2xs': '0.75rem',
  xs: '0.8125rem',
  sm: '0.9375rem',
  base: '1.0625rem',
  lg: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)',
  xl: 'clamp(1.3125rem, 1.18rem + 0.6vw, 1.625rem)',
  '2xl': 'clamp(1.5rem, 1.3rem + 1vw, 2.125rem)',
  '3xl': 'clamp(1.875rem, 1.5rem + 1.8vw, 2.875rem)',
  '4xl': 'clamp(2.375rem, 1.8rem + 2.8vw, 4rem)',
  '5xl': 'clamp(3rem, 2rem + 5vw, 6rem)',
  '6xl': 'clamp(3.75rem, 2rem + 8.5vw, 9rem)',
  '7xl': 'clamp(4.5rem, 1.5rem + 13vw, 14rem)',
  /** Poster scale — a word that fills the width. */
  '8xl': 'clamp(5.5rem, 1rem + 19vw, 22rem)',
  '9xl': 'clamp(7rem, 26vw, 30rem)',
} as const

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

/** Wide tracking is a signature of the references — use `widest` on micro labels. */
export const tracking = {
  tighter: '-0.04em',
  /** Bebas sits tight already; this is for poster lines only. */
  poster: '-0.01em',
  tight: '-0.02em',
  normal: '0em',
  wide: '0.06em',
  wider: '0.16em',
  widest: '0.3em',
} as const

export const leading = {
  crush: '0.82',
  none: '1',
  tight: '1.06',
  snug: '1.2',
  normal: '1.5',
  relaxed: '1.72',
} as const

/** 4px base scale. */
export const space = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
  40: 160,
  48: 192,
  64: 256,
} as const

export const radius = {
  none: '0px',
  xs: '2px',
  sm: '4px',
  md: '8px',
  lg: '16px',
  xl: '28px',
  pill: '999px',
  /** Doorway silhouette from the arch references. */
  arch: '50% 50% 4px 4px / 42% 42% 4px 4px',
  /** Rounded die-cut corner on photo stickers. */
  sticker: '14px',
} as const

export const shadow = {
  1: '0 2px 12px rgba(0, 0, 0, 0.4)',
  2: '0 12px 40px rgba(0, 0, 0, 0.5)',
  3: '0 32px 90px rgba(0, 0, 0, 0.62)',
  /** Paper sticker resting on a surface. Use as `filter: drop-shadow()` on cutouts. */
  sticker: '0 1px 1px rgba(18, 9, 7, 0.25), 0 10px 18px rgba(18, 9, 7, 0.35)',
  /** Same sticker, lifted under the finger. */
  stickerLift: '0 4px 6px rgba(18, 9, 7, 0.2), 0 34px 44px rgba(18, 9, 7, 0.45)',
} as const

export const glow = {
  cherry: '0 0 70px rgba(181, 22, 26, 0.35)',
  cherryTight: '0 0 26px rgba(181, 22, 26, 0.5)',
  wine: '0 0 90px rgba(85, 22, 25, 0.6)',
  olive: '0 0 28px rgba(201, 192, 138, 0.3)',
} as const

/** Milliseconds. Generator appends the unit. */
export const duration = {
  instant: 120,
  fast: 220,
  base: 420,
  slow: 700,
  slower: 1100,
  cinematic: 1600,
} as const

export const ease = {
  /** Default. Decisive out, no overshoot. */
  standard: 'cubic-bezier(0.22, 1, 0.36, 1)',
  /** Long, expensive entrances — reveals, curtain lifts. */
  entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
  exit: 'cubic-bezier(0.5, 0, 0.75, 0)',
  /** Symmetrical, for loops and marquees. */
  silk: 'cubic-bezier(0.65, 0.05, 0.36, 1)',
  linear: 'linear',
} as const

export const layout = {
  content: '1320px',
  wide: '1600px',
  prose: '64ch',
  gutter: 'clamp(1.25rem, 5vw, 4.5rem)',
  section: 'clamp(5rem, 11vh + 4rem, 11rem)',
} as const

export const z = {
  below: -1,
  base: 0,
  raised: 10,
  sticky: 100,
  nav: 200,
  overlay: 500,
  modal: 1000,
  cursor: 9999,
} as const

export const breakpoint = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export const tokens = {
  color,
  bg,
  text,
  line,
  accent,
  font,
  fontSize,
  fontWeight,
  tracking,
  leading,
  space,
  radius,
  shadow,
  glow,
  duration,
  ease,
  layout,
  z,
  breakpoint,
} as const

export type Tokens = typeof tokens

/** `cssVar('color', 'burgundy', 600)` → `var(--bfk-color-burgundy-600)` */
export const cssVar = (...path: (string | number)[]): string =>
  `var(--bfk-${path.join('-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()})`

/** Seconds, for motion libraries that don't take ms. */
export const seconds = (ms: number): number => ms / 1000
