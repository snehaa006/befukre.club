/**
 * Die-cut silhouettes for photo stickers, as SVG masks.
 *
 * Every shape is drawn in a 100×100 box with `preserveAspectRatio="none"`, so
 * it stretches to whatever box the sticker is given. Masks are used twice —
 * once on the white paper, once on the photo inset inside it — which is what
 * gives the even white border around odd shapes like the keyhole.
 */

const svg = (body: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>${body}</svg>`,
  )}")`

/** Round head over a flared foot — the doorway you look through. */
const keyhole = svg(
  "<ellipse cx='50' cy='31' rx='46' ry='31'/><path d='M30 50 L10 100 H90 L70 50 Z'/>",
)

/** Postage-stamp / bottle-cap edge: a disc ringed with bumps. */
const scallop = (() => {
  const bumps = 22
  const circles = Array.from({ length: bumps }, (_, i) => {
    const a = (i / bumps) * Math.PI * 2
    const cx = 50 + Math.cos(a) * 44
    const cy = 50 + Math.sin(a) * 44
    return `<circle cx='${cx.toFixed(2)}' cy='${cy.toFixed(2)}' r='6.4'/>`
  }).join('')
  return svg(`<circle cx='50' cy='50' r='44'/>${circles}`)
})()

/** Admission ticket: notched at both sides. */
const ticket = svg(
  "<path d='M4 0 H96 A4 4 0 0 0 100 4 V38 A12 12 0 0 0 100 62 V96 A4 4 0 0 0 96 100 H4 A4 4 0 0 0 0 96 V62 A12 12 0 0 0 0 38 V4 A4 4 0 0 0 4 0 Z'/>",
)

/** A bow-tie of a label — pinched at the waist like a ribbon. */
const flag = svg("<path d='M0 0 H100 L92 50 L100 100 H0 L8 50 Z'/>")

export const shapeMask = { keyhole, scallop, ticket, flag } as const
export type MaskedShape = keyof typeof shapeMask
