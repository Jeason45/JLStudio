import * as cheerio from 'cheerio'
import type { RawProspect } from './types'

const BASE_URL = 'https://www.pagesjaunes.fr/annuaire/chercherlespros'
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function scrapePagesJaunes(
  metier: string,
  ville: string,
  limit: number,
  onProgress?: (pct: number) => void,
): Promise<RawProspect[]> {
  const prospects: RawProspect[] = []
  let pageNum = 1
  // Estimate ~20 results per page
  const estimatedPages = Math.ceil(limit / 20)

  while (prospects.length < limit) {
    const url = `${BASE_URL}?quoiqui=${encodeURIComponent(metier)}&ou=${encodeURIComponent(ville)}&page=${pageNum}`

    let html: string
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'fr-FR,fr;q=0.9',
        },
        signal: AbortSignal.timeout(15000),
      })

      if (!response.ok) {
        console.warn(`PagesJaunes: page ${pageNum} returned ${response.status}, stopping`)
        break
      }

      html = await response.text()
    } catch (err) {
      console.warn(`PagesJaunes: fetch error on page ${pageNum}:`, err)
      break
    }

    const results = parseResultsPage(html, ville)
    if (results.length === 0) break

    for (const r of results) {
      if (prospects.length >= limit) break
      prospects.push(r)
    }

    if (onProgress) {
      const pct = Math.min(100, Math.round((pageNum / estimatedPages) * 100))
      onProgress(pct)
    }

    pageNum++
    // Rate limit: 2s between pages
    await delay(2000)
  }

  return prospects
}

function parseResultsPage(html: string, ville: string): RawProspect[] {
  const $ = cheerio.load(html)
  const results: RawProspect[] = []

  $('.bi-bloc, .bi-generic, [data-pjax-id]').each((_, el) => {
    const card = $(el)

    // Name
    const nameEl = card.find('.bi-denomination .denomination-links a, .bi-header-title a, h3 a').first()
    const name = nameEl.text().trim()
    if (!name) return

    // Website URL
    let url: string | null = null
    const siteLink = card.find('a[data-pjax="website"], a.bi-website, .bi-cta-website a').first()
    if (siteLink.length) {
      const href = siteLink.attr('href') || ''
      if (href && !href.includes('pagesjaunes.fr') && href !== '#') {
        url = href
      }
    }

    // Phone
    const phoneEl = card.find('.bi-phone .tel, [data-phone-number], .number-phone').first()
    const phone = phoneEl.text().trim().replace(/\s+/g, '') || null

    // Address
    const addressEl = card.find('.bi-address .address, .bi-adresse, .address-container').first()
    const address = addressEl.text().trim() || null

    results.push({ name, url, phone, address, city: ville })
  })

  return results
}
