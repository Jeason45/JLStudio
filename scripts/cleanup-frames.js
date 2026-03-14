#!/usr/bin/env node
/**
 * Clean up frames/ directory after analysis
 *
 * Usage:
 *   node scripts/cleanup-frames.js <scan-dir>
 *
 * Example:
 *   node scripts/cleanup-frames.js scripts/scans/beardtemplate-webflow-io-home
 */

const fs = require('fs')
const path = require('path')

function getFileSizeBytes(filePath) {
  try {
    return fs.statSync(filePath).size
  } catch {
    return 0
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`
}

function cleanDir(dirPath) {
  if (!fs.existsSync(dirPath)) return { removed: 0, bytes: 0 }

  const files = fs.readdirSync(dirPath)
  let removed = 0
  let bytes = 0

  for (const file of files) {
    const filePath = path.join(dirPath, file)
    const stat = fs.statSync(filePath)
    if (stat.isFile()) {
      bytes += stat.size
      fs.unlinkSync(filePath)
      removed++
    }
  }

  // Remove the empty directory
  try { fs.rmdirSync(dirPath) } catch {}

  return { removed, bytes }
}

async function main() {
  const scanDir = process.argv[2]
  if (!scanDir) {
    console.error('Usage: node scripts/cleanup-frames.js <scan-dir>')
    process.exit(1)
  }

  const framesDir = path.join(path.resolve(scanDir), 'frames')

  if (!fs.existsSync(framesDir)) {
    console.log(`No frames/ directory found in ${scanDir}`)
    process.exit(0)
  }

  const desktopDir = path.join(framesDir, 'desktop')
  const mobileDir = path.join(framesDir, 'mobile')

  const desktop = cleanDir(desktopDir)
  const mobile = cleanDir(mobileDir)

  // Remove the parent frames/ dir if empty
  try { fs.rmdirSync(framesDir) } catch {}

  const totalRemoved = desktop.removed + mobile.removed
  const totalBytes = desktop.bytes + mobile.bytes

  console.log(`Desktop: ${desktop.removed} files removed (${formatBytes(desktop.bytes)})`)
  console.log(`Mobile:  ${mobile.removed} files removed (${formatBytes(mobile.bytes)})`)
  console.log(`\nTotal: ${totalRemoved} files removed, ${formatBytes(totalBytes)} freed`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
