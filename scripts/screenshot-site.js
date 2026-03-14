#!/usr/bin/env node
/**
 * Screenshot a site in the configurator editor using Playwright
 *
 * Usage:
 *   node scripts/screenshot-site.js <siteId> <output-dir>
 *
 * Output files (always overwritten, never versioned):
 *   <output-dir>/current-full-desktop.png
 *   <output-dir>/current-full-mobile.png
 *   <output-dir>/current-section-00.png  (header)
 *   <output-dir>/current-section-01.png  (first section)
 *   <output-dir>/current-section-NN.png  (Nth section)
 *   <output-dir>/current-footer.png
 */

const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')

const BUILDER_URL = process.env.BUILDER_URL || 'http://localhost:3001'

function cleanPreviousScreenshots(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    return
  }
  const files = fs.readdirSync(dir)
  for (const file of files) {
    if (file.startsWith('current-')) {
      fs.unlinkSync(path.join(dir, file))
    }
  }
}

async function login() {
  const email = process.env.BUILDER_ADMIN_EMAIL || 'admin@jlstudio.dev'
  const password = process.env.BUILDER_ADMIN_PASSWORD || 'JLStudio@Builder2026'

  const res = await fetch(`${BUILDER_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    console.log(`Login failed (${res.status}) — screenshots may fail if auth required`)
    return null
  }

  // Extract builder-token from Set-Cookie header
  const setCookie = res.headers.getSetCookie?.() || []
  for (const cookie of setCookie) {
    const match = cookie.match(/builder-token=([^;]+)/)
    if (match) {
      console.log(`✓ Logged in as ${email}`)
      return match[1]
    }
  }

  console.log('Login OK but no cookie found — trying without auth')
  return null
}

async function main() {
  const siteId = process.argv[2]
  const outputDir = process.argv[3]

  if (!siteId || !outputDir) {
    console.error('Usage: node scripts/screenshot-site.js <siteId> <output-dir>')
    process.exit(1)
  }

  const absOutput = path.resolve(outputDir)
  const editorUrl = `${BUILDER_URL}/editor/${siteId}`

  // Clean previous current-* files
  cleanPreviousScreenshots(absOutput)
  console.log(`Cleaned previous current-* screenshots in ${absOutput}`)

  console.log(`Opening editor: ${editorUrl}`)

  // Login to get auth token
  const token = await login()

  const browser = await chromium.launch({ headless: true })

  // Create context with auth cookie if available
  const contextOptions = {}
  if (token) {
    const url = new URL(BUILDER_URL)
    contextOptions.storageState = {
      cookies: [{
        name: 'builder-token',
        value: token,
        domain: url.hostname,
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
      }],
      origins: [],
    }
  }

  const context = await browser.newContext(contextOptions)

  // ─── DESKTOP (1440x900) ───
  const desktopPage = await context.newPage()
  await desktopPage.setViewportSize({ width: 1440, height: 900 })
  await desktopPage.goto(editorUrl, { waitUntil: 'networkidle', timeout: 60000 })
  await desktopPage.waitForTimeout(5000)

  const canvas = desktopPage.locator('#site-canvas')

  // Full desktop screenshot
  const fullDesktopPath = path.join(absOutput, 'current-full-desktop.png')
  await canvas.screenshot({ path: fullDesktopPath })
  console.log(`✓ ${path.basename(fullDesktopPath)}`)

  // Header screenshot (index 00)
  let sectionIndex = 0
  const header = desktopPage.locator('#site-canvas header').first()
  if (await header.isVisible({ timeout: 2000 }).catch(() => false)) {
    const headerPath = path.join(absOutput, `current-section-${String(sectionIndex).padStart(2, '0')}.png`)
    await header.screenshot({ path: headerPath })
    const box = await header.boundingBox()
    console.log(`✓ current-section-${String(sectionIndex).padStart(2, '0')}.png (header ${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)})`)
    sectionIndex++
  }

  // Section screenshots
  const sections = await desktopPage.locator('#site-canvas section').all()
  console.log(`Found ${sections.length} sections`)

  for (let i = 0; i < sections.length; i++) {
    const idx = String(sectionIndex).padStart(2, '0')
    const sectionPath = path.join(absOutput, `current-section-${idx}.png`)
    await sections[i].scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {})
    await desktopPage.waitForTimeout(300)
    await sections[i].screenshot({ path: sectionPath })
    const box = await sections[i].boundingBox()
    console.log(`✓ current-section-${idx}.png (${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)})`)
    sectionIndex++
  }

  // Footer screenshot
  const footer = desktopPage.locator('#site-canvas footer').first()
  if (await footer.isVisible({ timeout: 2000 }).catch(() => false)) {
    await footer.scrollIntoViewIfNeeded({ timeout: 3000 }).catch(() => {})
    await desktopPage.waitForTimeout(300)
    const footerPath = path.join(absOutput, 'current-footer.png')
    await footer.screenshot({ path: footerPath })
    const box = await footer.boundingBox()
    console.log(`✓ current-footer.png (${Math.round(box?.width || 0)}x${Math.round(box?.height || 0)})`)
  }

  await desktopPage.close()

  // ─── MOBILE (390x844) ───
  const mobilePage = await context.newPage()
  await mobilePage.setViewportSize({ width: 390, height: 844 })
  await mobilePage.goto(editorUrl, { waitUntil: 'networkidle', timeout: 60000 })
  await mobilePage.waitForTimeout(5000)

  const mobileCanvas = mobilePage.locator('#site-canvas')
  const fullMobilePath = path.join(absOutput, 'current-full-mobile.png')
  await mobileCanvas.screenshot({ path: fullMobilePath })
  console.log(`✓ ${path.basename(fullMobilePath)}`)

  await mobilePage.close()
  await context.close()
  await browser.close()

  console.log(`\nDone! ${sectionIndex + 1} screenshots saved to ${absOutput}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
