#!/usr/bin/env node
/**
 * Screenshot + capture console errors from the editor
 */
const { chromium } = require('playwright')
const path = require('path')

const BUILDER_URL = process.env.BUILDER_URL || 'http://localhost:3001'

async function main() {
  const siteId = process.argv[2]
  if (!siteId) {
    console.error('Usage: node scripts/screenshot-site-debug.js <siteId>')
    process.exit(1)
  }

  const editorUrl = `${BUILDER_URL}/editor/${siteId}`
  console.log(`Opening: ${editorUrl}`)

  const browser = await chromium.launch({ headless: true })
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

  const errors = []
  const warnings = []

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text())
    if (msg.type() === 'warning') warnings.push(msg.text())
  })

  page.on('pageerror', err => {
    errors.push(`PAGE ERROR: ${err.message}`)
  })

  await page.goto(editorUrl, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(5000)

  console.log(`\n=== ERRORS (${errors.length}) ===`)
  errors.forEach(e => console.log(`  [ERROR] ${e.substring(0, 200)}`))

  console.log(`\n=== WARNINGS (${warnings.length}) ===`)
  warnings.slice(0, 10).forEach(w => console.log(`  [WARN] ${w.substring(0, 200)}`))

  // Count rendered sections
  const sectionCount = await page.locator('#site-canvas > div > div > div').count()
  console.log(`\n=== SECTIONS in DOM: ${sectionCount} ===`)

  // Check each section's height
  const sections = await page.locator('#site-canvas section').all()
  console.log(`<section> elements found: ${sections.length}`)
  for (let i = 0; i < sections.length; i++) {
    const box = await sections[i].boundingBox()
    const text = await sections[i].textContent()
    console.log(`  Section ${i}: ${box?.width}x${box?.height} at y=${box?.y} — text preview: "${text?.substring(0, 80)}"`)
  }

  await browser.close()
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
