// Smart business search: SIRENE text search + DuckDuckGo website finder
// No API key needed, no Playwright, works from server-side

const SIRENE_URL = 'https://recherche-entreprises.api.gouv.fr/search'
const GEO_URL = 'https://geo.api.gouv.fr/communes'

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

// Generate search variations for a trade
// "coiffeur" → ["coiffeur", "coiffure", "salon coiffure", "coiffeuse"]
function getSearchVariations(metier: string): string[] {
  const base = metier.toLowerCase().trim()
  const variations = [base]

  // Common French trade name variations
  const suffixMap: Record<string, string[]> = {
    'coiffeur': ['coiffure', 'salon coiffure', 'coiffeuse', 'barbier', 'barber'],
    'coiffure': ['coiffeur', 'salon coiffure', 'coiffeuse'],
    'restaurant': ['restauration', 'brasserie', 'bistrot'],
    'boulanger': ['boulangerie', 'patisserie'],
    'boulangerie': ['boulanger', 'patisserie'],
    'plombier': ['plomberie', 'chauffagiste'],
    'plomberie': ['plombier', 'chauffagiste'],
    'electricien': ['electricite', 'electrique'],
    'peintre': ['peinture'],
    'menuisier': ['menuiserie'],
    'fleuriste': ['fleurs'],
    'photographe': ['photographie', 'photo'],
    'dentiste': ['dentaire', 'chirurgien dentiste'],
    'avocat': ['cabinet avocat', 'juridique'],
    'comptable': ['expert comptable', 'comptabilite'],
    'architecte': ['architecture'],
    'garagiste': ['garage', 'mecanique auto', 'reparation auto'],
    'estheticienne': ['esthetique', 'institut beaute', 'beaute'],
    'opticien': ['optique', 'lunettes'],
    'veterinaire': ['clinique veterinaire'],
    'pizzeria': ['pizza'],
    'infirmier': ['infirmiere', 'soins infirmiers'],
    'kinesitherapeute': ['kine', 'kinesitherapie'],
    'osteopathe': ['osteopathie'],
    'tatoueur': ['tatouage', 'tattoo'],
    'bijoutier': ['bijouterie', 'joaillerie'],
    'boucher': ['boucherie'],
    'traiteur': ['traiteur evenementiel'],
    'pressing': ['nettoyage', 'blanchisserie'],
    'serrurier': ['serrurerie', 'depannage serrure'],
    'couvreur': ['couverture', 'toiture'],
    'maçon': ['maconnerie'],
    'carreleur': ['carrelage'],
    'paysagiste': ['jardinier', 'jardinage', 'espace vert'],
    'auto-ecole': ['auto ecole', 'ecole conduite'],
    'agence immobiliere': ['immobilier', 'agent immobilier'],
  }

  const normalized = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const extra = suffixMap[normalized] || suffixMap[base] || []
  for (const v of extra) {
    if (!variations.includes(v)) variations.push(v)
  }

  return variations.slice(0, 4) // max 4 variations to avoid too many API calls
}

