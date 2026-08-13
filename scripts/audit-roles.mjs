import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'
const OUT = fileURLToPath(new URL('../output/v5/', import.meta.url))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const role of ['designer', 'film', 'product', 'operations']) {
  await page.goto(`${BASE}?role=${role}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(3200)
  await page.screenshot({ path: `${OUT}role-${role}-hero.png` })
  const state = await page.evaluate(() => ({
    theme: document.documentElement.dataset.theme,
    title: document.querySelector('.hero-title')?.textContent?.trim(),
    descriptor: document.querySelector('.meta-line')?.textContent?.trim(),
  }))
  console.log(role, JSON.stringify(state))
}
await browser.close()
console.log('done')
