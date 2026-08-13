// Motion-upgrade self-check: hero + mid-scroll + hover spotlight per theme,
// plus horizontal overflow audit at 1536/1280/768/390/320.
import { createRequire } from 'node:module'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const { chromium } = require('C:/Users/Owner/AppData/Roaming/npm/node_modules/n8n/node_modules/playwright')

const BASE = process.env.SITE_URL ?? 'http://127.0.0.1:5199/'
const THEMES = ['studio', 'cinema', 'product', 'editorial']
const OUT = fileURLToPath(new URL('../output/motion-v2/', import.meta.url))
mkdirSync(OUT, { recursive: true })

const hoverTarget = {
  studio: '.studio-project-row',
  cinema: '.cinema-slate article',
  product: '.product-case',
}

const browser = await chromium.launch()
const report = []

for (const theme of THEMES) {
  const ctx = await browser.newContext({ viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 })
  const page = await ctx.newPage()
  await page.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(2000)
  await page.screenshot({ path: `${OUT}${theme}-hero.png` })

  await page.evaluate(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    window.scrollTo({ top: max * 0.52, behavior: 'instant' })
  })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}${theme}-mid.png` })

  const target = hoverTarget[theme]
  if (target) {
    const el = page.locator(target).first()
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(800)
    const box = await el.boundingBox()
    if (box) {
      await page.mouse.move(box.x + box.width * 0.6, box.y + box.height * 0.4, { steps: 6 })
      await page.waitForTimeout(600)
      await page.screenshot({ path: `${OUT}${theme}-hover.png` })
    }
  }
  await ctx.close()

  for (const width of [1536, 1280, 768, 390, 320]) {
    const ctxO = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
    const pageO = await ctxO.newPage()
    await pageO.goto(`${BASE}?theme=${theme}`, { waitUntil: 'networkidle' })
    const overflow = await pageO.evaluate(() => {
      const doc = document.documentElement
      return { scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth }
    })
    if (overflow.scrollWidth > overflow.innerWidth) {
      report.push(`[OVERFLOW] ${theme} @${width}: scrollWidth=${overflow.scrollWidth} > ${overflow.innerWidth}`)
    }
    await ctxO.close()
  }
  console.log(`done ${theme}`)
}

await browser.close()
console.log(report.length ? report.join('\n') : 'NO HORIZONTAL OVERFLOW at 1536/1280/768/390/320')
