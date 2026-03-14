/**
 * Detect scroll-based effects: parallax, stagger, counters, sticky, reveal
 */

async function extractScrollEffects(page) {
  const totalHeight = await page.evaluate(() => document.body.scrollHeight)
  const viewportHeight = await page.evaluate(() => window.innerHeight)
  const steps = 20
  const stepSize = Math.floor(totalHeight / steps)

  const scrollEffects = {
    parallax: [],
    fadeIn: [],
    stagger: [],
    counters: [],
    sticky: [],
    slideIn: [],
    zoomEffects: [],
  }

  // Setup observers BEFORE scrolling
  await page.evaluate(() => {
    window.__scrollChanges = []
    window.__prevStates = new Map()

    // Track elements that change during scroll
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && (m.attributeName === 'style' || m.attributeName === 'class')) {
          const el = m.target
          const rect = el.getBoundingClientRect()
          if (rect.width > 0 && rect.height > 0) {
            window.__scrollChanges.push({
              tag: el.tagName,
              class: el.className?.toString().slice(0, 60),
              attribute: m.attributeName,
              scrollY: window.scrollY,
            })
          }
        }
      }
    })
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: ['style', 'class'],
    })
    window.__scrollObserver = observer
  })

  // Scroll progressively
  for (let i = 0; i <= steps; i++) {
    const scrollY = Math.min(i * stepSize, totalHeight - viewportHeight)
    await page.evaluate((y) => window.scrollTo(0, y), scrollY)
    await page.waitForTimeout(300)

    // Check for visible animations
    const frameData = await page.evaluate((scrollPos) => {
      const data = {
        stickyElements: [],
        visibleAnimations: [],
        counterElements: [],
      }

      // Sticky detection
      document.querySelectorAll('*').forEach(el => {
        const s = getComputedStyle(el)
        if (s.position === 'sticky' || s.position === '-webkit-sticky') {
          const rect = el.getBoundingClientRect()
          if (rect.width > 50) {
            data.stickyElements.push({
              tag: el.tagName,
              class: el.className?.toString().slice(0, 50),
              text: el.textContent?.trim().slice(0, 30),
            })
          }
        }
      })

      // Elements with transform/opacity changes (animations in progress)
      document.querySelectorAll('[style*="transform"], [style*="opacity"], [class*="aos"], [class*="animate"], [class*="reveal"], [class*="visible"], [data-w-id]').forEach(el => {
        const s = getComputedStyle(el)
        const rect = el.getBoundingClientRect()
        if (rect.width === 0) return
        const isInView = rect.top < window.innerHeight && rect.bottom > 0
        if (isInView) {
          data.visibleAnimations.push({
            tag: el.tagName,
            class: el.className?.toString().slice(0, 60),
            transform: s.transform !== 'none' ? s.transform : null,
            opacity: s.opacity !== '1' ? s.opacity : null,
            inView: true,
            scrollY: scrollPos,
          })
        }
      })

      // Counter elements (numbers that animate)
      document.querySelectorAll('[class*="counter"], [class*="number"], [class*="stat"], [data-target]').forEach(el => {
        data.counterElements.push({
          text: el.textContent?.trim().slice(0, 20),
          class: el.className?.toString().slice(0, 40),
        })
      })

      return data
    }, scrollY)

    if (frameData.stickyElements.length > 0) {
      scrollEffects.sticky.push(...frameData.stickyElements.filter(
        s => !scrollEffects.sticky.some(e => e.class === s.class)
      ))
    }

    if (i > 0 && frameData.visibleAnimations.length > 0) {
      for (const anim of frameData.visibleAnimations) {
        const existing = scrollEffects.fadeIn.find(e => e.class === anim.class)
        if (!existing && anim.opacity !== null) {
          scrollEffects.fadeIn.push(anim)
        }
        if (!existing && anim.transform) {
          scrollEffects.slideIn.push(anim)
        }
      }
    }

    if (frameData.counterElements.length > 0) {
      scrollEffects.counters = frameData.counterElements
    }
  }

  // Collect mutation changes
  const mutations = await page.evaluate(() => {
    window.__scrollObserver.disconnect()
    return window.__scrollChanges.slice(0, 100)
  })

  // Detect parallax from background-attachment
  const parallaxElements = await page.evaluate(() => {
    const result = []
    document.querySelectorAll('*').forEach(el => {
      const s = getComputedStyle(el)
      if (s.backgroundAttachment === 'fixed') {
        result.push({
          tag: el.tagName,
          class: el.className?.toString().slice(0, 50),
          backgroundImage: s.backgroundImage.slice(0, 100),
        })
      }
    })
    return result
  })
  scrollEffects.parallax = parallaxElements

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(500)

  return { scrollEffects, mutations: mutations.slice(0, 50) }
}

module.exports = { extractScrollEffects }
