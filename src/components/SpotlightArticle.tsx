import { useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { useSpotlight } from './useSpotlight'

type SpotlightArticleProps = PropsWithChildren<{
  className?: string
  id?: string
}>

/** Flat article with a cursor-following accent spotlight (no tilt). */
export function SpotlightArticle({ className, id, children }: SpotlightArticleProps) {
  const reduceMotion = useReducedMotion()
  const ref = useSpotlight<HTMLElement>(!reduceMotion)
  const classes = className ? `${className} spotlight` : 'spotlight'

  return (
    <article ref={ref} className={classes} id={id}>
      {children}
    </article>
  )
}
