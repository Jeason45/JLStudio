import type { SiteAnalysis } from '../analyzer/types.js'
import type { SireneData } from '../analyzer/sirene.js'
import type { RawProspect } from '../scraper/types.js'
import type { ScoredProspect, ScoreBreakdown } from './types.js'

const OBSOLETE_CMS = ['Wix', 'Jimdo', 'Weebly', 'e-monsite', 'OverBlog', 'Blogger', 'Site123', 'Strikingly', '1&1/IONOS']

// ─── Score prospects WITHOUT a website (creation) ───

function scoreCreation(prospect: RawProspect, sirene: SireneData | null): { rawScore: number; breakdown: ScoreBreakdown[] } {
  const breakdown: ScoreBreakdown[] = []
  let rawScore = 0

  rawScore += 40
  breakdown.push({ label: 'Pas de site web', points: 40, reason: 'Aucune présence en ligne' })

  if (sirene?.statusActif) {
    rawScore += 15
    breakdown.push({ label: 'Entreprise active', points: 15, reason: `SIRET: ${sirene.siret || 'vérifié'}` })
  }

  if (sirene?.dateCreation) {
    const age = new Date().getFullYear() - new Date(sirene.dateCreation).getFullYear()
    if (age >= 10) {
      rawScore += 20
      breakdown.push({ label: 'Entreprise > 10 ans sans site', points: 20, reason: `Créée en ${sirene.dateCreation.slice(0, 4)}` })
    } else if (age >= 5) {
      rawScore += 15
      breakdown.push({ label: 'Entreprise > 5 ans sans site', points: 15, reason: `Créée en ${sirene.dateCreation.slice(0, 4)}` })
    } else if (age >= 2) {
      rawScore += 10
      breakdown.push({ label: 'Entreprise établie sans site', points: 10, reason: `Créée en ${sirene.dateCreation.slice(0, 4)}` })
    }
  }

  if (prospect.phone) {
    rawScore += 5
    breakdown.push({ label: 'Téléphone disponible', points: 5, reason: prospect.phone })
  }

  if (sirene?.effectif) {
    const match = sirene.effectif.match(/(\d+)/)
    const effectif = match ? parseInt(match[1]) : 0
    if (effectif >= 5) {
      rawScore += 10
      breakdown.push({ label: 'Entreprise structurée', points: 10, reason: `Effectif: ${sirene.effectif}` })
    }
  }

  return { rawScore, breakdown }
}

// ─── Score prospects WITH a website (refonte) ───

