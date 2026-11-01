/**
 * Generates `src/design-system/tokens/tokens.css` from `tokens.ts`.
 * Run with: npm run tokens
 */
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { tokens } from '../src/design-system/tokens/tokens.ts'

const here = dirname(fileURLToPath(import.meta.url))
const out = resolve(here, '../src/design-system/tokens/tokens.css')

/** Groups whose numeric values carry a unit. */
const unitFor: Record<string, string> = { space: 'px', duration: 'ms', breakpoint: 'px' }

const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

const flatten = (group: string, value: unknown, path: string[] = []): string[] => {
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => flatten(group, v, [...path, k]))
  }
  const name = `--bfk-${[kebab(group), ...path.map(kebab)].join('-')}`
  const unit = typeof value === 'number' ? (unitFor[group] ?? '') : ''
  return [`  ${name}: ${String(value)}${unit};`]
}

const banner = `/*
 * GENERATED FILE — do not edit.
 * Source: src/design-system/tokens/tokens.ts
 * Regenerate: npm run tokens
 */`

const body = Object.entries(tokens)
  .map(([group, value]) => `  /* ${group} */\n${flatten(group, value).join('\n')}`)
  .join('\n\n')

writeFileSync(out, `${banner}\n\n:root {\n${body}\n}\n`, 'utf8')

const count = body.split('\n').filter((l) => l.includes('--bfk-')).length
console.log(`✓ wrote ${count} custom properties → ${out}`)
