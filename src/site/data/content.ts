import type { PlateSubject } from '@ds/components/Plate/index.ts'

/** Single place to edit site copy. Sections read from here, never inline. */

export const club = {
  name: 'BEFUKRE',
  tagline: 'cocktail club',
  /** The name means carefree — the whole brand hangs off it. */
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
  { label: 'The Pours', href: '#pours' },
  { label: 'Nights', href: '#nights' },
  { label: 'Ambience', href: '#ambience' },
]

export const hero = {
  eyebrow: 'Est. 2026 — After Dark',
  headline: 'Leave your worries at the door',
  /** Index of the word set in the accent face. */
  accentWord: 2,
  lead: 'A low-lit room, a short menu, and no reason to hurry.',
  cornerLeft: `@befukre.club`,
  cornerRight: 'New Delhi',
}

export const ticker = [
  'No tricks, just taste',
  'Carefree by design',
  'Open till late',
  'Thirty-two seats',
]

export const room = {
  eyebrow: 'The Room',
  title: 'Behind the arch, the city goes quiet.',
  body: [
    'We took a narrow room, painted it the colour of old wine, and left the lighting low enough that nobody checks their phone. There is no sign outside. There is an arch, and then there is us.',
    'The bar is thirty-two seats and one long counter. Sit at it. The people pouring are the people who wrote the menu, and they would rather talk to you than not.',
  ],
  stats: [
    { value: '32', label: 'Seats' },
    { value: '14', label: 'Pours on the card' },
    { value: '03:00', label: 'Last call, weekends' },
  ],
}

export interface Pour {
  id: string
  name: string
  price: string
  spec: string
  note: string
  subject: PlateSubject
}

export const pours: Pour[] = [
  {
    id: 'velvet-hour',
    name: 'Velvet Hour',
    price: '₹850',
    spec: 'Rye · Amaro · Burnt orange · Cherrywood smoke',
    note: 'Stirred long and served over one clear cube. The smoke is caught under the glass at the pass, so it arrives still holding it.',
    subject: 'rocks',
  },
  {
    id: 'oxblood',
    name: 'Oxblood',
    price: '₹900',
    spec: 'Mezcal · Hibiscus · Lime · Kashmiri chilli',
    note: 'The loudest thing on the card. Sour, smoky and faintly hot at the finish — order it first or not at all.',
    subject: 'coupe',
  },
  {
    id: 'the-door',
    name: 'The Door',
    price: '₹820',
    spec: 'Gin · Dry vermouth · Olive oil wash',
    note: 'Our martini. Washed with cold-pressed oil for weight, then frozen for six hours. No garnish, no discussion.',
    subject: 'coupe',
  },
  {
    id: 'carefree',
    name: 'Carefree',
    price: '₹780',
    spec: 'Aged rum · Coconut · Pineapple · Lime',
    note: 'The house drink, named for the house. Built tall over crushed ice and meant to be finished before it waters down.',
    subject: 'highball',
  },
  {
    id: 'cardamom-noir',
    name: 'Cardamom Noir',
    price: '₹880',
    spec: 'Bourbon · Green cardamom · Cacao · Cream',
    note: 'Dessert, structurally. Cardamom is bloomed in warm cream for an hour, then chilled hard and shaken to a foam.',
    subject: 'rocks',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    price: '₹840',
    spec: 'Tequila · Marigold cordial · Grapefruit · Salt',
    note: 'Flowers from the Ghazipur market, steeped the same morning. It changes a little every week and we like that.',
    subject: 'highball',
  },
]

export const invitation = {
  eyebrow: 'The standing invitation',
  date: '28/11',
  time: '21:30',
  title: 'Midnight Flight',
  body: 'Six pours, poured in order, with the person who built them standing in front of you. Twelve seats at the counter. It runs the last Saturday of every month and it always sells out by the Wednesday.',
  cta: 'Hold me a seat',
}

export interface NightEvent {
  day: string
  month: string
  weekday: string
  title: string
  kind: string
  time: string
}

export const nights: NightEvent[] = [
  { day: '07', month: 'Nov', weekday: 'Fri', title: 'Vinyl & Vermouth', kind: 'Listening session', time: '21:00' },
  { day: '14', month: 'Nov', weekday: 'Fri', title: 'Smoke & Mirrors', kind: 'Masterclass', time: '20:00' },
  { day: '21', month: 'Nov', weekday: 'Sat', title: 'The Long Pour', kind: 'Guest shift', time: '22:00' },
  { day: '28', month: 'Nov', weekday: 'Sat', title: 'Midnight Flight', kind: 'Tasting', time: '21:30' },
]

export interface GalleryFrame {
  subject: PlateSubject
  caption: string
  ratio: '2/3' | '3/4' | '4/5' | '1/1' | '4/3'
  tone: 'noir' | 'ember' | 'wine' | 'gold'
}

export const ambience: GalleryFrame[] = [
  { subject: 'arch', caption: 'The arch', ratio: '3/4', tone: 'wine' },
  { subject: 'rocks', caption: 'Bar, 1am', ratio: '1/1', tone: 'ember' },
  { subject: 'velvet', caption: 'House velvet', ratio: '4/5', tone: 'wine' },
  { subject: 'smoke', caption: 'Last call', ratio: '4/3', tone: 'noir' },
  { subject: 'bottle', caption: 'The back bar', ratio: '2/3', tone: 'gold' },
]

export const reserve = {
  eyebrow: 'Reservations',
  title: 'Take a seat',
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
