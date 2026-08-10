import { ArrowRight } from '@phosphor-icons/react'
import { motion, useReducedMotion } from 'motion/react'
import type { LinkAction, MediaAsset, ProcessStep, ThemeKey } from '../types/portfolio'

type HeroProps = {
  theme: ThemeKey
  title: {
    fullText: string
    prefix: string
    accent: string
    suffix: string
  }
  description: readonly string[]
  primaryAction: LinkAction
  media: MediaAsset
  supportingMedia: readonly MediaAsset[]
  process: readonly ProcessStep[]
  descriptor: string
}

type TitleSegment = { segment: string; isWordLike: boolean }

const titleSegmenter = typeof Intl.Segmenter === 'function'
  ? new Intl.Segmenter('zh-CN', { granularity: 'word' })
  : null

function getTitleSegments(text: string): TitleSegment[] {
  if (titleSegmenter) {
    return [...titleSegmenter.segment(text)].map((part) => ({
      segment: part.segment,
      isWordLike: Boolean(part.isWordLike),
    }))
  }

  const fallbackParts = text.match(/\s+|[A-Za-z0-9]+|[㐀-鿿]{1,2}|./gu) ?? [text]
  return fallbackParts.map((segment) => ({
    segment,
    isWordLike: !/^[\s，。！？、；：,.!?;:]+$/u.test(segment),
  }))
}

function segmentTitleWords(text: string) {
  const words: string[] = []

  for (const part of getTitleSegments(text)) {
    if (!part.isWordLike && words.length > 0) {
      words[words.length - 1] += part.segment
    } else {
      words.push(part.segment)
    }
  }

  return words
}

function takeLeadingWord(text: string) {
  const parts = getTitleSegments(text)
  const firstWordIndex = parts.findIndex((part) => part.isWordLike)
  if (firstWordIndex < 0) return { lead: text, rest: '' }

  let endIndex = firstWordIndex + 1
  while (endIndex < parts.length && !parts[endIndex].isWordLike && !/\s/u.test(parts[endIndex].segment)) {
    endIndex += 1
  }

  return {
    lead: parts.slice(0, endIndex).map((part) => part.segment).join(''),
    rest: parts.slice(endIndex).map((part) => part.segment).join(''),
  }
}

function WrappedWords({ text }: { text: string }) {
  return segmentTitleWords(text).map((word, index) => (
    <span className="hero-word" key={`${word}-${index}`}>{word}</span>
  ))
}

function HeroTitle({ title, className }: { title: HeroProps['title']; className?: string }) {
  const { lead: suffixLead, rest: suffixRest } = takeLeadingWord(title.suffix)
  return (
    <h1 className={className ?? 'hero-title'} id="hero-title">
      <WrappedWords text={title.prefix} />
      <span className="hero-accent-phrase"><span className="accent-text">{title.accent}</span>{suffixLead}</span>
      <WrappedWords text={suffixRest} />
    </h1>
  )
}

function HeroSummary({ description }: { description: readonly string[] }) {
  return (
    <p className="hero-summary">
      {description.map((line) => <span className="hero-title-line" key={line}>{line}</span>)}
    </p>
  )
}

function HeroAction({ primaryAction }: { primaryAction: LinkAction }) {
  return (
    <div className="hero-actions">
      <a className="button button-primary" href={primaryAction.href}>
        {primaryAction.label}
        <ArrowRight size={18} weight="bold" aria-hidden="true" />
      </a>
    </div>
  )
}

type SubHeroProps = Omit<HeroProps, 'theme'>

function StudioHero({ title, description, primaryAction, media, process, descriptor }: SubHeroProps) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="hero-section studio-hero" id="top" aria-labelledby="hero-title">
      <div className="studio-hero-shell">
        <motion.p
          className="meta-line studio-hero-meta"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <span>{descriptor}</span>
          <span>{process[0]?.title} → {process[process.length - 1]?.title}</span>
        </motion.p>
        <motion.div
          className="studio-hero-title-wrap"
          initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroTitle title={title} />
        </motion.div>
        <div className="studio-hero-row">
          <motion.div
            className="studio-hero-side"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroSummary description={description} />
            <HeroAction primaryAction={primaryAction} />
          </motion.div>
          <div className="studio-hero-media">
            <motion.figure
              className="media-frame"
              initial={reduceMotion ? false : { clipPath: 'inset(0 100% 0 0)' }}
              animate={{ clipPath: 'inset(0 0% 0 0)' }}
              transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.15, ease: [0.76, 0, 0.24, 1] }}
            >
              <img src={media.src} alt={media.alt} width="1536" height="1024" fetchPriority="high" />
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  )
}

