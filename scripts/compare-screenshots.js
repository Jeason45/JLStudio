#!/usr/bin/env node
/**
 * Compare original site screenshots with configurator result
 *
 * Usage:
 *   node scripts/compare-screenshots.js <scan-dir>
 *
 * Example:
 *   node scripts/compare-screenshots.js scripts/scans/beardtemplate-webflow-io-home
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

async function main() {
  const scanDir = process.argv[2]
  if (!scanDir) {
    console.error('Usage: node scripts/compare-screenshots.js <scan-dir>')
    process.exit(1)
  }

  const absScanDir = path.resolve(scanDir)
  const screenshotsDir = path.join(absScanDir, 'screenshots')
  const comparisonDir = path.join(absScanDir, 'comparison')
  const resultScreenshot = path.join(comparisonDir, 'result-configurateur.png')
  const outputJsonPath = path.join(absScanDir, 'output.json')

  // Clean up any versioned diff-reports (diff-report-v2.md, diff-report-v3.md, etc.)
  if (fs.existsSync(comparisonDir)) {
    const staleReports = fs.readdirSync(comparisonDir).filter(f => /^diff-report-v\d+\.md$/.test(f))
    for (const f of staleReports) {
      fs.unlinkSync(path.join(comparisonDir, f))
      console.log(`Cleaned stale report: ${f}`)
    }
  }

  if (!fs.existsSync(resultScreenshot)) {
    // Try current-full-desktop.png as fallback
    const fallback = path.join(comparisonDir, 'current-full-desktop.png')
    if (fs.existsSync(fallback)) {
      console.log('Using current-full-desktop.png as result screenshot')
    } else {
      console.error(`Result screenshot not found: ${resultScreenshot}`)
      console.error('Run screenshot-site.js first.')
      process.exit(1)
    }
  }

  if (!fs.existsSync(screenshotsDir)) {
    console.error(`Screenshots directory not found: ${screenshotsDir}`)
    process.exit(1)
  }

  // Read output.json for section info
  const template = JSON.parse(fs.readFileSync(outputJsonPath, 'utf-8'))

  // List original screenshots
  const originals = fs.readdirSync(screenshotsDir)
    .filter(f => f.endsWith('.png'))
    .sort()

  console.log(`\nOriginal screenshots: ${originals.length}`)
  console.log(`Result screenshot: ${resultScreenshot}`)
  console.log(`Template sections: ${template.sections?.length || 0}`)

  // Get dimensions of result
  const resultDims = getDimensions(resultScreenshot)
  console.log(`Result dimensions: ${resultDims.width}x${resultDims.height}`)

  // Build section mapping
  const sections = template.sections || []
  const report = {
    siteName: template.site?.name || 'Unknown',
    originalScreenshots: originals.length,
    templateSections: sections.length,
    resultDimensions: resultDims,
    sections: [],
  }

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i]
    const origFile = originals.find(f => f.includes(`section-${String(i + 1).padStart(2, '0')}`))

    const sectionReport = {
      index: i + 1,
      type: section.type,
      variant: section.variant,
      originalScreenshot: origFile || 'N/A',
      content: {},
    }

    // Summarize content
    if (section.content) {
      if (section.content.title) sectionReport.content.title = section.content.title.substring(0, 60)
      if (section.content.subtitle) sectionReport.content.subtitle = section.content.subtitle.substring(0, 60)
      if (section.content.items) sectionReport.content.itemCount = section.content.items.length
      if (section.content.links) sectionReport.content.linkCount = section.content.links.length
      if (section.content.columns) sectionReport.content.columnCount = section.content.columns.length
    }

    // Style info
    sectionReport.style = {
      background: section.style?.background || 'N/A',
      paddingY: section.style?.paddingY || 'N/A',
    }

    report.sections.push(sectionReport)
  }

  // Write report JSON
  const reportPath = path.join(comparisonDir, 'comparison-data.json')
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
  console.log(`\nComparison data saved: ${reportPath}`)

  // Generate markdown report
  generateMarkdownReport(report, comparisonDir, originals, screenshotsDir)
}

function getDimensions(filePath) {
  try {
    const output = execSync(`sips -g pixelWidth -g pixelHeight "${filePath}" 2>/dev/null`).toString()
    const width = parseInt(output.match(/pixelWidth:\s*(\d+)/)?.[1] || '0')
    const height = parseInt(output.match(/pixelHeight:\s*(\d+)/)?.[1] || '0')
    return { width, height }
  } catch {
    return { width: 0, height: 0 }
  }
}

function generateMarkdownReport(report, comparisonDir, originals, screenshotsDir) {
  let md = `# Diff Report — ${report.siteName}\n\n`
  md += `**Date** : ${new Date().toISOString().split('T')[0]}\n\n`
  md += `## Résumé\n\n`
  md += `| Métrique | Valeur |\n`
  md += `|----------|--------|\n`
  md += `| Screenshots originaux | ${report.originalScreenshots} |\n`
  md += `| Sections template | ${report.templateSections} |\n`
  md += `| Dimensions résultat | ${report.resultDimensions.width}x${report.resultDimensions.height} |\n\n`

  md += `## Comparaison section par section\n\n`

  for (const section of report.sections) {
    md += `### Section ${section.index} — \`${section.type}\` (${section.variant})\n\n`

    if (section.originalScreenshot !== 'N/A') {
      const origDims = getDimensions(`${screenshotsDir}/${section.originalScreenshot}`)
      md += `- **Screenshot original** : \`${section.originalScreenshot}\` (${origDims.width}x${origDims.height})\n`
    } else {
      md += `- **Screenshot original** : aucun correspondant trouvé\n`
    }

    md += `- **Background** : ${section.style.background}\n`
    md += `- **PaddingY** : ${section.style.paddingY}\n`

    if (section.content.title) md += `- **Titre** : "${section.content.title}"\n`
    if (section.content.subtitle) md += `- **Sous-titre** : "${section.content.subtitle}"\n`
    if (section.content.itemCount) md += `- **Items** : ${section.content.itemCount}\n`
    if (section.content.linkCount) md += `- **Links** : ${section.content.linkCount}\n`
    if (section.content.columnCount) md += `- **Columns** : ${section.content.columnCount}\n`

    md += `\n`
  }

  md += `## Points d'attention\n\n`
  md += `- Vérifier visuellement que chaque section du configurateur correspond à son screenshot original\n`
  md += `- Comparer les couleurs (brand: primary, background, foreground)\n`
  md += `- Comparer la typographie (heading: Barlow, body: Generalsans)\n`
  md += `- Vérifier l'ordre des sections\n`
  md += `- Vérifier que les images placeholder sont bien positionnées\n\n`
  md += `## Fichiers\n\n`
  md += `- Template : \`output.json\`\n`
  md += `- Screenshot résultat : \`comparison/result-configurateur.png\`\n`
  md += `- Screenshots originaux : \`screenshots/\`\n`

  const mdPath = path.join(comparisonDir, 'diff-report.md')
  fs.writeFileSync(mdPath, md)
  console.log(`Diff report saved: ${mdPath}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
