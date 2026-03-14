#!/usr/bin/env node
/**
 * JL Studio — Site Scanner
 * Usage: node scripts/scan-site.js <URL>
 *
 * Scans a website using Playwright and extracts all visual/structural data
 * needed to reproduce it in the JL Studio Builder.
 */

const { chromium } = require('playwright')
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')

const { extractLibraries } = require('./extractors/libraries')
const { extractCSS } = require('./extractors/css')
const { extractHoverEffects } = require('./extractors/hover')
const { extractScrollEffects } = require('./extractors/scroll')
const { extractAnimations } = require('./extractors/animations')
const { extractContent } = require('./extractors/content')

// ═══════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════

const DESKTOP_VP = { width: 1440, height: 900 }
const MOBILE_VP = { width: 390, height: 844 }
const TIMEOUT = 30000
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════

function slugify(url) {
  const u = new URL(url)
  return (u.hostname + u.pathname).replace(/[^a-z0-9]+/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function log(msg) {
  const ts = new Date().toISOString().slice(11, 19)
  console.log(`[${ts}] ${msg}`)
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// ═══════════════════════════════════════════════
// SECTION DETECTION
// ═══════════════════════════════════════════════

async function detectSections(page) {
  return page.evaluate(() => {
    const seen = new Set()
    const candidates = []

    function addCandidate(el) {
      if (seen.has(el)) return
      const rect = el.getBoundingClientRect()
      if (rect.height < 80 || rect.width < 300) return
      seen.add(el)
      candidates.push({ el, rect })
    }

    // Strategy 1: standard selectors
    const selectors = [
      'section', '[class*="section"]', '[class*="Section"]',
      '.w-section', 'header', 'footer', 'nav',
    ]
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach(addCandidate)
    }

    // Strategy 2: direct children of the page wrapper
    const wrapperSelectors = [
      '.page-wrapper', '.site-wrapper', '.wrapper', '#wrapper',
      'main', '#main', '#app', '#__next', '#root',
      'body > div:first-child',
    ]
    for (const wSel of wrapperSelectors) {
      const wrapper = document.querySelector(wSel)
      if (wrapper && wrapper.children.length >= 3) {
        for (const child of wrapper.children) {
          const rect = child.getBoundingClientRect()
          if (rect.height >= 100 && rect.width >= 300) {
            addCandidate(child)
          }
        }
        break
      }
    }

    // Sort by vertical position
    candidates.sort((a, b) => (a.rect.top + window.scrollY) - (b.rect.top + window.scrollY))

    // Remove sections fully contained within another
    const filtered = []
    for (const c of candidates) {
      const cTop = c.rect.top + window.scrollY
      const cBot = cTop + c.rect.height
      const tag = c.el.tagName
      const isContained = filtered.some(f => {
        const fTop = f.rect.top + window.scrollY
        const fBot = fTop + f.rect.height
        return cTop >= fTop && cBot <= fBot && tag !== 'NAV' && tag !== 'HEADER' && tag !== 'FOOTER'
      })
      if (!isContained) filtered.push(c)
    }

    // ─── Deduplicate sections with same primary heading ───
    const deduped = []
    const seenHeadings = new Set()
    for (const c of filtered) {
      const el = c.el
      const primaryHeading = (el.querySelector('h1') || el.querySelector('h2'))?.textContent?.trim().toLowerCase()
      if (primaryHeading && primaryHeading.length > 5) {
        // Normalize: strip extra whitespace
        const normalized = primaryHeading.replace(/\s+/g, ' ')
        if (seenHeadings.has(normalized)) {
          continue // Skip duplicate
        }
        seenHeadings.add(normalized)
      }
      deduped.push(c)
    }

    // ─── Classify each section in-place ───
    const total = deduped.length

    return deduped.map((c, idx) => {
      const el = c.el
      const rect = c.rect
      const tag = el.tagName.toLowerCase()
      const cls = (el.className?.toString() || '').toLowerCase()
      const id = (el.id || '').toLowerCase()
      const style = getComputedStyle(el)

      // Count child elements
      const headings = el.querySelectorAll('h1, h2, h3, h4')
      const images = el.querySelectorAll('img')
      const buttons = el.querySelectorAll('a[class*="btn"], a[class*="button"], button, [class*="cta"], a.w-button')
      const cards = el.querySelectorAll('[class*="card"], [class*="Card"]')
      const inputs = el.querySelectorAll('input, textarea')
      const links = el.querySelectorAll('a')
      const paragraphs = el.querySelectorAll('p')
      const videos = el.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"], [class*="video"], [class*="play"]')
      const gridItems = el.querySelectorAll('[class*="grid"] > *, [class*="collection"] > *')
      const text = el.textContent?.trim().toLowerCase() || ''

      // Background analysis
      const bgImage = style.backgroundImage
      const hasBgImage = bgImage && bgImage !== 'none'
      const bgColor = style.backgroundColor
      const isDark = (() => {
        const m = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (!m) return false
        return (parseInt(m[1]) * 299 + parseInt(m[2]) * 587 + parseInt(m[3]) * 114) / 1000 < 80
      })()

      // Has H1
      const hasH1 = el.querySelector('h1') !== null

      // Layout detection: image on one side, text on the other
      const topLevelDivs = el.querySelectorAll(':scope > div > div, :scope > div')
      let hasImageTextLayout = false
      if (topLevelDivs.length >= 2) {
        const firstHasImg = topLevelDivs[0]?.querySelector('img') && !topLevelDivs[0]?.querySelector('h2, h3')
        const secondHasText = topLevelDivs[1]?.querySelector('h2, h3, p')
        const firstHasText = topLevelDivs[0]?.querySelector('h2, h3, p')
        const secondHasImg = topLevelDivs[1]?.querySelector('img') && !topLevelDivs[1]?.querySelector('h2, h3')
        hasImageTextLayout = (firstHasImg && secondHasText) || (firstHasText && secondHasImg)
      }

      // Price detection
      const hasPrice = text.match(/\$\d|€\d|\d+\.\d{2}/) !== null ||
        el.querySelector('[class*="price"], [class*="Price"]') !== null

      // Testimonial detection
      const hasQuotes = text.includes('"') || text.includes('\u201c') || text.includes('\u201d') ||
        el.querySelector('[class*="testimonial"], [class*="Testimonial"], [class*="review"], [class*="quote"]') !== null

      // Stats/counter detection
      const hasBigNumbers = (() => {
        let count = 0
        el.querySelectorAll('h2, h3, [class*="number"], [class*="stat"], [class*="counter"]').forEach(n => {
          if (/^\d[\d,.\s+%kKmM]*$/.test(n.textContent?.trim())) count++
        })
        return count >= 2
      })()

      // FAQ detection
      const hasFaq = cls.includes('faq') || id.includes('faq') ||
        text.includes('frequently asked') ||
        el.querySelector('[class*="accordion"], [class*="faq"], details') !== null

      // Grid of images (gallery)
      const imgGrid = el.querySelectorAll('[class*="grid"] img, [class*="gallery"] img, [class*="masonry"] img')
      const isGallery = imgGrid.length >= 4 || (images.length >= 4 && cards.length === 0 && !hasPrice)

      // Newsletter
      const hasEmailInput = el.querySelector('input[type="email"], input[name*="email"]') !== null

      // Child bg image check (for hero detection)
      const childHasBgImage = (() => {
        // Check common hero bg selectors + any child with a background-image
        const child = el.querySelector('[style*="background"], [class*="hero"], [class*="banner"], [class*="bg-image"], [class*="bg-"], [class*="bg--"]')
        if (child && getComputedStyle(child).backgroundImage !== 'none') return true
        // Brute-force: check first few large children for bg images
        for (const kid of el.querySelectorAll(':scope > div, :scope > div > div')) {
          const kidStyle = getComputedStyle(kid)
          if (kidStyle.backgroundImage !== 'none') return true
        }
        return false
      })()

      // ────── Classification ──────
      let detectedType = 'section'

      // Nav/header
      if (tag === 'nav' || (tag === 'header' && rect.height < 150)) {
        detectedType = 'navbar'
      }
      // Footer
      else if (tag === 'footer' || cls.includes('footer') || id.includes('footer')) {
        detectedType = 'footer'
      }
      else if (idx === total - 1 && isDark && links.length >= 5) {
        detectedType = 'footer'
      }
      // Hero: has H1, or first tall section with bg image
      else if (hasH1) {
        detectedType = 'hero'
      }
      else if (idx <= 1 && rect.height > 500 && (hasBgImage || childHasBgImage)) {
        detectedType = 'hero'
      }
      // Newsletter
      else if (hasEmailInput && inputs.length <= 3) {
        detectedType = 'newsletter'
      }
      // FAQ
      else if (hasFaq) {
        detectedType = 'faq'
      }
      // Testimonials
      else if (hasQuotes && (cards.length >= 2 || (images.length >= 2 && paragraphs.length >= 2))) {
        detectedType = 'testimonials'
      }
      // Stats
      else if (hasBigNumbers && headings.length <= 3 && cards.length <= 1) {
        detectedType = 'stats'
      }
      // Gallery (images without many headings)
      else if (isGallery && headings.length <= 2) {
        detectedType = 'gallery'
      }
      // Product grid
      else if (hasPrice && (cards.length >= 2 || gridItems.length >= 2)) {
        detectedType = 'product'
      }
      // CTA / video section
      else if (hasBgImage && buttons.length >= 1 && headings.length <= 2 && paragraphs.length <= 2 && rect.height < 900) {
        detectedType = 'cta'
      }
      else if (videos.length > 0 && hasBgImage) {
        detectedType = 'cta'
      }
      // Image-text split layout
      else if (hasImageTextLayout) {
        detectedType = 'image-text'
      }
      // Features/services
      else if (cards.length >= 3 || (gridItems.length >= 3 && headings.length >= 3)) {
        detectedType = 'features'
      }
      else if (headings.length >= 4 && images.length >= 3) {
        detectedType = 'features'
      }
      // Image-text fallback
      else if (images.length >= 1 && images.length <= 3 && headings.length >= 1 && paragraphs.length >= 1 && cards.length === 0 && !isGallery) {
        detectedType = 'image-text'
      }
      // Team
      else if (cards.length >= 2 && images.length >= 2 && text.match(/ceo|founder|team|director|manager/i)) {
        detectedType = 'team'
      }
      // Contact form
      else if (inputs.length >= 3) {
        detectedType = 'contact'
      }
      // Blog
      else if (el.querySelector('[class*="blog"], [class*="article"], [class*="post"], time')) {
        detectedType = 'blog'
      }
      // Pricing
      else if (hasPrice && headings.length >= 2) {
        detectedType = 'pricing'
      }
      // Logo bar
      else if (images.length >= 4 && headings.length <= 1 && paragraphs.length <= 1) {
        detectedType = 'logos'
      }

      return {
        tag,
        id: el.id || null,
        classes: el.className?.toString() || '',
        selector: el.id ? `#${el.id}` : `${tag}:nth-of-type(${[...el.parentElement.children].filter(c => c.tagName === el.tagName).indexOf(el) + 1})`,
        rect: {
          top: Math.round(rect.top + window.scrollY),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        },
        computedBg: bgColor,
        computedBgImage: bgImage,
        textContent: el.textContent?.trim().slice(0, 100),
        detectedType,
      }
    })
  })
}

// ═══════════════════════════════════════════════
// LAZY LOAD TRIGGER — scroll entire page progressively
// ═══════════════════════════════════════════════

async function triggerLazyLoad(page) {
  log('  🔄 Scrolling page to trigger lazy-loaded content...')

  const totalHeight = await page.evaluate(() => document.body.scrollHeight)
  const stepSize = 500
  const steps = Math.ceil(totalHeight / stepSize)

  for (let i = 0; i <= steps; i++) {
    const y = Math.min(i * stepSize, totalHeight)
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y)
    await page.waitForTimeout(300)
  }

  // Wait for all images to finish loading
  log('  🖼️  Waiting for images to load...')
  await page.evaluate(async () => {
    const images = Array.from(document.querySelectorAll('img'))
    await Promise.all(images.map(img => {
      if (img.complete) return Promise.resolve()
      return new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
        // Force load lazy images
        if (img.loading === 'lazy') {
          img.loading = 'eager'
        }
        if (img.dataset.src && !img.src) {
          img.src = img.dataset.src
        }
        // Timeout after 5s per image
        setTimeout(resolve, 5000)
      })
    }))
  })

  // Small wait for any post-load reflows
  await page.waitForTimeout(500)

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)

  // Re-measure total height (may have changed after lazy content loaded)
  const newHeight = await page.evaluate(() => document.body.scrollHeight)
  log(`  ✅ Lazy load done (page height: ${totalHeight}px → ${newHeight}px)`)
}

