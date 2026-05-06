// Smart business search: SIRENE text search only (no website guessing)
// Website discovery is now handled by Serper/SearXNG in the session route

import { logger } from '@/lib/logger'
import {
  GeoCommunesResponseSchema,
  SireneResponseSchema,
  SireneResultSchema,
  safeParseJson,
} from './schemas'
import type { z } from 'zod'

type SireneResult = z.infer<typeof SireneResultSchema>

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

// Convert city name to postal codes
async function getPostalCodes(ville: string): Promise<string[]> {
  try {
    const res = await fetch(`${GEO_URL}?nom=${encodeURIComponent(ville)}&fields=codesPostaux&limit=1`, {
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return []
    const data = safeParseJson(GeoCommunesResponseSchema, await res.json())
    if (!data || data.length === 0) return []
    return data[0].codesPostaux || []
  } catch { return [] }
}

// Generate search variations
function getSearchVariations(metier: string): string[] {
  const base = metier.toLowerCase().trim()
  const variations = [base]

  const suffixMap: Record<string, string[]> = {
    'coiffeur': ['coiffure', 'salon coiffure', 'barbier', 'barber'],
    'coiffure': ['coiffeur', 'salon coiffure'],
    'restaurant': ['restauration', 'brasserie', 'bistrot'],
    'boulanger': ['boulangerie', 'patisserie'],
    'boulangerie': ['boulanger', 'patisserie'],
    'plombier': ['plomberie', 'chauffagiste'],
    'electricien': ['electricite'],
    'peintre': ['peinture'],
    'menuisier': ['menuiserie'],
    'fleuriste': ['fleurs'],
    'photographe': ['photographie', 'photo'],
    'dentiste': ['dentaire'],
    'avocat': ['cabinet avocat'],
    'comptable': ['expert comptable'],
    'architecte': ['architecture'],
    'garagiste': ['garage', 'mecanique auto'],
    'estheticienne': ['esthetique', 'institut beaute'],
    'opticien': ['optique'],
    'veterinaire': ['clinique veterinaire'],
    'pizzeria': ['pizza'],
    'osteopathe': ['osteopathie'],
    'tatoueur': ['tatouage', 'tattoo'],
    'bijoutier': ['bijouterie'],
    'boucher': ['boucherie'],
    'pressing': ['nettoyage'],
    'serrurier': ['serrurerie'],
    'couvreur': ['couverture', 'toiture'],
    'paysagiste': ['jardinier', 'espace vert'],
    'immobilier': ['agence immobiliere'],
  }

  const normalized = base.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const extra = suffixMap[normalized] || suffixMap[base] || []
  for (const v of extra) {
    if (!variations.includes(v)) variations.push(v)
  }

  return variations.slice(0, 4)
}

// Main search — SIRENE only (no DuckDuckGo)
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

  const postalCodes = await getPostalCodes(ville)
  const variations = getSearchVariations(metier)

  try {
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
            const data = safeParseJson(SireneResponseSchema, await res.json())
            for (const r of (data?.results ?? [])) {
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
        const remaining = Math.min(limit - results.length, 25)
        const res = await fetch(`${SIRENE_URL}?${new URLSearchParams({
          q: `${query} ${ville}`,
          etat_administratif: 'A',
          per_page: String(remaining),
          page: String(pageOffset),
        })}`, { signal: AbortSignal.timeout(10000) })

        if (res.ok) {
          const data = safeParseJson(SireneResponseSchema, await res.json())
          for (const r of (data?.results ?? [])) {
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
    logger.error({ err }, 'SIRENE search error')
  }

  // Filter by city
  if (postalCodes.length > 0) {
    const villeNorm = ville.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z ]/g, '')
    return results.filter(r => {
      const businessCity = (r.city || '').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^A-Z ]/g, '')
      const businessCP = r.postalCode || ''
      if (postalCodes.includes(businessCP)) return true
      if (businessCity.startsWith(villeNorm) || villeNorm.startsWith(businessCity)) return true
      return false
    })
  }

  return results
}

function mapSireneResult(r: SireneResult): BusinessResult {
  const siege = r.siege || {}
  const siegeAny = siege as Record<string, unknown>
  return {
    name: r.nom_complet || r.nom_raison_sociale || '?',
    siret: (typeof siegeAny.siret === 'string' ? siegeAny.siret : '') || '',
    siren: r.siren || '',
    address: [siegeAny.numero_voie, siegeAny.type_voie, siegeAny.libelle_voie].filter(Boolean).join(' '),
    city: (typeof siegeAny.libelle_commune === 'string' ? siegeAny.libelle_commune : '') || '',
    postalCode: (typeof siegeAny.code_postal === 'string' ? siegeAny.code_postal : '') || '',
    dateCreation: r.date_creation || null,
    effectif: r.tranche_effectif_salarie || null,
    nafCode: r.activite_principale || null,
    nafLabel: (r as Record<string, unknown>).libelle_activite_principale as string | null ?? null,
    website: null, // Website is now discovered by Serper/SearXNG, not DuckDuckGo
    isActive: (r as Record<string, unknown>).etat_administratif === 'A',
  }
}

function isRelevantBusiness(r: SireneResult): boolean {
  const name = (r.nom_complet || r.nom_raison_sociale || '').toUpperCase()
  const natureJuridique = (r as Record<string, unknown>).nature_juridique as string | undefined ?? ''

  if (natureJuridique.startsWith('9') || natureJuridique.startsWith('7') || natureJuridique.startsWith('8')) {
    return false
  }

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
