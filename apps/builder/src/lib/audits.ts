import type { SiteConfig, PageConfig, SectionConfig } from '@/types/site'

export type AuditCategory = 'seo' | 'accessibility' | 'performance'
export type Severity = 'error' | 'warning' | 'info' | 'pass'

export interface AuditResult {
  id: string
  category: AuditCategory
  severity: Severity
  title: string
  description: string
  element?: string
}

// Simple relative luminance (sRGB)
function luminance(hex: string): number {
  const rgb = hex.replace('#', '').match(/.{2}/g)
  if (!rgb || rgb.length < 3) return 0
  const [r, g, b] = rgb.map(c => {
    const v = parseInt(c, 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = luminance(hex1)
  const l2 = luminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function countContentItems(content: Record<string, unknown>): number {
  let count = 0
  for (const val of Object.values(content)) {
    if (Array.isArray(val)) count += val.length
    else if (val && typeof val === 'object') count++
  }
  return count
}

function findMissingAltImages(sections: SectionConfig[]): string[] {
  const missing: string[] = []
  for (const section of sections) {
    const content = section.content as Record<string, unknown>
    // Check top-level image fields
    if (content.image && typeof content.image === 'string' && !content.imageAlt) {
      missing.push(`${section.type} (${section.id.slice(0, 8)})`)
    }
    // Check items arrays for missing alt
    if (Array.isArray(content.items)) {
      for (const item of content.items) {
        if (item && typeof item === 'object' && 'image' in item && item.image && !('imageAlt' in item && item.imageAlt)) {
          missing.push(`${section.type} item`)
        }
      }
    }
  }
  return missing
}

export function runAudits(siteConfig: SiteConfig): AuditResult[] {
  const results: AuditResult[] = []
  let id = 0
  const next = () => String(++id)

  // ── SEO ──

  // Check meta title/description per page
  for (const page of siteConfig.pages) {
    if (!page.seo.title && !page.seo.metaTitle) {
      results.push({
        id: next(), category: 'seo', severity: 'warning',
        title: `Missing meta title on "${page.title}"`,
        description: 'Add a meta title to improve SEO ranking for this page.',
        element: page.title,
      })
    }
    if (!page.seo.description && !page.seo.metaDescription) {
      results.push({
        id: next(), category: 'seo', severity: 'warning',
        title: `Missing meta description on "${page.title}"`,
        description: 'A meta description improves click-through rates from search results.',
        element: page.title,
      })
    }
  }

  // Global SEO
  if (!siteConfig.meta.seoTitle && !siteConfig.meta.title) {
    results.push({
      id: next(), category: 'seo', severity: 'error',
      title: 'Missing global site title',
      description: 'Set a global site title in Site Settings > SEO.',
    })
  }

  if (!siteConfig.meta.ogImage) {
    results.push({
      id: next(), category: 'seo', severity: 'info',
      title: 'No Open Graph image set',
      description: 'An OG image improves social media sharing appearance.',
    })
  }

  // Check heading hierarchy (h1 per page)
  for (const page of siteConfig.pages) {
    const heroSections = page.sections.filter(s => s.type === 'hero')
    if (heroSections.length === 0 && page.sections.length > 0) {
      results.push({
        id: next(), category: 'seo', severity: 'info',
        title: `No hero/h1 on "${page.title}"`,
        description: 'Each page should have a single H1 heading (typically in a Hero section).',
        element: page.title,
      })
    }
    if (heroSections.length > 1) {
      results.push({
        id: next(), category: 'seo', severity: 'warning',
        title: `Multiple hero sections on "${page.title}"`,
        description: 'Having multiple H1 headings can confuse search engines.',
        element: page.title,
      })
    }
  }

  // ── Accessibility ──

  // Check brand color contrast
  const { colors } = siteConfig.brand
  const fgBgRatio = contrastRatio(colors.foreground, colors.background)
  if (fgBgRatio < 4.5) {
    results.push({
      id: next(), category: 'accessibility', severity: 'error',
      title: 'Low contrast: foreground/background',
      description: `Contrast ratio is ${fgBgRatio.toFixed(1)}:1 (WCAG AA requires 4.5:1). Adjust your brand colors.`,
    })
  } else {
    results.push({
      id: next(), category: 'accessibility', severity: 'pass',
      title: 'Foreground/background contrast OK',
      description: `Contrast ratio is ${fgBgRatio.toFixed(1)}:1 (WCAG AA: 4.5:1 min).`,
    })
  }

  const primaryBgRatio = contrastRatio(colors.primary, colors.background)
  if (primaryBgRatio < 3) {
    results.push({
      id: next(), category: 'accessibility', severity: 'warning',
      title: 'Low contrast: primary/background',
      description: `Contrast ratio is ${primaryBgRatio.toFixed(1)}:1. Buttons with primary color may be hard to read.`,
    })
  }

  // Check lang attribute
  if (!siteConfig.meta.lang) {
    results.push({
      id: next(), category: 'accessibility', severity: 'warning',
      title: 'Missing language attribute',
      description: 'Set a language in Site Settings to help screen readers.',
    })
  } else {
    results.push({
      id: next(), category: 'accessibility', severity: 'pass',
      title: 'Language attribute set',
      description: `Language is set to "${siteConfig.meta.lang}".`,
    })
  }

  // Check alt text on images
  const allSections = siteConfig.pages.flatMap(p => p.sections)
  const missingAlt = findMissingAltImages(allSections)
  if (missingAlt.length > 0) {
    results.push({
      id: next(), category: 'accessibility', severity: 'error',
      title: `${missingAlt.length} image(s) missing alt text`,
      description: 'Add alt text to all images for screen readers.',
      element: missingAlt.slice(0, 3).join(', '),
    })
  } else {
    results.push({
      id: next(), category: 'accessibility', severity: 'pass',
      title: 'All images have alt text',
      description: 'No missing alt attributes detected.',
    })
  }

  // ── Performance ──

  // Detect sections with many items
  for (const page of siteConfig.pages) {
    for (const section of page.sections) {
      const itemCount = countContentItems(section.content)
      if (itemCount > 10) {
        results.push({
          id: next(), category: 'performance', severity: 'warning',
          title: `Heavy section: ${section.type}`,
          description: `Section has ${itemCount} content items. Consider splitting or paginating.`,
          element: `${page.title} > ${section.type}`,
        })
      }
    }
  }

  // Check total section count
  const totalSections = siteConfig.pages.reduce((acc, p) => acc + p.sections.length, 0)
  if (totalSections > 30) {
    results.push({
      id: next(), category: 'performance', severity: 'warning',
      title: `${totalSections} total sections across all pages`,
      description: 'Large number of sections may slow initial load. Consider lazy loading.',
    })
  } else {
    results.push({
      id: next(), category: 'performance', severity: 'pass',
      title: 'Section count is reasonable',
      description: `${totalSections} sections across ${siteConfig.pages.length} page(s).`,
    })
  }

  // Check for background images (performance hint)
  const bgImageSections = allSections.filter(s => s.style.backgroundImage?.url)
  if (bgImageSections.length > 3) {
    results.push({
      id: next(), category: 'performance', severity: 'info',
      title: `${bgImageSections.length} sections with background images`,
      description: 'Many background images can slow page load. Ensure they are optimized.',
    })
  }

  return results
}
