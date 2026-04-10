// ============================================================================
// PPTX BUILDER v2 — 10 slides, style 7G (Linear/Keynote hybrid)
// Generates a .pptx from an AuditReport with ChatGPT-generated backgrounds
// ============================================================================

import PptxGenJS from 'pptxgenjs'
import fs from 'fs'
import path from 'path'
import type { AuditReport } from './auditJson'
import type { Severity } from './auditCriteria'
import { CATEGORY_LABELS } from './auditCriteria'

// ── Style constants ──

const C = {
  bg: '08090C',
  text: 'FAFAFA',
  muted: '71717A',
  dim: '52525B',
  divider: '3F3F46',
  border: '27272A',
  bad: 'F87171',
  warn: 'FBBF24',
  ok: '34D399',
  good: '22C55E',
  blue: '638BFF',
  violet: 'C084FC',
  white10: '1A1B1F',
}

const FONT = 'Helvetica Neue'
const SW = 13.333 // slide width inches
const SH = 7.5    // slide height inches
const MX = 0.9    // margin X
const MY = 0.7    // margin Y
const CW = SW - 2 * MX // content width

// ── Background cache ──

type BgVariant = 'G' | 'G2' | 'G3'
const bgCache: Partial<Record<BgVariant, string>> = {}

function loadBg(variant: BgVariant): string {
  if (bgCache[variant]) return bgCache[variant]!
  const file = `bg-${variant}.png`
  const filePath = path.join(process.cwd(), 'public', 'prospection-template', file)
  const buffer = fs.readFileSync(filePath)
  bgCache[variant] = `image/png;base64,${buffer.toString('base64')}`
  return bgCache[variant]!
}

function bg(slide: PptxGenJS.Slide, variant: BgVariant = 'G') {
  slide.background = { data: loadBg(variant) }
}

// ── Helpers ──

function severityColor(s: Severity): string {
  if (s === 'ok') return C.good
  if (s === 'acceptable') return C.warn
  if (s === 'warning') return C.warn
  return C.bad
}

function severityIcon(s: Severity): string {
  if (s === 'ok') return '✓'
  if (s === 'acceptable') return '~'
  if (s === 'warning') return '!'
  return '✗'
}

function scoreColor(score: number | null): string {
  if (score === null) return C.muted
  if (score >= 90) return C.good
  if (score >= 50) return C.warn
  return C.bad
}

function sectionLabel(slide: PptxGenJS.Slide, label: string) {
  slide.addText(label, {
    x: MX, y: MY, w: CW, h: 0.3,
    fontFace: FONT, fontSize: 10, color: C.dim, bold: true, charSpacing: 4,
  })
}

// ============================================================================
// SLIDE 1 — COVER
// ============================================================================

function slideCover(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G3')

  slide.addText('AUDIT WEB', {
    x: MX, y: 1.2, w: CW, h: 0.4,
    fontFace: FONT, fontSize: 12, color: C.blue, bold: true, charSpacing: 6,
  })

  // Prospect name (big)
  const name = r.prospect.name || 'Audit'
  slide.addText(name, {
    x: MX, y: 1.8, w: CW, h: 1.8,
    fontFace: FONT, fontSize: 56, color: C.text, bold: false, valign: 'top',
    lineSpacingMultiple: 0.95,
  })

  // Divider
  slide.addShape(pptx.ShapeType.line, {
    x: MX, y: 4.2, w: 1.5, h: 0,
    line: { color: C.divider, width: 1.5 },
  })

  // Info row
  const infoParts: string[] = []
  if (r.prospect.city) infoParts.push(r.prospect.city)
  if (r.prospect.website) infoParts.push(r.prospect.website)
  infoParts.push(new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }))

  slide.addText(infoParts.join('  ·  '), {
    x: MX, y: 4.5, w: CW, h: 0.4,
    fontFace: FONT, fontSize: 12, color: C.muted,
  })

  // JL Studio
  slide.addText('JL Studio — jlstudio.dev', {
    x: MX, y: 6.3, w: CW, h: 0.3,
    fontFace: FONT, fontSize: 11, color: C.dim,
  })
}

