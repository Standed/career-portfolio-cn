import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'motion/react'
import portfolioContent from './content/portfolio'
import { Capabilities } from './components/Capabilities'
import { ContactFooter } from './components/ContactFooter'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { SelectedWork } from './components/SelectedWork'
import { SiteHeader } from './components/SiteHeader'
import { WorkProcess } from './components/WorkProcess'
import { applyRuntimeTheme, getThemeConfig, persistRuntimeTheme, resolveRuntimeTheme } from './components/themeRuntime'
import type { ThemeKey } from './types/portfolio'

function App() {
  const content = portfolioContent
  const [activeTheme, setActiveTheme] = useState<ThemeKey>(() => resolveRuntimeTheme(content.theme.id))
  const runtimeTheme = getThemeConfig(activeTheme, content.career.id)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    applyRuntimeTheme(runtimeTheme)
  }, [runtimeTheme])

  useEffect(() => {
    if (reduceMotion) return undefined
    const lenis = new Lenis({ lerp: 0.11, anchors: true })
    let frame = 0
    const loop = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reduceMotion])

  const changeTheme = (theme: ThemeKey) => {
    setActiveTheme(theme)
    persistRuntimeTheme(theme)
  }

  const marqueeItems = [
    ...content.process.map((step) => step.title),
    ...content.capabilities.map((group) => group.title),
  ]

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Cursor />
      <SiteHeader
        brand={content.brand.displayName}
        navigation={content.navigation}
        activeTheme={activeTheme}
        onThemeChange={changeTheme}
      />

      <main id="main-content">
        <Hero
          theme={activeTheme}
          title={content.hero.title}
          description={content.hero.description}
          primaryAction={content.hero.primaryAction}
          media={content.hero.media}
          supportingMedia={[content.processSection.media, content.contact.media]}
          process={content.process}
          descriptor={content.brand.descriptor}
        />
        <Marquee items={marqueeItems} label="工作方法与能力领域" />
        <SelectedWork
          theme={activeTheme}
          id={content.projectsSection.id}
          title={content.projectsSection.title}
          pendingLabel={content.projectsSection.pendingLabel}
          narrativeLabels={content.projectNarrativeLabels}
          projects={content.projects}
        />
        <WorkProcess
          theme={activeTheme}
          id={content.processSection.id}
          title={content.processSection.title}
          steps={content.process}
          media={content.processSection.media}
        />
        <Capabilities
          theme={activeTheme}
          id={content.capabilitiesSection.id}
          title={content.capabilitiesSection.title}
          groups={content.capabilities}
        />
        <ContactFooter
          id={content.contact.id}
          heading={content.contact.heading}
          fallback={content.contact.fallback}
          action={content.contact.action}
          channels={[
            content.contact.channels.email,
            content.contact.channels.wechat,
            content.contact.channels.github,
          ]}
          media={content.contact.media}
          footerBrand={content.brand.displayName}
          footerDescriptor={content.footer.descriptor}
        />
      </main>
    </div>
  )
}

export default App
