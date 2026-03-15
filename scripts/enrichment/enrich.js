#!/usr/bin/env node

/**
 * enrich.js — Auto-enrichment orchestrator
 *
 * After a site is reproduced, analyzes raw-data.json and output.json
 * to detect NEW patterns (buttons, hovers, animations, palettes, typography,
 * wireframes, templates) and adds them to the builder's library files.
 *
 * Usage:
 *   node scripts/enrichment/enrich.js <scan-dir>
 *   node scripts/enrichment/enrich.js <scan-dir> --dry-run
 *
 * Called automatically as Step 11 of auto-reproduce.js
 */

const fs = require('fs')
const path = require('path')
const { extractAll } = require('./extractors')
const { writeButtons, writeHovers, writeWireframes, writeTemplates } = require('./writer')

const ROOT = path.resolve(__dirname, '../..')
const LOG_FILE = path.join(__dirname, '.enrichment-log.json')

// ─── Enrichment log (deduplication across scans) ────────

function loadLog() {
  if (!fs.existsSync(LOG_FILE)) return { version: 1, items: [] }
  try {
    return JSON.parse(fs.readFileSync(LOG_FILE, 'utf-8'))
  } catch {
    return { version: 1, items: [] }
  }
}

function saveLog(log) {
  fs.writeFileSync(LOG_FILE, JSON.stringify(log, null, 2), 'utf-8')
}

function isAlreadyEnriched(log, fingerprint) {
  return log.items.some(item => item.fingerprint === fingerprint)
}

function addToLog(log, candidate, targetFile) {
  log.items.push({
    id: candidate.id,
    fingerprint: candidate.fingerprint,
    category: candidate.category,
    subcategory: candidate.subcategory,
    label: candidate.label,
    addedAt: new Date().toISOString(),
    targetFile,
  })
}

// ─── Load existing library fingerprints ─────────────────

function loadExistingFingerprints() {
  const fp = require('./fingerprint')
  const fingerprints = new Set()

  // Load existing button IDs from components.ts
  const componentsPath = path.join(ROOT, 'apps/builder/src/data/library/components.ts')
  if (fs.existsSync(componentsPath)) {
    const content = fs.readFileSync(componentsPath, 'utf-8')
    const ids = content.match(/id:\s*'([^']+)'/g) || []
    ids.forEach(m => fingerprints.add(m.match(/id:\s*'([^']+)'/)[1]))
  }

  // Load existing animation IDs
  const animsPath = path.join(ROOT, 'apps/builder/src/data/library/animations.ts')
  if (fs.existsSync(animsPath)) {
    const content = fs.readFileSync(animsPath, 'utf-8')
    const ids = content.match(/id:\s*'([^']+)'/g) || []
    ids.forEach(m => fingerprints.add(m.match(/id:\s*'([^']+)'/)[1]))
  }

  // Load wireframe IDs
  const wiresPath = path.join(ROOT, 'apps/builder/src/data/library/wireframes.ts')
  if (fs.existsSync(wiresPath)) {
    const content = fs.readFileSync(wiresPath, 'utf-8')
    const ids = content.match(/id:\s*'([^']+)'/g) || []
    ids.forEach(m => fingerprints.add(m.match(/id:\s*'([^']+)'/)[1]))
  }

  // Load template IDs
  const tplPath = path.join(ROOT, 'apps/builder/src/data/library/templates.ts')
  if (fs.existsSync(tplPath)) {
    const content = fs.readFileSync(tplPath, 'utf-8')
    const ids = content.match(/id:\s*'([^']+)'/g) || []
    ids.forEach(m => fingerprints.add(m.match(/id:\s*'([^']+)'/)[1]))
  }

  return fingerprints
}

// ─── Main enrichment function ───────────────────────────

