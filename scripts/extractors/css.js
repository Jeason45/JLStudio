/**
 * Deep CSS extraction: computed styles for key elements, per section
 */

async function extractCSS(page, sections) {
  // Global styles
  const globalStyles = await page.evaluate(() => {
    const cs = getComputedStyle(document.body)
    const html = getComputedStyle(document.documentElement)

    function getStyles(el, props) {
      const s = getComputedStyle(el)
      const result = {}
      for (const p of props) result[p] = s.getPropertyValue(p)
      return result
    }

    const textProps = ['font-family', 'font-size', 'font-weight', 'line-height', 'letter-spacing', 'text-transform', 'color']

    // Headings
    const headings = {}
    for (const tag of ['h1', 'h2', 'h3', 'h4']) {
      const el = document.querySelector(tag)
      if (el) headings[tag] = getStyles(el, textProps)
    }

    // Buttons
    const buttons = []
    const btnSelectors = 'button, .btn, [class*="btn"], a[class*="button"], [class*="cta"], [role="button"]'
    document.querySelectorAll(btnSelectors).forEach((el, i) => {
      if (i >= 10) return
      const s = getComputedStyle(el)
      buttons.push({
        text: el.textContent?.trim().slice(0, 50),
        styles: {
          background: s.background,
          backgroundColor: s.backgroundColor,
          color: s.color,
          border: s.border,
          borderRadius: s.borderRadius,
          padding: s.padding,
          fontWeight: s.fontWeight,
          textTransform: s.textTransform,
          letterSpacing: s.letterSpacing,
          fontSize: s.fontSize,
          fontFamily: s.fontFamily,
        },
      })
    })

    // Cards
    const cards = []
    document.querySelectorAll('[class*="card"], [class*="item"], [class*="Card"]').forEach((el, i) => {
      if (i >= 6) return
      const s = getComputedStyle(el)
      cards.push({
        className: el.className?.toString().slice(0, 80),
        styles: {
          background: s.backgroundColor,
          border: s.border,
          borderRadius: s.borderRadius,
          boxShadow: s.boxShadow,
          padding: s.padding,
        },
      })
    })

    // Inputs
    const inputs = []
    document.querySelectorAll('input, textarea, select').forEach((el, i) => {
      if (i >= 5) return
      const s = getComputedStyle(el)
      inputs.push({
        type: el.type || el.tagName.toLowerCase(),
        styles: {
          border: s.border,
          borderRadius: s.borderRadius,
          background: s.backgroundColor,
          height: s.height,
          padding: s.padding,
          fontSize: s.fontSize,
        },
      })
    })

    return {
      body: {
        fontFamily: cs.fontFamily,
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
      },
      headings,
      buttons,
      cards,
      inputs,
    }
  })

  // Per-section styles
  const sectionStyles = []
  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]
    const styles = await page.evaluate((selector) => {
      const el = document.querySelector(selector)
      if (!el) return null
      const cs = getComputedStyle(el)

      // Find first heading in section
      const heading = el.querySelector('h1, h2, h3')
      let headingStyles = null
      if (heading) {
        const hs = getComputedStyle(heading)
        headingStyles = {
          fontFamily: hs.fontFamily,
          fontSize: hs.fontSize,
          fontWeight: hs.fontWeight,
          lineHeight: hs.lineHeight,
          letterSpacing: hs.letterSpacing,
          textTransform: hs.textTransform,
          color: hs.color,
        }
      }

      // Find paragraphs
      const para = el.querySelector('p')
      let paraStyles = null
      if (para) {
        const ps = getComputedStyle(para)
        paraStyles = {
          fontFamily: ps.fontFamily,
          fontSize: ps.fontSize,
          fontWeight: ps.fontWeight,
          lineHeight: ps.lineHeight,
          color: ps.color,
        }
      }

      return {
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        backgroundAttachment: cs.backgroundAttachment,
        color: cs.color,
        height: el.offsetHeight + 'px',
        heading: headingStyles,
        paragraph: paraStyles,
      }
    }, s.selector)

    sectionStyles.push({ index: i, tag: s.tag, selector: s.selector, ...styles })
  }

  return { globalStyles, sectionStyles }
}

module.exports = { extractCSS }
