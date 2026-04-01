// Design & UX analyzer — detects visual quality signals from HTML + CSS

export interface DesignAnalysis {
  score: number // 0-100

  // Content
  imageCount: number
  hasHeroImage: boolean
  headingCount: number // h1-h6
  textToHtmlRatio: number // percentage
  wordCount: number
  hasSections: boolean // uses <section> or structured divs

  // Typography
  hasCustomFonts: boolean
  fontFamilyCount: number
  usesGoogleFonts: boolean

  // CSS Quality
  cssSize: number // bytes of linked CSS
  hasMediaQueries: boolean
  usesFlexboxOrGrid: boolean
  importantCount: number
  hasAnimations: boolean

  // Layout
  hasMaxWidth: boolean // centered layout
  hasFooterContent: boolean
  footerLinkCount: number
  hasNavigation: boolean

  // Branding
  hasLogo: boolean // img near top of page
  colorCount: number // unique colors detected in inline styles
  hasDarkMode: boolean

  // Issues found
  issues: Array<{ label: string; severity: 'critical' | 'warning' | 'info' }>
}

export function analyzeDesign(html: string): DesignAnalysis {
  const issues: DesignAnalysis['issues'] = []

  // ── Content Analysis ──

  // Count images
  const imgTags = html.match(/<img\s/gi) || []
  const imageCount = imgTags.length
  if (imageCount === 0) {
    issues.push({ label: 'Aucune image sur la page', severity: 'critical' })
  } else if (imageCount < 3) {
    issues.push({ label: `Seulement ${imageCount} image(s) — contenu visuel pauvre`, severity: 'warning' })
  }

  // Hero image (large image/background near top of page)
  const hasHeroImage = /(?:hero|banner|jumbotron|header)[\s\S]{0,500}(?:<img|background-image|background:\s*url)/i.test(html.slice(0, 5000)) ||
    /<(?:section|div|header)[^>]*(?:style="[^"]*background[^"]*url|class="[^"]*hero)/i.test(html.slice(0, 5000))

  if (!hasHeroImage) {
    issues.push({ label: 'Pas de hero/banner visible en haut de page', severity: 'warning' })
  }

  // Headings
  const headings = html.match(/<h[1-6][\s>]/gi) || []
  const headingCount = headings.length
  if (headingCount === 0) {
    issues.push({ label: 'Aucun heading (h1-h6) — structure de page absente', severity: 'critical' })
  } else if (headingCount < 3) {
    issues.push({ label: 'Très peu de headings — contenu peu structuré', severity: 'warning' })
  }

  // H1 count
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length
  if (h1Count === 0) {
    issues.push({ label: 'Pas de h1 — titre principal manquant', severity: 'warning' })
  } else if (h1Count > 1) {
    issues.push({ label: `${h1Count} balises h1 — devrait être unique`, severity: 'info' })
  }

  // Text to HTML ratio
  const textContent = html.replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  const textToHtmlRatio = Math.round((textContent.length / Math.max(html.length, 1)) * 100)
  const wordCount = textContent.split(/\s+/).filter(w => w.length > 2).length

  if (textToHtmlRatio < 10) {
    issues.push({ label: `Ratio texte/HTML très faible (${textToHtmlRatio}%) — page principalement du code`, severity: 'warning' })
  }
  if (wordCount < 50) {
    issues.push({ label: `Très peu de contenu textuel (${wordCount} mots)`, severity: 'warning' })
  }

  // Sections
  const hasSections = /<section[\s>]/i.test(html) || (html.match(/<div[^>]*class="[^"]*(?:section|container|wrapper|block)[^"]*"/gi) || []).length >= 3

  // ── Typography ──

  const usesGoogleFonts = /fonts\.googleapis\.com/i.test(html)
  const hasFontFace = /@font-face/i.test(html)
  const hasCustomFonts = usesGoogleFonts || hasFontFace

  if (!hasCustomFonts) {
    issues.push({ label: 'Pas de police personnalisée — design générique', severity: 'warning' })
  }

  // Count font families
  const fontFamilyMatches = html.match(/font-family\s*:\s*([^;}"]+)/gi) || []
  const fontFamilies = new Set(fontFamilyMatches.map(f => f.replace(/font-family\s*:\s*/i, '').trim().toLowerCase()))
  const fontFamilyCount = fontFamilies.size

  if (fontFamilyCount > 5) {
    issues.push({ label: `${fontFamilyCount} polices différentes — incohérence typographique`, severity: 'warning' })
  }

  // ── CSS Quality ──

  // Detect linked stylesheets size (we can only count them, not their size from HTML)
  const cssLinks = html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []
  const cssSize = cssLinks.length * 20000 // rough estimate: ~20KB per stylesheet

  // Inline styles
  const inlineStyles = html.match(/style="[^"]*"/gi) || []
  if (inlineStyles.length > 20) {
    issues.push({ label: `${inlineStyles.length} styles inline — code non maintenable`, severity: 'info' })
  }

  // Media queries
  const hasMediaQueries = /@media/i.test(html)

  // Flexbox/Grid
  const usesFlexboxOrGrid = /display\s*:\s*(?:flex|grid)/i.test(html)
  if (!usesFlexboxOrGrid) {
    issues.push({ label: 'Pas de Flexbox/Grid détecté — layout possiblement ancien', severity: 'info' })
  }

  // !important
  const importantMatches = html.match(/!important/gi) || []
  const importantCount = importantMatches.length
  if (importantCount > 10) {
    issues.push({ label: `${importantCount} utilisations de !important — CSS mal structuré`, severity: 'warning' })
  }

  // Animations
  const hasAnimations = /animation|transition|@keyframes|transform/i.test(html)

  // ── Layout ──

  const hasMaxWidth = /max-width/i.test(html)
  if (!hasMaxWidth) {
    issues.push({ label: 'Pas de max-width — le contenu s\'étire sur tout l\'écran', severity: 'info' })
  }

  // Navigation
  const hasNavigation = /<nav[\s>]/i.test(html) || /<[^>]*class="[^"]*(?:nav|menu|navbar)[^"]*"/i.test(html)
  if (!hasNavigation) {
    issues.push({ label: 'Pas de navigation détectée (<nav>)', severity: 'warning' })
  }

  // Footer
  const footerMatch = html.match(/<footer[\s\S]{0,5000}<\/footer>/i)
  const hasFooterContent = !!footerMatch && footerMatch[0].length > 100
  const footerLinks = footerMatch ? (footerMatch[0].match(/<a\s/gi) || []).length : 0
  const footerLinkCount = footerLinks

  if (!hasFooterContent) {
    issues.push({ label: 'Footer vide ou absent', severity: 'warning' })
  }

  // ── Branding ──

  // Logo (image in header/nav area)
  const hasLogo = /<(?:header|nav)[\s\S]{0,2000}<img/i.test(html.slice(0, 5000)) ||
    /class="[^"]*logo[^"]*"/i.test(html.slice(0, 3000)) ||
    /alt="[^"]*logo[^"]*"/i.test(html.slice(0, 3000))

  if (!hasLogo) {
    issues.push({ label: 'Pas de logo détecté en haut de page', severity: 'warning' })
  }

  // Color count (from inline styles)
  const colorMatches = html.match(/#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)/gi) || []
  const uniqueColors = new Set(colorMatches.map(c => c.toLowerCase()))
  const colorCount = uniqueColors.size

  // Dark mode
  const hasDarkMode = /prefers-color-scheme\s*:\s*dark|dark-mode|theme-dark/i.test(html)

  // ── Calculate Score ──

  let score = 50 // base

  // Content (+25 max)
  if (imageCount >= 5) score += 8
  else if (imageCount >= 2) score += 4
  if (hasHeroImage) score += 5
  if (headingCount >= 5) score += 5
  else if (headingCount >= 2) score += 2
  if (wordCount >= 200) score += 4
  else if (wordCount >= 50) score += 2
  if (hasSections) score += 3

  // Typography (+10 max)
  if (hasCustomFonts) score += 7
  if (fontFamilyCount >= 1 && fontFamilyCount <= 3) score += 3

  // CSS Quality (+10 max)
  if (hasMediaQueries) score += 3
  if (usesFlexboxOrGrid) score += 4
  if (importantCount < 5) score += 3

  // Layout (+10 max)
  if (hasMaxWidth) score += 3
  if (hasNavigation) score += 3
  if (hasFooterContent) score += 2
  if (footerLinkCount >= 3) score += 2

  // Branding (+5 max)
  if (hasLogo) score += 3
  if (hasAnimations) score += 2

  // Penalties
  if (imageCount === 0) score -= 15
  if (headingCount === 0) score -= 10
  if (!hasCustomFonts) score -= 5
  if (!hasNavigation) score -= 5
  if (importantCount > 20) score -= 5

  score = Math.max(0, Math.min(100, score))

  return {
    score,
    imageCount,
    hasHeroImage,
    headingCount,
    textToHtmlRatio,
    wordCount,
    hasSections,
    hasCustomFonts,
    fontFamilyCount,
    usesGoogleFonts,
    cssSize,
    hasMediaQueries,
    usesFlexboxOrGrid,
    importantCount,
    hasAnimations,
    hasMaxWidth,
    hasFooterContent,
    footerLinkCount,
    hasNavigation,
    hasLogo,
    colorCount,
    hasDarkMode,
    issues,
  }
}
