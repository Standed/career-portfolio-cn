import { motion, useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'

type RevealVariant = 'rise' | 'wipe' | 'mask'

type RevealProps = PropsWithChildren<{
  className?: string
  delay?: number
  variant?: RevealVariant
}>

const initialStates: Record<RevealVariant, Record<string, string | number>> = {
  rise: { opacity: 0, y: 22 },
  wipe: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
  mask: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
}

const shownStates: Record<RevealVariant, Record<string, string | number>> = {
  rise: { opacity: 1, y: 0 },
  wipe: { opacity: 1, clipPath: 'inset(0 0% 0 0)' },
  mask: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
}

export function Reveal({ children, className, delay = 0, variant = 'rise' }: RevealProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : initialStates[variant]}
      whileInView={reduceMotion ? undefined : shownStates[variant]}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