async function enrichLibrary(scanDir, { dryRun = false } = {}) {
  const results = { added: 0, skipped: 0, items: [], errors: [] }

  // Load data
  const rawDataPath = path.join(scanDir, 'raw-data.json')
  const outputPath = path.join(scanDir, 'output.json')

  if (!fs.existsSync(rawDataPath)) {
    results.errors.push('raw-data.json not found')
    return results
  }

  const rawData = JSON.parse(fs.readFileSync(rawDataPath, 'utf-8'))
  const outputJson = fs.existsSync(outputPath)
    ? JSON.parse(fs.readFileSync(outputPath, 'utf-8'))
    : null

  const sourceUrl = rawData.url || ''

  // Extract all candidates
  const candidates = extractAll(rawData, outputJson, sourceUrl)

  // Load dedup state
  const log = loadLog()
  const existingIds = loadExistingFingerprints()

  // Filter novel candidates
  const novel = {
    buttons: [],
    hovers: [],
    wireframes: [],
    templates: [],
  }

  // ─── Filter buttons
  for (const c of candidates.buttons) {
    if (existingIds.has(c.id) || isAlreadyEnriched(log, c.fingerprint)) {
      results.skipped++
      continue
    }
    novel.buttons.push(c)
  }

  // ─── Filter hovers
  for (const c of candidates.hovers) {
    if (existingIds.has(c.id) || isAlreadyEnriched(log, c.fingerprint)) {
      results.skipped++
      continue
    }
    novel.hovers.push(c)
  }

  // ─── Filter wireframes
  for (const c of candidates.wireframes || []) {
    if (existingIds.has(c.id) || isAlreadyEnriched(log, c.fingerprint)) {
      results.skipped++
      continue
    }
    novel.wireframes.push(c)
  }

  // ─── Filter templates
  for (const c of candidates.templates || []) {
    if (existingIds.has(c.id) || isAlreadyEnriched(log, c.fingerprint)) {
      results.skipped++
      continue
    }
    novel.templates.push(c)
  }

  // Log summary
  const totalNovel = novel.buttons.length + novel.hovers.length + novel.wireframes.length + novel.templates.length
  console.log(`  📦 Extracted: ${candidates.buttons.length} buttons, ${candidates.hovers.length} hovers, ${candidates.scrollAnims.length} scroll anims, ${candidates.keyframes.length} keyframes`)
  console.log(`  🎨 Extracted: ${candidates.palettes.length} palettes, ${candidates.typography.length} typography pairings`)
  console.log(`  📐 Extracted: ${candidates.wireframes.length} wireframes, ${candidates.templates.length} templates, ${candidates.sectionPresets.length} section presets`)
  console.log(`  🆕 Novel items: ${totalNovel} (${results.skipped} already exist)`)

  if (totalNovel === 0) {
    console.log('  ✅ No new patterns to add')
    return results
  }

  if (dryRun) {
    console.log('  🏃 Dry run — would add:')
    novel.buttons.forEach(c => console.log(`    + Button: ${c.label} (${c.fingerprint})`))
    novel.hovers.forEach(c => console.log(`    + Hover: ${c.label} (${c.fingerprint})`))
    novel.wireframes.forEach(c => console.log(`    + Wireframe: ${c.label} (${c.sectionTypes.join(' > ')})`))
    novel.templates.forEach(c => console.log(`    + Template: ${c.label}`))
    results.added = totalNovel
    return results
  }

  // ─── Write to files

  // Buttons → components.ts
  if (novel.buttons.length > 0) {
    console.log(`  ✏️  Writing ${novel.buttons.length} buttons to components.ts...`)
    const res = writeButtons(novel.buttons)
    if (res.error) {
      results.errors.push(`buttons: ${res.error}`)
    } else {
      results.added += res.added
      novel.buttons.forEach(c => {
        addToLog(log, c, 'library/components.ts')
        results.items.push({ category: c.category, subcategory: c.subcategory, label: c.label })
      })
    }
  }

  // Hovers → animations.ts
  if (novel.hovers.length > 0) {
    console.log(`  ✏️  Writing ${novel.hovers.length} hovers to animations.ts...`)
    const res = writeHovers(novel.hovers)
    if (res.error) {
      results.errors.push(`hovers: ${res.error}`)
    } else {
      results.added += res.added
      novel.hovers.forEach(c => {
        addToLog(log, c, 'library/animations.ts')
        results.items.push({ category: c.category, subcategory: c.subcategory, label: c.label })
      })
    }
  }

  // Wireframes → wireframes.ts
  if (novel.wireframes.length > 0) {
    console.log(`  ✏️  Writing ${novel.wireframes.length} wireframes to wireframes.ts...`)
    const res = writeWireframes(novel.wireframes)
    if (res.error) {
      results.errors.push(`wireframes: ${res.error}`)
    } else {
      results.added += res.added
      novel.wireframes.forEach(c => {
        addToLog(log, c, 'library/wireframes.ts')
        results.items.push({ category: c.category, subcategory: c.subcategory, label: c.label })
      })
    }
  }

  // Templates → templates.ts
  if (novel.templates.length > 0) {
    console.log(`  ✏️  Writing ${novel.templates.length} templates to templates.ts...`)
    const res = writeTemplates(novel.templates)
    if (res.error) {
      results.errors.push(`templates: ${res.error}`)
    } else {
      results.added += res.added
      novel.templates.forEach(c => {
        addToLog(log, c, 'library/templates.ts')
        results.items.push({ category: c.category, subcategory: c.subcategory, label: c.label })
      })
    }
  }

  // Save enrichment log
  log.lastRun = new Date().toISOString()
  log.lastScan = scanDir
  saveLog(log)

  console.log(`  ✅ Enrichment complete: ${results.added} items added`)
  if (results.errors.length > 0) {
    console.log(`  ⚠ Errors: ${results.errors.join(', ')}`)
  }

  return results
}

// ─── CLI ────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2)
  const scanDir = args.find(a => !a.startsWith('--'))
  const dryRun = args.includes('--dry-run')

  if (!scanDir) {
    console.error('Usage: node scripts/enrichment/enrich.js <scan-dir> [--dry-run]')
    process.exit(1)
  }

  if (!fs.existsSync(scanDir)) {
    console.error(`Scan directory not found: ${scanDir}`)
    process.exit(1)
  }

  console.log('🔄 Library enrichment...')
  console.log(`   Scan: ${scanDir}`)
  console.log(`   Dry run: ${dryRun}`)
  console.log('')

  enrichLibrary(scanDir, { dryRun }).then(results => {
    console.log('')
    console.log(`Done: ${results.added} added, ${results.skipped} skipped`)
    if (results.errors.length > 0) {
      console.log(`Errors: ${results.errors.join(', ')}`)
      process.exit(1)
    }
  })
}

module.exports = { enrichLibrary }