function CinemaHero({ title, description, primaryAction, media, supportingMedia, descriptor }: SubHeroProps) {
  const reduceMotion = useReducedMotion()
  const allMedia = [media, ...supportingMedia]

  return (
    <section className="hero-section cinema-hero" id="top" aria-labelledby="hero-title">
      <motion.figure
        className="cinema-hero-media"
        initial={reduceMotion ? false : { clipPath: 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0%)' }}
        transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.76, 0, 0.24, 1] }}
      >
        <img src={media.src} alt={media.alt} width="1536" height="1024" fetchPriority="high" />
      </motion.figure>
      {reduceMotion ? null : (
        <motion.span
          className="cinema-hero-playhead"
          aria-hidden="true"
          initial={{ x: '0vw', opacity: 1 }}
          animate={{ x: '98vw', opacity: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], opacity: { delay: 0.95, duration: 0.25 } }}
        />
      )}
      <motion.div
        className="cinema-hero-content"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="meta-line cinema-hero-meta">{descriptor}</p>
        <HeroTitle title={title} />
        <HeroSummary description={description} />
        <HeroAction primaryAction={primaryAction} />
      </motion.div>
      <div className="cinema-strip" aria-label="作品视觉片格">
        {allMedia.map((asset, index) => (
          <figure key={asset.src}>
            <img src={asset.src} alt={asset.alt} loading={index === 0 ? 'eager' : 'lazy'} />
            <figcaption>{asset.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function ProductHero({ title, description, primaryAction, process, descriptor }: SubHeroProps) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="hero-section product-hero" id="top" aria-labelledby="hero-title">
      <div className="product-hero-shell">
        <motion.p
          className="meta-line product-hero-meta"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.5 }}
        >
          <span>{descriptor}</span>
        </motion.p>
        <div className="product-hero-grid">
          <motion.div
            className="product-hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroTitle title={title} />
            <HeroSummary description={description} />
            <HeroAction primaryAction={primaryAction} />
          </motion.div>
          <div className="decision-path" role="group" aria-label="从问题到交付的方法路径">
            <p className="decision-path-head">
              <span>从问题到交付</span>
              <span>{process.length} 步</span>
            </p>
            <div className="decision-path-body">
              <motion.span
                className="decision-path-line"
                aria-hidden="true"
                initial={reduceMotion ? false : { scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <ol>
                {process.map((step, index) => (
                  <motion.li
                    className="decision-node"
                    key={step.title}
                    initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="step-index">{step.index}</span>
                    <div><h3>{step.title}</h3><p>{step.description}</p></div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function EditorialHero({ title, description, primaryAction, media }: SubHeroProps) {
  const reduceMotion = useReducedMotion()
  return (
    <section className="hero-section editorial-hero" id="top" aria-labelledby="hero-title">
      <div className="editorial-hero-shell">
        <div className="editorial-masthead" aria-hidden="true" />
        <div className="editorial-hero-grid">
          <motion.div
            className="editorial-hero-copy"
            initial={reduceMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroTitle title={title} />
            <HeroSummary description={description} />
            <HeroAction primaryAction={primaryAction} />
          </motion.div>
          <motion.figure
            className="editorial-hero-media"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="editorial-hero-frame">
              <img src={media.src} alt={media.alt} width="1536" height="1024" fetchPriority="high" />
            </div>
            <figcaption>{media.alt}</figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}

export function Hero(props: HeroProps) {
  const { theme, ...rest } = props

  if (theme === 'cinema') return <CinemaHero {...rest} />
  if (theme === 'product') return <ProductHero {...rest} />
  if (theme === 'editorial') return <EditorialHero {...rest} />
  return <StudioHero {...rest} />
}
