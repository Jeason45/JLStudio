// Smart business search: SIRENE (official registry) + DuckDuckGo (website finder)
// No API key needed, no Playwright, works from server-side

const SIRENE_URL = 'https://recherche-entreprises.api.gouv.fr/search'
const GEO_URL = 'https://geo.api.gouv.fr/communes'

// ── NAF codes by trade ──
const TRADE_NAF_CODES: Record<string, string[]> = {
  'plombier': ['43.22A', '43.22B'],
  'electricien': ['43.21A', '43.21B'],
  'coiffeur': ['96.02A', '96.02B'],
  'coiffeuse': ['96.02A', '96.02B'],
  'restaurant': ['56.10A'],
  'boulangerie': ['10.71A', '10.71B', '10.71C', '10.71D'],
  'boulanger': ['10.71A', '10.71B', '10.71C', '10.71D'],
  'patissier': ['10.71B', '10.71C'],
  'fleuriste': ['47.76Z'],
  'pharmacie': ['47.73Z'],
  'dentiste': ['86.23Z'],
  'avocat': ['69.10Z'],
  'architecte': ['71.11Z'],
  'garagiste': ['45.20A', '45.20B'],
  'menuisier': ['43.32A'],
  'peintre': ['43.34Z'],
  'macon': ['43.99A', '43.99B'],
  'couvreur': ['43.91A'],
  'serrurier': ['43.21B'],
  'photographe': ['74.20Z'],
  'agence immobiliere': ['68.31Z'],
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
  'cafe': ['56.30Z'],
  'hotel': ['55.10Z'],
  'auto-ecole': ['85.53Z'],
  'infirmier': ['86.90C'],
  'kinesitherapeute': ['86.90A'],
  'veterinaire': ['75.00Z'],
  'estheticienne': ['96.02B'],
  'beaute': ['96.02B'],
  'tatoueur': ['96.09Z'],
  'yoga': ['93.13Z'],
  'salle de sport': ['93.13Z'],
  'fitness': ['93.13Z'],
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

// Convert city name to postal codes via geo.api.gouv.fr
async function getPostalCodes(ville: string): Promise<string[]> {
  try {
    const res = await fetch(`${GEO_URL}?nom=${encodeURIComponent(ville)}&fields=codesPostaux&limit=1`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return []
    const data = await res.json() as any[]
    if (data.length === 0) return []
    return data[0].codesPostaux || []
  } catch {
    return []
  }
}

// Search businesses via SIRENE
export async function searchBusinesses(
  metier: string,
  ville: string,
  limit: number = 20,
): Promise<BusinessResult[]> {
  const results: BusinessResult[] = []

  // Get postal codes for the city
  const postalCodes = await getPostalCodes(ville)
  if (postalCodes.length === 0) {
    // Fallback: use city name in free text search
    return searchByText(metier, ville, limit)
  }

  // Normalize trade name
  const metierLower = metier.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const nafCodes = TRADE_NAF_CODES[metierLower] || TRADE_NAF_CODES[metier.toLowerCase()] || []

  try {
    // Strategy 1: NAF code + postal code (most precise)
    if (nafCodes.length > 0) {
      for (const naf of nafCodes) {
        for (const cp of postalCodes) {
          if (results.length >= limit) break
          const remaining = Math.min(limit - results.length, 25)
          const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
            activite_principale: naf,
            code_postal: cp,
            etat_administratif: 'A',
            per_page: String(remaining),
          })}`, { signal: AbortSignal.timeout(10000) })

          if (res.ok) {
            const data = await res.json() as any
            for (const r of (data.results || [])) {
              if (results.length >= limit) break
              if (!results.some(e => e.siren === r.siren)) {
                results.push(mapSireneResult(r))
              }
            }
          }
        }
        if (results.length >= limit) break
      }
    }

    // Strategy 2: free text search if not enough results
    if (results.length < limit) {
      for (const cp of postalCodes) {
        if (results.length >= limit) break
        const remaining = Math.min(limit - results.length, 25)
        const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
          q: metier,
          code_postal: cp,
          etat_administratif: 'A',
          per_page: String(remaining),
        })}`, { signal: AbortSignal.timeout(10000) })

        if (res.ok) {
          const data = await res.json() as any
          for (const r of (data.results || [])) {
            if (results.length >= limit) break
            if (!results.some(e => e.siren === r.siren)) {
              results.push(mapSireneResult(r))
            }
          }
        }
      }
    }
  } catch (err) {
    console.error('SIRENE search error:', err)
  }

  // Find websites via DuckDuckGo (only for first 15 to avoid rate limiting)
  const toCheck = results.slice(0, Math.min(results.length, 15))
  for (let i = 0; i < toCheck.length; i++) {
    try {
      toCheck[i].website = await findWebsite(toCheck[i].name, toCheck[i].city)
    } catch { /* best effort */ }
    if (i < toCheck.length - 1) await new Promise(r => setTimeout(r, 600))
  }

  return results
}

// Fallback: search by text when city can't be resolved
async function searchByText(metier: string, ville: string, limit: number): Promise<BusinessResult[]> {
  const results: BusinessResult[] = []
  try {
    const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
      q: `${metier} ${ville}`,
      etat_administratif: 'A',
      per_page: String(Math.min(limit, 25)),
    })}`, { signal: AbortSignal.timeout(10000) })

    if (res.ok) {
      const data = await res.json() as any
      for (const r of (data.results || [])) {
        if (results.length >= limit) break
        results.push(mapSireneResult(r))
      }
    }
  } catch {}

  for (let i = 0; i < Math.min(results.length, 15); i++) {
    try { results[i].website = await findWebsite(results[i].name, ville) } catch {}
    if (i < results.length - 1) await new Promise(r => setTimeout(r, 600))
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

// Find a company's website via DuckDuckGo
async function findWebsite(companyName: string, city: string): Promise<string | null> {
  try {
    const query = `${companyName} ${city} site officiel`
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(8000),
    })

    const html = await res.text()
    const urlRegex = /uddg=(https?%3A%2F%2F[^&"]+)/g
    const matches = [...html.matchAll(urlRegex)]

    const blacklist = [
      'duckduckgo.com', 'bing.com', 'pagesjaunes.fr', 'facebook.com',
      'instagram.com', 'linkedin.com', 'twitter.com', 'youtube.com',
      'mesdepanneurs.fr', 'habitatpresto.com', 'lesbonsartisans.fr',
      'societe.com', 'annuaire', '118', 'yelp', 'tripadvisor',
      'google.com', 'wikipedia.org', 'tiktok.com',
    ]

    for (const match of matches) {
      const decoded = decodeURIComponent(match[1])
      if (blacklist.some(b => decoded.includes(b))) continue
      return decoded
    }

    return null
  } catch {
    return null
  }
}