// ═══════════════════════════════════════════════
// SCREENSHOTS
// ═══════════════════════════════════════════════

async function takeScreenshots(page, sections, outputDir) {
  const ssDir = path.join(outputDir, 'screenshots')
  ensureDir(ssDir)

  // 1. Trigger lazy loading by scrolling the whole page
  await triggerLazyLoad(page)

  // 2. Full page desktop screenshot (after lazy load)
  log('  📸 Full page desktop screenshot...')
  await page.screenshot({
    path: path.join(ssDir, 'full-page-desktop.png'),
    fullPage: true,
  })

  // 3. Take named screenshots using detectedType from detectSections
  //    Use original rect directly — fullPage:true works with absolute coords
  const sectionTypes = []
  const typeCounters = {}

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]
    const sectionType = s.detectedType || 'section'

    // Handle duplicates: features, features-2, features-3...
    typeCounters[sectionType] = (typeCounters[sectionType] || 0) + 1
    const typeSuffix = typeCounters[sectionType] > 1 ? `-${typeCounters[sectionType]}` : ''
    const typeName = `${sectionType}${typeSuffix}`

    sectionTypes.push({ type: sectionType, name: typeName })
    s.detectedName = typeName

    const fileName = `section-${String(i + 1).padStart(2, '0')}-${typeName}`
    log(`  📸 Section ${i + 1}/${sections.length}: ${fileName}`)

    try {
      await page.screenshot({
        path: path.join(ssDir, `${fileName}.png`),
        fullPage: true,
        clip: {
          x: 0,
          y: s.rect.top,
          width: Math.min(s.rect.width, DESKTOP_VP.width),
          height: Math.min(s.rect.height, 3000),
        },
      })
    } catch (err) {
      log(`  ⚠️  Screenshot failed for section ${i + 1}: ${err.message}`)
    }
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  // 4. Mobile screenshots (also need lazy load trigger)
  log('  📸 Mobile viewport...')
  await page.setViewportSize(MOBILE_VP)
  await page.waitForTimeout(1000)

  // Trigger lazy load in mobile too
  await triggerLazyLoad(page)

  await page.screenshot({
    path: path.join(ssDir, 'full-page-mobile.png'),
    fullPage: true,
  })

  // Try to open mobile menu
  const hamburger = await page.$('[class*="hamburger"], [class*="menu-btn"], [class*="mobile-menu"], [class*="nav-toggle"], .w-nav-button')
  if (hamburger) {
    try {
      await hamburger.click()
      await page.waitForTimeout(800)
      await page.screenshot({
        path: path.join(ssDir, 'mobile-menu-open.png'),
        fullPage: false,
      })
      // Close menu
      await hamburger.click()
      await page.waitForTimeout(300)
    } catch {}
  }

  // Reset to desktop
  await page.setViewportSize(DESKTOP_VP)
  await page.waitForTimeout(500)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(300)

  log(`  ✅ Screenshots saved to ${ssDir}`)
  return sectionTypes
}

