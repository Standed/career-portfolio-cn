import { useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

// Scroll-linked vertical drift for images inside an overflow-hidden frame.
// Returns a ref for the frame and a motion style for the image.
// The image must be scaled up enough (>= 1 + range * 2 / 100) to keep edges covered.
export function useParallaxY<T extends HTMLElement = HTMLElement>(range = 6) {
  const ref = useRef<T | null>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${range}%`, `${range}%`])

  return { ref, style: reduceMotion ? undefined : { y } }
}
