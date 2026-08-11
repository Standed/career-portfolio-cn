import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'
const OUT = fileURLToPath(new URL('../output/v4/', import.meta.url))

const browser = await chromium.launch()

for (const width of [1536, 1280, 768, 390, 320]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  for (const theme of ['studio', 'cinema', 'product', 'editorial']) {
    await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1600)
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    if (overflow > 0) console.log(`OVERFLOW ${theme} @${width}: +${overflow}px`)
  }
  if (width === 390) {
    await page.goto(`${BASE}?theme=studio`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2600)
    await page.screenshot({ path: `${OUT}studio-mobile-hero.png` })
    await page.goto(`${BASE}?theme=cinema`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(2600)
    await page.screenshot({ path: `${OUT}cinema-mobile-hero.png` })
  }
  await page.close()
}
await browser.close()
console.log('done')
