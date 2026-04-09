// PowerPoint builder for prospection audit reports
// Generates a .pptx file from an AuditReport (style 7G — Linear/Keynote hybrid)

import PptxGenJS from 'pptxgenjs'
import fs from 'fs'
import path from 'path'
import type { AuditReport } from './auditJson'

// ============================================================================
// STYLE CONSTANTS — single source of truth for all slides
// ============================================================================

const COLORS = {
  bg: '08090C',
  textPrimary: 'FAFAFA',
  textMuted: '71717A',
  textDim: '52525B',
  divider: '3F3F46',
  bad: 'F87171',
  ok: 'FBBF24',
  good: '34D399',
  blue: '638BFF',
  violet: 'C084FC',
}

// PowerPoint supports Inter if installed; fallback chain via fontFace
// Helvetica Neue (Mac) / Segoe UI (Windows) / Arial (universal)
const FONT = 'Helvetica Neue'

// Slide dimensions (16:9 widescreen, inches)
const SLIDE_W = 13.333
const SLIDE_H = 7.5

// Margins
const MARGIN_X = 1.0
const MARGIN_TOP = 0.7

// ============================================================================
// HELPERS
// ============================================================================

type Variant = 'G' | 'G2' | 'G3'

let bgCache: Partial<Record<Variant, string>> = {}

function loadBg(variant: Variant): string {
  if (bgCache[variant]) return bgCache[variant]!
  const filename = variant === 'G' ? 'bg-G.png' : variant === 'G2' ? 'bg-G2.png' : 'bg-G3.png'
  const filePath = path.join(process.cwd(), 'public', 'prospection-template', filename)
  const buffer = fs.readFileSync(filePath)
  const data = `image/png;base64,${buffer.toString('base64')}`
  bgCache[variant] = data
  return data
}

function scoreColor(score: number | null): string {
  if (score === null || score === undefined) return COLORS.textMuted
  if (score < 50) return COLORS.bad
  if (score < 90) return COLORS.ok
  return COLORS.good
}

function setBackground(slide: PptxGenJS.Slide, variant: Variant = 'G') {
  slide.background = { data: loadBg(variant) }
}

function addSectionLabel(slide: PptxGenJS.Slide, label: string) {
  slide.addText(label, {
    x: MARGIN_X,
    y: MARGIN_TOP,
    w: SLIDE_W - 2 * MARGIN_X,
    h: 0.3,
    fontFace: FONT,
    fontSize: 10,
    color: COLORS.textDim,
    bold: true,
    charSpacing: 4,
  })
}

// ============================================================================
// SLIDE BUILDERS
// ============================================================================

function buildSlideScores(pptx: PptxGenJS, report: AuditReport) {
  const slide = pptx.addSlide()
  setBackground(slide, 'G')

  // Section label
  addSectionLabel(slide, 'SECTION 02 / SCORES GLOBAUX')

  // Title with bold score
  const score = report.scores.mobilePerformance ?? 0
  slide.addText(
    [
      { text: 'Votre site obtient un score de ', options: { bold: false } },
      { text: `${score}/100`, options: { bold: true, color: COLORS.textPrimary } },
      { text: '.\nVoyons pourquoi.', options: { bold: false } },
    ],
    {
      x: MARGIN_X,
      y: MARGIN_TOP + 0.45,
      w: SLIDE_W - 2 * MARGIN_X - 2,
      h: 2.2,
      fontFace: FONT,
      fontSize: 36,
      color: COLORS.textPrimary,
      valign: 'top',
      lineSpacingMultiple: 1.05,
    },
  )

  // Gauges row — 4 columns
  const gaugeData = [
    { label: 'Performance', value: report.scores.mobilePerformance },
    { label: 'Accessibilité', value: report.scores.mobileAccessibility },
    { label: 'SEO', value: report.scores.mobileSEO },
    { label: 'Best Practices', value: report.scores.mobileBestPractices },
  ]

  const gaugesY = 4.7
  const gaugeW = 2.5
  const gaugeGap = 0.4
  const totalW = gaugeData.length * gaugeW + (gaugeData.length - 1) * gaugeGap
  const startX = (SLIDE_W - totalW) / 2

  gaugeData.forEach((g, i) => {
    const x = startX + i * (gaugeW + gaugeGap)

    // Big number
    slide.addText(g.value !== null ? `${g.value}` : '—', {
      x,
      y: gaugesY,
      w: gaugeW,
      h: 1.1,
      fontFace: FONT,
      fontSize: 64,
      color: scoreColor(g.value),
      bold: false,
      valign: 'top',
      align: 'left',
    })

    // Divider line
    slide.addShape(pptx.ShapeType.line, {
      x,
      y: gaugesY + 1.25,
      w: 0.35,
      h: 0,
      line: { color: COLORS.divider, width: 1.5 },
    })

    // Label
    slide.addText(g.label.toUpperCase(), {
      x,
      y: gaugesY + 1.35,
      w: gaugeW,
      h: 0.35,
      fontFace: FONT,
      fontSize: 10,
      color: COLORS.textMuted,
      bold: true,
      charSpacing: 2,
    })
  })
}

// ============================================================================
// MAIN ENTRY
// ============================================================================

export async function buildPresentation(report: AuditReport): Promise<Buffer> {
  const pptx = new PptxGenJS()

  // Widescreen 16:9
  pptx.layout = 'LAYOUT_WIDE' // 13.333 x 7.5 inches
  pptx.title = `Audit ${report.prospect.name}`
  pptx.author = 'JL Studio'
  pptx.company = 'JL Studio'

  // === SLIDES ===
  buildSlideScores(pptx, report)

  // Generate as Buffer (Node)
  const data = await pptx.write({ outputType: 'nodebuffer' })
  return data as Buffer
}