// Main search function
export async function searchBusinesses(
  metier: string,
  ville: string,
  limit: number = 50,
  excludeSirens: string[] = [],
  pageOffset: number = 1,
): Promise<BusinessResult[]> {
  const results: BusinessResult[] = []
  const excludeSet = new Set(excludeSirens)
  const seenSirens = new Set<string>()

  // Get postal codes for the city
  const postalCodes = await getPostalCodes(ville)

  // Generate search variations
  const variations = getSearchVariations(metier)

  try {
    // Search each variation across all postal codes
    for (const query of variations) {
      if (results.length >= limit) break

      if (postalCodes.length > 0) {
        for (const cp of postalCodes) {
          if (results.length >= limit) break
          const remaining = Math.min(limit - results.length, 25)

          const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
            q: query,
            code_postal: cp,
            etat_administratif: 'A',
            per_page: String(remaining),
            page: String(pageOffset),
          })}`, { signal: AbortSignal.timeout(10000) })

          if (res.ok) {
            const data = await res.json() as any
            for (const r of (data.results || [])) {
              if (results.length >= limit) break
              const siren = r.siren || ''
              if (excludeSet.has(siren) || seenSirens.has(siren)) continue
              if (!isRelevantBusiness(r)) continue
              seenSirens.add(siren)
              results.push(mapSireneResult(r))
            }
          }
        }
      } else {
        // No postal codes found — search with city name in query
        const remaining = Math.min(limit - results.length, 25)
        const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
          q: `${query} ${ville}`,
          etat_administratif: 'A',
          per_page: String(remaining),
          page: String(pageOffset),
        })}`, { signal: AbortSignal.timeout(10000) })

        if (res.ok) {
          const data = await res.json() as any
          for (const r of (data.results || [])) {
            if (results.length >= limit) break
            const siren = r.siren || ''
            if (excludeSet.has(siren) || seenSirens.has(siren)) continue
            if (!isRelevantBusiness(r)) continue
            seenSirens.add(siren)
            results.push(mapSireneResult(r))
          }
        }
      }
    }
  } catch (err) {
    console.error('SIRENE search error:', err)
  }

  // Filter by city (postal code match)
  let filtered = results
  if (postalCodes.length > 0) {
    const villeNorm = ville.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z ]/g, '')
    filtered = results.filter(r => {
      const businessCity = (r.city || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z ]/g, '')
      const businessCP = r.postalCode || ''
      if (postalCodes.includes(businessCP)) return true
      if (businessCity.startsWith(villeNorm) || villeNorm.startsWith(businessCity)) return true
      return false
    })
  }

  // Find websites via DuckDuckGo (limited to 25 to avoid rate limiting)
  const toCheck = filtered.slice(0, Math.min(filtered.length, 25))
  for (let i = 0; i < toCheck.length; i++) {
    try {
      toCheck[i].website = await findWebsite(toCheck[i].name, toCheck[i].city || ville)
    } catch { /* best effort */ }
    if (i < toCheck.length - 1) await new Promise(r => setTimeout(r, 600))
  }

  return filtered
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

// Filter out irrelevant businesses
function isRelevantBusiness(r: any): boolean {
  const name = (r.nom_complet || r.nom_raison_sociale || '').toUpperCase()
  const natureJuridique = r.nature_juridique || ''

  // Exclude associations, collectivités, organismes publics
  if (natureJuridique.startsWith('9') || natureJuridique.startsWith('7') || natureJuridique.startsWith('8')) {
    return false
  }

  // Exclude by name patterns
  const excludePatterns = [
    'FORMATION', 'GROSSISTE', 'DISTRIBUTION', 'HOLDING', 'SYNDICAT',
    'FEDERATION', 'ASSOCIATION', 'FONDATION', 'COMITE', 'UNION',
    'MUTUELLE', 'CAISSE', 'INSTITUT', 'ECOLE', 'LYCEE', 'COLLEGE',
    'UNIVERSITE', 'CENTRE DE FORMATION', 'GROUPEMENT', 'COOPERATIVE',
    'MATERIEL', 'FOURNITURE', 'EQUIPEMENT', 'SUPPLY', 'WHOLESALE',
    'IMPORT', 'EXPORT', 'NEGOCE', 'COMMERCE DE GROS',
  ]

  for (const pattern of excludePatterns) {
    if (name.includes(pattern)) return false
  }

  return true
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
      'societe.com', 'annuaire', '118712', '118000', '118218', 'yelp', 'tripadvisor',
      'google.com', 'wikipedia.org', 'tiktok.com', 'kompass.com', 'cylex.fr',
      'infobel.com', 'horairesdouverture24.fr', 'fr.mappy.com', 'justacote.com',
      'telephone.city', 'local.fr', 'gralon.net', 'starofservice.com',
      'europages.fr', 'manageo.fr', 'verif.com',
      'pappers.fr', 'infogreffe.fr', 'bodacc.fr', 'sirene.fr',
      'linternaute.com', 'lefigaro.fr', 'lemonde.fr',
      'quelresto.fr', 'lafourchette.com', 'thefork.com', 'booking.com',
      'groupon.fr', 'amazon.', 'ebay.',
      'teamesthetique.fr', 'net1901.org',
    ]

    const directoryPatterns = [
      /annuaire/i, /directory/i, /listing/i, /avis/i, /review/i,
      /comparateur/i, /devis/i, /trouver/i,
    ]

    for (const match of matches) {
      const decoded = decodeURIComponent(match[1])
      if (blacklist.some(b => decoded.toLowerCase().includes(b))) continue
      if (directoryPatterns.some(p => p.test(decoded))) continue

      try {
        const urlObj = new URL(decoded)
        const pathParts = urlObj.pathname.split('/').filter(Boolean)
        if (pathParts.length > 3) continue
      } catch { continue }

      return decoded
    }

    return null
  } catch {
    return null
  }
}
