import { chromium, type Browser, type Page } from 'playwright'
import { config } from '../config.js'
import { delay } from '../utils/rateLimiter.js'
import { log } from '../utils/logger.js'
import type { RawProspect } from './types.js'

const BASE_URL = 'https://www.pagesjaunes.fr/annuaire/chercherlespros'

// Rotate user agents to avoid detection
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15',
]

export async function scrapePagesJaunes(
  metier: string,
  ville: string,
  limit: number,
): Promise<RawProspect[]> {
  const prospects: RawProspect[] = []
  let browser: Browser | null = null

  const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)]

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-blink-features=AutomationControlled',
        '--disable-infobars',
        '--window-size=1920,1080',
        '--start-maximized',
      ],
    })

    const context = await browser.newContext({
      userAgent,
      viewport: { width: 1920, height: 1080 },
      locale: 'fr-FR',
      timezoneId: 'Europe/Paris',
      geolocation: { latitude: 44.8378, longitude: -0.5792 }, // Bordeaux
      permissions: ['geolocation'],
      // Mimic a real browser
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'sec-ch-ua': '"Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
      },
    })

    // Stealth: override navigator.webdriver to avoid detection
    await context.addInitScript(() => {
      // Remove webdriver flag
      Object.defineProperty(navigator, 'webdriver', { get: () => false })

      // Override plugins to look real
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      })

      // Override languages
      Object.defineProperty(navigator, 'languages', {
        get: () => ['fr-FR', 'fr', 'en-US', 'en'],
      })

      // Override platform
      Object.defineProperty(navigator, 'platform', {
        get: () => 'MacIntel',
      })

      // Override Chrome runtime
      ;(window as any).chrome = {
        runtime: {},
        loadTimes: function() {},
        csi: function() {},
        app: {},
      }

      // Override permissions
      const originalQuery = window.navigator.permissions.query
      window.navigator.permissions.query = (parameters: any) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: 'prompt' } as PermissionStatus)
          : originalQuery(parameters)
    })

    const page = await context.newPage()

    let pageNum = 1
    while (prospects.length < limit) {
      const url = `${BASE_URL}?quoiqui=${encodeURIComponent(metier)}&ou=${encodeURIComponent(ville)}&page=${pageNum}`
      log.dim(`Page ${pageNum} — ${url}`)

      try {
        // Navigate with a random delay to look human
        await delay(500 + Math.random() * 1500)
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 })
        // Wait a bit for JS to render
        await delay(1000 + Math.random() * 2000)
      } catch {
        log.warn(`Timeout sur la page ${pageNum}, arrêt du scraping`)
        break
      }

      // Accept cookies on first page
      if (pageNum === 1) {
        try {
          const cookieBtn = page.locator('#didomi-notice-agree-button, .didomi-continue-without-agreeing')
          await cookieBtn.click({ timeout: 5000 })
          await delay(1000)
        } catch { /* no popup */ }

        // Check if we got blocked (captcha, empty page)
        const bodyText = await page.textContent('body').catch(() => '')
        if (bodyText && (bodyText.includes('captcha') || bodyText.includes('Veuillez confirmer'))) {
          log.warn('Captcha détecté — Pages Jaunes bloque les requêtes')
          break
        }
      }

      // Scroll down slowly to trigger lazy loading and look human
      await page.evaluate(async () => {
        for (let i = 0; i < 3; i++) {
          window.scrollBy(0, 400)
          await new Promise(r => setTimeout(r, 300 + Math.random() * 500))
        }
      })
      await delay(500)

      const results = await extractResults(page, metier, ville)
      if (results.length === 0) {
        // Maybe the page loaded but no results rendered — wait and retry once
        await delay(3000)
        const retryResults = await extractResults(page, metier, ville)
        if (retryResults.length === 0) {
          log.dim('Plus de résultats, fin du scraping')
          break
        }
        for (const r of retryResults) {
          if (prospects.length >= limit) break
          prospects.push(r)
        }
      } else {
        for (const r of results) {
          if (prospects.length >= limit) break
          prospects.push(r)
        }
      }

      const withSite = results.filter(r => r.url).length
      const withoutSite = results.filter(r => !r.url).length
      log.dim(`${results.length} résultats (${withSite} avec site, ${withoutSite} sans site), total: ${prospects.length}`)

      pageNum++
      // Random delay between pages (2-5 seconds)
      await delay(2000 + Math.random() * 3000)
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
