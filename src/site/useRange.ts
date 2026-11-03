import { interpolate, useTransform, type MotionValue } from 'framer-motion'
import { useMemo } from 'react'

/**
 * `useTransform(value, input, output)` for scroll-linked opacity.
 *
 * Framer hands range-form opacity transforms of `useScroll` to the browser's
 * native ScrollTimeline, and with pinned (sticky) sections that timeline
 * drifts from the real scroll position — text stayed visible after it should
 * have faded. The function form always runs on the JS side, in step with
 * everything else in the scene.
 */
export function useRange(value: MotionValue<number>, input: number[], output: number[]): MotionValue<number> {
  const map = useMemo(() => interpolate(input, output), [input.join(), output.join()])
  return useTransform(value, (v) => map(v))
}