// ============================================================================
// SLIDE 2 — PREMIÈRE IMPRESSION (screenshots)
// ============================================================================

function slideFirstImpression(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G')

  sectionLabel(slide, 'SECTION 01 / PREMIÈRE IMPRESSION')

  slide.addText(
    [
      { text: 'Voici ce que voit votre client\nen arrivant sur ', options: { bold: false } },
      { text: 'votre site.', options: { bold: true } },
    ],
    {
      x: MX, y: MY + 0.4, w: CW - 2, h: 1.6,
      fontFace: FONT, fontSize: 32, color: C.text, valign: 'top', lineSpacingMultiple: 1.05,
    },
  )

  // Screenshots
  if (r.screenshots) {
    // Desktop screenshot
    slide.addText('DESKTOP', {
      x: MX, y: 3.2, w: 3, h: 0.3,
      fontFace: FONT, fontSize: 9, color: C.dim, bold: true, charSpacing: 2,
    })
    slide.addImage({
      path: r.screenshots.desktopFold,
      x: MX, y: 3.6, w: 5.5, h: 3.3,
      rounding: true,
    })

    // Mobile screenshot
    slide.addText('MOBILE', {
      x: 7.2, y: 3.2, w: 3, h: 0.3,
      fontFace: FONT, fontSize: 9, color: C.dim, bold: true, charSpacing: 2,
    })
    slide.addImage({
      path: r.screenshots.mobileFold,
      x: 7.2, y: 3.6, w: 2.2, h: 3.3,
      rounding: true,
    })
  }
}

// ============================================================================
// SLIDE 3 — LE VERDICT (scores)
// ============================================================================

function slideVerdict(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G')

  sectionLabel(slide, 'SECTION 02 / LE VERDICT')

  // Global score + title
  slide.addText(
    [
      { text: 'Votre site obtient un score de ', options: { bold: false } },
      { text: `${r.scores.global}/100`, options: { bold: true, color: scoreColor(r.scores.global) } },
      { text: '.', options: { bold: false } },
    ],
    {
      x: MX, y: MY + 0.4, w: CW - 2, h: 1.2,
      fontFace: FONT, fontSize: 36, color: C.text, valign: 'top',
    },
  )

  // Category scores row
  const categories: { key: keyof typeof r.scores; label: string }[] = [
    { key: 'speed', label: 'Rapidité' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'visibility', label: 'Visibilité' },
    { key: 'trust', label: 'Confiance' },
    { key: 'conversion', label: 'Conversion' },
  ]

  const gaugeY = 3.5
  const gaugeW = 2.0
  const gaugeGap = 0.3
  const totalW = categories.length * gaugeW + (categories.length - 1) * gaugeGap
  const startX = (SW - totalW) / 2

  categories.forEach((cat, i) => {
    const x = startX + i * (gaugeW + gaugeGap)
    const score = r.scores[cat.key] as number

    slide.addText(`${score}`, {
      x, y: gaugeY, w: gaugeW, h: 1.0,
      fontFace: FONT, fontSize: 52, color: scoreColor(score),
      bold: false, valign: 'top', align: 'left',
    })

    slide.addShape(pptx.ShapeType.line, {
      x, y: gaugeY + 1.15, w: 0.3, h: 0,
      line: { color: C.divider, width: 1.5 },
    })

    slide.addText(cat.label.toUpperCase(), {
      x, y: gaugeY + 1.3, w: gaugeW, h: 0.3,
      fontFace: FONT, fontSize: 10, color: C.muted, bold: true, charSpacing: 2,
    })
  })

  // Estimated loss
  slide.addText(`Estimation : vous perdez ${r.estimatedLoss.phrase}`, {
    x: MX, y: 6.2, w: CW, h: 0.4,
    fontFace: FONT, fontSize: 13, color: C.bad, italic: true,
  })
}

// ============================================================================
// SLIDE 4 — CE QUE ÇA VOUS COÛTE (top problems)
// ============================================================================

