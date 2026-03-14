/**
 * Extract @keyframes, CSS animations, and GSAP timelines
 */

async function extractAnimations(page) {
  return page.evaluate(() => {
    const result = {
      keyframes: [],
      cssAnimations: [],
      gsapTimelines: [],
    }

    // Extract @keyframes from stylesheets
    try {
      for (const sheet of document.styleSheets) {
        try {
          for (const rule of sheet.cssRules) {
            if (rule instanceof CSSKeyframesRule) {
              const frames = []
              for (const kf of rule.cssRules) {
                const props = {}
                for (let i = 0; i < kf.style.length; i++) {
                  const prop = kf.style[i]
                  props[prop] = kf.style.getPropertyValue(prop)
                }
                frames.push({ offset: kf.keyText, properties: props })
              }
              result.keyframes.push({
                name: rule.name,
                frames,
              })
            }
          }
        } catch {}
      }
    } catch {}

    // Elements with CSS animations
    const animatedEls = document.querySelectorAll('*')
    const seen = new Set()
    animatedEls.forEach(el => {
      const s = getComputedStyle(el)
      const animName = s.animationName
      if (animName && animName !== 'none' && !seen.has(animName)) {
        seen.add(animName)
        result.cssAnimations.push({
          name: animName,
          duration: s.animationDuration,
          timingFunction: s.animationTimingFunction,
          delay: s.animationDelay,
          iterationCount: s.animationIterationCount,
          direction: s.animationDirection,
          fillMode: s.animationFillMode,
          element: el.tagName + '.' + (el.className?.toString().split(' ')[0] || ''),
        })
      }
    })

    // GSAP detection
    if (window.gsap) {
      try {
        const tweens = window.gsap.globalTimeline?.getChildren?.(true, true, false) || []
        result.gsapTimelines = tweens.slice(0, 20).map(t => ({
          type: t.constructor?.name || 'Tween',
          duration: t.duration?.() ?? null,
          delay: t.delay?.() ?? null,
          vars: t.vars ? Object.keys(t.vars).slice(0, 10) : [],
        }))
      } catch {}
    }

    return result
  })
}

module.exports = { extractAnimations }
