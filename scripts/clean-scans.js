/**
 * clean-scans.js — Remove re-generable scan artifacts, keep essential data
 *
 * Kept:   raw-data.json, visual-report.json, scan-report.md, output.json, .enrichment-log.json
 * Deleted: screenshots/, frames/, comparison/diff-*.png, video-*.webm
 *
 * Usage:
 *   node scripts/clean-scans.js                    # clean all scan dirs
 *   node scripts/clean-scans.js <scanDir>           # clean one specific dir
 *   node scripts/clean-scans.js --older-than 7      # clean dirs older than 7 days
 */

const fs = require('fs')
const path = require('path')

const SCANS_ROOT = path.resolve(__dirname, 'scans')

// Directories to delete entirely
const DIRS_TO_DELETE = ['screenshots', 'frames']

// File patterns to delete (in scan root and comparison/)
const FILES_TO_DELETE = [
  /^video-.*\.webm$/,
]

const COMPARISON_FILES_TO_DELETE = [
  /^diff-.*\.png$/,
]

function deleteDirRecursive(dirPath) {
  if (!fs.existsSync(dirPath)) return 0
  let size = 0
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name)
    if (entry.isDirectory()) {
      size += deleteDirRecursive(fullPath)
    } else {
      size += fs.statSync(fullPath).size
      fs.unlinkSync(fullPath)
    }
  }
  fs.rmdirSync(dirPath)
  return size
}

function cleanScanDir(scanDir) {
  let totalBytes = 0
  let deleted = 0

  // Delete whole directories (screenshots/, frames/)
  for (const dir of DIRS_TO_DELETE) {
    const dirPath = path.join(scanDir, dir)
    if (fs.existsSync(dirPath)) {
      totalBytes += deleteDirRecursive(dirPath)
      deleted++
    }
  }

  // Delete video files in scan root
  if (fs.existsSync(scanDir)) {
    for (const file of fs.readdirSync(scanDir)) {
      if (FILES_TO_DELETE.some(rx => rx.test(file))) {
        const filePath = path.join(scanDir, file)
        if (fs.statSync(filePath).isFile()) {
          totalBytes += fs.statSync(filePath).size
          fs.unlinkSync(filePath)
          deleted++
        }
      }
    }
  }

  // Delete diff PNGs in comparison/ (keep visual-report.json)
  const compDir = path.join(scanDir, 'comparison')
  if (fs.existsSync(compDir)) {
    for (const file of fs.readdirSync(compDir)) {
      if (COMPARISON_FILES_TO_DELETE.some(rx => rx.test(file))) {
        const filePath = path.join(compDir, file)
        if (fs.statSync(filePath).isFile()) {
          totalBytes += fs.statSync(filePath).size
          fs.unlinkSync(filePath)
          deleted++
        }
      }
    }
  }

  return {
    deleted,
    freedMB: (totalBytes / 1024 / 1024).toFixed(1),
    freedBytes: totalBytes,
  }
}

function cleanAllScans({ olderThanDays } = {}) {
  if (!fs.existsSync(SCANS_ROOT)) return { total: 0, freed: 0 }

  const dirs = fs.readdirSync(SCANS_ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => path.join(SCANS_ROOT, d.name))

  let totalDeleted = 0
  let totalBytes = 0

  for (const dir of dirs) {
    // Skip if --older-than and dir is too recent
    if (olderThanDays) {
      const stat = fs.statSync(dir)
      const ageMs = Date.now() - stat.mtimeMs
      const ageDays = ageMs / (1000 * 60 * 60 * 24)
      if (ageDays < olderThanDays) continue
    }

    const result = cleanScanDir(dir)
    if (result.deleted > 0) {
      console.log(`  ${path.basename(dir)}: ${result.deleted} artifacts (${result.freedMB} MB)`)
    }
    totalDeleted += result.deleted
    totalBytes += result.freedBytes
  }

  return {
    total: totalDeleted,
    freedMB: (totalBytes / 1024 / 1024).toFixed(1),
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2)

  if (args.length === 1 && fs.existsSync(args[0])) {
    // Clean specific dir
    console.log(`Cleaning: ${args[0]}`)
    const result = cleanScanDir(args[0])
    console.log(`Done: ${result.deleted} artifacts deleted (${result.freedMB} MB freed)`)
  } else {
    // Clean all
    const olderIdx = args.indexOf('--older-than')
    const olderThanDays = olderIdx !== -1 ? parseInt(args[olderIdx + 1]) : undefined

    console.log(`Cleaning all scans in ${SCANS_ROOT}${olderThanDays ? ` (older than ${olderThanDays} days)` : ''}`)
    const result = cleanAllScans({ olderThanDays })
    console.log(`\nTotal: ${result.total} artifacts deleted (${result.freedMB} MB freed)`)
  }
}

module.exports = { cleanScanDir, cleanAllScans }
