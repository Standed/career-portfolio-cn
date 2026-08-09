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

  const fallbackParts = text.match(/\s+|[A-Za-z0-9]+|[\u3400-\u9fff]{1,2}|./gu) ?? [text]
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

function HeroCopy({ title, description, primaryAction, theme }: Pick<HeroProps, 'title' | 'description' | 'primaryAction' | 'theme'>) {
  const reduceMotion = useReducedMotion()
  const editorial = theme === 'editorial'
  const studio = theme === 'studio'
  const { lead: suffixLead, rest: suffixRest } = takeLeadingWord(title.suffix)

  return (
    <motion.div
      className="hero-copy"
      initial={reduceMotion ? false : { opacity: 0, y: editorial ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.h1
        className="hero-title"
        id="hero-title"
        initial={reduceMotion ? false : studio ? { clipPath: 'inset(0 100% 0 0)' } : editorial ? { clipPath: 'inset(0 0 100% 0)' } : false}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration: reduceMotion ? 0 : 0.78, ease: [0.16, 1, 0.3, 1] }}
      >
        <WrappedWords text={title.prefix} />
        <span className="hero-accent-phrase"><span className="accent-text">{title.accent}</span>{suffixLead}</span>
        <WrappedWords text={suffixRest} />
      </motion.h1>
      <p className="hero-summary">
        {description.map((line) => <span className="hero-title-line" key={line}>{line}</span>)}
      </p>
      <div className="hero-actions">
        <a className="button button-primary" href={primaryAction.href}>
          {primaryAction.label}
          <ArrowRight size={19} weight="bold" aria-hidden="true" />
        </a>
      </div>
    </motion.div>
  )
}

export function Hero({ theme, title, description, primaryAction, media, supportingMedia, process }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const allMedia = [media, ...supportingMedia]

  if (theme === 'cinema') {
    return (
      <section className="hero-section cinema-hero" id="top" aria-labelledby="hero-title">
        <motion.figure
          className="cinema-hero-media"
          initial={reduceMotion ? false : { clipPath: 'inset(0 0 0 100%)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          transition={{ duration: reduceMotion ? 0 : 0.86, ease: [0.76, 0, 0.24, 1] }}
        >
          <img src={media.src} alt={media.alt} width="1536" height="1024" fetchPriority="high" />
        </motion.figure>
        <div className="cinema-hero-copy-wrap">
          <HeroCopy title={title} description={description} primaryAction={primaryAction} theme={theme} />
        </div>
        <div className="cinema-strip" aria-label="作品视觉片格">
          {allMedia.map((asset, index) => (
            <figure key={asset.src}>
              <img src={asset.src} alt={asset.alt} loading={index === 0 ? 'eager' : 'lazy'} />
              <figcaption>{String(index + 1).padStart(2, '0')}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    )
  }

  if (theme === 'product') {
    return (
      <section className="hero-section product-hero" id="top" aria-labelledby="hero-title">
        <div className="product-hero-grid">
          <HeroCopy title={title} description={description} primaryAction={primaryAction} theme={theme} />
          <ol className="decision-path" aria-label="从问题到交付的方法路径">
            {process.map((step, index) => (
              <motion.li
                className="decision-node"
                key={step.title}
                initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.42, delay: reduceMotion ? 0 : 0.12 + index * 0.1 }}
              >
                <span>{step.index}</span>
                <div><h2>{step.title}</h2><p>{step.description}</p></div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  if (theme === 'editorial') {
    return (
      <section className="hero-section editorial-hero" id="top" aria-labelledby="hero-title">
        <div className="editorial-hero-grid">
          <HeroCopy title={title} description={description} primaryAction={primaryAction} theme={theme} />
          <motion.div
            className="editorial-visual"
            initial={reduceMotion ? false : { opacity: 0, y: 18, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.12 }}
          >
            <figure className="editorial-sheet editorial-sheet-main">
              <img src={media.src} alt={media.alt} width="1536" height="1024" fetchPriority="high" />
              <figcaption>{title.fullText}</figcaption>
            </figure>
            <div className="editorial-sheet editorial-sheet-note" aria-hidden="true">
              <strong>{description[0]}</strong>
              <span>{description[1]}</span>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="hero-section studio-hero" id="top" aria-labelledby="hero-title">
      <div className="studio-hero-grid">
        <HeroCopy title={title} description={description} primaryAction={primaryAction} theme={theme} />
        <motion.figure
          className="studio-hero-media"
          initial={reduceMotion ? false : { opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.74, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={media.src} alt={media.alt} width="1536" height="1024" fetchPriority="high" />
        </motion.figure>
      </div>
    </section>
  )
}
