import { List, X } from '@phosphor-icons/react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import type { NavigationItem } from '../types/portfolio'
import type { RoleKey, ThemeKey } from '../types/portfolio'
import { RoleSwitcher } from './RoleSwitcher'
import { ThemeSwitcher } from './ThemeSwitcher'

type SiteHeaderProps = {
  brand: string
  navigation: readonly NavigationItem[]
  activeTheme: ThemeKey
  activeRole: RoleKey
  onThemeChange: (theme: ThemeKey) => void
  onRoleChange: (role: RoleKey) => void
}

export function SiteHeader({ brand, navigation, activeTheme, activeRole, onThemeChange, onRoleChange }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progressScale = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })

  useEffect(() => {
    if (!menuOpen) return undefined

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand-link" href="#top" aria-label={`${brand}，返回顶部`}>
          {brand}
          <span className="brand-status" aria-hidden="true" />
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          {navigation.map((item) => (
            <a className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="desktop-theme-switcher">
          <RoleSwitcher value={activeRole} onChange={onRoleChange} />
          <ThemeSwitcher value={activeTheme} onChange={onThemeChange} />
        </div>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? '关闭导航' : '打开导航'}
          aria-controls="mobile-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <List size={22} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="移动端导航"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <div className="mobile-nav-list">
              {navigation.map((item) => (
                <a
                  className="nav-link"
                  href={item.href}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <RoleSwitcher value={activeRole} onChange={onRoleChange} />
              <ThemeSwitcher value={activeTheme} onChange={onThemeChange} />
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
      <motion.span
        className="scroll-progress"
        style={reduceMotion ? undefined : { scaleX: progressScale }}
        aria-hidden="true"
      />
    </header>
  )
}
