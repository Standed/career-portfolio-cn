import { useEffect, useRef } from 'react'

/**
 * Pointer spotlight: writes --spot-x / --spot-y on the element,
 * throttled by requestAnimationFrame. Mouse-only; disabled for reduced motion.
 */
export function useSpotlight<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) return undefined

    let frame = 0
    const latest = { x: 0, y: 0 }

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return
      latest.x = event.clientX
      latest.y = event.clientY
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect()
        element.style.setProperty('--spot-x', `${latest.x - rect.left}px`)
        element.style.setProperty('--spot-y', `${latest.y - rect.top}px`)
      })
    }

    element.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      element.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  return ref
}
