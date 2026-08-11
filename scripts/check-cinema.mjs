import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const OUT = fileURLToPath(new URL('../output/v4/', import.meta.url))

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://127.0.0.1:5173/?theme=cinema', { waitUntil: 'networkidle' })
await page.waitForTimeout(3500)
const el = await page.$('.cinema-hero')
await el.screenshot({ path: `${OUT}cinema-hero-element.png` })
const info = await page.evaluate(() => {
  const content = document.querySelector('.cinema-hero-content')
  const actions = document.querySelector('.cinema-hero .hero-actions')
  const summary = document.querySelector('.cinema-hero .hero-summary')
  const rect = (el) => (el ? JSON.parse(JSON.stringify(el.getBoundingClientRect())) : null)
  return {
    viewport: window.innerHeight,
    hero: rect(document.querySelector('.cinema-hero')),
    content: rect(content),
    summary: rect(summary),
    actions: rect(actions),
  }
})
console.log(JSON.stringify(info, null, 2))
await browser.close()
