import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef } from 'react'

type TiltCardProps = PropsWithChildren<{
  className?: string
  id?: string
}>

/**
 * Hover tilt card: subtle 3D perspective tilt (max +/-4deg) with spring return,
 * combined with the cursor spotlight. Mouse-only; static for reduced motion.
 */
export function TiltCard({ className, id, children }: TiltCardProps) {
  const reduceMotion = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 170, damping: 17 })
  const springRotateY = useSpring(rotateY, { stiffness: 170, damping: 17 })
  const frame = useRef(0)

  useEffect(() => () => cancelAnimationFrame(frame.current), [])

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== 'mouse') return
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      element.style.setProperty('--spot-x', `${x}px`)
      element.style.setProperty('--spot-y', `${y}px`)
      rotateY.set((x / rect.width - 0.5) * 8)
      rotateX.set((0.5 - y / rect.height) * 8)
    })
  }

  const onPointerLeave = () => {
    cancelAnimationFrame(frame.current)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      className={className ? `${className} spotlight` : 'spotlight'}
      id={id}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.article>
  )
}
