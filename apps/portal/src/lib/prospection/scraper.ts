import { chromium, type Browser, type Page } from 'playwright-core'
import type { RawProspect } from './types'

const BASE_URL = 'https://www.pagesjaunes.fr/annuaire/chercherlespros'
const DELAY_MS = 2000
const TIMEOUT_MS = 15000

// Use Chrome headless shell — set via CHROMIUM_PATH env var
function getChromiumPath(): string {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH
  const candidates = [
    '/usr/local/bin/chrome-headless-shell',
    '/opt/chrome-headless-shell-linux64/chrome-headless-shell',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/bin/google-chrome',
  ]
  for (const c of candidates) {
    try { require('fs').accessSync(c); return c } catch {}
  }
  throw new Error('Chrome not found. Set CHROMIUM_PATH env var.')
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function scrapePagesJaunes(
  metier: string,
  ville: string,
  limit: number,
  onProgress?: (pct: number) => Promise<void>,
): Promise<RawProspect[]> {
  const prospects: RawProspect[] = []
  let browser: Browser | null = null

  try {
    browser = await chromium.launch({
      headless: true,
      executablePath: getChromiumPath(),
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    })
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
    })
    const page = await context.newPage()

    let pageNum = 1
    const maxPages = Math.ceil(limit / 10) + 2

    while (prospects.length < limit) {
      const url = `${BASE_URL}?quoiqui=${encodeURIComponent(metier)}&ou=${encodeURIComponent(ville)}&page=${pageNum}`

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: TIMEOUT_MS })
      } catch {
        break
      }

      // Accept cookies on first page
      if (pageNum === 1) {
        try {
          const cookieBtn = page.locator('#didomi-notice-agree-button, .didomi-continue-without-agreeing')
          await cookieBtn.click({ timeout: 3000 })
          await delay(500)
        } catch { /* no popup */ }
      }

      const results = await extractResults(page, ville)
      if (results.length === 0) break

      for (const r of results) {
        if (prospects.length >= limit) break
        prospects.push(r)
      }

      if (onProgress) {
        const pct = Math.min(100, Math.round((prospects.length / limit) * 100))
        await onProgress(pct).catch(() => {})
      }

      pageNum++
      if (pageNum > maxPages) break
      await delay(DELAY_MS)
    }
  } finally {
    await browser?.close()
  }

  return prospects
}

async function extractResults(page: Page, ville: string): Promise<RawProspect[]> {
  return page.evaluate(({ ville }) => {
    const results: Array<{
      name: string
      url: string | null
      phone: string | null
      address: string | null
      city: string | null
    }> = []

    const cards = document.querySelectorAll('.bi-bloc, .bi-generic, [data-pjax-id]')
    cards.forEach(card => {
      const nameEl = card.querySelector('.bi-denomination .denomination-links a, .bi-header-title a, h3 a')
      const name = nameEl?.textContent?.trim() || ''
      if (!name) return

      const siteLink = card.querySelector('a[data-pjax="website"], a.bi-website, a[href*="website"], .bi-cta-website a')
      let url: string | null = null
      if (siteLink) {
        const href = siteLink.getAttribute('href') || ''
        if (href && !href.includes('pagesjaunes.fr') && href !== '#') {
          url = href
        }
      }

      const phoneEl = card.querySelector('.bi-phone .tel, [data-phone-number], .number-phone')
      const phone = phoneEl?.textContent?.trim()?.replace(/\s+/g, '') || null

      const addressEl = card.querySelector('.bi-address .address, .bi-adresse, .address-container')
      const address = addressEl?.textContent?.trim() || null

      results.push({ name, url, phone, address, city: ville })
    })

    return results
  }, { ville })
}