// ═══════════════════════════════════════════════
// REPORT GENERATION
// ═══════════════════════════════════════════════

function generateReport(url, data) {
  const { libraries, css, hover, scroll, animations, content, sections } = data

  let md = `# Scan Report: ${url}\n`
  md += `Generated: ${new Date().toISOString()}\n\n`

  // Summary
  md += `## Summary\n`
  md += `- **Sections detected:** ${sections.length}\n`
  md += `- **Images found:** ${content.sections.reduce((n, s) => n + s.images.length, 0)}\n`
  md += `- **Buttons found:** ${content.sections.reduce((n, s) => n + s.buttons.length, 0)}\n`
  md += `- **JS Libraries:** ${Object.keys(libraries.jsLibraries).join(', ') || 'none detected'}\n`
  md += `- **Fonts:** ${libraries.fonts.join(', ') || 'none detected'}\n`
  md += `- **Analytics:** ${Object.entries(libraries.analytics).filter(([,v]) => v).map(([k]) => k).join(', ') || 'none'}\n\n`

  // Meta
  md += `## Meta Tags\n`
  for (const [k, v] of Object.entries(libraries.meta)) {
    md += `- **${k}:** ${v}\n`
  }
  md += '\n'

  // Design Tokens
  md += `## Design Tokens\n\n`
  md += `### Body Styles\n`
  if (css.globalStyles.body) {
    for (const [k, v] of Object.entries(css.globalStyles.body)) {
      md += `- ${k}: \`${v}\`\n`
    }
  }
  md += '\n'

  md += `### Headings\n`
  if (css.globalStyles.headings) {
    for (const [tag, styles] of Object.entries(css.globalStyles.headings)) {
      md += `**${tag}:**\n`
      for (const [k, v] of Object.entries(styles)) {
        md += `  - ${k}: \`${v}\`\n`
      }
    }
  }
  md += '\n'

  md += `### Buttons (${css.globalStyles.buttons.length} found)\n`
  for (const btn of css.globalStyles.buttons.slice(0, 5)) {
    md += `- "${btn.text}" → bg: \`${btn.styles.backgroundColor}\`, color: \`${btn.styles.color}\`, radius: \`${btn.styles.borderRadius}\`\n`
  }
  md += '\n'

  // CSS Variables
  const varCount = Object.keys(libraries.cssVariables).length
  md += `### CSS Variables (${varCount} found)\n`
  if (varCount > 0) {
    const colorVars = Object.entries(libraries.cssVariables).filter(([k]) =>
      k.includes('color') || k.includes('bg') || k.includes('text') || k.includes('primary') || k.includes('accent')
    )
    for (const [k, v] of colorVars.slice(0, 20)) {
      md += `- \`${k}\`: \`${v}\`\n`
    }
    if (varCount > 20) md += `- ... and ${varCount - 20} more\n`
  }
  md += '\n'

  // Sections Detail
  md += `## Sections (${sections.length} detected)\n\n`
  sections.forEach((s, i) => {
    const contentSection = content.sections[i] || {}
    const typeLabel = s.detectedName || s.tag
    md += `### Section ${i + 1}: ${typeLabel}${s.id ? ' (#' + s.id + ')' : ''}\n`
    md += `- Detected type: \`${s.detectedType || 'unknown'}\`\n`
    md += `- Position: ${s.rect.top}px from top\n`
    md += `- Height: ${s.rect.height}px\n`
    md += `- Background: \`${s.computedBg}\`\n`
    if (s.computedBgImage !== 'none') md += `- Background Image: \`${s.computedBgImage?.slice(0, 80)}\`\n`
    if (contentSection.headings?.length) {
      md += `- Headings:\n`
      contentSection.headings.forEach(h => md += `  - ${h.tag}: "${h.text}"\n`)
    }
    if (contentSection.buttons?.length) {
      md += `- Buttons:\n`
      contentSection.buttons.forEach(b => md += `  - "${b.label}" → ${b.href}\n`)
    }
    if (contentSection.images?.length) {
      md += `- Images: ${contentSection.images.length}\n`
    }
    md += '\n'
  })

  // Visual Effects
  md += `## Visual Effects\n\n`

  md += `### Hover Effects (${hover.hoverEffects.length} detected)\n`
  for (const h of hover.hoverEffects.slice(0, 10)) {
    md += `- "${h.element}" → ${Object.keys(h.changes).join(', ')}\n`
  }
  md += '\n'

  md += `### Transitions (${hover.transitions.length} detected)\n`
  for (const t of hover.transitions.slice(0, 10)) {
    md += `- ${t.element}: ${t.transitionProperty} (${t.transitionDuration})\n`
  }
  md += '\n'

  md += `### Scroll Effects\n`
  md += `- Parallax elements: ${scroll.scrollEffects.parallax.length}\n`
  md += `- Fade-in animations: ${scroll.scrollEffects.fadeIn.length}\n`
  md += `- Slide-in animations: ${scroll.scrollEffects.slideIn.length}\n`
  md += `- Sticky elements: ${scroll.scrollEffects.sticky.length}\n`
  md += `- Counters: ${scroll.scrollEffects.counters.length}\n`
  md += `- DOM mutations during scroll: ${scroll.mutations.length}\n\n`

  md += `### CSS Animations (${animations.keyframes.length} @keyframes)\n`
  for (const kf of animations.keyframes.slice(0, 10)) {
    md += `- \`@keyframes ${kf.name}\` (${kf.frames.length} frames)\n`
  }
  if (animations.gsapTimelines.length > 0) {
    md += `\n### GSAP Timelines (${animations.gsapTimelines.length})\n`
    for (const t of animations.gsapTimelines.slice(0, 5)) {
      md += `- ${t.type}: duration=${t.duration}, vars=[${t.vars.join(',')}]\n`
    }
  }
  md += '\n'

  // Navigation
  md += `## Navigation\n`
  md += `- Logo: ${content.navigation.logo ? JSON.stringify(content.navigation.logo) : 'not detected'}\n`
  md += `- Links: ${content.navigation.links.length}\n`
  for (const l of content.navigation.links) {
    md += `  - "${l.label}" → ${l.href}${l.hasDropdown ? ' (dropdown)' : ''}\n`
  }
  if (content.navigation.cta) {
    md += `- CTA: "${content.navigation.cta.label}" → ${content.navigation.cta.href}\n`
  }
  md += '\n'

  // Footer
  if (content.footer) {
    md += `## Footer\n`
    if (content.footer.logo) md += `- Logo: ${JSON.stringify(content.footer.logo)}\n`
    if (content.footer.tagline) md += `- Tagline: "${content.footer.tagline}"\n`
    if (content.footer.copyright) md += `- Copyright: "${content.footer.copyright}"\n`
    md += `- Columns: ${content.footer.columns.length}\n`
    for (const col of content.footer.columns) {
      md += `  - ${col.title || '(no title)'}: ${col.links.map(l => l.label).join(', ')}\n`
    }
    if (content.footer.socials.length) {
      md += `- Socials: ${content.footer.socials.map(s => s.platform).join(', ')}\n`
    }
  }
  md += '\n'

  // Complexity Score
  const complexity = Math.min(10, Math.round(
    (sections.length * 0.3) +
    (Object.keys(libraries.jsLibraries).length * 1) +
    (animations.keyframes.length * 0.5) +
    (hover.hoverEffects.length * 0.2) +
    (scroll.scrollEffects.parallax.length * 0.5)
  ))
  md += `## Complexity Score: ${complexity}/10\n`
  md += `- ${sections.length} sections\n`
  md += `- ${Object.keys(libraries.jsLibraries).length} JS libraries\n`
  md += `- ${animations.keyframes.length} CSS animations\n`
  md += `- ${hover.hoverEffects.length} hover effects\n`
  md += `- ${scroll.scrollEffects.parallax.length} parallax elements\n`

  return md
}

