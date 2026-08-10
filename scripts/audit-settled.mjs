import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'
const OUT = fileURLToPath(new URL('../output/v3/settled/', import.meta.url))

const themes = ['studio', 'cinema', 'product', 'editorial']
const sectionSelectors = ['.hero-section', '.work-section', '.process-section', '.contact-section']

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const theme of themes) {
  await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  // Trigger every reveal animation by scrolling through the page.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.6
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(2200)
  for (const selector of sectionSelectors) {
    const el = await page.$(selector)
    if (!el) continue
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    const name = selector.replace(/[^a-z]/g, '').replace('section', '')
    await el.screenshot({ path: `${OUT}${theme}-${name}.png` })
  }
}
await browser.close()
console.log('done')
