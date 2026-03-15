#!/usr/bin/env node
/**
 * Visual comparison engine — pixel diff + scoring + issue classification
 *
 * Compares original site screenshots with configurator screenshots,
 * generates diff images, similarity scores, and a structured report
 * that guides the auto-improvement loop.
 *
 * Usage:
 *   # Compare only (screenshots must already exist):
 *   node scripts/compare-visual.js <scan-dir>
 *
 *   # Full pipeline: import → screenshot → compare:
 *   node scripts/compare-visual.js <scan-dir> --site-id <id>
 *
 *   # Re-screenshot + compare (skip import):
 *   node scripts/compare-visual.js <scan-dir> --site-id <id> --skip-import
 *
 * Output:
 *   comparison/diff-section-XX.png     — visual diff overlay per section
 *   comparison/visual-report.json      — structured data with scores & issues
 *   comparison/visual-report.md        — human-readable report for the AI loop
 *
 * Dependencies: pixelmatch, pngjs (install at root: pnpm add -w pixelmatch pngjs)
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { PNG } = require('pngjs')
const pixelmatchModule = require('pixelmatch')
const pixelmatch = pixelmatchModule.default || pixelmatchModule

const BUILDER_URL = process.env.BUILDER_URL || 'http://localhost:3001'

// ═══════════════════════════════════════════════════════════════
// PNG UTILITIES
// ═══════════════════════════════════════════════════════════════

function readPNG(filePath) {
  const data = fs.readFileSync(filePath)
  return PNG.sync.read(data)
}

function writePNG(filePath, png) {
  const buffer = PNG.sync.write(png)
  fs.writeFileSync(filePath, buffer)
}

/**
 * Resize a PNG to target dimensions by creating a new canvas.
 * Smaller image is centered on a white background.
 */
function resizeToMatch(png, targetWidth, targetHeight) {
  if (png.width === targetWidth && png.height === targetHeight) return png

  const result = new PNG({ width: targetWidth, height: targetHeight })
  // Fill with white background
  for (let i = 0; i < result.data.length; i += 4) {
    result.data[i] = 255     // R
    result.data[i + 1] = 255 // G
    result.data[i + 2] = 255 // B
    result.data[i + 3] = 255 // A
  }

  // Copy source pixels into result (top-left aligned)
  const copyW = Math.min(png.width, targetWidth)
  const copyH = Math.min(png.height, targetHeight)
  for (let y = 0; y < copyH; y++) {
    for (let x = 0; x < copyW; x++) {
      const srcIdx = (y * png.width + x) * 4
      const dstIdx = (y * targetWidth + x) * 4
      result.data[dstIdx] = png.data[srcIdx]
      result.data[dstIdx + 1] = png.data[srcIdx + 1]
      result.data[dstIdx + 2] = png.data[srcIdx + 2]
      result.data[dstIdx + 3] = png.data[srcIdx + 3]
    }
  }

  return result
}

// ═══════════════════════════════════════════════════════════════
// COLOR ANALYSIS
// ═══════════════════════════════════════════════════════════════

/**
 * Extract dominant colors from a PNG by sampling and bucketing.
 * Returns top N colors as hex strings with their percentage.
 */
function extractDominantColors(png, topN = 5) {
  const buckets = new Map()
  const step = Math.max(1, Math.floor(png.width * png.height / 10000)) // Sample ~10k pixels
  const total = Math.ceil((png.width * png.height) / step)

  for (let i = 0; i < png.data.length; i += step * 4) {
    if (i + 3 >= png.data.length) break
    // Quantize to reduce noise (round to nearest 16)
    const r = Math.round(png.data[i] / 16) * 16
    const g = Math.round(png.data[i + 1] / 16) * 16
    const b = Math.round(png.data[i + 2] / 16) * 16
    const key = `${r},${g},${b}`
    buckets.set(key, (buckets.get(key) || 0) + 1)
  }

  const sorted = [...buckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)

  return sorted.map(([key, count]) => {
    const [r, g, b] = key.split(',').map(Number)
    const hex = '#' + [r, g, b].map(c => Math.min(255, c).toString(16).padStart(2, '0')).join('')
    return { color: hex, percentage: Math.round((count / total) * 100) }
  })
}

/**
 * Get the average color of a horizontal strip of the image.
 * Useful for detecting background color.
 */
