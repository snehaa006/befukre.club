/**
 * Single place to edit site copy and imagery. Sections read from here.
 *
 * Every image is a real photograph or die-cut sticker cut from /references by
 * `scripts/extract-references.py` — there are no drawn placeholders.
 */

export const photo = (name: string): string => `/photos/${name}.webp`
export const sticker = (name: string): string => `/stickers/${name}.webp`

export const club = {
  name: 'BEFUKRE',
  tagline: 'Club',
  /** The name means carefree — the whole brand hangs off it. */
  meaning: 'befikre (adj.) — carefree, without a worry',
  instagram: 'befukre.club',
  instagramUrl: 'https://instagram.com/befukre.club',
  email: 'table@befukre.club',
  phone: '+91 98110 40026',
  address: ['Hauz Khas Village', 'New Delhi 110016'],
  hours: [
    { days: 'Tue — Thu', time: '19:00 — 01:00' },
    { days: 'Fri — Sat', time: '19:00 — 03:00' },
    { days: 'Sun — Mon', time: 'Closed' },
  ],
}

export const nav = [
  { label: 'The Room', href: '#room' },
  { label: 'Pours', href: '#pours' },
  { label: 'Nights', href: '#nights' },
  { label: 'The Wall', href: '#wall' },
]

export const hero = {
  lines: ['Leave your', 'worries at', 'the door'],
  script: 'carefree',
  intro:
    'BEFUKRE is a low-lit cocktail club in Hauz Khas Village — thirty-two seats, fourteen pours, and no reason to hurry.',
  note: 'Velvet, cherries and a long counter. Pull up a stool, we pour till three.',
  cta: 'Enter the room',
  arch: photo('copper-dress'),
}

export const ticker = [
  'No tricks, just taste',
  'Carefree by design',
  'Open till 3am',
  'Thirty-two seats',
  'Hauz Khas Village',
  'Cherries on everything',
]

export const manifesto = {
  label: 'The room',
  /**
   * `{name}` drops an inline photo between words. Names are keys of
   * `manifestoImages`.
   */
  text: 'We took a narrow room {candles} painted it the colour of old wine {curtain} and kept the lights low enough {lamp} that nobody checks their phone. There is no sign outside {keyhole} just an arch, and then there is us {cherry}',
  stats: [
    { value: '32', label: 'Seats at the counter' },
    { value: '14', label: 'Pours on the card' },
    { value: '03:00', label: 'Last call, weekends' },
  ],
}

export const manifestoImages: Record<string, { src: string; cutout?: boolean }> = {
  candles: { src: photo('candle-table') },
  curtain: { src: photo('velvet-curtain') },
  lamp: { src: sticker('lamp'), cutout: true },
  keyhole: { src: photo('keyhole') },
  cherry: { src: sticker('cherry'), cutout: true },
}

export const door = {
  label: 'Through the arch',
  left: 'Behind the arch',
  right: 'the city goes quiet',
  script: 'come in',
  image: photo('corridor'),
}

export interface Pour {
  id: string
  name: string
  price: string
  spec: string
  note: string
  image: string
  /** CSS object-position, to keep the glass in a tall crop. */
  focus?: string
  sticker?: string
}

export const pours: Pour[] = [
  {
    id: 'velvet-hour',
    name: 'Velvet Hour',
    price: '₹850',
    spec: 'Rye · Amaro · Burnt orange · Cherrywood smoke',
    note: 'Stirred long, smoke caught under a cloche at the pass so it arrives still holding it.',
    image: photo('smoke-coupe'),
    sticker: sticker('cherry-stem'),
  },
  {
    id: 'oxblood',
    name: 'Oxblood',
    price: '₹900',
    spec: 'Mezcal · Hibiscus · Lime · Kashmiri chilli',
    note: 'The loudest thing on the card. Sour, smoky, faintly hot. Order it first or not at all.',
    image: photo('jazz-bar'),
    focus: '40% 60%',
  },
  {
    id: 'the-door',
    name: 'The Door',
    price: '₹820',
    spec: 'Gin · Dry vermouth · Olive oil wash',
    note: 'Our martini. Oil-washed for weight, frozen six hours, finished with three drops at the bar.',
    image: photo('dropper-coupe'),
    sticker: sticker('cherry'),
  },
  {
    id: 'carefree',
    name: 'Carefree',
    price: '₹780',
    spec: 'Aged rum · Coconut · Pineapple · Lime',
    note: 'The house drink, named for the house. Tall, cold, gone before the ice gives up.',
    image: photo('highball'),
  },
  {
    id: 'cardamom-noir',
    name: 'Cardamom Noir',
    price: '₹880',
    spec: 'Bourbon · Green cardamom · Cacao · Cream',
    note: 'Dessert, structurally. Cardamom bloomed in warm cream, chilled hard, shaken to foam.',
    image: photo('whisky'),
    focus: '45% 60%',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    price: '₹840',
    spec: 'Tequila · Marigold cordial · Grapefruit · Salt',
    note: 'Flowers from the Ghazipur market, steeped that morning. It changes a little every week.',
    image: photo('spotlight-coupe'),
    focus: '38% 50%',
    sticker: sticker('cherry-coupe'),
  },
]