// ═══════════════════════════════════════════════
// VIDEO RECORDING
// ═══════════════════════════════════════════════

async function recordVideo(url, outputDir, sections) {
  const videosDir = path.join(outputDir, 'videos')
  ensureDir(videosDir)

  // Helper: smooth scroll and hover
  async function scrollAndHover(videoPage, viewport) {
    const totalHeight = await videoPage.evaluate(() => document.body.scrollHeight)
    const stepSize = 200
    const stepDelay = viewport === 'desktop' ? 150 : 120

    // Smooth scroll down (~15s)
    for (let y = 0; y <= totalHeight; y += stepSize) {
      await videoPage.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
      await videoPage.waitForTimeout(stepDelay)
    }

    // Hover buttons and cards (desktop only)
    if (viewport === 'desktop') {
      const hoverTargets = await videoPage.locator('a[class*="btn"], a[class*="button"], button, .w-button, [class*="card"], [class*="Card"]').all()
      for (const target of hoverTargets.slice(0, 10)) {
        try {
          await target.scrollIntoViewIfNeeded({ timeout: 2000 })
          await target.hover({ timeout: 1000 })
          await videoPage.waitForTimeout(400)
        } catch {}
      }
    }

    // Scroll back up to trigger scroll-based animations in reverse
    for (let y = totalHeight; y >= 0; y -= stepSize * 2) {
      await videoPage.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
      await videoPage.waitForTimeout(100)
    }

    // Second scroll down (captures animations that trigger on scroll-in)
    for (let y = 0; y <= totalHeight; y += stepSize * 2) {
      await videoPage.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
      await videoPage.waitForTimeout(100)
    }

    await videoPage.waitForTimeout(500)
  }

  // ─── Desktop video ───
  try {
    log('  🎬 Recording desktop video...')
    const desktopBrowser = await chromium.launch({ headless: true })
    const desktopContext = await desktopBrowser.newContext({
      viewport: DESKTOP_VP,
      userAgent: USER_AGENT,
      recordVideo: {
        dir: videosDir,
        size: { width: DESKTOP_VP.width, height: DESKTOP_VP.height },
      },
    })
    const desktopPage = await desktopContext.newPage()
    await desktopPage.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT })
    await desktopPage.waitForTimeout(2000)

    await scrollAndHover(desktopPage, 'desktop')

    await desktopPage.close()
    await desktopContext.close()
    await desktopBrowser.close()

    // Rename the auto-generated video file to video-desktop.webm
    const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.webm'))
    if (videoFiles.length > 0) {
      const latestVideo = videoFiles.sort().pop()
      const desktopDest = path.join(outputDir, 'video-desktop.webm')
      fs.renameSync(path.join(videosDir, latestVideo), desktopDest)
      log(`  ✅ Desktop video: ${desktopDest}`)
    }
  } catch (err) {
    log(`  ⚠️  Desktop video failed: ${err.message}`)
  }

  // ─── Mobile video ───
  try {
    log('  🎬 Recording mobile video...')
    const mobileBrowser = await chromium.launch({ headless: true })
    const mobileContext = await mobileBrowser.newContext({
      viewport: MOBILE_VP,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
      recordVideo: {
        dir: videosDir,
        size: { width: MOBILE_VP.width, height: MOBILE_VP.height },
      },
    })
    const mobilePage = await mobileContext.newPage()
    await mobilePage.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT })
    await mobilePage.waitForTimeout(2000)

    await scrollAndHover(mobilePage, 'mobile')

    await mobilePage.close()
    await mobileContext.close()
    await mobileBrowser.close()

    // Rename the auto-generated video file to video-mobile.webm
    const videoFiles = fs.readdirSync(videosDir).filter(f => f.endsWith('.webm'))
    if (videoFiles.length > 0) {
      const latestVideo = videoFiles.sort().pop()
      const mobileDest = path.join(outputDir, 'video-mobile.webm')
      fs.renameSync(path.join(videosDir, latestVideo), mobileDest)
      log(`  ✅ Mobile video: ${mobileDest}`)
    }
  } catch (err) {
    log(`  ⚠️  Mobile video failed: ${err.message}`)
  }

  // Clean up temp videos dir if empty
  try {
    const remaining = fs.readdirSync(videosDir)
    if (remaining.length === 0) fs.rmdirSync(videosDir)
  } catch {}
}

