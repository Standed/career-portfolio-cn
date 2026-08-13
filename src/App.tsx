import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { useReducedMotion } from 'motion/react'
import portfolioContent from './content/portfolio'
import { roleNarratives } from './content/presets'
import { Capabilities } from './components/Capabilities'
import { ContactFooter } from './components/ContactFooter'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { SelectedWork } from './components/SelectedWork'
import { SiteHeader } from './components/SiteHeader'
import { WorkProcess } from './components/WorkProcess'
import { applyRuntimeTheme, getThemeConfig, persistRuntimeRole, persistRuntimeTheme, resolveRuntimeRole, resolveRuntimeTheme } from './components/themeRuntime'
import type { RoleKey, ThemeKey } from './types/portfolio'

function App() {
  const content = portfolioContent
  const [activeTheme, setActiveTheme] = useState<ThemeKey>(() => resolveRuntimeTheme(content.theme.id))
  const [activeRole, setActiveRole] = useState<RoleKey>(() => resolveRuntimeRole(content.career.id))
  const runtimeTheme = getThemeConfig(activeTheme, content.career.id)
  const role = roleNarratives[activeRole]
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

  const changeRole = (nextRole: RoleKey) => {
    setActiveRole(nextRole)
    persistRuntimeRole(nextRole)
    // 岗位切换时同步切到配套视觉主题，让差异立刻可见；之后仍可单独调整主题。
    setActiveTheme(roleNarratives[nextRole].defaultTheme)
    persistRuntimeTheme(roleNarratives[nextRole].defaultTheme)
  }

  const marqueeItems = [
    ...role.process.map((step) => step.title),
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
        activeRole={activeRole}
        onThemeChange={changeTheme}
        onRoleChange={changeRole}
      />

      <main id="main-content">
        <Hero
          key={`${activeRole}-${activeTheme}`}
          theme={activeTheme}
          title={role.heroTitle}
          description={role.heroDescription}
          primaryAction={content.hero.primaryAction}
          media={content.hero.media}
          supportingMedia={[content.processSection.media, content.contact.media]}
          process={role.process}
          descriptor={role.descriptor}
        />
        <Marquee items={marqueeItems} label="工作方法与能力领域" />
        <SelectedWork
          theme={activeTheme}
          id={content.projectsSection.id}
          title={role.workSectionTitle}
          pendingLabel={content.projectsSection.pendingLabel}
          narrativeLabels={role.projectNarrativeLabels}
          projects={content.projects}
        />
        <WorkProcess
          theme={activeTheme}
          id={content.processSection.id}
          title={role.processSectionTitle}
          steps={role.process}
          media={content.processSection.media}
        />
        <Capabilities
          theme={activeTheme}
          id={content.capabilitiesSection.id}
          title={role.capabilitiesSectionTitle}
          groups={content.capabilities}
        />
        <ContactFooter
          id={content.contact.id}
          heading={role.contactHeading}
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