export const invitation = {
  label: 'The standing invitation',
  date: ['28', '11'],
  time: '21:30',
  title: 'Midnight Flight',
  lead: 'Six pours, poured in order',
  body: 'The person who built them stands in front of you. Twelve seats at the counter, last Saturday of every month — it always sells out by Wednesday.',
  cta: 'Hold me a seat',
  image: photo('rose-petals'),
  sticker: sticker('smoke-coupe'),
}

export interface NightEvent {
  day: string
  month: string
  weekday: string
  title: string
  kind: string
  time: string
  image: string
}

export const nights: NightEvent[] = [
  { day: '07', month: 'Nov', weekday: 'Fri', title: 'Vinyl & Vermouth', kind: 'Listening session', time: '21:00', image: photo('jazz-band') },
  { day: '14', month: 'Nov', weekday: 'Fri', title: 'Smoke & Mirrors', kind: 'Masterclass', time: '20:00', image: photo('jazz-bar') },
  { day: '21', month: 'Nov', weekday: 'Sat', title: 'The Long Pour', kind: 'Guest shift', time: '22:00', image: photo('dj') },
  { day: '28', month: 'Nov', weekday: 'Sat', title: 'Midnight Flight', kind: 'Tasting', time: '21:30', image: photo('crowd-walkers') },
]

export type WallItem =
  | { kind: 'cutout'; src: string; width: string; x: number; y: number; r: number }
  | { kind: 'photo'; shape: 'rect' | 'arch' | 'oval' | 'circle' | 'polaroid' | 'keyhole' | 'scallop' | 'ticket'; src: string; width: string; ratio?: string; caption?: string; x: number; y: number; r: number }
  | { kind: 'label'; text: string; paper: 'cherry' | 'olive' | 'wine' | 'white'; x: number; y: number; r: number }

/** Positions are % of the wall, from its top-left. */
export const wall: WallItem[] = [
  { kind: 'photo', shape: 'polaroid', src: photo('velvet-cake'), width: 'clamp(9rem, 15vw, 15rem)', ratio: '4/5', caption: 'Red velvet', x: 4, y: 8, r: -7 },
  { kind: 'photo', shape: 'arch', src: photo('bar-chandeliers'), width: 'clamp(8rem, 12vw, 12rem)', ratio: '3/5', x: 20, y: 2, r: 4 },
  { kind: 'cutout', src: sticker('cherry-coupe'), width: 'clamp(6rem, 9vw, 9rem)', x: 18, y: 52, r: -10 },
  { kind: 'photo', shape: 'scallop', src: photo('cherry-cake'), width: 'clamp(8rem, 12vw, 12rem)', x: 3, y: 58, r: 8 },
  { kind: 'label', text: 'No tricks, just taste', paper: 'cherry', x: 6, y: 44, r: -6 },
  { kind: 'photo', shape: 'rect', src: photo('tulips'), width: 'clamp(9rem, 13vw, 13rem)', ratio: '4/5', x: 66, y: 4, r: 6 },
  { kind: 'photo', shape: 'keyhole', src: photo('keyhole'), width: 'clamp(7rem, 10vw, 10rem)', ratio: '3/4', x: 82, y: 12, r: -4 },
  { kind: 'cutout', src: sticker('lamp'), width: 'clamp(4.5rem, 6vw, 6rem)', x: 62, y: 42, r: 6 },
  { kind: 'photo', shape: 'polaroid', src: photo('table-roses'), width: 'clamp(9rem, 13vw, 13rem)', ratio: '3/4', caption: 'Table four', x: 74, y: 50, r: 9 },
  { kind: 'photo', shape: 'oval', src: photo('bouquet'), width: 'clamp(7rem, 10vw, 10rem)', ratio: '3/4', x: 88, y: 64, r: -8 },
  { kind: 'label', text: 'Carefree by design', paper: 'olive', x: 64, y: 86, r: 5 },
  { kind: 'photo', shape: 'ticket', src: photo('amber-petals'), width: 'clamp(11rem, 16vw, 16rem)', ratio: '2/1', x: 28, y: 80, r: -3 },
  { kind: 'cutout', src: sticker('smoke-coupe'), width: 'clamp(5rem, 7vw, 7rem)', x: 50, y: 74, r: 12 },
  { kind: 'photo', shape: 'circle', src: photo('velvet-bows'), width: 'clamp(6rem, 8vw, 8rem)', x: 40, y: 3, r: 0 },
  { kind: 'label', text: '25+ only', paper: 'wine', x: 88, y: 2, r: 10 },
  { kind: 'cutout', src: sticker('cherry'), width: 'clamp(3.5rem, 5vw, 5rem)', x: 58, y: 8, r: -14 },
]

