// Generate a standardized JSON audit report from prospect data
// This JSON is the source of truth for PowerPoint generation

export interface AuditReport {
  // Meta
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
    category: string // 'creation' | 'refonte' | 'platform' | 'directory'
  }

  // PageSpeed scores (0-100, null if not available)
  scores: {
    mobilePerformance: number | null
    mobileAccessibility: number | null
    mobileSEO: number | null
    mobileBestPractices: number | null
    desktopPerformance: number | null
    designUX: number | null
  }

  // Core Web Vitals
  vitals: {
    fcp: { value: number | null; unit: string; good: boolean }
    lcp: { value: number | null; unit: string; good: boolean }
    tbt: { value: number | null; unit: string; good: boolean }
    cls: { value: number | null; unit: string; good: boolean }
    si: { value: number | null; unit: string; good: boolean }
  }

  // Technical checks (true = good, false = problem)
  technical: {
    https: boolean
    responsive: boolean
    analytics: boolean
    favicon: boolean
    metaDescription: boolean
    openGraph: boolean
    sitemap: boolean
    robotsTxt: boolean
    modernImages: boolean
    noJquery: boolean
    noObsoleteTags: boolean
    noFlash: boolean
    cmsDetected: string | null
    loadTimeMs: number | null
    totalWeightKB: number | null
    requestCount: number | null
  }

  // Security
  security: {
    ssl: {
      valid: boolean
      protocol: string | null
      daysUntilExpiry: number | null
      expiringSoon: boolean
    }
    headers: {
      score: number
      total: number
      hsts: boolean
      csp: boolean
      xFrameOptions: boolean
      xContentType: boolean
      referrerPolicy: boolean
      permissionsPolicy: boolean
    }
    observatoryGrade: string | null
  }

  // Carbon footprint
  carbon: {
    co2PerView: number | null
    rating: string | null
    isGreen: boolean
    cleanerThan: number | null
  } | null

  // Code quality
  codeQuality: {
    w3cErrors: number
    w3cWarnings: number
    w3cTopErrors: string[]
    yellowLabScore: number | null
    yellowLabTopIssues: string[]
  }

  // Design & UX analysis
  design: {
    score: number
    imageCount: number
    hasHeroImage: boolean
    headingCount: number
    wordCount: number
    textToHtmlRatio: number
    hasCustomFonts: boolean
    fontFamilyCount: number
    hasNavigation: boolean
    hasLogo: boolean
    hasFooterContent: boolean
    usesFlexboxOrGrid: boolean
    hasAnimations: boolean
    importantCount: number
    issues: Array<{ label: string; severity: string }>
  } | null

  // Screenshots
  screenshots: {
    mobilePageSpeed: string | null // base64 data URI
    desktopFull: string // thum.io URL
    desktopFold: string // thum.io URL
    mobileFull: string // thum.io URL
    mobileFold: string // thum.io URL
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
  emails: string[]
  primaryEmail: string | null

  // Failed audits by category
  failedAudits: {
    performance: Array<{ title: string; displayValue: string | null }>
    accessibility: Array<{ title: string; displayValue: string | null }>
    seo: Array<{ title: string; displayValue: string | null }>
    bestPractices: Array<{ title: string; displayValue: string | null }>
  }

  // Heaviest resources
  heaviestResources: Array<{ url: string; sizeKB: number }>

  // Problems summary (top 10, sorted by severity)
  problems: Array<{
    rank: number
    title: string
    impact: string
    priority: 'critical' | 'important' | 'minor'
  }>

  // Claude visual analysis (pasted by user)
  claudeAnalysis: string | null

  // Sales arguments
  salesArguments: string[]

  // Recommendations
  recommendations: Array<{
    action: string
    impact: string
    difficulty: string
  }>
}

