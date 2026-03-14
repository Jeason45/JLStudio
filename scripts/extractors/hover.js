/**
 * Detect hover effects on interactive elements
 */

async function extractHoverEffects(page) {
  const effects = []

  // Get all interactive elements
  const elements = await page.evaluate(() => {
    const selectors = [
      'button', '.btn', '[class*="btn"]', 'a[class*="button"]',
      '[class*="card"]', '[class*="Card"]',
      '[class*="link"]', 'nav a',
      '[class*="cta"]', '[role="button"]',
    ]
    const els = []
    const seen = new Set()
    for (const sel of selectors) {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (i >= 5 || seen.has(el)) return
        seen.add(el)
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) return
        const id = `${el.tagName}-${el.className?.toString().slice(0, 40)}-${el.textContent?.trim().slice(0, 20)}`
        els.push({
          id,
          selector: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : ''),
          text: el.textContent?.trim().slice(0, 50),
          x: rect.x + rect.width / 2,
          y: rect.y + rect.height / 2,
        })
      })
    }
    return els.slice(0, 20)
  })

  for (const el of elements) {
    try {
      // Get styles BEFORE hover
      const before = await page.evaluate(({ x, y }) => {
        const el = document.elementFromPoint(x, y)
        if (!el) return null
        const s = getComputedStyle(el)
        return {
          transform: s.transform,
          backgroundColor: s.backgroundColor,
          color: s.color,
          boxShadow: s.boxShadow,
          borderColor: s.borderColor,
          opacity: s.opacity,
          scale: s.scale,
          filter: s.filter,
        }
      }, el)

      if (!before) continue

      // Hover
      await page.mouse.move(el.x, el.y)
      await page.waitForTimeout(400) // Wait for transitions

      // Get styles AFTER hover
      const after = await page.evaluate(({ x, y }) => {
        const el = document.elementFromPoint(x, y)
        if (!el) return null
        const s = getComputedStyle(el)
        return {
          transform: s.transform,
          backgroundColor: s.backgroundColor,
          color: s.color,
          boxShadow: s.boxShadow,
          borderColor: s.borderColor,
          opacity: s.opacity,
          scale: s.scale,
          filter: s.filter,
        }
      }, el)

      if (!after) continue

      // Compute diff
      const diff = {}
      for (const [key, val] of Object.entries(after)) {
        if (before[key] !== val) diff[key] = { from: before[key], to: val }
      }

      if (Object.keys(diff).length > 0) {
        effects.push({
          element: el.text,
          selector: el.selector,
          changes: diff,
        })
      }

      // Move away to reset hover
      await page.mouse.move(0, 0)
      await page.waitForTimeout(100)
    } catch {}
  }

  // Get transitions from CSS
  const transitions = await page.evaluate(() => {
    const result = []
    const els = document.querySelectorAll('button, a, [class*="card"], [class*="btn"], img')
    els.forEach((el, i) => {
      if (i >= 20) return
      const s = getComputedStyle(el)
      const tp = s.transitionProperty
      if (tp && tp !== 'all' && tp !== 'none') {
        result.push({
          element: el.tagName + '.' + (el.className?.toString().split(' ')[0] || ''),
          transitionProperty: tp,
          transitionDuration: s.transitionDuration,
          transitionTimingFunction: s.transitionTimingFunction,
        })
      }
    })
    return result
  })

  return { hoverEffects: effects, transitions }
}

module.exports = { extractHoverEffects }