/** What a click on the wall can slap down. */
export const slapPool: { src: string; width: string; shape?: 'polaroid' | 'circle' | 'scallop'; ratio?: string }[] = [
  { src: sticker('cherry'), width: '4.5rem' },
  { src: sticker('cherry-stem'), width: '3.2rem' },
  { src: sticker('cherry-coupe'), width: '6rem' },
  { src: sticker('lamp'), width: '4.5rem' },
  { src: sticker('smoke-coupe'), width: '5rem' },
  { src: sticker('dropper-coupe'), width: '5rem' },
  { src: sticker('spotlight-coupe'), width: '6rem' },
  { src: sticker('whisky'), width: '6rem' },
  { src: photo('jazz-candles'), width: '7rem', shape: 'polaroid', ratio: '4/5' },
  { src: photo('crowd-headphones'), width: '6rem', shape: 'circle' },
  { src: photo('roses-profile'), width: '7rem', shape: 'scallop' },
  { src: photo('bar-bottles'), width: '7rem', shape: 'polaroid', ratio: '3/4' },
]

/** The moodboard's lace card, as four tiles. */
export const swatches = [
  { name: 'Espresso', hex: '#2E1A15', image: photo('highball') },
  { name: 'Cherry', hex: '#5A0701', image: photo('cherry-cake') },
  { name: 'Burgundy', hex: '#320B11', image: photo('velvet-curtain') },
  { name: 'Chocolate', hex: '#5F3A2F', image: photo('whisky') },
]

export const reserve = {
  label: 'Reservations',
  title: ['Take', 'a seat'],
  script: 'reserve',
  body: 'Tables are held for fifteen minutes. For parties above six, write to us and we will open the back room.',
  guestOptions: [
    { value: '2', label: 'Two' },
    { value: '3', label: 'Three' },
    { value: '4', label: 'Four' },
    { value: '5', label: 'Five' },
    { value: '6', label: 'Six' },
    { value: '6+', label: 'More than six' },
  ],
}

export const footer = {
  line: 'Drink carefree, never carelessly.',
  legal: 'Guests must be 25 or older. Please drink responsibly.',
  rain: [
    { src: sticker('cherry-coupe'), width: 'clamp(5rem, 8vw, 8rem)', x: 8, r: -12 },
    { src: sticker('cherry'), width: 'clamp(3rem, 4.5vw, 4.5rem)', x: 26, r: 18 },
    { src: sticker('lamp'), width: 'clamp(3.5rem, 5vw, 5rem)', x: 44, r: -6 },
    { src: sticker('smoke-coupe'), width: 'clamp(4rem, 6vw, 6rem)', x: 62, r: 10 },
    { src: sticker('cherry-stem'), width: 'clamp(2.5rem, 3.5vw, 3.5rem)', x: 78, r: -20 },
    { src: sticker('dropper-coupe'), width: 'clamp(4rem, 6vw, 6rem)', x: 88, r: 8 },
  ],
}