function slideProblems(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G')

  sectionLabel(slide, 'SECTION 03 / CE QUE ÇA VOUS COÛTE')

  slide.addText('Les problèmes qui vous font perdre des clients', {
    x: MX, y: MY + 0.4, w: CW - 2, h: 0.8,
    fontFace: FONT, fontSize: 28, color: C.text, bold: false, valign: 'top',
  })

  const startY = 2.2
  const rowH = 0.85

  r.topProblems.slice(0, 5).forEach((p, i) => {
    const y = startY + i * rowH
    const color = p.severity === 'critical' ? C.bad : C.warn

    // Severity dot
    slide.addText(p.severity === 'critical' ? '●' : '▲', {
      x: MX, y, w: 0.3, h: 0.35,
      fontFace: FONT, fontSize: 14, color, align: 'center',
    })

    // Title
    slide.addText(p.title, {
      x: MX + 0.35, y, w: CW - 0.35, h: 0.3,
      fontFace: FONT, fontSize: 13, color: C.text, bold: true,
    })

    // Impact
    slide.addText(p.impact.slice(0, 200), {
      x: MX + 0.35, y: y + 0.3, w: CW - 0.35, h: 0.35,
      fontFace: FONT, fontSize: 10, color: C.muted, italic: false,
    })
  })

  // Source note
  slide.addText('Sources : Google Web Vitals 2024, OWASP, BrightLocal 2024, LCEN', {
    x: MX, y: 6.6, w: CW, h: 0.3,
    fontFace: FONT, fontSize: 8, color: C.dim, italic: true,
  })
}

// ============================================================================
// SLIDE 5 — VISIBILITÉ GOOGLE
// ============================================================================

function slideGoogleVisibility(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G')

  sectionLabel(slide, 'SECTION 04 / VISIBILITÉ GOOGLE')

  slide.addText('Êtes-vous visible quand vos clients vous cherchent ?', {
    x: MX, y: MY + 0.4, w: CW - 2, h: 0.8,
    fontFace: FONT, fontSize: 28, color: C.text, bold: false,
  })

  const gv = r.googleVisibility
  let y = 2.4

  if (gv && gv.keyword) {
    // Search query
    slide.addText(`Recherche : "${gv.keyword}"`, {
      x: MX, y, w: CW, h: 0.4,
      fontFace: FONT, fontSize: 14, color: C.blue, bold: true,
    })
    y += 0.6

    // Organic position
    const posText = gv.organicPosition
      ? `Position ${gv.organicPosition} dans Google`
      : 'Non trouvé dans les 30 premiers résultats'
    const posColor = gv.organicPosition
      ? (gv.organicPosition <= 3 ? C.good : gv.organicPosition <= 10 ? C.warn : C.bad)
      : C.bad

    slide.addText(posText, {
      x: MX, y, w: CW, h: 0.5,
      fontFace: FONT, fontSize: 24, color: posColor, bold: true,
    })
    y += 0.7

    // Local pack
    if (gv.isInLocalPack) {
      const ratingText = gv.localPackRating ? ` — ${gv.localPackRating}★ (${gv.localPackReviewCount || 0} avis)` : ''
      slide.addText(`✓ Présent dans Google Maps${ratingText}`, {
        x: MX, y, w: CW, h: 0.35,
        fontFace: FONT, fontSize: 13, color: C.good,
      })
    } else {
      slide.addText('✗ Absent de Google Maps (local pack)', {
        x: MX, y, w: CW, h: 0.35,
        fontFace: FONT, fontSize: 13, color: C.bad,
      })
    }
    y += 0.6

    // Competitor sites
    if (gv.competitorSites.length > 0) {
      slide.addText('Vos concurrents qui apparaissent :', {
        x: MX, y, w: CW, h: 0.3,
        fontFace: FONT, fontSize: 11, color: C.muted, bold: true,
      })
      y += 0.35

      gv.competitorSites.slice(0, 3).forEach((site) => {
        let domain = site
        try { domain = new URL(site).hostname } catch {}
        slide.addText(`→ ${domain}`, {
          x: MX + 0.3, y, w: CW - 0.3, h: 0.25,
          fontFace: FONT, fontSize: 10, color: C.muted,
        })
        y += 0.28
      })
    }
  } else {
    slide.addText('Vérification Google non disponible pour cet audit.\nLancez l\'audit depuis une recherche métier + ville pour activer cette fonctionnalité.', {
      x: MX, y, w: CW, h: 0.8,
      fontFace: FONT, fontSize: 13, color: C.muted,
    })
  }
}

