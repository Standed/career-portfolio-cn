import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'
const OUT = fileURLToPath(new URL('../output/v4/', import.meta.url))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const theme of ['studio', 'cinema', 'product', 'editorial']) {
  await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  // Mid-animation frame: catch the kinetic title rising.
  await page.waitForTimeout(420)
  await page.screenshot({ path: `${OUT}${theme}-hero-mid.png` })
  await page.waitForTimeout(2600)
  await page.screenshot({ path: `${OUT}${theme}-hero-settled.png` })
  // Marquee sits right below the hero.
  await page.evaluate(() => window.scrollTo(0, window.innerHeight * 0.72))
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}${theme}-marquee.png` })
}
await browser.close()
console.log('done')
