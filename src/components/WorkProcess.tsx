import { ArrowsClockwise, Crosshair, FileText, FilmSlate } from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import type { PropsWithChildren } from 'react'
import type { MediaAsset, ProcessStep, ThemeKey } from '../types/portfolio'
import { Reveal } from './Reveal'

const processIcons: readonly Icon[] = [Crosshair, FileText, FilmSlate, ArrowsClockwise]

function ProcessRevealItem({ children, delay = 0 }: PropsWithChildren<{ delay?: number }>) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.li>
  )
}

type WorkProcessProps = {
  theme: ThemeKey
  id: string
  title: string
  steps: readonly ProcessStep[]
  media: MediaAsset
}

export function WorkProcess({ theme, id, title, steps, media }: WorkProcessProps) {
  if (theme === 'cinema') {
    return (
      <section className="process-section cinema-process" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <div className="cinema-process-board">
            <Reveal className="cinema-process-media"><img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" /></Reveal>
            <ol className="cinema-process-cuts">
              {steps.map((step, index) => (
                <ProcessRevealItem delay={index * 0.04} key={step.title}>
                  <span>{step.index}</span><h3>{step.title}</h3><p>{step.description}</p>
                </ProcessRevealItem>
              ))}
            </ol>
          </div>
        </div>
      </section>
    )
  }

  if (theme === 'product') {
    return (
      <section className="process-section product-process" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell">
          <Reveal><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <div className="product-process-layout">
            <ol className="product-process-path">
              {steps.map((step, index) => (
                <ProcessRevealItem delay={index * 0.04} key={step.title}>
                  <span>{step.index}</span>
                  <div><h3>{step.title}</h3><p>{step.description}</p></div>
                  {index < steps.length - 1 ? <ArrowRightPath /> : null}
                </ProcessRevealItem>
              ))}
            </ol>
            <Reveal className="product-process-media" delay={0.08}><img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" /></Reveal>
          </div>
        </div>
      </section>
    )
  }

  if (theme === 'editorial') {
    return (
      <section className="process-section editorial-process" id={id} aria-labelledby={`${id}-title`}>
        <div className="section-shell editorial-process-grid">
          <Reveal className="editorial-process-title"><h2 className="section-heading" id={`${id}-title`}>{title}</h2></Reveal>
          <Reveal className="editorial-process-media"><img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" /></Reveal>
          <ol className="editorial-process-copy">
            {steps.map((step, index) => (
              <ProcessRevealItem delay={index * 0.04} key={step.title}>
                <span>{step.index}</span><h3>{step.title}</h3><p>{step.description}</p>
              </ProcessRevealItem>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section className="process-section studio-process" id={id} aria-labelledby={`${id}-title`}>
      <div className="section-shell studio-process-grid">
        <Reveal className="studio-process-copy">
          <h2 className="section-heading" id={`${id}-title`}>{title}</h2>
          <ol>
            {steps.map((step, index) => {
              const StepIcon = processIcons[index % processIcons.length]
              return <li key={step.title}><StepIcon size={28} aria-hidden="true" /><div><h3>{step.title}</h3><p>{step.description}</p></div></li>
            })}
          </ol>
        </Reveal>
        <Reveal className="studio-process-media" delay={0.08}><img src={media.src} alt={media.alt} loading="lazy" width="1448" height="1086" /></Reveal>
      </div>
    </section>
  )
}

function ArrowRightPath() {
  return <span className="path-connector" aria-hidden="true">→</span>
}
