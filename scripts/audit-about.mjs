import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5174/'
const OUT = fileURLToPath(new URL('../output/v6/', import.meta.url))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const role of ['designer', 'film', 'product', 'operations']) {
  await page.goto(`${BASE}?role=${role}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  const about = await page.$('.about-section')
  if (about) {
    await about.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1400)
    await about.screenshot({ path: `${OUT}${role}-about.png` })
  }
  const state = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    aboutTitle: document.querySelector('.about-section .section-heading')?.textContent?.trim(),
    firstBio: document.querySelector('.about-paragraph')?.textContent?.trim().slice(0, 24),
  }))
  console.log(role, JSON.stringify(state))
}
await browser.close()
console.log('done')
