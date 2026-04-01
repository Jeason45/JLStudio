// Smart business search: SIRENE (official registry) + DuckDuckGo (website finder)
// No API key needed, no Playwright, works from server-side

const SIRENE_URL = 'https://recherche-entreprises.api.gouv.fr/search'

// ── NAF codes by trade (common ones) ──
const TRADE_NAF_CODES: Record<string, string[]> = {
  'plombier': ['43.22A', '43.22B'],
  'electricien': ['43.21A', '43.21B'],
  'coiffeur': ['96.02A', '96.02B'],
  'coiffeuse': ['96.02A', '96.02B'],
  'restaurant': ['56.10A'],
  'boulangerie': ['10.71A', '10.71B'],
  'boulanger': ['10.71A', '10.71B'],
  'fleuriste': ['47.76Z'],
  'pharmacie': ['47.73Z'],
  'dentiste': ['86.23Z'],
  'avocat': ['69.10Z'],
  'architecte': ['71.11Z'],
  'garagiste': ['45.20A', '45.20B'],
  'menuisier': ['43.32A'],
  'peintre': ['43.34Z'],
  'maçon': ['43.99A', '43.99B'],
  'couvreur': ['43.91A'],
  'serrurier': ['43.21B'],
  'photographe': ['74.20Z'],
  'agence immobilière': ['68.31Z'],
  'immobilier': ['68.31Z'],
  'comptable': ['69.20Z'],
  'expert-comptable': ['69.20Z'],
  'pressing': ['96.01A'],
  'opticien': ['47.78A'],
  'bijoutier': ['47.77Z'],
  'boucher': ['47.22Z'],
  'traiteur': ['56.21Z'],
  'pizzeria': ['56.10A'],
  'bar': ['56.30Z'],
  'café': ['56.30Z'],
  'hôtel': ['55.10Z'],
  'auto-école': ['85.53Z'],
  'infirmier': ['86.90C'],
  'kinésithérapeute': ['86.90A'],
  'vétérinaire': ['75.00Z'],
}

export interface BusinessResult {
  name: string
  siret: string
  siren: string
  address: string
  city: string
  postalCode: string
  dateCreation: string | null
  effectif: string | null
  nafCode: string | null
  nafLabel: string | null
  website: string | null
  isActive: boolean
}

// Search businesses via SIRENE (French business registry — free, unlimited)
export async function searchBusinesses(
  metier: string,
  ville: string,
  limit: number = 20,
): Promise<BusinessResult[]> {
  const results: BusinessResult[] = []

  // Normalize trade name
  const metierLower = metier.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const nafCodes = TRADE_NAF_CODES[metierLower] || TRADE_NAF_CODES[metier.toLowerCase()] || []

  try {
    // Strategy 1: search by NAF code + city
    if (nafCodes.length > 0) {
      for (const naf of nafCodes) {
        if (results.length >= limit) break
        const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
          activite_principale: naf,
          commune: ville,
          etat_administratif: 'A',
          per_page: String(Math.min(limit - results.length, 25)),
        })}`, { signal: AbortSignal.timeout(10000) })

        if (res.ok) {
          const data = await res.json() as any
          for (const r of (data.results || [])) {
            if (results.length >= limit) break
            results.push(mapSireneResult(r))
          }
        }
      }
    }

    // Strategy 2: if no NAF codes or few results, search by name + city
    if (results.length < limit) {
      const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
        q: metier,
        commune: ville,
        etat_administratif: 'A',
        per_page: String(Math.min(limit - results.length, 25)),
      })}`, { signal: AbortSignal.timeout(10000) })

      if (res.ok) {
        const data = await res.json() as any
        for (const r of (data.results || [])) {
          if (results.length >= limit) break
          // Deduplicate by SIREN
          if (!results.some(existing => existing.siren === r.siren)) {
            results.push(mapSireneResult(r))
          }
        }
      }
    }
  } catch (err) {
    console.error('SIRENE search error:', err)
  }

  // Find websites for each business via DuckDuckGo
  for (let i = 0; i < results.length; i++) {
    try {
      results[i].website = await findWebsite(results[i].name, results[i].city)
    } catch { /* best effort */ }

    // Rate limit: 500ms between DuckDuckGo requests
    if (i < results.length - 1) {
      await new Promise(r => setTimeout(r, 500))
    }
  }

  return results
}

function mapSireneResult(r: any): BusinessResult {
  const siege = r.siege || {}
  return {
    name: r.nom_complet || r.nom_raison_sociale || '?',
    siret: siege.siret || '',
    siren: r.siren || '',
    address: [siege.numero_voie, siege.type_voie, siege.libelle_voie].filter(Boolean).join(' '),
    city: siege.libelle_commune || '',
    postalCode: siege.code_postal || '',
    dateCreation: r.date_creation || null,
    effectif: r.tranche_effectif_salarie || null,
    nafCode: r.activite_principale || null,
    nafLabel: r.libelle_activite_principale || null,
    website: null,
    isActive: r.etat_administratif === 'A',
  }
}

// Find a company's website via DuckDuckGo HTML search (no API key)
async function findWebsite(companyName: string, city: string): Promise<string | null> {
  try {
    const query = `${companyName} ${city} site officiel`
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      signal: AbortSignal.timeout(8000),
    })

    const html = await res.text()

    // Extract result URLs from DuckDuckGo HTML
    const urlRegex = /uddg=(https?%3A%2F%2F[^&"]+)/g
    const matches = [...html.matchAll(urlRegex)]

    for (const match of matches) {
      const decoded = decodeURIComponent(match[1])
      // Skip ads, aggregators, social media, directories
      if (decoded.includes('duckduckgo.com')) continue
      if (decoded.includes('bing.com')) continue
      if (decoded.includes('pagesjaunes.fr')) continue
      if (decoded.includes('facebook.com')) continue
      if (decoded.includes('instagram.com')) continue
      if (decoded.includes('linkedin.com')) continue
      if (decoded.includes('twitter.com')) continue
      if (decoded.includes('youtube.com')) continue
      if (decoded.includes('mesdepanneurs.fr')) continue
      if (decoded.includes('habitatpresto.com')) continue
      if (decoded.includes('lesbonsartisans.fr')) continue
      if (decoded.includes('societe.com')) continue
      if (decoded.includes('annuaire')) continue
      if (decoded.includes('118')) continue
      if (decoded.includes('yelp')) continue
      if (decoded.includes('tripadvisor')) continue

      // This is likely the company's actual website
      return decoded
    }

    return null
  } catch {
    return null
  }
}
