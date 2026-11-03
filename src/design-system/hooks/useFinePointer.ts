import { useEffect, useState } from 'react'

const QUERY = '(hover: hover) and (pointer: fine)'

/**
 * True on mouse/trackpad devices. Pointer toys — draggable stickers, the
 * custom cursor, hover-follow images — switch on only here, so touch visitors
 * keep native scrolling and never get stuck on a sticker.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return fine
}
