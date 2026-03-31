import { chromium, type Browser, type Page } from 'playwright'
import { config } from '../config.js'
import { delay } from '../utils/rateLimiter.js'
import { log } from '../utils/logger.js'
import type { RawProspect } from './types.js'

const BASE_URL = 'https://www.pagesjaunes.fr/annuaire/chercherlespros'

export async function scrapePagesJaunes(
  metier: string,
  ville: string,
  limit: number,
): Promise<RawProspect[]> {
  const prospects: RawProspect[] = []
  let browser: Browser | null = null

  try {
    browser = await chromium.launch({ headless: true })
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
    })
    const page = await context.newPage()

    let pageNum = 1
    while (prospects.length < limit) {
      const url = `${BASE_URL}?quoiqui=${encodeURIComponent(metier)}&ou=${encodeURIComponent(ville)}&page=${pageNum}`
      log.dim(`Page ${pageNum} — ${url}`)

      try {
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: config.httpTimeoutMs })
      } catch {
        log.warn(`Timeout sur la page ${pageNum}, arrêt du scraping`)
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

      const results = await extractResults(page, metier, ville)
      if (results.length === 0) {
        log.dim('Plus de résultats, fin du scraping')
        break
      }

      for (const r of results) {
        if (prospects.length >= limit) break
        prospects.push(r)
      }

      const withSite = results.filter(r => r.url).length
      const withoutSite = results.filter(r => !r.url).length
      log.dim(`${results.length} résultats (${withSite} avec site, ${withoutSite} sans site), total: ${prospects.length}`)

      pageNum++
      await delay(config.scrapDelayMs)
    }
  } finally {
    await browser?.close()
  }

  return prospects
}

async function extractResults(page: Page, metier: string, ville: string): Promise<RawProspect[]> {
  return page.evaluate(({ metier, ville }) => {
    const results: Array<{
      name: string
      url: string | null
      phone: string | null
      address: string | null
      city: string | null
      metier: string
      ville: string
    }> = []

    const cards = document.querySelectorAll('.bi-bloc, .bi-generic, [data-pjax-id]')
    cards.forEach(card => {
      const nameEl = card.querySelector('.bi-denomination .denomination-links a, .bi-header-title a, h3 a')
      const name = nameEl?.textContent?.trim() || ''
      if (!name) return

      // Look for website link
      const siteLink = card.querySelector('a[data-pjax="website"], a.bi-website, a[href*="website"], .bi-cta-website a')
      let url: string | null = null
      if (siteLink) {
        const href = siteLink.getAttribute('href') || ''
        // Skip Pages Jaunes internal redirect links
        if (href && !href.includes('pagesjaunes.fr') && href !== '#') {
          url = href
        }
      }

      // Phone
      const phoneEl = card.querySelector('.bi-phone .tel, [data-phone-number], .number-phone')
      const phone = phoneEl?.textContent?.trim()?.replace(/\s+/g, '') || null

      // Address
      const addressEl = card.querySelector('.bi-address .address, .bi-adresse, .address-container')
      const address = addressEl?.textContent?.trim() || null

      results.push({ name, url, phone, address, city: ville, metier, ville })
    })

    return results
  }, { metier, ville })
}
