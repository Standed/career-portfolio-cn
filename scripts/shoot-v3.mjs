// Visual iteration helper: screenshots 4 themes x desktop/mobile into output/v3,
// and reports horizontal overflow at 1536/1280/768/390/320.
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/Owner/AppData/Roaming/npm/node_modules/n8n/node_modules/playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'
const THEMES = ['studio', 'cinema', 'product', 'editorial']
const OUT = fileURLToPath(new URL('../output/v3/', import.meta.url))
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const report = []

for (const theme of THEMES) {
  // Pass 1: normal motion, hero viewport shots
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(1600)
  await page.screenshot({ path: `${OUT}${theme}-desktop-hero.png` })
  await ctx.close()

  const ctxM = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true })
  const pageM = await ctxM.newPage()
  await pageM.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  await pageM.evaluate(() => document.fonts.ready)
  await pageM.waitForTimeout(1600)
  await pageM.screenshot({ path: `${OUT}${theme}-mobile-hero.png` })
  await ctxM.close()

  // Pass 2: reduced motion, full-page shots + overflow audit
  for (const vp of [{ width: 1536, height: 1024, tag: 'desktop' }, { width: 390, height: 844, tag: 'mobile' }]) {
    const ctxR = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
    const pageR = await ctxR.newPage()
    await pageR.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
    await pageR.evaluate(() => document.fonts.ready)
    await pageR.waitForTimeout(600)
    await pageR.screenshot({ path: `${OUT}${theme}-${vp.tag}-full.png`, fullPage: true })
    await ctxR.close()
  }

  for (const width of [1536, 1280, 768, 390, 320]) {
    const ctxO = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    const pageO = await ctxO.newPage()
    await pageO.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
    const overflow = await pageO.evaluate(() => {
      const doc = document.documentElement
      const wide = []
      if (doc.scrollWidth > window.innerWidth) {
        const all = document.querySelectorAll('body *')
        for (const el of all) {
          const r = el.getBoundingClientRect()
          if (r.width > window.innerWidth + 1 || r.right > window.innerWidth + 1 || r.left < -1) {
            const cls = typeof el.className === 'string' ? el.className : ''
            wide.push(`${el.tagName.toLowerCase()}.${cls.split(' ').slice(0, 2).join('.')} w=${Math.round(r.width)} left=${Math.round(r.left)} right=${Math.round(r.right)}`)
          }
        }
      }
      return { scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth, wide: wide.slice(0, 8) }
    })
    if (overflow.scrollWidth > overflow.innerWidth) {
      report.push(`[OVERFLOW] ${theme} @${width}: scrollWidth=${overflow.scrollWidth} > ${overflow.innerWidth}`)
      for (const w of overflow.wide) report.push(`    ${w}`)
    }
    await ctxO.close()
  }
  console.log(`done ${theme}`)
}

await browser.close()
console.log(report.length ? report.join('\n') : 'NO HORIZONTAL OVERFLOW at 1536/1280/768/390/320')

// Interaction pass: dialog focus management + theme switch persistence (studio).
const browser2 = await chromium.launch()
const ctxI = await browser2.newContext({ viewport: { width: 1536, height: 1024 } })
const pageI = await ctxI.newPage()
await pageI.goto(`${BASE}?theme=studio`, { waitUntil: 'networkidle' })
await pageI.evaluate(() => document.fonts.ready)
await pageI.waitForTimeout(1200)

const trigger = pageI.locator('.project-action').first()
await trigger.focus()
await trigger.click()
await pageI.waitForTimeout(500)
await pageI.screenshot({ path: `${OUT}dialog-desktop.png` })
const dialogState = await pageI.evaluate(() => {
  const dialog = document.querySelector('dialog.project-dialog')
  return {
    open: dialog?.hasAttribute('open') ?? false,
    focused: document.activeElement?.className ?? '',
  }
})
await pageI.keyboard.press('Escape')
await pageI.waitForTimeout(400)
const afterClose = await pageI.evaluate(() => ({
  closed: !document.querySelector('dialog.project-dialog')?.hasAttribute('open'),
  focusBack: document.activeElement?.className?.includes('project-action') ?? false,
}))
console.log(`dialog: open=${dialogState.open} initialFocus=${dialogState.focused} closedOnEsc=${afterClose.closed} focusReturned=${afterClose.focusBack}`)

await pageI.selectOption('.desktop-theme-switcher select', 'cinema')
await pageI.waitForTimeout(300)
const urlHasTheme = pageI.url().includes('theme=cinema')
await pageI.reload({ waitUntil: 'networkidle' })
const persisted = await pageI.evaluate(() => document.documentElement.dataset.theme)
console.log(`theme switch: urlParam=${urlHasTheme} persistedAfterReload=${persisted}`)

const ctxIM = await browser2.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const pageIM = await ctxIM.newPage()
await pageIM.goto(`${BASE}?theme=studio`, { waitUntil: 'networkidle' })
await pageIM.waitForTimeout(1000)
await pageIM.locator('.project-action').first().click()
await pageIM.waitForTimeout(500)
await pageIM.screenshot({ path: `${OUT}dialog-mobile.png` })
await browser2.close()
console.log('interaction pass done')