// ============================================================================
// SLIDE 6 — GRILLE D'AUDIT COMPLÈTE (checklist)
// ============================================================================

function slideChecklist(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G')

  sectionLabel(slide, 'SECTION 05 / AUDIT COMPLET')

  slide.addText('Grille d\'évaluation détaillée', {
    x: MX, y: MY + 0.35, w: CW, h: 0.5,
    fontFace: FONT, fontSize: 24, color: C.text, bold: false,
  })

  // Table rows
  const rows: PptxGenJS.TableRow[] = []

  // Header
  rows.push([
    { text: 'CRITÈRE', options: { fontSize: 8, bold: true, color: C.dim, fill: { color: C.white10 } } },
    { text: 'RÉSULTAT', options: { fontSize: 8, bold: true, color: C.dim, fill: { color: C.white10 }, align: 'center' } },
    { text: 'ÉTAT', options: { fontSize: 8, bold: true, color: C.dim, fill: { color: C.white10 }, align: 'center' } },
  ])

  // Group by category
  const categoryOrder: Array<keyof typeof CATEGORY_LABELS> = ['speed', 'mobile', 'visibility', 'trust', 'conversion']

  for (const cat of categoryOrder) {
    // Category header row
    rows.push([
      { text: CATEGORY_LABELS[cat].toUpperCase(), options: { fontSize: 7, bold: true, color: C.blue, colspan: 3, fill: { color: '0D0E12' } } },
      { text: '' },
      { text: '' },
    ])

    const catCriteria = r.criteria.filter(c => c.category === cat)
    for (const crit of catCriteria) {
      rows.push([
        { text: crit.label, options: { fontSize: 8, color: C.text } },
        { text: crit.value.slice(0, 40), options: { fontSize: 8, color: C.muted, align: 'center' } },
        { text: severityIcon(crit.severity), options: { fontSize: 10, color: severityColor(crit.severity), align: 'center', bold: true } },
      ])
    }
  }

  slide.addTable(rows, {
    x: MX, y: 1.7, w: CW,
    fontSize: 8,
    fontFace: FONT,
    color: C.text,
    border: { type: 'solid', pt: 0.5, color: C.border },
    colW: [CW * 0.50, CW * 0.35, CW * 0.15],
    rowH: 0.28,
    autoPage: false,
  })
}

// ============================================================================
// SLIDE 7 — AVANT / APRÈS
// ============================================================================

function slideBeforeAfter(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G2')

  sectionLabel(slide, 'SECTION 06 / TRANSFORMATION')

  slide.addText(
    [
      { text: 'Votre site ', options: { bold: false } },
      { text: 'avant', options: { bold: true, color: C.bad } },
      { text: ' et ', options: { bold: false } },
      { text: 'après.', options: { bold: true, color: C.good } },
    ],
    {
      x: MX, y: MY + 0.4, w: CW, h: 0.8,
      fontFace: FONT, fontSize: 32, color: C.text,
    },
  )

  // Before column
  slide.addText('AVANT', {
    x: MX, y: 2.4, w: 5.5, h: 0.3,
    fontFace: FONT, fontSize: 10, color: C.bad, bold: true, charSpacing: 3,
  })

  slide.addText(`Score : ${r.scores.global}/100`, {
    x: MX, y: 2.75, w: 5.5, h: 0.3,
    fontFace: FONT, fontSize: 18, color: C.bad, bold: false,
  })

  // Before screenshot
  if (r.screenshots) {
    slide.addImage({
      path: r.screenshots.mobileFold,
      x: MX + 0.5, y: 3.3, w: 2.0, h: 3.3,
      rounding: true,
    })
  }

  // After column
  slide.addText('APRÈS', {
    x: 7.2, y: 2.4, w: 5.5, h: 0.3,
    fontFace: FONT, fontSize: 10, color: C.good, bold: true, charSpacing: 3,
  })

  slide.addText('Score projeté : 90+/100', {
    x: 7.2, y: 2.75, w: 5.5, h: 0.3,
    fontFace: FONT, fontSize: 18, color: C.good, bold: false,
  })

  // Placeholder for demo site screenshot
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.7, y: 3.3, w: 2.0, h: 3.3,
    fill: { color: '111118' },
    line: { color: C.blue, width: 1, dashType: 'dash' },
    rectRadius: 0.1,
  })

  slide.addText('Site démo\n(voir slide suivante)', {
    x: 7.7, y: 4.3, w: 2.0, h: 1.0,
    fontFace: FONT, fontSize: 10, color: C.dim, align: 'center', valign: 'middle',
  })
}