function getStripAvgColor(png, yStart, yEnd) {
  let r = 0, g = 0, b = 0, count = 0
  const yS = Math.max(0, yStart)
  const yE = Math.min(png.height, yEnd)

  for (let y = yS; y < yE; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (y * png.width + x) * 4
      r += png.data[idx]
      g += png.data[idx + 1]
      b += png.data[idx + 2]
      count++
    }
  }

  if (count === 0) return '#000000'
  const hex = '#' + [r, g, b].map(c =>
    Math.round(c / count).toString(16).padStart(2, '0')
  ).join('')
  return hex
}

/**
 * Calculate color distance (simple Euclidean in RGB space)
 */
function colorDistance(hex1, hex2) {
  const parse = h => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ]
  const [r1, g1, b1] = parse(hex1)
  const [r2, g2, b2] = parse(hex2)
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2)
}

// ═══════════════════════════════════════════════════════════════
// DIFF ANALYSIS & ISSUE CLASSIFICATION
// ═══════════════════════════════════════════════════════════════

/**
 * Analyze the diff image to classify WHERE the differences are.
 * Splits the image into zones and measures diff density per zone.
 */
function analyzeZones(diffPng, origPng, currPng) {
  const w = diffPng.width
  const h = diffPng.height
  const zones = [
    { name: 'top', yStart: 0, yEnd: Math.floor(h * 0.2) },
    { name: 'middle', yStart: Math.floor(h * 0.2), yEnd: Math.floor(h * 0.8) },
    { name: 'bottom', yStart: Math.floor(h * 0.8), yEnd: h },
    { name: 'left', xStart: 0, xEnd: Math.floor(w * 0.3), yStart: 0, yEnd: h },
    { name: 'right', xStart: Math.floor(w * 0.7), xEnd: w, yStart: 0, yEnd: h },
  ]

  const results = []
  for (const zone of zones) {
    const xS = zone.xStart || 0
    const xE = zone.xEnd || w
    const yS = zone.yStart
    const yE = zone.yEnd
    let diffPixels = 0
    let totalPixels = 0

    for (let y = yS; y < yE; y++) {
      for (let x = xS; x < xE; x++) {
        const idx = (y * w + x) * 4
        totalPixels++
        // Diff image: red channel > 0 means difference
        if (diffPng.data[idx] > 0 || diffPng.data[idx + 1] > 0) {
          diffPixels++
        }
      }
    }

    const density = totalPixels > 0 ? diffPixels / totalPixels : 0
    results.push({ zone: zone.name, diffDensity: Math.round(density * 100 * 10) / 10 })
  }

  return results
}

/**
 * Classify issues based on pixel diff analysis and color comparison.
 */