// ═══════════════════════════════════════════════
// FRAME EXTRACTION
// ═══════════════════════════════════════════════

function hasFfmpeg() {
  try {
    execSync('which ffmpeg', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

async function extractFrames(url, outputDir) {
  const desktopFramesDir = path.join(outputDir, 'frames', 'desktop')
  const mobileFramesDir = path.join(outputDir, 'frames', 'mobile')
  ensureDir(desktopFramesDir)
  ensureDir(mobileFramesDir)

  const desktopVideo = path.join(outputDir, 'video-desktop.webm')
  const mobileVideo = path.join(outputDir, 'video-mobile.webm')

  if (hasFfmpeg()) {
    // ─── ffmpeg extraction (preferred) ───
    log('  🎞️  Extracting frames via ffmpeg (2 fps)...')

    if (fs.existsSync(desktopVideo)) {
      try {
        execSync(`ffmpeg -i "${desktopVideo}" -vf fps=2 "${path.join(desktopFramesDir, 'frame-%03d.png')}" -y -loglevel error`)
        const count = fs.readdirSync(desktopFramesDir).filter(f => f.endsWith('.png')).length
        log(`  ✅ Desktop frames: ${count}`)
      } catch (err) {
        log(`  ⚠️  ffmpeg desktop failed: ${err.message}`)
      }
    } else {
      log('  ⚠️  No desktop video found, skipping desktop frames')
    }

    if (fs.existsSync(mobileVideo)) {
      try {
        execSync(`ffmpeg -i "${mobileVideo}" -vf fps=2 "${path.join(mobileFramesDir, 'frame-%03d.png')}" -y -loglevel error`)
        const count = fs.readdirSync(mobileFramesDir).filter(f => f.endsWith('.png')).length
        log(`  ✅ Mobile frames: ${count}`)
      } catch (err) {
        log(`  ⚠️  ffmpeg mobile failed: ${err.message}`)
      }
    } else {
      log('  ⚠️  No mobile video found, skipping mobile frames')
    }
  } else {
    // ─── Playwright fallback: screenshot during scroll ───
    log('  🎞️  ffmpeg not found — extracting frames via Playwright scroll...')

    async function captureScrollFrames(viewport, ua, framesDir) {
      const browser = await chromium.launch({ headless: true })
      const context = await browser.newContext({ viewport, userAgent: ua })
      const page = await context.newPage()
      await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT })
      await page.waitForTimeout(2000)

      const totalHeight = await page.evaluate(() => document.body.scrollHeight)
      const stepSize = 200
      const stepDelay = 500
      let frameIndex = 0

      for (let y = 0; y <= totalHeight; y += stepSize) {
        await page.evaluate((scrollY) => window.scrollTo({ top: scrollY, behavior: 'instant' }), y)
        await page.waitForTimeout(stepDelay)
        const frameName = `frame-${String(frameIndex).padStart(3, '0')}.png`
        await page.screenshot({ path: path.join(framesDir, frameName), fullPage: false })
        frameIndex++
      }

      await browser.close()
      return frameIndex
    }

    try {
      const desktopCount = await captureScrollFrames(DESKTOP_VP, USER_AGENT, desktopFramesDir)
      log(`  ✅ Desktop frames (Playwright): ${desktopCount}`)
    } catch (err) {
      log(`  ⚠️  Playwright desktop frames failed: ${err.message}`)
    }

    try {
      const mobileUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      const mobileCount = await captureScrollFrames(MOBILE_VP, mobileUA, mobileFramesDir)
      log(`  ✅ Mobile frames (Playwright): ${mobileCount}`)
    } catch (err) {
      log(`  ⚠️  Playwright mobile frames failed: ${err.message}`)
    }
  }
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

async function main() {
  const url = process.argv[2]
  if (!url) {
    console.error('Usage: node scripts/scan-site.js <URL>')
    console.error('Example: node scripts/scan-site.js https://beardtemplate.webflow.io/home')
    process.exit(1)
  }

  const slug = slugify(url)
  const outputDir = path.join(__dirname, 'scans', slug)
  ensureDir(outputDir)

  log(`🔍 Scanning: ${url}`)
  log(`📁 Output: ${outputDir}`)

  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    viewport: DESKTOP_VP,
    userAgent: USER_AGENT,
  })
  const page = await context.newPage()
  page.setDefaultTimeout(TIMEOUT)

  try {
    // 1. Open page
    log('🌐 Opening page...')
    await page.goto(url, { waitUntil: 'networkidle', timeout: TIMEOUT })
    await page.waitForTimeout(2000) // Extra wait for JS animations

    // 2. Extract libraries & meta
    log('📚 Detecting libraries, fonts, CSS variables...')
    const libraries = await extractLibraries(page)

    // 3. Detect sections
    log('🗂️  Detecting sections...')
    const sections = await detectSections(page)
    log(`   Found ${sections.length} sections`)

    // 4. Take screenshots
    log('📸 Taking screenshots...')
    await takeScreenshots(page, sections, outputDir)

    // 5. Extract CSS
    log('🎨 Extracting CSS styles...')
    const css = await extractCSS(page, sections)

    // 6. Extract content
    log('📝 Extracting content...')
    const content = await extractContent(page)

    // 7. Detect hover effects
    log('🖱️  Detecting hover effects...')
    const hover = await extractHoverEffects(page)

    // 8. Detect scroll effects
    log('📜 Detecting scroll effects...')
    const scroll = await extractScrollEffects(page)

    // 9. Extract animations
    log('✨ Extracting CSS animations...')
    const animations = await extractAnimations(page)

    // 10. Record video — desktop + mobile scroll-through
    log('🎬 Recording video...')
    await recordVideo(url, outputDir, sections)

    // 11. Extract frames from videos (or via Playwright fallback)
    log('🎞️  Extracting frames...')
    await extractFrames(url, outputDir)

    // 13. Save raw data
    const rawData = {
      url,
      scannedAt: new Date().toISOString(),
      libraries,
      sections,
      css,
      content,
      hover,
      scroll,
      animations,
    }

    const rawPath = path.join(outputDir, 'raw-data.json')
    fs.writeFileSync(rawPath, JSON.stringify(rawData, null, 2))
    log(`💾 Raw data saved: ${rawPath}`)

    // 14. Generate report
    const report = generateReport(url, rawData)
    const reportPath = path.join(outputDir, 'scan-report.md')
    fs.writeFileSync(reportPath, report)
    log(`📄 Report saved: ${reportPath}`)

    // Summary
    log('')
    log('═══════════════════════════════════════════')
    log('✅ SCAN COMPLETE')
    log('═══════════════════════════════════════════')
    log(`Sections: ${sections.length}`)
    log(`Images: ${content.sections.reduce((n, s) => n + s.images.length, 0)}`)
    log(`Buttons: ${content.sections.reduce((n, s) => n + s.buttons.length, 0)}`)
    log(`JS Libs: ${Object.keys(libraries.jsLibraries).join(', ') || 'none'}`)
    log(`Fonts: ${libraries.fonts.join(', ') || 'none'}`)
    log(`CSS Vars: ${Object.keys(libraries.cssVariables).length}`)
    log(`Hover effects: ${hover.hoverEffects.length}`)
    log(`@keyframes: ${animations.keyframes.length}`)
    log('')
    log(`📁 Output: ${outputDir}`)
    log(`   raw-data.json — all extracted data`)
    log(`   scan-report.md — human-readable report`)
    log(`   screenshots/ — desktop + mobile + sections`)
    log(`   video-desktop.webm — desktop scroll-through`)
    log(`   video-mobile.webm — mobile scroll-through`)
    log(`   frames/desktop/ — desktop scroll frames (2 fps)`)
    log(`   frames/mobile/ — mobile scroll frames (2 fps)`)

  } catch (error) {
    log(`❌ Error: ${error.message}`)
    console.error(error)
  } finally {
    await browser.close()
  }
}

main()
