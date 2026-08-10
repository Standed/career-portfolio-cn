import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5173/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

for (const theme of ['studio', 'cinema', 'product', 'editorial']) {
  await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  await page.waitForTimeout(2200)
  const report = await page.evaluate(() => {
    const heads = [...document.querySelectorAll('.section-heading, .contact-title')]
    const media = [...document.querySelectorAll('img')]
    const overlaps = []
    for (const h of heads) {
      const hr = h.getBoundingClientRect()
      for (const m of media) {
        const mr = m.getBoundingClientRect()
        const ox = Math.min(hr.right, mr.right) - Math.max(hr.left, mr.left)
        const oy = Math.min(hr.bottom, mr.bottom) - Math.max(hr.top, mr.top)
        if (ox > 4 && oy > 4) {
          const hz = getComputedStyle(h).zIndex
          let mz = getComputedStyle(m).zIndex
          let p = m.parentElement
          while (p && mz === 'auto') { mz = getComputedStyle(p).zIndex; p = p.parentElement }
          overlaps.push({ head: h.textContent.slice(0, 12), ox: Math.round(ox), oy: Math.round(oy), hz, mz, img: m.getAttribute('src') })
        }
      }
    }
    return overlaps
  })
  console.log(theme, JSON.stringify(report))
}
await browser.close()
