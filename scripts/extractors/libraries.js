/**
 * Detect JS libraries, meta tags, fonts, CSS variables, analytics
 */

async function extractLibraries(page) {
  return page.evaluate(() => {
    const result = {
      jsLibraries: {},
      meta: {},
      analytics: {},
      fonts: [],
      cssVariables: {},
    }

    // JS Libraries
    const libs = {
      gsap: !!window.gsap,
      lenis: !!window.__lenis,
      lottie: !!window.lottie || !!window.Lottie,
      spline: !!window.Spline,
      locomotive: !!window.locomotive || !!window.LocomotiveScroll,
      rive: !!window.rive,
      swiper: !!window.Swiper,
      splide: !!window.Splide,
      barba: !!window.barba,
      scrollTrigger: !!(window.gsap && window.ScrollTrigger),
      webflow: !!window.Webflow,
      jquery: !!window.jQuery || !!window.$,
    }
    for (const [k, v] of Object.entries(libs)) {
      if (v) result.jsLibraries[k] = true
    }

    // Meta tags
    const metaTags = ['title', 'description', 'og:title', 'og:description', 'og:image', 'og:type', 'twitter:card', 'theme-color']
    result.meta.title = document.title
    result.meta.lang = document.documentElement.lang || 'en'
    const favicon = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]')
    if (favicon) result.meta.favicon = favicon.href
    for (const name of metaTags) {
      const el = document.querySelector(`meta[property="${name}"], meta[name="${name}"]`)
      if (el) result.meta[name] = el.content
    }

    // Analytics
    result.analytics = {
      googleAnalytics: !!window.ga || !!window.gtag,
      googleTagManager: !!window.dataLayer,
      metaPixel: !!window.fbq,
      hotjar: !!window.hj,
    }

    // Google Fonts
    const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]')
    const fontFamilies = new Set()
    fontLinks.forEach(link => {
      const url = new URL(link.href)
      const family = url.searchParams.get('family')
      if (family) {
        family.split('|').forEach(f => {
          fontFamilies.add(f.split(':')[0].replace(/\+/g, ' '))
        })
      }
      // CSS2 format
      const families = url.searchParams.getAll('family')
      families.forEach(f => {
        fontFamilies.add(f.split(':')[0].split('@')[0].replace(/\+/g, ' '))
      })
    })

    // @font-face
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSFontFaceRule) {
              const family = rule.style.getPropertyValue('font-family').replace(/['"]/g, '').trim()
              if (family) fontFamilies.add(family)
            }
          }
        } catch {}
      }
    } catch {}

    result.fonts = [...fontFamilies]

    // CSS Variables from :root
    try {
      const rootStyles = getComputedStyle(document.documentElement)
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule.selectorText === ':root' || rule.selectorText === 'html') {
              for (let i = 0; i < rule.style.length; i++) {
                const prop = rule.style[i]
                if (prop.startsWith('--')) {
                  result.cssVariables[prop] = rootStyles.getPropertyValue(prop).trim()
                }
              }
            }
          }
        } catch {}
      }
    } catch {}

    return result
  })
}

module.exports = { extractLibraries }
