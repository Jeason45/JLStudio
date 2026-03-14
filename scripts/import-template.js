#!/usr/bin/env node
/**
 * Import a scan output.json template into the configurator
 *
 * Usage:
 *   # Create a new site:
 *   node scripts/import-template.js scripts/scans/beardtemplate-webflow-io-home/output.json
 *
 *   # Update an existing site:
 *   node scripts/import-template.js scripts/scans/beardtemplate-webflow-io-home/output.json --site-id QYc5HzmmO7
 */

const fs = require('fs')
const path = require('path')

const BUILDER_URL = process.env.BUILDER_URL || 'http://localhost:3001'

function parseArgs(args) {
  const jsonPath = args.find(a => !a.startsWith('--'))
  const siteIdFlag = args.find(a => a.startsWith('--site-id'))
  let siteId = null

  if (siteIdFlag) {
    // Support both --site-id=XXX and --site-id XXX
    if (siteIdFlag.includes('=')) {
      siteId = siteIdFlag.split('=')[1]
    } else {
      const idx = args.indexOf(siteIdFlag)
      siteId = args[idx + 1]
    }
  }

  return { jsonPath, siteId }
}

async function main() {
  const { jsonPath, siteId } = parseArgs(process.argv.slice(2))

  if (!jsonPath) {
    console.error('Usage:')
    console.error('  node scripts/import-template.js <path-to-output.json>')
    console.error('  node scripts/import-template.js <path-to-output.json> --site-id <siteId>')
    process.exit(1)
  }

  const absPath = path.resolve(jsonPath)
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`)
    process.exit(1)
  }

  const template = JSON.parse(fs.readFileSync(absPath, 'utf-8'))

  const mode = siteId ? 'UPDATE' : 'CREATE'
  console.log(`[${mode}] Importing template: ${template.site?.name || 'Unknown'}`)
  if (siteId) console.log(`  Target site: ${siteId}`)
  console.log(`  Sections: ${template.sections?.length || 0}`)
  console.log(`  Pages: ${template.pages?.length || 0}`)
  console.log(`  Brand: ${template.brand?.typography?.heading || 'default'} / ${template.brand?.typography?.body || 'default'}`)

  // Add siteId to payload if updating
  const payload = siteId ? { ...template, siteId } : template

  const res = await fetch(`${BUILDER_URL}/api/import-template`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.text()
    console.error(`Import failed (${res.status}): ${err}`)
    process.exit(1)
  }

  const result = await res.json()
  console.log(`\n${mode} successful!`)
  console.log(`  Site ID: ${result.site.id}`)
  console.log(`  Slug: ${result.site.slug}`)
  console.log(`  Mode: ${result.mode}`)
  console.log(`  Sections imported: ${result.site.sectionsCount}`)
  console.log(`  Pages: ${result.site.pagesCount}`)
  console.log(`\n  Editor URL: ${BUILDER_URL}${result.site.editorUrl}`)

  // Write result for downstream scripts
  const resultPath = path.join(path.dirname(absPath), 'import-result.json')
  fs.writeFileSync(resultPath, JSON.stringify(result, null, 2))
  console.log(`  Result saved: ${resultPath}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