function classifyIssues(similarity, origPng, currPng, zones, origColors, currColors, sectionType) {
  const issues = []

  // 1. Background color mismatch
  const origBg = getStripAvgColor(origPng, 0, Math.min(20, origPng.height))
  const currBg = getStripAvgColor(currPng, 0, Math.min(20, currPng.height))
  const bgDist = colorDistance(origBg, currBg)
  if (bgDist > 40) {
    issues.push({
      type: 'background_color',
      severity: bgDist > 100 ? 'high' : 'medium',
      expected: origBg,
      actual: currBg,
      fix: `style.background: 'custom', style.customBgColor: '${origBg}'`,
    })
  }

  // 2. Height mismatch (padding/content issue)
  const heightRatio = currPng.height / origPng.height
  if (heightRatio < 0.7 || heightRatio > 1.5) {
    issues.push({
      type: 'height_mismatch',
      severity: 'medium',
      expected: origPng.height,
      actual: currPng.height,
      ratio: Math.round(heightRatio * 100) / 100,
      fix: heightRatio < 0.7 ? 'Missing content or insufficient padding' : 'Extra content or too much padding',
    })
  }

  // 3. Width mismatch (ignore viewport differences — original is always 1440px,
  //    configurator canvas may be smaller due to editor sidebar)
  const widthDiff = Math.abs(origPng.width - currPng.width)
  if (widthDiff > 50 && origPng.width !== 1440) {
    issues.push({
      type: 'width_mismatch',
      severity: 'low',
      expected: origPng.width,
      actual: currPng.width,
    })
  }

  // 4. Zone-based issues
  const topZone = zones.find(z => z.zone === 'top')
  const middleZone = zones.find(z => z.zone === 'middle')
  const bottomZone = zones.find(z => z.zone === 'bottom')

  if (topZone && topZone.diffDensity > 50 && middleZone && middleZone.diffDensity < 20) {
    issues.push({
      type: 'header_area_mismatch',
      severity: 'medium',
      detail: 'Top 20% differs significantly — check eyebrow/title/badge',
      diffDensity: topZone.diffDensity,
    })
  }

  if (bottomZone && bottomZone.diffDensity > 50 && middleZone && middleZone.diffDensity < 20) {
    issues.push({
      type: 'footer_area_mismatch',
      severity: 'medium',
      detail: 'Bottom 20% differs — check buttons/CTA/footer content',
      diffDensity: bottomZone.diffDensity,
    })
  }

  // 5. Missing image detection (large uniform area in current but detailed in original)
  if (middleZone && middleZone.diffDensity > 60) {
    const leftZone = zones.find(z => z.zone === 'left')
    const rightZone = zones.find(z => z.zone === 'right')
    if (leftZone && rightZone && Math.abs(leftZone.diffDensity - rightZone.diffDensity) > 30) {
      const side = leftZone.diffDensity > rightZone.diffDensity ? 'left' : 'right'
      issues.push({
        type: 'missing_image',
        severity: 'high',
        zone: side,
        detail: `Large diff on ${side} side — likely missing or placeholder image`,
      })
    }
  }

  // 6. Dominant color shift
  if (origColors.length > 0 && currColors.length > 0) {
    const origPrimary = origColors[0].color
    const currPrimary = currColors[0].color
    const primaryDist = colorDistance(origPrimary, currPrimary)
    if (primaryDist > 60) {
      issues.push({
        type: 'dominant_color_shift',
        severity: 'medium',
        expected: origPrimary,
        actual: currPrimary,
        detail: 'Primary color significantly different',
      })
    }
  }

  // 7. Overall similarity-based severity
  if (similarity < 50) {
    issues.push({
      type: 'structural_mismatch',
      severity: 'critical',
      similarity,
      detail: 'Section looks completely different — check type/variant',
    })
  } else if (similarity < 70) {
    issues.push({
      type: 'layout_mismatch',
      severity: 'high',
      similarity,
      detail: 'Major layout differences — check variant and content structure',
    })
  }

  return issues
}

// ═══════════════════════════════════════════════════════════════
// SECTION MATCHING
// ═══════════════════════════════════════════════════════════════

/**
 * Match original screenshots to current screenshots by index.
 * Original: section-01-hero.png, section-02-features.png, ...
 * Current: current-section-00.png (header), current-section-01.png, ...
 */
function matchScreenshots(screenshotsDir, comparisonDir) {
  const originals = fs.readdirSync(screenshotsDir)
    .filter(f => f.match(/^section-\d+-/))
    .sort()

  const currents = fs.readdirSync(comparisonDir)
    .filter(f => f.match(/^current-section-\d+\.png$/))
    .sort()

  // Also check for current-footer.png
  const hasFooter = fs.existsSync(path.join(comparisonDir, 'current-footer.png'))

  const pairs = []

  for (let i = 0; i < originals.length; i++) {
    const origFile = originals[i]
    // Extract index from original: section-01-hero.png → 01
    const origIdx = parseInt(origFile.match(/section-(\d+)/)?.[1] || '0')

    // Map: original section-01 → current section-00 (header) or section-01
    // Original screenshots start at 01 and include the header as section-01
    // Current screenshots: section-00 = header, section-01 = first <section> tag
    // The mapping depends on whether the original's first screenshot is the header
    const isOrigHeader = origFile.includes('header') || origFile.includes('navbar') || origFile.includes('nav')
    const isOrigFooter = origFile.includes('footer')

    let currFile = null

    if (isOrigFooter && hasFooter) {
      currFile = 'current-footer.png'
    } else {
      // Try direct index mapping: original section-XX → current section-(XX-1)
      // because originals are 1-indexed and currents are 0-indexed
      const currIdx = String(origIdx - 1).padStart(2, '0')
      const candidate = `current-section-${currIdx}.png`
      if (currents.includes(candidate)) {
        currFile = candidate
      }
    }

    pairs.push({
      index: origIdx,
      originalFile: origFile,
      currentFile: currFile,
      originalPath: path.join(screenshotsDir, origFile),
      currentPath: currFile ? path.join(comparisonDir, currFile) : null,
    })
  }

  return pairs
}

// ═══════════════════════════════════════════════════════════════
// MAIN COMPARISON ENGINE
// ═══════════════════════════════════════════════════════════════

