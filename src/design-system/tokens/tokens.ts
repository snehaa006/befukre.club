/**
 * BEFUKRE design tokens — the single source of truth.
 *
 * CSS custom properties in `tokens.css` are GENERATED from this file.
 * Run `npm run tokens` after editing. Never hand-edit tokens.css.
 *
 * Palette notes: the club reads as black first, burgundy second. Ember and
 * gold are accents measured in teaspoons — hairlines, numerals, a single
 * glowing edge — never fields of colour.
 */

/** Raw palette. Numbered 900 (deepest) → 300 (lightest). */
export const color = {
  /** Near-black with a red undertone, so black never goes cold next to wine. */
  ink: {
    900: '#070405',
    800: '#0B0607',
    700: '#120A0C',
    600: '#1A0F12',
    500: '#241619',
  },
  /** The house colour. 600 is "the" burgundy. */
  burgundy: {
    900: '#2A0810',
    800: '#3D0C16',
    700: '#51121E',
    600: '#6B1623',
    500: '#8A1C2B',
    400: '#A82836',
  },
  /** Vermillion from the lit-glass references. Accent only. */
  ember: {
    600: '#A6331A',
    500: '#C8441F',
    400: '#DC5C30',
    300: '#E8805A',
  },
  /** Gilt for hairlines, ornament and small caps. */
  gold: {
    600: '#8E7340',
    500: '#B2924F',
    400: '#C9A66B',
    300: '#E0C894',
  },
  /** Warm paper white → muted ash, for type on dark. */
  bone: {
    100: '#F6F0E7',
    200: '#E8DFD2',
    300: '#CFC2B2',
    400: '#9C8B84',
    500: '#6F605C',
    600: '#4A3E3C',
  },
} as const

/** Semantic surfaces. Components reference these, not the raw palette. */
export const bg = {
  canvas: color.ink[900],
  raised: color.ink[700],
  sunken: '#040203',
  wine: color.burgundy[800],
  wineDeep: color.burgundy[900],
  wineLit: color.burgundy[600],
  bone: color.bone[100],
  scrim: 'rgba(7, 4, 5, 0.72)',
} as const

export const text = {
  primary: color.bone[100],
  secondary: color.bone[300],
  muted: color.bone[400],
  faint: color.bone[500],
  onWine: color.bone[100],
  onBone: color.ink[900],
  gold: color.gold[400],
  ember: color.ember[400],
} as const

export const line = {
  hairline: 'rgba(201, 166, 107, 0.26)',
  hairlineStrong: 'rgba(201, 166, 107, 0.52)',
  subtle: 'rgba(246, 240, 231, 0.12)',
  onBone: 'rgba(42, 8, 16, 0.18)',
} as const

export const accent = {
  wine: color.burgundy[600],
  ember: color.ember[500],
  gold: color.gold[400],
} as const

/** Type families. Loaded in `styles/fonts.css`. */
export const font = {
  display: '"Playfair Display", "Times New Roman", Times, serif',
  serif: '"Cormorant Garamond", Georgia, "Times New Roman", serif',
  script: '"Mrs Saint Delafield", "Snell Roundhand", cursive',
  sans: '"Jost", "Helvetica Neue", Helvetica, Arial, sans-serif',
} as const

/** Fluid where it earns it; fixed for small type that must stay legible. */
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
  tight: '-0.02em',
  normal: '0em',
  wide: '0.06em',
  wider: '0.16em',
  widest: '0.3em',
} as const

export const leading = {
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
} as const

export const shadow = {
  1: '0 2px 12px rgba(0, 0, 0, 0.4)',
  2: '0 12px 40px rgba(0, 0, 0, 0.5)',
  3: '0 32px 90px rgba(0, 0, 0, 0.62)',
} as const

export const glow = {
  ember: '0 0 70px rgba(200, 68, 31, 0.3)',
  emberTight: '0 0 26px rgba(200, 68, 31, 0.45)',
  wine: '0 0 90px rgba(107, 22, 35, 0.55)',
  gold: '0 0 28px rgba(201, 166, 107, 0.32)',
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