function scoreRefonte(prospect: RawProspect, analysis: SiteAnalysis, sirene: SireneData | null): { rawScore: number; breakdown: ScoreBreakdown[] } {
  const breakdown: ScoreBreakdown[] = []
  const currentYear = new Date().getFullYear()
  let rawScore = 0

  // ── Performance ──
  if (analysis.mobileScore !== null && analysis.mobileScore < 50) {
    const pts = analysis.mobileScore < 30 ? 35 : 25
    rawScore += pts
    breakdown.push({ label: 'PageSpeed mobile faible', points: pts, reason: `Score: ${analysis.mobileScore}/100` })
  }
  if (analysis.loadTimeMs !== null && analysis.loadTimeMs > 3000) {
    rawScore += 5
    breakdown.push({ label: 'Chargement lent', points: 5, reason: `${(analysis.loadTimeMs / 1000).toFixed(1)}s` })
  }

  // ── Responsive & UX ──
  if (!analysis.isResponsive) {
    rawScore += 25
    breakdown.push({ label: 'Pas responsive', points: 25, reason: 'Pas de meta viewport' })
  }
  if (!analysis.hasFavicon) {
    rawScore += 5
    breakdown.push({ label: 'Pas de favicon', points: 5, reason: 'Aucun rel="icon"' })
  }

  // ── Technology ──
  if (analysis.cmsDetected && OBSOLETE_CMS.includes(analysis.cmsDetected)) {
    rawScore += 20
    breakdown.push({ label: 'CMS obsolète', points: 20, reason: analysis.cmsDetected })
  }
  if (analysis.usesJquery) {
    rawScore += 5
    breakdown.push({ label: 'jQuery détecté', points: 5, reason: 'Librairie datée' })
  }
  if (analysis.usesFlash) {
    rawScore += 15
    breakdown.push({ label: 'Flash/Silverlight', points: 15, reason: 'Technologie morte' })
  }
  if (analysis.hasObsoleteTags) {
    rawScore += 10
    breakdown.push({ label: 'HTML obsolète', points: 10, reason: '<font>, <center>, <marquee>...' })
  }
  if (!analysis.usesModernImages) {
    rawScore += 5
    breakdown.push({ label: 'Pas d\'images modernes', points: 5, reason: 'Aucun WebP/AVIF' })
  }

  // ── Security ──
  if (!analysis.isHttps) {
    rawScore += 15
    breakdown.push({ label: 'Pas HTTPS', points: 15, reason: 'Connexion non sécurisée' })
  }
  if (analysis.observatoryGrade && ['D', 'D-', 'E', 'F', 'F-'].includes(analysis.observatoryGrade)) {
    rawScore += 10
    breakdown.push({ label: 'Sécurité faible', points: 10, reason: `Mozilla Observatory: ${analysis.observatoryGrade}` })
  }

  // ── SEO ──
  if (!analysis.hasMetaDescription) {
    rawScore += 5
    breakdown.push({ label: 'Pas de meta description', points: 5, reason: 'SEO basique manquant' })
  }
  if (!analysis.hasOpenGraph) {
    rawScore += 5
    breakdown.push({ label: 'Pas d\'Open Graph', points: 5, reason: 'Partage réseaux non optimisé' })
  }
  if (!analysis.hasSitemap) {
    rawScore += 5
    breakdown.push({ label: 'Pas de sitemap.xml', points: 5, reason: 'SEO technique manquant' })
  }
  if (!analysis.hasRobotsTxt) {
    rawScore += 5
    breakdown.push({ label: 'Pas de robots.txt', points: 5, reason: 'SEO technique manquant' })
  }
  if (!analysis.hasAnalytics) {
    rawScore += 10
    breakdown.push({ label: 'Pas d\'analytics', points: 10, reason: 'Aucun suivi de trafic' })
  }

  // ── Social media ──
  if (analysis.socialPresence && analysis.socialPresence.count === 0) {
    rawScore += 10
    breakdown.push({ label: 'Aucun réseau social', points: 10, reason: 'Pas de Facebook, Instagram, LinkedIn...' })
  }

  // ── Age ──
  if (analysis.estimatedAge) {
    const age = currentYear - analysis.estimatedAge
    if (age >= 8) {
      rawScore += 15
      breakdown.push({ label: 'Site très ancien', points: 15, reason: `Copyright ${analysis.estimatedAge} (${age} ans)` })
    } else if (age >= 5) {
      rawScore += 10
      breakdown.push({ label: 'Site ancien', points: 10, reason: `Copyright ${analysis.estimatedAge} (${age} ans)` })
    }
  }

  // ── Site size ──
  if (analysis.internalLinkCount < 5) {
    rawScore += 10
    breakdown.push({ label: 'Site minimal', points: 10, reason: `${analysis.internalLinkCount} liens internes` })
  }

  // ── W3C Validation ──
  if (analysis.w3cErrors !== null && analysis.w3cErrors > 20) {
    const pts = analysis.w3cErrors > 50 ? 10 : 5
    rawScore += pts
    breakdown.push({ label: 'HTML invalide', points: pts, reason: `${analysis.w3cErrors} erreurs W3C` })
  }

  // ── Yellow Lab Tools ──
  if (analysis.yellowLabScore !== null && analysis.yellowLabScore < 40) {
    rawScore += 10
    breakdown.push({ label: 'Qualité code faible', points: 10, reason: `Yellow Lab: ${analysis.yellowLabScore}/100` })
  }

  // ── PageSpeed opportunities ──
  if (analysis.mobileOpportunities.length > 5) {
    rawScore += 5
    breakdown.push({ label: 'Nombreuses optimisations possibles', points: 5, reason: `${analysis.mobileOpportunities.length} opportunités PageSpeed` })
  }

  // ── Sirene enrichment ──
  if (sirene?.statusActif) {
    rawScore += 5
    breakdown.push({ label: 'Entreprise active confirmée', points: 5, reason: `SIRET: ${sirene.siret || 'vérifié'}` })
  }

  return { rawScore, breakdown }
}

// ─── Main ───

export function scoreProspect(
  prospect: RawProspect,
  analysis: SiteAnalysis | null,
  sirene: SireneData | null,
): ScoredProspect {
  const hasWebsite = !!prospect.url
  const category = hasWebsite ? 'refonte' as const : 'creation' as const

  const { rawScore, breakdown } = hasWebsite && analysis
    ? scoreRefonte(prospect, analysis, sirene)
    : scoreCreation(prospect, sirene)

  const maxPossible = hasWebsite ? 215 : 90
  const normalizedScore = Math.min(100, Math.round((rawScore / maxPossible) * 100))

  let status: ScoredProspect['status']
  if (normalizedScore >= 60) status = 'Chaud'
  else if (normalizedScore >= 30) status = 'Tiède'
  else status = 'Froid'

  // Determine best email
  const realEmail = analysis?.emailData?.primaryEmail || null

  return {
    ...prospect,
    category,
    analysis,
    sireneData: sirene,
    realEmail,
    priorityScore: normalizedScore,
    rawScore,
    breakdown,
    status,
  }
}
