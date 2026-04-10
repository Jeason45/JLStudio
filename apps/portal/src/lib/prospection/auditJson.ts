// ============================================================================
// AUDIT REPORT GENERATOR v2
// Generates a structured, scored, sector-aware audit report from raw data
// This JSON feeds the PPTX builder — single source of truth
// ============================================================================

import {
  type Severity, type Category, type Sector, type CriterionResult,
  CATEGORY_WEIGHTS, CATEGORY_LABELS,
  detectSector, getImpactPhrase, estimateLostCustomers, formatUnit, SOURCES,
} from './auditCriteria'

// ── Report types ──

export interface AuditReport {
  generatedAt: string
  version: string

  // Prospect info
  prospect: {
    name: string
    city: string | null
    postalCode: string | null
    address: string | null
    siret: string | null
    dateCreation: string | null
    sector: string | null
    website: string | null
    email: string | null
    phone: string | null
    category: string
  }

  // Detected sector for business phrases
  detectedSector: Sector

  // Weighted scores (0-100)
  scores: {
    global: number
    speed: number
    mobile: number
    visibility: number
    trust: number
    conversion: number
  }

  // PageSpeed raw scores for display
  pageSpeedScores: {
    mobilePerformance: number | null
    mobileAccessibility: number | null
    mobileSEO: number | null
    mobileBestPractices: number | null
    desktopPerformance: number | null
  }

  // Core Web Vitals
  vitals: {
    fcp: { value: number | null; display: string; good: boolean }
    lcp: { value: number | null; display: string; good: boolean }
    tbt: { value: number | null; display: string; good: boolean }
    cls: { value: number | null; display: string; good: boolean }
    si: { value: number | null; display: string; good: boolean }
  }

  // All 30 criteria evaluated
  criteria: CriterionResult[]

  // Top problems sorted by severity (max 7)
  topProblems: Array<{
    rank: number
    title: string
    impact: string
    source: string
    severity: Severity
  }>

  // Estimated customer loss
  estimatedLoss: {
    count: string     // "~15-20"
    unit: string      // "clients potentiels/mois"
    phrase: string    // "~15-20 clients potentiels/mois"
  }

  // Google visibility
  googleVisibility: {
    keyword: string | null
    organicPosition: number | null
    isInLocalPack: boolean
    localPackRating: number | null
    localPackReviewCount: number | null
    competitorSites: string[]
  } | null

  // Screenshots
  screenshots: {
    mobilePageSpeed: string | null
    desktopFold: string
    mobileFold: string
  } | null

  // Social & email
  socialPresence: {
    count: number
    facebook: string | null
    instagram: string | null
    linkedin: string | null
    twitter: string | null
    youtube: string | null
    tiktok: string | null
  }
  primaryEmail: string | null

  // Quick recommendations (auto-generated, max 6)
  recommendations: Array<{
    action: string
    impact: string
    difficulty: 'Facile' | 'Moyen' | 'Important'
    timeline: 'Immédiat' | '1-2 semaines' | '1-3 mois'
  }>

  // Claude visual analysis (optional, pasted by user)
  claudeAnalysis: string | null

  // Design score (from designAnalyzer)
  designScore: number | null
}

// ── Helper: format milliseconds ──