// Generate the audit report JSON from prospect + audit data
export function generateAuditReport(prospect: any, auditData: any): AuditReport {
  const audit = auditData || {}

  // Build problems list from various sources
  const problems: AuditReport['problems'] = []
  let rank = 1

  // From technical checks
  if (!audit.isHttps) problems.push({ rank: rank++, title: 'Site non securise (pas HTTPS)', impact: 'Les navigateurs affichent "Non securise" — perte de confiance immediate', priority: 'critical' })
  if (!audit.isResponsive) problems.push({ rank: rank++, title: 'Site non responsive (pas adapte mobile)', impact: '70% des recherches locales sont sur mobile — vous perdez la majorite des visiteurs', priority: 'critical' })
  if (!audit.hasAnalytics) problems.push({ rank: rank++, title: 'Pas d\'analytics installe', impact: 'Vous ne savez pas combien de visiteurs vous avez ni d\'ou ils viennent', priority: 'important' })
  if (!audit.hasMetaDescription) problems.push({ rank: rank++, title: 'Pas de meta description', impact: 'Votre description sur Google est generee automatiquement — moins de clics', priority: 'important' })
  if (!audit.hasSitemap) problems.push({ rank: rank++, title: 'Pas de sitemap.xml', impact: 'Google a plus de difficulte a indexer vos pages', priority: 'important' })
  if (!audit.hasRobotsTxt) problems.push({ rank: rank++, title: 'Pas de robots.txt', impact: 'Pas de controle sur ce que Google indexe', priority: 'minor' })
  if (!audit.hasFavicon) problems.push({ rank: rank++, title: 'Pas de favicon', impact: 'Votre onglet navigateur est generique — pas de branding', priority: 'minor' })
  if (audit.usesJquery) problems.push({ rank: rank++, title: 'jQuery detecte', impact: 'Technologie datee qui alourdit le site', priority: 'minor' })
  if (audit.hasObsoleteTags) problems.push({ rank: rank++, title: 'Balises HTML obsoletes', impact: 'Code date qui peut causer des problemes d\'affichage', priority: 'minor' })

  // From PageSpeed
  if (audit.mobileScore !== null && audit.mobileScore < 50) {
    problems.push({ rank: rank++, title: `Performance mobile critique (${audit.mobileScore}/100)`, impact: 'Les pages lentes font fuir 53% des visiteurs (source: Google)', priority: 'critical' })
  }
  if (audit.mobileLCP !== null && audit.mobileLCP > 2500) {
    problems.push({ rank: rank++, title: `Chargement lent (LCP ${(audit.mobileLCP / 1000).toFixed(1)}s)`, impact: 'L\'element principal met trop de temps a s\'afficher — les visiteurs partent', priority: 'critical' })
  }

  // From W3C
  if (audit.w3cErrors > 20) {
    problems.push({ rank: rank++, title: `${audit.w3cErrors} erreurs HTML W3C`, impact: 'Code de mauvaise qualite qui peut causer des bugs d\'affichage', priority: 'important' })
  }

  // From security
  if (audit.securityHeaders && audit.securityHeaders.score < 3) {
    problems.push({ rank: rank++, title: `Headers de securite insuffisants (${audit.securityHeaders.score}/6)`, impact: 'Le site est vulnerable a certaines attaques web', priority: 'important' })
  }

  // Sort by priority
  const priorityOrder = { critical: 0, important: 1, minor: 2 }
  problems.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  problems.forEach((p, i) => p.rank = i + 1)

  // Build recommendations
  const recommendations: AuditReport['recommendations'] = []
  if (!audit.isHttps) recommendations.push({ action: 'Migrer vers HTTPS', impact: 'Confiance + SEO Google', difficulty: 'Facile' })
  if (!audit.isResponsive) recommendations.push({ action: 'Refonte responsive (mobile-first)', impact: 'Recuperer 70% des visiteurs mobiles', difficulty: 'Moyenne' })
  if (audit.mobileScore !== null && audit.mobileScore < 70) recommendations.push({ action: 'Optimiser les performances', impact: 'Reduire le taux de rebond de 30-50%', difficulty: 'Moyenne' })
  if (!audit.hasAnalytics) recommendations.push({ action: 'Installer Google Analytics', impact: 'Comprendre le trafic et mesurer les resultats', difficulty: 'Facile' })
  if (!audit.hasSitemap || !audit.hasMetaDescription) recommendations.push({ action: 'Optimiser le SEO technique', impact: 'Meilleur positionnement Google', difficulty: 'Facile' })

  // Build sales arguments
  const salesArguments: string[] = []
  if (!audit.isResponsive) salesArguments.push(`Votre site n'est pas adapte aux mobiles — vous perdez 70% des clients qui cherchent un(e) ${prospect.nafLabel || 'professionnel'} sur leur telephone.`)
  if (audit.mobileScore !== null && audit.mobileScore < 50) salesArguments.push(`Votre site met trop de temps a charger (score ${audit.mobileScore}/100). Google penalise les sites lents et 53% des visiteurs partent apres 3 secondes.`)
  if (!audit.hasAnalytics) salesArguments.push(`Sans analytics, vous ne savez pas combien de clients potentiels visitent votre site ni combien repartent sans vous contacter.`)
  if (audit.w3cErrors > 20) salesArguments.push(`Votre site contient ${audit.w3cErrors} erreurs de code — cela peut causer des bugs d'affichage et nuit a votre image professionnelle.`)
  if (!audit.isHttps) salesArguments.push(`Votre site affiche "Non securise" dans le navigateur — vos clients potentiels voient ca avant meme votre contenu.`)

  const formatMs = (ms: number | null) => ms !== null ? (ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`) : null

  return {
    generatedAt: new Date().toISOString(),
    version: '1.0',

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
      phone: prospect.phone || null,
      category: prospect.category || 'creation',
    },

    scores: {
      mobilePerformance: audit.mobileScore ?? null,
      mobileAccessibility: audit.mobileAccessibility ?? null,
      mobileSEO: audit.mobileSEO ?? null,
      mobileBestPractices: audit.mobileBestPractices ?? null,
      desktopPerformance: audit.desktopScore ?? null,
      designUX: audit.design?.score ?? null,
    },

    vitals: {
      fcp: { value: audit.mobileFCP ?? null, unit: 'ms', good: (audit.mobileFCP ?? 9999) < 1800 },
      lcp: { value: audit.mobileLCP ?? null, unit: 'ms', good: (audit.mobileLCP ?? 9999) < 2500 },
      tbt: { value: audit.mobileTBT ?? null, unit: 'ms', good: (audit.mobileTBT ?? 9999) < 200 },
      cls: { value: audit.mobileCLS ?? null, unit: '', good: (audit.mobileCLS ?? 1) < 0.1 },
      si: { value: audit.mobileSI ?? null, unit: 'ms', good: (audit.mobileSI ?? 9999) < 3400 },
    },

    technical: {
      https: !!audit.isHttps,
      responsive: !!audit.isResponsive,
      analytics: !!audit.hasAnalytics,
      favicon: !!audit.hasFavicon,
      metaDescription: !!audit.hasMetaDescription,
      openGraph: !!audit.hasOpenGraph,
      sitemap: !!audit.hasSitemap,
      robotsTxt: !!audit.hasRobotsTxt,
      modernImages: !!audit.usesModernImages,
      noJquery: !audit.usesJquery,
      noObsoleteTags: !audit.hasObsoleteTags,
      noFlash: !audit.usesFlash,
      cmsDetected: audit.cmsDetected || null,
      loadTimeMs: audit.loadTimeMs || null,
      totalWeightKB: audit.totalByteWeight ? Math.round(audit.totalByteWeight / 1024) : null,
      requestCount: audit.totalRequestCount || null,
    },

    security: {
      ssl: {
        valid: !!audit.ssl?.isValid,
        protocol: audit.ssl?.protocol || null,
        daysUntilExpiry: audit.ssl?.daysUntilExpiry ?? null,
        expiringSoon: !!audit.ssl?.isExpiringSoon,
      },
      headers: {
        score: audit.securityHeaders?.score ?? 0,
        total: audit.securityHeaders?.total ?? 6,
        hsts: !!audit.securityHeaders?.strictTransportSecurity,
        csp: !!audit.securityHeaders?.contentSecurityPolicy,
        xFrameOptions: !!audit.securityHeaders?.xFrameOptions,
        xContentType: !!audit.securityHeaders?.xContentTypeOptions,
        referrerPolicy: !!audit.securityHeaders?.referrerPolicy,
        permissionsPolicy: !!audit.securityHeaders?.permissionsPolicy,
      },
      observatoryGrade: audit.observatoryGrade || null,
    },

    carbon: audit.carbon ? {
      co2PerView: audit.carbon.co2PerView ?? null,
      rating: audit.carbon.rating || null,
      isGreen: !!audit.carbon.isGreen,
      cleanerThan: audit.carbon.cleanerThan ?? null,
    } : null,

    codeQuality: {
      w3cErrors: audit.w3cErrors ?? 0,
      w3cWarnings: audit.w3cWarnings ?? 0,
      w3cTopErrors: audit.w3cTopErrors || [],
      yellowLabScore: audit.yellowLabScore ?? null,
      yellowLabTopIssues: audit.yellowLabTopIssues || [],
    },

    design: audit.design ? {
      score: audit.design.score,
      imageCount: audit.design.imageCount,
      hasHeroImage: audit.design.hasHeroImage,
      headingCount: audit.design.headingCount,
      wordCount: audit.design.wordCount,
      textToHtmlRatio: audit.design.textToHtmlRatio,
      hasCustomFonts: audit.design.hasCustomFonts,
      fontFamilyCount: audit.design.fontFamilyCount,
      hasNavigation: audit.design.hasNavigation,
      hasLogo: audit.design.hasLogo,
      hasFooterContent: audit.design.hasFooterContent,
      usesFlexboxOrGrid: audit.design.usesFlexboxOrGrid,
      hasAnimations: audit.design.hasAnimations,
      importantCount: audit.design.importantCount,
      issues: audit.design.issues || [],
    } : null,

    screenshots: prospect.website ? {
      mobilePageSpeed: audit.mobileScreenshot || null,
      desktopFull: `https://image.thum.io/get/width/1280/fullpage/${prospect.website}`,
      desktopFold: `https://image.thum.io/get/width/1280/${prospect.website}`,
      mobileFull: `https://image.thum.io/get/width/375/fullpage/${prospect.website}`,
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
    emails: audit.emails || [],
    primaryEmail: audit.primaryEmail || prospect.email || null,

    failedAudits: {
      performance: (audit.mobilePerformanceAudits || []).map((a: any) => ({ title: a.title, displayValue: a.displayValue })),
      accessibility: (audit.mobileAccessibilityAudits || []).map((a: any) => ({ title: a.title, displayValue: a.displayValue })),
      seo: (audit.mobileSEOAudits || []).map((a: any) => ({ title: a.title, displayValue: a.displayValue })),
      bestPractices: (audit.mobileBestPracticesAudits || []).map((a: any) => ({ title: a.title, displayValue: a.displayValue })),
    },

    heaviestResources: (audit.heaviestResources || []).map((r: any) => ({
      url: r.url,
      sizeKB: Math.round(r.size / 1024),
    })),

    problems,
    claudeAnalysis: prospect.claudeAnalysis || null,
    salesArguments,
    recommendations,
  }
}