async function runPipeline(scanDir, siteId, skipImport) {
  const absScanDir = path.resolve(scanDir)
  const comparisonDir = path.join(absScanDir, 'comparison')
  const screenshotsDir = path.join(absScanDir, 'screenshots')
  const outputJsonPath = path.join(absScanDir, 'output.json')

  if (!fs.existsSync(outputJsonPath)) {
    console.error(`output.json not found in ${absScanDir}`)
    process.exit(1)
  }

  if (!fs.existsSync(screenshotsDir)) {
    console.error(`screenshots/ directory not found in ${absScanDir}`)
    process.exit(1)
  }

  fs.mkdirSync(comparisonDir, { recursive: true })

  // Step 1: Import template (if site-id provided and not skipping)
  if (siteId && !skipImport) {
    console.log('\n═══ STEP 1: Importing template ═══')
    try {
      execSync(
        `node scripts/import-template.js "${outputJsonPath}" --site-id ${siteId}`,
        { stdio: 'inherit', cwd: path.resolve(__dirname, '..') }
      )
    } catch (e) {
      console.error('Import failed:', e.message)
      process.exit(1)
    }
    // Wait for builder to process
    console.log('Waiting 2s for builder to update...')
    await new Promise(r => setTimeout(r, 2000))
  }

  // Step 2: Screenshot the configurator result
  if (siteId) {
    console.log('\n═══ STEP 2: Screenshotting configurator ═══')
    try {
      execSync(
        `node scripts/screenshot-site.js ${siteId} "${comparisonDir}"`,
        { stdio: 'inherit', cwd: path.resolve(__dirname, '..') }
      )
    } catch (e) {
      console.error('Screenshot failed:', e.message)
      process.exit(1)
    }
  }

  // Step 3: Visual comparison
  console.log('\n═══ STEP 3: Visual comparison ═══')

  const template = JSON.parse(fs.readFileSync(outputJsonPath, 'utf-8'))
  const pairs = matchScreenshots(screenshotsDir, comparisonDir)

  console.log(`Matched ${pairs.filter(p => p.currentFile).length}/${pairs.length} section pairs`)

  const sectionResults = []
  let totalSimilarity = 0
  let comparedCount = 0

  for (const pair of pairs) {
    if (!pair.currentPath || !fs.existsSync(pair.currentPath)) {
      console.log(`  ⚠ Section ${pair.index}: no matching configurator screenshot`)
      sectionResults.push({
        index: pair.index,
        originalFile: pair.originalFile,
        currentFile: null,
        similarity: 0,
        issues: [{ type: 'missing_screenshot', severity: 'critical', detail: 'No configurator screenshot found' }],
      })
      continue
    }

    // Read PNGs
    let origPng, currPng
    try {
      origPng = readPNG(pair.originalPath)
      currPng = readPNG(pair.currentPath)
    } catch (e) {
      console.log(`  ✗ Section ${pair.index}: failed to read PNG — ${e.message}`)
      sectionResults.push({
        index: pair.index,
        originalFile: pair.originalFile,
        currentFile: pair.currentFile,
        similarity: 0,
        issues: [{ type: 'read_error', severity: 'critical', detail: e.message }],
      })
      continue
    }

    // Store original dimensions before resize
    const origDims = { width: origPng.width, height: origPng.height }
    const currDims = { width: currPng.width, height: currPng.height }

    // Resize to same dimensions for pixel comparison
    const maxW = Math.max(origPng.width, currPng.width)
    const maxH = Math.max(origPng.height, currPng.height)
    const origResized = resizeToMatch(origPng, maxW, maxH)
    const currResized = resizeToMatch(currPng, maxW, maxH)

    // Run pixelmatch
    const diffPng = new PNG({ width: maxW, height: maxH })
    const mismatchCount = pixelmatch(
      origResized.data,
      currResized.data,
      diffPng.data,
      maxW,
      maxH,
      { threshold: 0.15, alpha: 0.3, includeAA: false }
    )

    const totalPixels = maxW * maxH
    const similarity = Math.round((1 - mismatchCount / totalPixels) * 1000) / 10

    // Save diff image
    const diffPath = path.join(comparisonDir, `diff-section-${String(pair.index).padStart(2, '0')}.png`)
    writePNG(diffPath, diffPng)

    // Analyze zones
    const zones = analyzeZones(diffPng, origResized, currResized)

    // Extract colors
    const origColors = extractDominantColors(origPng)
    const currColors = extractDominantColors(currPng)

    // Find section info from template
    const templateSection = template.sections?.[pair.index - 1]
    const sectionType = templateSection?.type || 'unknown'
    const sectionVariant = templateSection?.variant || 'unknown'

    // Classify issues
    const issues = classifyIssues(similarity, origPng, currPng, zones, origColors, currColors, sectionType)

    // Determine priority level
    let priority = '🟢'
    if (issues.some(i => i.severity === 'critical')) priority = '🔴'
    else if (issues.some(i => i.severity === 'high')) priority = '🔴'
    else if (issues.some(i => i.severity === 'medium')) priority = '🟡'

    const icon = similarity >= 90 ? '✓' : similarity >= 70 ? '◐' : '✗'
    console.log(`  ${icon} Section ${pair.index} (${sectionType}): ${similarity}% ${priority}`)

    sectionResults.push({
      index: pair.index,
      type: sectionType,
      variant: sectionVariant,
      originalFile: pair.originalFile,
      currentFile: pair.currentFile,
      diffFile: `diff-section-${String(pair.index).padStart(2, '0')}.png`,
      originalDimensions: origDims,
      currentDimensions: currDims,
      similarity,
      priority,
      zones,
      originalColors: origColors.slice(0, 3),
      currentColors: currColors.slice(0, 3),
      issues,
    })

    totalSimilarity += similarity
    comparedCount++
  }

  const globalScore = comparedCount > 0
    ? Math.round((totalSimilarity / comparedCount) * 10) / 10
    : 0

  // Build report
  const report = {
    timestamp: new Date().toISOString(),
    scanDir: absScanDir,
    siteName: template.site?.name || 'Unknown',
    siteId: siteId || null,
    globalScore,
    sectionsCompared: comparedCount,
    sectionsTotal: pairs.length,
    criticalIssues: sectionResults.filter(s => s.issues?.some(i => i.severity === 'critical')).length,
    highIssues: sectionResults.filter(s => s.issues?.some(i => i.severity === 'high')).length,
    mediumIssues: sectionResults.filter(s => s.issues?.some(i => i.severity === 'medium')).length,
    sections: sectionResults,
  }

  // Write JSON report
  const jsonReportPath = path.join(comparisonDir, 'visual-report.json')
  fs.writeFileSync(jsonReportPath, JSON.stringify(report, null, 2))

  // Write Markdown report
  const mdReportPath = path.join(comparisonDir, 'visual-report.md')
  fs.writeFileSync(mdReportPath, generateMarkdown(report))

  // Print summary
  console.log('\n' + '═'.repeat(50))
  console.log(`SCORE GLOBAL : ${globalScore}%`)
  console.log('═'.repeat(50))
  console.log(`Sections comparées : ${comparedCount}/${pairs.length}`)
  const sectionsWithCritical = report.sections.filter(s => s.priority === '🔴').length
  const sectionsWithMedium = report.sections.filter(s => s.priority === '🟡').length
  const sectionsOK = report.sections.filter(s => s.priority === '🟢').length
  console.log(`🔴 Critiques/Hauts  : ${sectionsWithCritical}`)
  console.log(`🟡 Moyens           : ${sectionsWithMedium}`)
  console.log(`🟢 OK               : ${sectionsOK}`)
  console.log('═'.repeat(50))
  console.log(`Rapport JSON : ${jsonReportPath}`)
  console.log(`Rapport MD   : ${mdReportPath}`)
  console.log(`Diff images  : ${comparisonDir}/diff-section-*.png`)

  if (globalScore >= 95) {
    console.log('\n🎯 Score ≥ 95% — fidélité visuelle atteinte !')
  } else {
    console.log(`\n→ Lire visual-report.md pour les corrections à appliquer`)
  }

  return report
}