// ============================================================================
// SLIDE 8 — DÉCOUVREZ VOTRE NOUVEAU SITE (QR / lien démo)
// ============================================================================

function slideDemoLink(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G2')

  sectionLabel(slide, 'SECTION 07 / VOTRE NOUVEAU SITE')

  slide.addText(
    [
      { text: 'Découvrez votre ', options: { bold: false } },
      { text: 'nouveau site.', options: { bold: true } },
    ],
    {
      x: MX, y: MY + 0.4, w: CW, h: 1.0,
      fontFace: FONT, fontSize: 36, color: C.text,
    },
  )

  slide.addText('Nous avons créé une maquette fonctionnelle de votre futur site.\nElle est accessible en ligne — scannez le QR code ou tapez l\'adresse.', {
    x: MX, y: 2.2, w: CW, h: 0.8,
    fontFace: FONT, fontSize: 14, color: C.muted, lineSpacingMultiple: 1.4,
  })

  // QR code placeholder
  slide.addShape(pptx.ShapeType.roundRect, {
    x: (SW - 2.5) / 2, y: 3.5, w: 2.5, h: 2.5,
    fill: { color: 'FFFFFF' },
    rectRadius: 0.15,
  })

  slide.addText('QR CODE\n(à ajouter)', {
    x: (SW - 2.5) / 2, y: 4.2, w: 2.5, h: 1.0,
    fontFace: FONT, fontSize: 11, color: '333333', align: 'center', valign: 'middle',
  })

  // URL placeholder
  slide.addText('URL : [lien du site démo à ajouter]', {
    x: MX, y: 6.3, w: CW, h: 0.3,
    fontFace: FONT, fontSize: 12, color: C.blue, align: 'center',
  })
}

// ============================================================================
// SLIDE 9 — RECOMMANDATIONS
// ============================================================================

function slideRecommendations(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G2')

  sectionLabel(slide, 'SECTION 08 / RECOMMANDATIONS')

  slide.addText('Nos recommandations par priorité', {
    x: MX, y: MY + 0.4, w: CW, h: 0.6,
    fontFace: FONT, fontSize: 28, color: C.text, bold: false,
  })

  const startY = 2.0
  const rowH = 0.75

  r.recommendations.slice(0, 6).forEach((rec, i) => {
    const y = startY + i * rowH
    const numColor = rec.difficulty === 'Important' ? C.bad : rec.difficulty === 'Moyen' ? C.warn : C.good

    // Number
    slide.addText(`${i + 1}`, {
      x: MX, y, w: 0.35, h: 0.35,
      fontFace: FONT, fontSize: 14, color: numColor, bold: true, align: 'center',
    })

    // Action
    slide.addText(rec.action, {
      x: MX + 0.45, y, w: CW * 0.55, h: 0.3,
      fontFace: FONT, fontSize: 12, color: C.text, bold: true,
    })

    // Timeline badge
    slide.addText(rec.timeline, {
      x: MX + CW * 0.6, y, w: 1.5, h: 0.25,
      fontFace: FONT, fontSize: 8, color: C.blue, bold: true,
      align: 'center',
    })

    // Impact
    slide.addText(rec.impact.slice(0, 120), {
      x: MX + 0.45, y: y + 0.3, w: CW - 0.45, h: 0.3,
      fontFace: FONT, fontSize: 9, color: C.muted,
    })
  })
}

// ============================================================================
// SLIDE 10 — PROCESSUS & CONTACT (CTA)
// ============================================================================

