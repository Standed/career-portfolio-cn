import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/noto-serif-sc'
import App from './App'
import portfolioContent, { isVerifiedField } from './content/portfolio'
import { applyRuntimeTheme, getThemeConfig, resolveRuntimeTheme } from './components/themeRuntime'
import './styles/global.css'

const { seo } = portfolioContent
const root = document.documentElement
const initialTheme = resolveRuntimeTheme(portfolioContent.theme.id)
applyRuntimeTheme(getThemeConfig(initialTheme, portfolioContent.career.id))

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.append(element)
  }
  element.content = content
}

root.lang = seo.locale.replace('_', '-')
document.title = seo.title
setMeta('name', 'description', seo.description)
setMeta('property', 'og:title', seo.title)
setMeta('property', 'og:description', seo.description)
setMeta('property', 'og:type', seo.ogType)
setMeta('property', 'og:locale', seo.locale)
setMeta('name', 'twitter:card', seo.twitterCard)

if (isVerifiedField(seo.siteUrl)) {
  const siteRoot = seo.siteUrl.value.endsWith('/')
    ? seo.siteUrl.value
    : `${seo.siteUrl.value}/`
  const canonicalPath = seo.canonicalPath === '/' ? '' : seo.canonicalPath
  const imagePath = seo.ogImage.src.replace(/^\/+/, '')
  const canonicalUrl = new URL(canonicalPath, siteRoot).toString()
  const imageUrl = new URL(imagePath, siteRoot).toString()
  let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.append(canonical)
  }
  canonical.href = canonicalUrl
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('property', 'og:image', imageUrl)
} else {
  document.querySelector('link[rel="canonical"]')?.remove()
  document.querySelector('meta[property="og:url"]')?.remove()
  setMeta('property', 'og:image', seo.ogImage.src)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
