#!/usr/bin/env node
/**
 * Clean up comparison/ directory — remove all non-standard files
 *
 * Keeps only:
 *   current-full-desktop.png
 *   current-full-mobile.png
 *   current-section-XX.png
 *   current-footer.png
 *   diff-report.md
 *   comparison-data.json
 *
 * Removes everything else (old result-*.png, v4-*.png, v5-*.png,
 * diff-report-v2.md, diff-report-v3.md, audit-*.png, etc.)
 *
 * Usage:
 *   node scripts/cleanup-comparison.js <scan-dir>
 *
 * Example:
 *   node scripts/cleanup-comparison.js scripts/scans/beardtemplate-webflow-io-home
 */

const fs = require('fs')
const path = require('path')

const ALLOWED_PATTERNS = [
  /^current-full-desktop\.png$/,
  /^current-full-mobile\.png$/,
  /^current-section-\d{2}\.png$/,
  /^current-footer\.png$/,
  /^diff-report\.md$/,
  /^comparison-data\.json$/,
]

function isAllowed(filename) {
  return ALLOWED_PATTERNS.some(pattern => pattern.test(filename))
}

async function main() {
  const scanDir = process.argv[2]
  if (!scanDir) {
    console.error('Usage: node scripts/cleanup-comparison.js <scan-dir>')
    process.exit(1)
  }

  const comparisonDir = path.join(path.resolve(scanDir), 'comparison')

  if (!fs.existsSync(comparisonDir)) {
    console.log(`No comparison/ directory found in ${scanDir}`)
    process.exit(0)
  }

  const files = fs.readdirSync(comparisonDir)
  let removed = 0
  let kept = 0

  for (const file of files) {
    if (file === '.DS_Store') {
      fs.unlinkSync(path.join(comparisonDir, file))
      removed++
      continue
    }

    if (isAllowed(file)) {
      console.log(`  KEEP  ${file}`)
      kept++
    } else {
      fs.unlinkSync(path.join(comparisonDir, file))
      console.log(`  DEL   ${file}`)
      removed++
    }
  }

  console.log(`\nDone: ${kept} kept, ${removed} removed`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
