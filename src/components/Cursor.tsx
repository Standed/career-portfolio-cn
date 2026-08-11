import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'

const interactiveSelector = 'a, button, select, input, textarea, summary, [role="button"]'

export function Cursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.55 })
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.55 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)')
    const update = () => setEnabled(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled || reduceMotion) return undefined
    document.body.classList.add('has-custom-cursor')

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      setVisible(true)
      const target = event.target instanceof Element ? event.target : null
      setHovering(Boolean(target?.closest(interactiveSelector)))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled, reduceMotion, x, y])

  if (reduceMotion || !enabled) return null

  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ opacity: visible ? 1 : 0 }} aria-hidden="true" />
      <motion.div
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 1.9 : 1, opacity: visible ? (hovering ? 0.95 : 0.6) : 0 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </>
  )
}