function slideCTA(pptx: PptxGenJS, r: AuditReport) {
  const slide = pptx.addSlide()
  bg(slide, 'G3')

  sectionLabel(slide, 'SECTION 09 / PASSONS À L\'ACTION')

  slide.addText(
    [
      { text: 'Chaque semaine sans refonte,\nc\'est ', options: { bold: false } },
      { text: `${r.estimatedLoss.phrase}`, options: { bold: true, color: C.bad } },
      { text: ' en moins.', options: { bold: false } },
    ],
    {
      x: MX, y: MY + 0.4, w: CW, h: 1.6,
      fontFace: FONT, fontSize: 30, color: C.text, lineSpacingMultiple: 1.1,
    },
  )

  // Process steps
  const steps = [
    { num: '01', title: 'DÉCOUVERTE', desc: 'Réunion de lancement, objectifs, contenus' },
    { num: '02', title: 'MAQUETTE', desc: 'Design soumis à validation avant développement' },
    { num: '03', title: 'DÉVELOPPEMENT', desc: 'Intégration, mobile-first, SEO, tests' },
    { num: '04', title: 'LIVRAISON', desc: 'Mise en ligne, formation, 1 mois de support' },
  ]

  const stepY = 3.2
  const stepW = 2.6
  const stepGap = 0.35
  const stepsStartX = (SW - (steps.length * stepW + (steps.length - 1) * stepGap)) / 2

  steps.forEach((s, i) => {
    const x = stepsStartX + i * (stepW + stepGap)

    slide.addText(s.num, {
      x, y: stepY, w: stepW, h: 0.4,
      fontFace: FONT, fontSize: 20, color: C.blue, bold: false,
    })

    slide.addText(s.title, {
      x, y: stepY + 0.4, w: stepW, h: 0.3,
      fontFace: FONT, fontSize: 10, color: C.text, bold: true, charSpacing: 2,
    })

    slide.addText(s.desc, {
      x, y: stepY + 0.75, w: stepW, h: 0.5,
      fontFace: FONT, fontSize: 9, color: C.muted,
    })
  })

  // Divider
  slide.addShape(pptx.ShapeType.line, {
    x: MX, y: 5.2, w: CW, h: 0,
    line: { color: C.divider, width: 0.5 },
  })

  // Contact
  slide.addText('JL Studio — Agence web premium', {
    x: MX, y: 5.5, w: CW, h: 0.35,
    fontFace: FONT, fontSize: 16, color: C.text, bold: true, align: 'center',
  })

  slide.addText('contact@jlstudio.dev  ·  jlstudio.dev  ·  Bordeaux', {
    x: MX, y: 5.9, w: CW, h: 0.3,
    fontFace: FONT, fontSize: 12, color: C.blue, align: 'center',
  })

  slide.addText('Prochaine étape : un appel de 30 minutes pour définir votre projet.', {
    x: MX, y: 6.5, w: CW, h: 0.3,
    fontFace: FONT, fontSize: 11, color: C.muted, align: 'center', italic: true,
  })
}

// ============================================================================
// MAIN ENTRY
// ============================================================================

export async function buildPresentation(report: AuditReport): Promise<Buffer> {
  const pptx = new PptxGenJS()

  pptx.layout = 'LAYOUT_WIDE'
  pptx.title = `Audit Web — ${report.prospect.name}`
  pptx.author = 'JL Studio'
  pptx.company = 'JL Studio'

  // === BUILD ALL 10 SLIDES ===
  slideCover(pptx, report)              // 1. Cover
  slideFirstImpression(pptx, report)    // 2. Screenshots
  slideVerdict(pptx, report)            // 3. Scores
  slideProblems(pptx, report)           // 4. Top problems
  slideGoogleVisibility(pptx, report)   // 5. Google visibility
  slideChecklist(pptx, report)          // 6. Full checklist
  slideBeforeAfter(pptx, report)        // 7. Before/After
  slideDemoLink(pptx, report)           // 8. Demo QR code
  slideRecommendations(pptx, report)    // 9. Recommendations
  slideCTA(pptx, report)               // 10. CTA

  const data = await pptx.write({ outputType: 'nodebuffer' })
  return data as Buffer
}
