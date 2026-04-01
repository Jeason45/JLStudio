import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { ScoredProspect } from '../scorer/types.js'

const BRAND_COLOR = rgb(99 / 255, 139 / 255, 255 / 255)  // #638BFF
const RED = rgb(239 / 255, 68 / 255, 68 / 255)
const ORANGE = rgb(245 / 255, 158 / 255, 11 / 255)
const GREEN = rgb(34 / 255, 197 / 255, 94 / 255)
const DARK = rgb(0.1, 0.1, 0.12)
const GRAY = rgb(0.45, 0.45, 0.5)
const LIGHT_GRAY = rgb(0.92, 0.92, 0.94)
const WHITE = rgb(1, 1, 1)

function scoreColor(score: number | null) {
  if (score === null) return GRAY
  if (score >= 90) return GREEN
  if (score >= 50) return ORANGE
  return RED
}

function scoreEmoji(score: number | null): string {
  if (score === null) return '—'
  if (score >= 90) return '✓'
  if (score >= 50) return '!'
  return '✗'
}

function formatMs(ms: number | null): string {
  if (ms === null) return '—'
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`
}

function formatBytes(bytes: number | null): string {
  if (bytes === null) return '—'
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

export async function generateAuditPdf(prospect: ScoredProspect): Promise<string | null> {
  if (!prospect.analysis) return null

  const a = prospect.analysis
  const doc = await PDFDocument.create()
  const helvetica = await doc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await doc.embedFont(StandardFonts.HelveticaBold)

  const W = 595  // A4
  const H = 842
  const MARGIN = 50

  // ─── Page 1: Cover + Summary ───
  let page = doc.addPage([W, H])
  let y = H - MARGIN

  // Header bar
  page.drawRectangle({ x: 0, y: H - 80, width: W, height: 80, color: DARK })
  page.drawText('AUDIT WEB', { x: MARGIN, y: H - 35, size: 22, font: helveticaBold, color: WHITE })
  page.drawText('JL Studio — jlstudio.dev', { x: MARGIN, y: H - 55, size: 10, font: helvetica, color: rgb(0.6, 0.65, 0.8) })
  page.drawText(new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }), { x: W - MARGIN - 120, y: H - 35, size: 10, font: helvetica, color: rgb(0.6, 0.65, 0.8) })

  y = H - 120

  // Company name
  page.drawText(prospect.name, { x: MARGIN, y, size: 20, font: helveticaBold, color: DARK })
  y -= 22
  if (prospect.url) {
    page.drawText(prospect.url, { x: MARGIN, y, size: 10, font: helvetica, color: BRAND_COLOR })
    y -= 14
  }
  if (prospect.sireneData?.siret) {
    page.drawText(`SIRET: ${prospect.sireneData.siret}`, { x: MARGIN, y, size: 9, font: helvetica, color: GRAY })
    y -= 14
  }

  y -= 20

  // ── Score cards ──
  const scores = [
    { label: 'Performance', score: a.mobileScore, sub: 'Mobile' },
    { label: 'Accessibilité', score: a.mobileAccessibility, sub: '' },
    { label: 'SEO', score: a.mobileSEO, sub: '' },
    { label: 'Bonnes pratiques', score: a.mobileBestPractices, sub: '' },
  ]

  const cardW = (W - MARGIN * 2 - 30) / 4
  for (let i = 0; i < scores.length; i++) {
    const x = MARGIN + i * (cardW + 10)
    const s = scores[i]

    // Card background
    page.drawRectangle({ x, y: y - 70, width: cardW, height: 70, color: LIGHT_GRAY, borderColor: rgb(0.85, 0.85, 0.87), borderWidth: 0.5 })

    // Score number
    const scoreStr = s.score !== null ? `${s.score}` : '—'
    page.drawText(scoreStr, { x: x + cardW / 2 - (scoreStr.length * 8), y: y - 35, size: 28, font: helveticaBold, color: scoreColor(s.score) })

    // Label
    page.drawText(s.label, { x: x + 8, y: y - 58, size: 8, font: helveticaBold, color: DARK })
  }

  y -= 100

  // ── Core Web Vitals ──
  page.drawText('Core Web Vitals (Mobile)', { x: MARGIN, y, size: 13, font: helveticaBold, color: DARK })
  y -= 20

  const vitals = [
    { label: 'First Contentful Paint', value: formatMs(a.mobileFCP), good: (a.mobileFCP ?? 9999) < 1800 },
    { label: 'Largest Contentful Paint', value: formatMs(a.mobileLCP), good: (a.mobileLCP ?? 9999) < 2500 },
    { label: 'Total Blocking Time', value: formatMs(a.mobileTBT), good: (a.mobileTBT ?? 9999) < 200 },
    { label: 'Cumulative Layout Shift', value: a.mobileCLS !== null ? a.mobileCLS.toFixed(3) : '—', good: (a.mobileCLS ?? 1) < 0.1 },
    { label: 'Speed Index', value: formatMs(a.mobileSI), good: (a.mobileSI ?? 9999) < 3400 },
  ]

  for (const v of vitals) {
    const dot = v.good ? '●' : '●'
    page.drawText(dot, { x: MARGIN, y, size: 10, font: helvetica, color: v.good ? GREEN : RED })
    page.drawText(v.label, { x: MARGIN + 16, y, size: 9, font: helvetica, color: DARK })
    page.drawText(v.value, { x: W - MARGIN - 60, y, size: 9, font: helveticaBold, color: v.good ? GREEN : RED })
    y -= 16
  }

  y -= 15

  // ── Résumé technique ──
  page.drawText('Résumé technique', { x: MARGIN, y, size: 13, font: helveticaBold, color: DARK })
  y -= 20

  const techItems = [
    { label: 'HTTPS', value: a.isHttps ? 'Oui' : 'Non', good: a.isHttps },
    { label: 'Responsive', value: a.isResponsive ? 'Oui' : 'Non', good: a.isResponsive },
    { label: 'CMS détecté', value: a.cmsDetected || 'Non détecté', good: true },
    { label: 'Analytics', value: a.hasAnalytics ? 'Oui' : 'Non', good: a.hasAnalytics },
    { label: 'Meta description', value: a.hasMetaDescription ? 'Oui' : 'Non', good: a.hasMetaDescription },
    { label: 'Sitemap.xml', value: a.hasSitemap ? 'Oui' : 'Non', good: a.hasSitemap },
    { label: 'Robots.txt', value: a.hasRobotsTxt ? 'Oui' : 'Non', good: a.hasRobotsTxt },
    { label: 'jQuery', value: a.usesJquery ? 'Détecté' : 'Non', good: !a.usesJquery },
    { label: 'Balises obsolètes', value: a.hasObsoleteTags ? 'Détectées' : 'Non', good: !a.hasObsoleteTags },
    { label: 'Images modernes (WebP)', value: a.usesModernImages ? 'Oui' : 'Non', good: a.usesModernImages },
    { label: 'Poids de la page', value: formatBytes(a.totalByteWeight), good: (a.totalByteWeight ?? 999999) < 2000000 },
    { label: 'Nombre de requêtes', value: a.totalRequestCount !== null ? `${a.totalRequestCount}` : '—', good: (a.totalRequestCount ?? 999) < 50 },
  ]

  for (const item of techItems) {
    if (y < 60) { page = doc.addPage([W, H]); y = H - MARGIN }
    page.drawText(item.good ? '✓' : '✗', { x: MARGIN, y, size: 9, font: helveticaBold, color: item.good ? GREEN : RED })
    page.drawText(item.label, { x: MARGIN + 16, y, size: 9, font: helvetica, color: DARK })
    page.drawText(item.value, { x: W - MARGIN - 80, y, size: 9, font: helvetica, color: item.good ? DARK : RED })
    y -= 15
  }

  // ─── Page 2: Security + Carbon + Problems ───
  page = doc.addPage([W, H])
  y = H - MARGIN

  // Security
  page.drawText('Sécurité', { x: MARGIN, y, size: 13, font: helveticaBold, color: DARK })
  y -= 20

  if (a.sslResult) {
    page.drawText(`Certificat SSL: ${a.sslResult.isValid ? 'Valide' : 'Invalide'}`, { x: MARGIN, y, size: 9, font: helvetica, color: a.sslResult.isValid ? DARK : RED })
    y -= 14
    if (a.sslResult.protocol) {
      page.drawText(`Protocole: ${a.sslResult.protocol}`, { x: MARGIN, y, size: 9, font: helvetica, color: DARK })
      y -= 14
    }
    if (a.sslResult.daysUntilExpiry !== null) {
      const expColor = a.sslResult.isExpiringSoon ? RED : DARK
      page.drawText(`Expiration: dans ${a.sslResult.daysUntilExpiry} jours`, { x: MARGIN, y, size: 9, font: helvetica, color: expColor })
      y -= 14
    }
  }

  if (a.securityHeaders) {
    page.drawText(`Headers de sécurité: ${a.securityHeaders.score}/${a.securityHeaders.total}`, { x: MARGIN, y, size: 9, font: helvetica, color: a.securityHeaders.score >= 4 ? DARK : RED })
    y -= 14
    const headers = [
      { name: 'HSTS', present: a.securityHeaders.strictTransportSecurity },
      { name: 'CSP', present: a.securityHeaders.contentSecurityPolicy },
      { name: 'X-Frame-Options', present: a.securityHeaders.xFrameOptions },
      { name: 'X-Content-Type', present: a.securityHeaders.xContentTypeOptions },
      { name: 'Referrer-Policy', present: a.securityHeaders.referrerPolicy },
      { name: 'Permissions-Policy', present: a.securityHeaders.permissionsPolicy },
    ]
    for (const h of headers) {
      page.drawText(`  ${h.present ? '✓' : '✗'} ${h.name}`, { x: MARGIN + 10, y, size: 8, font: helvetica, color: h.present ? GREEN : RED })
      y -= 12
    }
  }

  if (a.observatoryGrade) {
    page.drawText(`Mozilla Observatory: ${a.observatoryGrade}`, { x: MARGIN, y, size: 9, font: helvetica, color: ['A', 'A+', 'B'].includes(a.observatoryGrade) ? GREEN : RED })
    y -= 14
  }

  y -= 10

  // Carbon
  if (a.carbonResult) {
    page.drawText('Empreinte carbone', { x: MARGIN, y, size: 13, font: helveticaBold, color: DARK })
    y -= 20
    if (a.carbonResult.co2PerView !== null) {
      page.drawText(`${a.carbonResult.co2PerView.toFixed(2)}g CO2 par visite`, { x: MARGIN, y, size: 9, font: helvetica, color: DARK })
      y -= 14
    }
    if (a.carbonResult.rating) {
      page.drawText(`Rating: ${a.carbonResult.rating}`, { x: MARGIN, y, size: 9, font: helveticaBold, color: ['A', 'B'].includes(a.carbonResult.rating) ? GREEN : RED })
      y -= 14
    }
    if (a.carbonResult.cleanerThan !== null) {
      page.drawText(`Plus propre que ${a.carbonResult.cleanerThan}% des sites testés`, { x: MARGIN, y, size: 9, font: helvetica, color: DARK })
      y -= 14
    }
    page.drawText(`Hébergement vert: ${a.carbonResult.isGreen ? 'Oui' : 'Non'}`, { x: MARGIN, y, size: 9, font: helvetica, color: a.carbonResult.isGreen ? GREEN : GRAY })
    y -= 20
  }

  // W3C + Yellow Lab
  if (a.w3cErrors !== null) {
    page.drawText('Qualité du code HTML', { x: MARGIN, y, size: 13, font: helveticaBold, color: DARK })
    y -= 20
    page.drawText(`${a.w3cErrors} erreurs W3C, ${a.w3cWarnings} warnings`, { x: MARGIN, y, size: 9, font: helvetica, color: a.w3cErrors > 20 ? RED : DARK })
    y -= 14
    for (const err of a.w3cTopErrors.slice(0, 3)) {
      page.drawText(`  • ${err.slice(0, 80)}`, { x: MARGIN + 10, y, size: 8, font: helvetica, color: GRAY })
      y -= 12
    }
    y -= 6
  }

  if (a.yellowLabScore !== null) {
    page.drawText(`Yellow Lab Tools: ${a.yellowLabScore}/100`, { x: MARGIN, y, size: 9, font: helvetica, color: a.yellowLabScore >= 60 ? DARK : RED })
    y -= 14
    for (const issue of a.yellowLabTopIssues.slice(0, 3)) {
      page.drawText(`  • ${issue.slice(0, 80)}`, { x: MARGIN + 10, y, size: 8, font: helvetica, color: GRAY })
      y -= 12
    }
    y -= 10
  }

  // ── Problèmes critiques (breakdown) ──
  page.drawText('Problèmes identifiés', { x: MARGIN, y, size: 13, font: helveticaBold, color: DARK })
  y -= 20

  const sorted = [...prospect.breakdown].sort((a, b) => b.points - a.points)
  for (const b of sorted.slice(0, 10)) {
    if (y < 60) { page = doc.addPage([W, H]); y = H - MARGIN }
    page.drawText(`▸ ${b.label}`, { x: MARGIN, y, size: 9, font: helveticaBold, color: RED })
    page.drawText(b.reason, { x: MARGIN + 10, y: y - 12, size: 8, font: helvetica, color: GRAY })
    y -= 28
  }

  // ─── Page 3: PageSpeed audits détaillés ───
  if (a.mobilePerformanceAudits.length > 0 || a.mobileAccessibilityAudits.length > 0 || a.mobileSEOAudits.length > 0) {
    page = doc.addPage([W, H])
    y = H - MARGIN

    const auditSections = [
      { title: 'Audits Performance', audits: a.mobilePerformanceAudits },
      { title: 'Audits Accessibilité', audits: a.mobileAccessibilityAudits },
      { title: 'Audits SEO', audits: a.mobileSEOAudits },
      { title: 'Audits Bonnes Pratiques', audits: a.mobileBestPracticesAudits },
    ]

    for (const section of auditSections) {
      if (section.audits.length === 0) continue
      if (y < 80) { page = doc.addPage([W, H]); y = H - MARGIN }

      page.drawText(section.title, { x: MARGIN, y, size: 11, font: helveticaBold, color: DARK })
      y -= 18

      for (const audit of section.audits.slice(0, 8)) {
        if (y < 60) { page = doc.addPage([W, H]); y = H - MARGIN }
        page.drawText(`✗ ${audit.title}`, { x: MARGIN + 5, y, size: 8, font: helveticaBold, color: RED })
        if (audit.displayValue) {
          page.drawText(audit.displayValue, { x: W - MARGIN - 70, y, size: 8, font: helvetica, color: ORANGE })
        }
        y -= 12
        if (audit.description) {
          const desc = audit.description.slice(0, 100)
          page.drawText(desc, { x: MARGIN + 10, y, size: 7, font: helvetica, color: GRAY })
          y -= 11
        }
        y -= 4
      }
      y -= 10
    }
  }

  // ── Footer on last page ──
  const lastPage = doc.getPages()[doc.getPageCount() - 1]
  lastPage.drawRectangle({ x: 0, y: 0, width: W, height: 40, color: DARK })
  lastPage.drawText('JL Studio — Création de sites web premium — jlstudio.dev — contact@jlstudio.dev', { x: MARGIN, y: 15, size: 8, font: helvetica, color: rgb(0.6, 0.65, 0.8) })

  // Save
  const outputDir = join(process.cwd(), 'output', 'audits')
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

  const slug = prospect.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  const date = new Date().toISOString().slice(0, 10)
  const filename = `audit_${slug}_${date}.pdf`
  const filepath = join(outputDir, filename)

  const pdfBytes = await doc.save()
  writeFileSync(filepath, pdfBytes)

  return filepath
}

export async function generateAllAuditPdfs(prospects: ScoredProspect[]): Promise<string[]> {
  const paths: string[] = []
  for (const p of prospects) {
    if (!p.analysis) continue
    const path = await generateAuditPdf(p)
    if (path) paths.push(path)
  }
  return paths
}
