import { themePresets } from '../content/presets'
import type { ThemeConfig, ThemeKey } from '../types/portfolio'

export const themeKeys = ['studio', 'cinema', 'product', 'editorial'] as const satisfies readonly ThemeKey[]
export const themeStorageKey = 'xiyangshi-portfolio-theme'

export function isThemeKey(value: string | null): value is ThemeKey {
  return value !== null && themeKeys.some((key) => key === value)
}

export function resolveRuntimeTheme(fallback: ThemeKey): ThemeKey {
  if (typeof window === 'undefined') return fallback

  const queryTheme = new URLSearchParams(window.location.search).get('theme')
  if (isThemeKey(queryTheme)) return queryTheme

  try {
    const storedTheme = window.localStorage.getItem(themeStorageKey)
    if (isThemeKey(storedTheme)) return storedTheme
  } catch {
    // Storage can be unavailable in private or locked-down browsing contexts.
  }

  return fallback
}

export function getThemeConfig(key: ThemeKey, careerPreset: ThemeKey): ThemeConfig {
  return { ...themePresets[key], careerPreset }
}

export function applyRuntimeTheme(theme: ThemeConfig) {
  const root = document.documentElement
  root.dataset.theme = theme.id
  root.dataset.careerPreset = theme.careerPreset
  root.dataset.colorMode = theme.colorMode
  root.dataset.layoutStyle = theme.layoutStyle
  root.dataset.motionStyle = theme.motionStyle
  root.style.colorScheme = theme.colorMode

  const properties = {
    '--theme-background': theme.tokens.background,
    '--theme-surface': theme.tokens.surface,
    '--theme-text': theme.tokens.text,
    '--theme-muted-text': theme.tokens.mutedText,
    '--theme-accent': theme.tokens.accent,
    '--theme-accent-text': theme.tokens.accentText,
    '--theme-border': theme.tokens.border,
    '--theme-display-font': theme.tokens.displayFont,
    '--theme-body-font': theme.tokens.bodyFont,
    '--theme-radius': theme.tokens.radius,
    '--theme-shadow': theme.tokens.shadow,
  } as const

  Object.entries(properties).forEach(([property, value]) => root.style.setProperty(property, value))

  const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
  if (themeColor) themeColor.content = theme.tokens.background
}

export function persistRuntimeTheme(key: ThemeKey) {
  try {
    window.localStorage.setItem(themeStorageKey, key)
  } catch {
    // The URL remains the durable, shareable fallback.
  }

  const url = new URL(window.location.href)
  url.searchParams.set('theme', key)
  window.history.replaceState(window.history.state, '', url)
}
