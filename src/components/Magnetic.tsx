import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useRef } from 'react'
import type { PropsWithChildren } from 'react'

type MagneticProps = PropsWithChildren<{
  strength?: number
  className?: string
}>

export function Magnetic({ children, strength = 0.24, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduceMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.25 })
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.25 })

  if (reduceMotion) return <span className={className}>{children}</span>

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: 'inline-block' }}
      onPointerMove={(event) => {
        if (event.pointerType !== 'mouse') return
        const rect = ref.current?.getBoundingClientRect()
        if (!rect) return
        x.set((event.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((event.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.span>
  )
}