function fmtMs(ms: number | null): string {
  if (ms === null || ms === undefined) return 'N/A'
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`
}

function fmtKB(bytes: number | null): string {
  if (!bytes) return 'N/A'
  const kb = bytes / 1024
  if (kb > 1024) return `${(kb / 1024).toFixed(1)} Mo`
  return `${Math.round(kb)} Ko`
}

// ── Severity helper ──

function scoreSeverity(score: number | null, goodThreshold: number, warnThreshold: number): Severity {
  if (score === null) return 'acceptable'
  if (score >= goodThreshold) return 'ok'
  if (score >= warnThreshold) return 'acceptable'
  if (score >= warnThreshold * 0.6) return 'warning'
  return 'critical'
}

// ── Evaluate all 30 criteria ──

function evaluateCriteria(audit: any, sector: Sector, prospect: any): CriterionResult[] {
  const results: CriterionResult[] = []
  const city = prospect.city || ''

  function add(
    id: string, category: Category, label: string,
    rawValue: any, severity: Severity, value: string,
    source: string, recommendation: string, replacements: Record<string, string> = {},
  ) {
    results.push({
      id, category, label, severity, value, rawValue,
      impact: getImpactPhrase(id, sector, { value, city, sector: prospect.nafLabel || '', keyword: audit.googleVisibility?.keyword || '', ...replacements }),
      source, recommendation,
    })
  }

  // ═══════ SPEED (30%) ═══════

  const mobileScore = audit.mobileScore ?? null
  add('pagespeed_mobile', 'speed', 'Score PageSpeed Mobile',
    mobileScore,
    scoreSeverity(mobileScore, 90, 50),
    mobileScore !== null ? `${mobileScore}/100` : 'N/A',
    SOURCES.google_vitals,
    mobileScore !== null && mobileScore < 70 ? 'Améliorer la vitesse de votre site mobile pour ne pas perdre de visiteurs' : 'Score correct',
  )

  const lcp = audit.mobileLCP ?? null
  add('lcp', 'speed', 'Largest Contentful Paint (LCP)',
    lcp,
    lcp === null ? 'acceptable' : lcp < 2500 ? 'ok' : lcp < 4000 ? 'warning' : 'critical',
    fmtMs(lcp),
    SOURCES.google_vitals,
    lcp && lcp > 2500 ? 'Accélérer le chargement de votre site pour ne plus perdre de visiteurs impatients' : 'Correct',
  )

  const fcp = audit.mobileFCP ?? null
  add('fcp', 'speed', 'First Contentful Paint (FCP)',
    fcp,
    fcp === null ? 'acceptable' : fcp < 1800 ? 'ok' : fcp < 3000 ? 'warning' : 'critical',
    fmtMs(fcp),
    SOURCES.google_vitals,
    fcp && fcp > 1800 ? 'Faire apparaître votre contenu plus rapidement à l\'écran' : 'Correct',
  )

  const tbt = audit.mobileTBT ?? null
  add('tbt', 'speed', 'Total Blocking Time (TBT)',
    tbt,
    tbt === null ? 'acceptable' : tbt < 200 ? 'ok' : tbt < 600 ? 'warning' : 'critical',
    fmtMs(tbt),
    SOURCES.google_vitals,
    tbt && tbt > 200 ? 'Rendre votre site réactif pour que les visiteurs puissent naviguer sans attendre' : 'Correct',
  )

  const cls = audit.mobileCLS ?? null
  add('cls', 'speed', 'Cumulative Layout Shift (CLS)',
    cls,
    cls === null ? 'acceptable' : cls < 0.1 ? 'ok' : cls < 0.25 ? 'warning' : 'critical',
    cls !== null ? cls.toFixed(3) : 'N/A',
    SOURCES.google_vitals,
    cls && cls > 0.1 ? 'Stabiliser l\'affichage de votre page pour éviter que les éléments bougent au chargement' : 'Correct',
  )

  const totalWeight = audit.totalByteWeight ?? null
  const weightKB = totalWeight ? totalWeight / 1024 : null
  const weightAnalogy = weightKB && weightKB > 3000 ? `${Math.round(weightKB / 500)} photos haute résolution` : weightKB && weightKB > 1500 ? `une vidéo courte` : null
  add('page_weight', 'speed', 'Poids total de la page',
    totalWeight,
    weightKB === null ? 'acceptable' : weightKB < 1500 ? 'ok' : weightKB < 3000 ? 'warning' : 'critical',
    fmtKB(totalWeight),
    SOURCES.akamai,
    weightKB && weightKB > 1500 ? 'Alléger votre site pour qu\'il se charge rapidement, même sur une connexion mobile' : 'Correct',
    { analogy: weightAnalogy || '', loadEstimate: weightKB ? `${Math.round(weightKB / 500)}s sur 4G` : '' },
  )

  // ═══════ MOBILE (20%) ═══════

  add('responsive', 'mobile', 'Site responsive (adapté mobile)',
    audit.isResponsive,
    audit.isResponsive ? 'ok' : 'critical',
    audit.isResponsive ? 'Oui' : 'Non',
    SOURCES.google_mobile,
    !audit.isResponsive ? 'Rendre votre site lisible et agréable sur téléphone — c\'est là que sont vos clients' : 'Correct',
  )

  const a11yScore = audit.mobileAccessibility ?? null
  add('accessibility', 'mobile', 'Score Accessibilité',
    a11yScore,
    scoreSeverity(a11yScore, 90, 50),
    a11yScore !== null ? `${a11yScore}/100` : 'N/A',
    SOURCES.lighthouse,
    a11yScore !== null && a11yScore < 70 ? 'Rendre votre site accessible à tous les visiteurs, y compris ceux en situation de handicap' : 'Correct',
  )

  const altCoverage = audit.altTextCoverage ?? 100
  add('alt_text', 'mobile', 'Images avec texte alternatif',
    altCoverage,
    altCoverage >= 90 ? 'ok' : altCoverage >= 50 ? 'warning' : 'critical',
    `${altCoverage}% (${audit.imagesWithAlt ?? 0}/${audit.totalImages ?? 0})`,
    SOURCES.lighthouse,
    altCoverage < 90 ? 'Décrire chaque image pour que Google les comprenne et les référence correctement' : 'Correct',
  )

  add('phone_clickable', 'mobile', 'Numéro de téléphone cliquable',
    audit.hasPhoneLink,
    audit.hasPhoneLink ? 'ok' : 'warning',
    audit.hasPhoneLink ? `Oui (${audit.phoneNumber || ''})` : 'Non détecté',
    SOURCES.google_mobile,
    !audit.hasPhoneLink ? 'Permettre aux clients de vous appeler en un seul tap sur mobile' : 'Correct',
  )

  add('has_cta', 'mobile', 'Bouton d\'action visible (CTA)',
    audit.hasCTA,
    audit.hasCTA ? 'ok' : 'warning',
    audit.hasCTA ? `Oui (${(audit.ctaTexts || []).slice(0, 2).join(', ')})` : 'Non détecté',
    SOURCES.google_mobile,
    !audit.hasCTA ? 'Ajouter un bouton d\'action visible pour guider vos visiteurs vers la prise de contact' : 'Correct',
  )

  // ═══════ VISIBILITY (20%) ═══════

  add('meta_title', 'visibility', 'Balise Title',
    audit.metaTitleLength ?? 0,
    (audit.metaTitleLength ?? 0) >= 30 && (audit.metaTitleLength ?? 0) <= 60 ? 'ok'
      : (audit.metaTitleLength ?? 0) > 0 ? 'warning' : 'critical',
    audit.metaTitle ? `${audit.metaTitleLength} car. — "${(audit.metaTitle || '').slice(0, 50)}${(audit.metaTitle || '').length > 50 ? '...' : ''}"` : 'Absente',
    SOURCES.google_search,
    !(audit.metaTitleLength >= 30 && audit.metaTitleLength <= 60) ? 'Optimiser votre titre Google pour attirer plus de clics' : 'Correct',
  )

  add('meta_description', 'visibility', 'Meta description',
    audit.metaDescriptionLength ?? 0,
    (audit.metaDescriptionLength ?? 0) >= 120 && (audit.metaDescriptionLength ?? 0) <= 160 ? 'ok'
      : audit.hasMetaDescription ? 'warning' : 'critical',
    audit.hasMetaDescription ? `${audit.metaDescriptionLength ?? '?'} car.` : 'Absente',
    SOURCES.google_search,
    !audit.hasMetaDescription ? 'Rédiger une description Google attractive pour donner envie aux clients de cliquer' : 'Correct',
  )

  add('h1_tag', 'visibility', 'Balise H1 (titre principal)',
    audit.h1Count ?? 0,
    (audit.h1Count ?? 0) === 1 ? 'ok' : (audit.h1Count ?? 0) === 0 ? 'critical' : 'warning',
    (audit.h1Count ?? 0) === 0 ? 'Absente' : (audit.h1Count ?? 0) === 1 ? `1 H1 — "${(audit.h1Text || '').slice(0, 50)}"` : `${audit.h1Count} H1 (devrait être unique)`,
    SOURCES.google_search,
    (audit.h1Count ?? 0) !== 1 ? 'Ajouter un titre principal clair pour que Google comprenne votre activité' : 'Correct',
  )

  add('sitemap', 'visibility', 'Sitemap XML',
    audit.hasSitemap,
    audit.hasSitemap ? 'ok' : 'warning',
    audit.hasSitemap ? 'Présent' : 'Absent',
    SOURCES.google_search,
    !audit.hasSitemap ? 'Aider Google à trouver toutes les pages de votre site pour mieux vous référencer' : 'Correct',
  )

  add('structured_data', 'visibility', 'Données structurées (Schema.org)',
    audit.hasStructuredData,
    audit.hasStructuredData ? 'ok' : 'warning',
    audit.hasStructuredData ? `Oui (${(audit.structuredDataTypes || []).join(', ')})` : 'Absentes',
    SOURCES.schema,
    !audit.hasStructuredData ? 'Enrichir votre fiche Google avec vos horaires, adresse et avis pour attirer plus de clics' : 'Correct',
  )

  // Google visibility (from Serper)
  const gv = audit.googleVisibility
  if (gv && gv.keyword) {
    add('google_position', 'visibility', `Position Google pour "${gv.keyword}"`,
      gv.organicPosition,
      gv.organicPosition !== null ? (gv.organicPosition <= 3 ? 'ok' : gv.organicPosition <= 10 ? 'acceptable' : 'warning') : 'critical',
      gv.organicPosition !== null ? `Position ${gv.organicPosition}` : 'Non trouvé dans les 30 premiers résultats',
      SOURCES.google_search,
      gv.organicPosition === null ? 'Améliorer votre visibilité Google pour que vos clients vous trouvent en premier' : 'Bon positionnement',
      { keyword: gv.keyword },
    )
  }

  // ═══════ TRUST (20%) ═══════

  add('https', 'trust', 'HTTPS (site sécurisé)',
    audit.isHttps,
    audit.isHttps ? 'ok' : 'critical',
    audit.isHttps ? 'Oui' : 'Non — affiche "Non sécurisé"',
    SOURCES.owasp,
    !audit.isHttps ? 'Sécuriser votre site pour rassurer vos visiteurs et éviter l\'avertissement "Non sécurisé"' : 'Correct',
  )

  const sslDays = audit.ssl?.daysUntilExpiry ?? null
  if (audit.ssl) {
    add('ssl_expiry', 'trust', 'Certificat SSL',
      sslDays,
      audit.ssl.isValid ? (sslDays !== null && sslDays < 14 ? 'warning' : 'ok') : 'critical',
      audit.ssl.isValid ? `Valide (expire dans ${sslDays}j)` : 'Invalide ou expiré',
      SOURCES.owasp,
      !audit.ssl.isValid ? 'Renouveler votre certificat de sécurité pour éviter que votre site devienne inaccessible' : sslDays !== null && sslDays < 30 ? 'Renouveler votre certificat de sécurité avant qu\'il expire' : 'Correct',
      { value: String(sslDays ?? '') },
    )
  }

  const secScore = audit.securityHeaders?.score ?? 0
  const secTotal = audit.securityHeaders?.total ?? 6
  add('security_headers', 'trust', 'Headers de sécurité',
    secScore,
    secScore >= 5 ? 'ok' : secScore >= 3 ? 'acceptable' : secScore >= 1 ? 'warning' : 'critical',
    `${secScore}/${secTotal}`,
    SOURCES.owasp,
    secScore < 4 ? 'Renforcer la protection de votre site contre les attaques pour protéger vos visiteurs' : 'Correct',
  )

  add('mentions_legales', 'trust', 'Mentions légales',
    audit.hasMentionsLegales,
    audit.hasMentionsLegales ? 'ok' : 'critical',
    audit.hasMentionsLegales ? 'Détectées' : 'Non détectées',
    SOURCES.lcen,
    !audit.hasMentionsLegales ? 'Ajouter les mentions légales obligatoires pour être en conformité avec la loi française' : 'Correct',
  )

  add('privacy_policy', 'trust', 'Politique de confidentialité (RGPD)',
    audit.hasPrivacyPolicy,
    audit.hasPrivacyPolicy ? 'ok' : 'warning',
    audit.hasPrivacyPolicy ? 'Détectée' : 'Non détectée',
    SOURCES.lcen,
    !audit.hasPrivacyPolicy ? 'Ajouter une politique de confidentialité pour respecter le RGPD et rassurer vos visiteurs' : 'Correct',
  )

  add('reviews', 'trust', 'Avis clients / témoignages',
    audit.hasReviews,
    audit.hasReviews ? 'ok' : 'warning',
    audit.hasReviews ? 'Détectés' : 'Non détectés',
    SOURCES.reviews,
    !audit.hasReviews ? 'Afficher les avis de vos clients satisfaits pour convaincre les nouveaux visiteurs' : 'Correct',
  )

  // ═══════ CONVERSION (10%) ═══════

  add('contact_form', 'conversion', 'Formulaire de contact',
    audit.hasContactForm,
    audit.hasContactForm ? 'ok' : 'warning',
    audit.hasContactForm ? 'Détecté' : 'Non détecté',
    SOURCES.google_mobile,
    !audit.hasContactForm ? 'Ajouter un formulaire de contact pour capturer les demandes, même en dehors de vos horaires' : 'Correct',
  )

  add('google_maps', 'conversion', 'Google Maps intégré',
    audit.hasGoogleMaps,
    audit.hasGoogleMaps ? 'ok' : 'acceptable',
    audit.hasGoogleMaps ? 'Oui' : 'Non',
    SOURCES.google_mobile,
    !audit.hasGoogleMaps ? 'Ajouter une carte Google Maps pour que vos clients vous trouvent facilement' : 'Correct',
  )

  add('analytics', 'conversion', 'Analytics installé',
    audit.hasAnalytics,
    audit.hasAnalytics ? 'ok' : 'warning',
    audit.hasAnalytics ? 'Oui' : 'Non',
    SOURCES.lighthouse,
    !audit.hasAnalytics ? 'Installer un outil de mesure pour savoir combien de clients visitent votre site' : 'Correct',
  )

  add('social_presence', 'conversion', 'Réseaux sociaux liés',
    audit.socialPresence?.count ?? 0,
    (audit.socialPresence?.count ?? 0) >= 2 ? 'ok' : (audit.socialPresence?.count ?? 0) >= 1 ? 'acceptable' : 'warning',
    `${audit.socialPresence?.count ?? 0} réseau(x) détecté(s)`,
    SOURCES.reviews,
    (audit.socialPresence?.count ?? 0) < 2 ? 'Lier vos réseaux sociaux à votre site pour renforcer votre crédibilité en ligne' : 'Correct',
  )

  return results
}

// ── Compute category scores ──

function computeScores(criteria: CriterionResult[]): Record<Category, number> {
  const severityScores: Record<Severity, number> = { ok: 100, acceptable: 70, warning: 35, critical: 0 }
  const scores: Record<Category, number> = { speed: 0, mobile: 0, visibility: 0, trust: 0, conversion: 0 }

  for (const cat of Object.keys(scores) as Category[]) {
    const catCriteria = criteria.filter(c => c.category === cat)
    if (catCriteria.length === 0) { scores[cat] = 50; continue }
    const total = catCriteria.reduce((sum, c) => sum + severityScores[c.severity], 0)
    scores[cat] = Math.round(total / catCriteria.length)
  }

  return scores
}

function computeGlobalScore(categoryScores: Record<Category, number>): number {
  let score = 0
  for (const [cat, weight] of Object.entries(CATEGORY_WEIGHTS)) {
    score += (categoryScores[cat as Category] ?? 50) * weight
  }
  return Math.round(score)
}

// ── Main generator ──

export function generateAuditReport(prospect: any, auditData: any, sessionQuery?: string): AuditReport {
  const audit = auditData || {}

  // Detect sector
  const sector = detectSector(prospect.nafLabel, sessionQuery || null)

  // Evaluate criteria
  const criteria = evaluateCriteria(audit, sector, prospect)

  // Compute scores
  const categoryScores = computeScores(criteria)
  const globalScore = computeGlobalScore(categoryScores)

  // Top problems (critical and warning, max 7)
  const topProblems = criteria
    .filter(c => c.severity === 'critical' || c.severity === 'warning')
    .sort((a, b) => {
      const order: Record<Severity, number> = { critical: 0, warning: 1, acceptable: 2, ok: 3 }
      return order[a.severity] - order[b.severity]
    })
    .slice(0, 7)
    .map((c, i) => ({
      rank: i + 1,
      title: c.label,
      impact: c.impact || 'Ce problème peut vous faire perdre des clients et dégrader votre image en ligne.',
      source: c.source,
      severity: c.severity,
    }))

  // Estimated customer loss
  const criticalCount = criteria.filter(c => c.severity === 'critical').length
  const warningCount = criteria.filter(c => c.severity === 'warning').length
  const lossCount = estimateLostCustomers(sector, criticalCount, warningCount)
  const lossUnit = formatUnit(sector)

  // Recommendations (auto-generated from criteria)
  const recommendations = criteria
    .filter(c => c.severity === 'critical' || c.severity === 'warning')
    .sort((a, b) => {
      const order: Record<Severity, number> = { critical: 0, warning: 1, acceptable: 2, ok: 3 }
      return order[a.severity] - order[b.severity]
    })
    .slice(0, 6)
    .map(c => ({
      action: c.recommendation,
      impact: c.impact?.split('.')[0] || c.label,
      difficulty: c.severity === 'critical' ? 'Important' as const : 'Moyen' as const,
      timeline: c.severity === 'critical' ? 'Immédiat' as const : '1-2 semaines' as const,
    }))

  // Google visibility
  const gv = audit.googleVisibility
  const googleVisibility = gv ? {
    keyword: gv.keyword || null,
    organicPosition: gv.organicPosition ?? null,
    isInLocalPack: gv.isInLocalPack ?? false,
    localPackRating: gv.localPackRating ?? null,
    localPackReviewCount: gv.localPackReviewCount ?? null,
    competitorSites: gv.competitorSites || [],
  } : null

  return {
    generatedAt: new Date().toISOString(),
    version: '2.0',

    prospect: {
      name: prospect.name || '',
      city: prospect.city || null,
      postalCode: prospect.postalCode || null,
      address: prospect.address || null,
      siret: prospect.siret || null,
      dateCreation: prospect.dateCreation || null,
      sector: prospect.nafLabel || null,
      website: prospect.website || null,
      email: prospect.email || audit.primaryEmail || null,
      phone: prospect.phone || audit.phoneNumber || null,
      category: prospect.category || 'creation',
    },

    detectedSector: sector,

    scores: {
      global: globalScore,
      speed: categoryScores.speed,
      mobile: categoryScores.mobile,
      visibility: categoryScores.visibility,
      trust: categoryScores.trust,
      conversion: categoryScores.conversion,
    },

    pageSpeedScores: {
      mobilePerformance: audit.mobileScore ?? null,
      mobileAccessibility: audit.mobileAccessibility ?? null,
      mobileSEO: audit.mobileSEO ?? null,
      mobileBestPractices: audit.mobileBestPractices ?? null,
      desktopPerformance: audit.desktopScore ?? null,
    },

    vitals: {
      fcp: { value: audit.mobileFCP ?? null, display: fmtMs(audit.mobileFCP), good: (audit.mobileFCP ?? 9999) < 1800 },
      lcp: { value: audit.mobileLCP ?? null, display: fmtMs(audit.mobileLCP), good: (audit.mobileLCP ?? 9999) < 2500 },
      tbt: { value: audit.mobileTBT ?? null, display: fmtMs(audit.mobileTBT), good: (audit.mobileTBT ?? 9999) < 200 },
      cls: { value: audit.mobileCLS ?? null, display: audit.mobileCLS !== null && audit.mobileCLS !== undefined ? audit.mobileCLS.toFixed(3) : 'N/A', good: (audit.mobileCLS ?? 1) < 0.1 },
      si: { value: audit.mobileSI ?? null, display: fmtMs(audit.mobileSI), good: (audit.mobileSI ?? 9999) < 3400 },
    },

    criteria,
    topProblems,

    estimatedLoss: {
      count: lossCount,
      unit: lossUnit,
      phrase: `${lossCount} ${lossUnit}`,
    },

    googleVisibility,

    screenshots: prospect.website ? {
      mobilePageSpeed: audit.mobileScreenshot || null,
      desktopFold: `https://image.thum.io/get/width/1280/${prospect.website}`,
      mobileFold: `https://image.thum.io/get/width/375/${prospect.website}`,
    } : null,

    socialPresence: {
      count: audit.socialPresence?.count ?? 0,
      facebook: audit.socialPresence?.links?.facebook ?? null,
      instagram: audit.socialPresence?.links?.instagram ?? null,
      linkedin: audit.socialPresence?.links?.linkedin ?? null,
      twitter: audit.socialPresence?.links?.twitter ?? null,
      youtube: audit.socialPresence?.links?.youtube ?? null,
      tiktok: audit.socialPresence?.links?.tiktok ?? null,
    },
    primaryEmail: audit.primaryEmail || prospect.email || null,

    recommendations,
    claudeAnalysis: prospect.claudeAnalysis || null,
    designScore: audit.design?.score ?? null,
  }
}
