import { motion, useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import type { MediaAsset, ProcessStep, ThemeKey } from '../types/portfolio'
import { Reveal } from './Reveal'

type WorkProcessProps = {
  theme: ThemeKey
  id: string
  title: string
  steps: readonly ProcessStep[]
  media: MediaAsset
}

function StepReveal({ children, delay = 0, variant = 'rise' }: PropsWithChildren<{ delay?: number; variant?: 'rise' | 'wipe' | 'mask' }>) {
  const reduceMotion = useReducedMotion()
  const initial = variant === 'wipe'
    ? { opacity: 0, clipPath: 'inset(0 100% 0 0)' }
    : variant === 'mask'
      ? { opacity: 0, clipPath: 'inset(0 0 100% 0)' }
      : { opacity: 0, y: 22 }
  const shown = variant === 'wipe'
    ? { opacity: 1, clipPath: 'inset(0 0% 0 0)' }
    : variant === 'mask'
      ? { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
      : { opacity: 1, y: 0 }

  return (
    <motion.li
      initial={reduceMotion ? false : initial}
      whileInView={reduceMotion ? undefined : shown}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  )
}

function StudioProcess({ id, title, steps, media }: Omit<WorkProcessProps, 'theme'>) {
  return (
    <section className="process-section studio-process" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell studio-process-grid">
        <div className="studio-process-copy">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <ol>
            {steps.map((step, index) => (
              <StepReveal delay={index * 0.05} key={step.title}>
                <span className="step-index" aria-hidden="true">{step.index}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </StepReveal>
            ))}
          </ol>
        </div>
        <Reveal className="studio-process-media" delay={0.1} variant="wipe">
          <figure className="media-frame">
            <img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function CinemaProcess({ id, title, steps, media }: Omit<WorkProcessProps, 'theme'>) {
  return (
    <section className="process-section cinema-process" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="cinema-process-board">
          <Reveal className="cinema-process-media-wrap" variant="wipe">
            <figure className="cinema-process-media">
              <img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" />
            </figure>
          </Reveal>
          <ol className="cinema-process-cuts">
            {steps.map((step, index) => (
              <StepReveal delay={index * 0.05} variant="wipe" key={step.title}>
                <span className="step-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </StepReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function ProductProcess({ id, title, steps, media }: Omit<WorkProcessProps, 'theme'>) {
  return (
    <section className="process-section product-process" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell">
        <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
        <div className="product-process-track">
          <ol>
            {steps.map((step, index) => (
              <StepReveal delay={index * 0.06} key={step.title}>
                <span className="step-index">{step.index}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </StepReveal>
            ))}
          </ol>
        </div>
        <Reveal className="product-process-media" delay={0.08} variant="wipe">
          <figure className="media-frame">
            <img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" />
          </figure>
        </Reveal>
      </div>
    </section>
  )
}

function EditorialProcess({ id, title, steps, media }: Omit<WorkProcessProps, 'theme'>) {
  return (
    <section className="process-section editorial-process" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell editorial-process-grid">
        <Reveal className="editorial-process-media-wrap" variant="mask">
          <figure className="editorial-process-media">
            <img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" />
          </figure>
        </Reveal>
        <div className="editorial-process-copy">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <ol>
            {steps.map((step, index) => (
              <StepReveal delay={index * 0.05} variant="mask" key={step.title}>
                <span className="step-index" aria-hidden="true">{step.index}</span>
                <div><h3>{step.title}</h3><p>{step.description}</p></div>
              </StepReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export function WorkProcess({ theme, ...rest }: WorkProcessProps) {
  if (theme === 'cinema') return <CinemaProcess {...rest} />
  if (theme === 'product') return <ProductProcess {...rest} />
  if (theme === 'editorial') return <EditorialProcess {...rest} />
  return <StudioProcess {...rest} />
}