// ═══════════════════════════════════════════════════════════════
// MARKDOWN REPORT GENERATOR
// ═══════════════════════════════════════════════════════════════

function generateMarkdown(report) {
  let md = `# Visual Comparison Report — ${report.siteName}\n\n`
  md += `**Date** : ${report.timestamp.split('T')[0]}  \n`
  md += `**Score global** : **${report.globalScore}%**  \n`
  if (report.siteId) md += `**Site ID** : ${report.siteId}  \n`
  md += `**Sections comparées** : ${report.sectionsCompared}/${report.sectionsTotal}\n\n`

  // Score bar
  md += `## Score par section\n\n`
  md += `| # | Type | Variant | Score | Priorité | Issues |\n`
  md += `|---|------|---------|-------|----------|--------|\n`
  for (const s of report.sections) {
    const score = s.similarity !== undefined ? `${s.similarity}%` : 'N/A'
    const issueCount = s.issues?.length || 0
    const topIssue = s.issues?.[0]?.type || '-'
    md += `| ${s.index} | ${s.type || '-'} | ${s.variant || '-'} | ${score} | ${s.priority || '-'} | ${issueCount} (${topIssue}) |\n`
  }

  // Corrections needed (sorted by priority)
  const toFix = report.sections
    .filter(s => s.issues && s.issues.length > 0)
    .sort((a, b) => {
      const order = { '🔴': 0, '🟡': 1, '🟢': 2 }
      return (order[a.priority] ?? 3) - (order[b.priority] ?? 3)
    })

  if (toFix.length > 0) {
    md += `\n## Corrections à appliquer\n\n`
    md += `Traiter dans cet ordre (🔴 d'abord, puis 🟡, puis 🟢) :\n\n`

    for (const s of toFix) {
      md += `### ${s.priority} Section ${s.index} — \`${s.type}\` (${s.variant}) — ${s.similarity}%\n\n`

      // Dimensions
      if (s.originalDimensions && s.currentDimensions) {
        md += `- **Dimensions** : original ${s.originalDimensions.width}×${s.originalDimensions.height}`
        md += ` → configurateur ${s.currentDimensions.width}×${s.currentDimensions.height}\n`
      }

      // Colors
      if (s.originalColors && s.currentColors) {
        const origC = s.originalColors.map(c => `${c.color} (${c.percentage}%)`).join(', ')
        const currC = s.currentColors.map(c => `${c.color} (${c.percentage}%)`).join(', ')
        md += `- **Couleurs originales** : ${origC}\n`
        md += `- **Couleurs actuelles** : ${currC}\n`
      }

      // Zones with high diff
      if (s.zones) {
        const hotZones = s.zones.filter(z => z.diffDensity > 20)
        if (hotZones.length > 0) {
          md += `- **Zones problématiques** : ${hotZones.map(z => `${z.zone} (${z.diffDensity}%)`).join(', ')}\n`
        }
      }

      // Issues
      md += `- **Issues** :\n`
      for (const issue of s.issues) {
        md += `  - \`${issue.type}\``
        if (issue.expected && issue.actual) md += ` : attendu ${issue.expected}, obtenu ${issue.actual}`
        if (issue.fix) md += ` → **Fix** : ${issue.fix}`
        if (issue.detail) md += ` — ${issue.detail}`
        md += `\n`
      }

      // Diff image reference
      if (s.diffFile) {
        md += `- **Diff image** : \`${s.diffFile}\`\n`
      }

      md += `\n`
    }
  }

  // Summary
  md += `## Résumé pour la boucle d'amélioration\n\n`
  if (report.globalScore >= 95) {
    md += `✅ Score ≥ 95% — fidélité visuelle atteinte. Pas de corrections nécessaires.\n`
  } else if (report.globalScore >= 80) {
    md += `🟡 Score ${report.globalScore}% — corrections mineures à apporter.\n`
    md += `Focaliser sur les sections 🔴 et 🟡 en priorité.\n`
  } else {
    md += `🔴 Score ${report.globalScore}% — corrections majeures nécessaires.\n`
    md += `Vérifier les types/variants des sections 🔴 en priorité avant de toucher aux détails.\n`
  }

  md += `\n---\n`
  md += `*Généré par compare-visual.js — pixelmatch threshold: 0.15*\n`

  return md
}

// ═══════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════

async function main() {
  const args = process.argv.slice(2)
  const scanDir = args.find(a => !a.startsWith('--'))

  if (!scanDir) {
    console.error('Usage: node scripts/compare-visual.js <scan-dir> [--site-id <id>] [--skip-import]')
    console.error('')
    console.error('Examples:')
    console.error('  node scripts/compare-visual.js scripts/scans/my-site')
    console.error('  node scripts/compare-visual.js scripts/scans/my-site --site-id abc123')
    console.error('  node scripts/compare-visual.js scripts/scans/my-site --site-id abc123 --skip-import')
    process.exit(1)
  }

  let siteId = null
  const siteIdIdx = args.indexOf('--site-id')
  if (siteIdIdx !== -1 && args[siteIdIdx + 1]) {
    siteId = args[siteIdIdx + 1]
  }

  const skipImport = args.includes('--skip-import')

  await runPipeline(scanDir, siteId, skipImport)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
