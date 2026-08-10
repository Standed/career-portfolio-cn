import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'
const OUT = fileURLToPath(new URL('../output/v3/scaled/', import.meta.url))

const shots = [
  ['studio', ['.studio-process', '.contact-section']],
  ['cinema', ['.cinema-process', '.contact-section']],
  ['product', ['.contact-section']],
  ['editorial', ['.contact-section']],
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
for (const [theme, selectors] of shots) {
  await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1800)
  for (const selector of selectors) {
    const el = await page.$(selector)
    if (!el) {
      console.log('MISSING', theme, selector)
      continue
    }
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(900)
    const name = selector.replace(/[^a-z]/g, '')
    await el.screenshot({ path: `${OUT}now-${theme}-${name}.png` })
  }
}
await browser.close()
console.log('done')
