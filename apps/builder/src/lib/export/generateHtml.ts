import type { SiteConfig, PageConfig, Brand, SiteIntegrations } from '@/types/site'
import { getGoogleFontsMap } from '@/lib/fonts'
import { renderSectionsToHtml } from './renderSections'
import { getInteractivityScript } from './interactivity'

/**
 * Generate a full static HTML page from a SiteConfig + PageConfig.
 * This is the core of the export engine.
 */
export function generatePageHtml(siteConfig: SiteConfig, page: PageConfig, allCss: string, siteSlug: string): string {
  const { meta, brand } = siteConfig
  const seo = page.seo
  const lang = meta.lang || 'fr'
  const title = seo.metaTitle || seo.title || page.title || meta.title
  const description = seo.metaDescription || seo.description || meta.description
  const ogImage = seo.ogImage || meta.ogImage
  const favicon = meta.favicon
  const canonicalUrl = seo.canonicalUrl

  // Google Fonts links
  const fontLinks = generateGoogleFontLinks(siteConfig)

  // Brand CSS variables
  const brandCss = generateBrandCss(brand)

  // Theme override CSS (from BrandStyleInjector)
  const themeOverrideCss = generateThemeOverrideCss()

  // Custom font-face rules
  const fontFaceCss = generateFontFaceCss(siteConfig)

  // Analytics scripts
  const analyticsScripts = generateAnalyticsScripts(siteConfig.integrations)

  // JSON-LD
  const jsonLd = siteConfig.jsonLd
    ? `<script type="application/ld+json">${siteConfig.jsonLd}</script>`
    : ''

  // Server-render all visible sections to static HTML
  const sectionsHtml = renderSectionsToHtml(siteConfig, page.sections)

  // Interactivity script (forms POST to builder's public leads API)
  const builderUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://builder.jlstudio.dev'
  const formEndpoint = `${builderUrl}/api/public/leads?siteSlug=${siteSlug}`
  const interactivityScript = getInteractivityScript(formEndpoint)

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  ${ogImage ? `<meta property="og:image" content="${escapeHtml(ogImage)}">` : ''}
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  ${favicon ? `<link rel="icon" href="${escapeHtml(favicon)}">` : ''}
  ${canonicalUrl ? `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">` : ''}
  ${seo.noIndex ? '<meta name="robots" content="noindex, nofollow">' : ''}
  ${fontLinks}
  <script src="https://cdn.tailwindcss.com/3.4.17"></script>
  <style>
    ${brandCss}
    ${themeOverrideCss}
    ${fontFaceCss}
    ${allCss}
  </style>
  ${meta.headCode || ''}
  ${page.headCode || ''}
  ${analyticsScripts.head}
</head>
<body class="antialiased" style="font-family: ${brand.typography.body}, system-ui, sans-serif; margin: 0;">
  <div id="site-canvas">
    ${sectionsHtml}
  </div>
  ${jsonLd}
  ${meta.bodyCode || ''}
  ${page.bodyCode || ''}
  ${analyticsScripts.body}
  <script>${interactivityScript}</script>
</body>
</html>`
    // Clean up empty lines from conditional template expressions
    .replace(/^\s*\n/gm, '')
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function generateGoogleFontLinks(config: SiteConfig): string {
  const googleFontsMap = getGoogleFontsMap()
  const fonts = new Set<string>()

  // Brand fonts
  fonts.add(config.brand.typography.heading)
  fonts.add(config.brand.typography.body)

  // Section-level & element-level fonts
  for (const page of config.pages) {
    for (const section of page.sections) {
      if (section.style.fontFamily) fonts.add(section.style.fontFamily)
      const elStyles = section.content.__elementStyles as Record<string, Record<string, unknown>> | undefined
      if (elStyles) {
        for (const style of Object.values(elStyles)) {
          if (style.fontFamily && typeof style.fontFamily === 'string') {
            fonts.add(style.fontFamily)
          }
        }
      }
    }
  }

  // Class-level fonts
  for (const cls of config.classes ?? []) {
    const ff = (cls.styles as Record<string, unknown>).fontFamily
    if (ff && typeof ff === 'string') fonts.add(ff)
  }

  const googleFonts: string[] = []
  for (const font of fonts) {
    const encoded = googleFontsMap[font]
    if (encoded) {
      googleFonts.push(`family=${encoded}`)
    }
  }

  if (googleFonts.length === 0) return ''

  return `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${googleFonts.join('&')}&display=swap">`
}

function generateBrandCss(brand: Brand): string {
  const borderRadiusMap: Record<string, string> = {
    none: '0px', sm: '4px', md: '8px', lg: '12px', full: '9999px',
  }
  const spacingMap: Record<string, string> = {
    compact: '0.85', default: '1', relaxed: '1.2',
  }

  return `
#site-canvas {
  --color-primary: ${brand.colors.primary};
  --color-secondary: ${brand.colors.secondary};
  --color-accent: ${brand.colors.accent};
  --color-background: ${brand.colors.background};
  --color-foreground: ${brand.colors.foreground};
  --color-muted: ${brand.colors.muted};
  --font-heading: ${brand.typography.heading};
  --font-body: ${brand.typography.body};
  --border-radius: ${borderRadiusMap[brand.borderRadius] ?? '8px'};
  --spacing-scale: ${spacingMap[brand.spacing] ?? '1'};
  font-family: ${brand.typography.body}, system-ui, sans-serif;
}`
}

function generateFontFaceCss(config: SiteConfig): string {
  const customFonts = config.customFonts ?? []
  if (customFonts.length === 0) return ''

  return customFonts.map(font =>
    (font as unknown as { files: Array<{ url: string; format: string; weight: number; style: string }> }).files?.map(file =>
      `@font-face {
  font-family: '${(font as unknown as { name: string }).name}';
  src: url('${file.url}') format('${file.format}');
  font-weight: ${file.weight};
  font-style: ${file.style};
  font-display: swap;
}`
    ).join('\n')
  ).join('\n')
}

function generateThemeOverrideCss(): string {
  return `
/* Backgrounds */
#site-canvas section, #site-canvas header, #site-canvas footer, #site-canvas nav { background-color: var(--color-background); }
#site-canvas .bg-zinc-50, #site-canvas .bg-zinc-100, #site-canvas .bg-slate-50, #site-canvas .bg-slate-100, #site-canvas .bg-gray-50, #site-canvas .bg-gray-100 { background-color: var(--color-muted); }
#site-canvas .bg-white { background-color: var(--color-background); }

/* Text */
#site-canvas .text-zinc-900, #site-canvas .text-zinc-800, #site-canvas .text-zinc-700,
#site-canvas .text-slate-900, #site-canvas .text-slate-800, #site-canvas .text-slate-700,
#site-canvas .text-gray-900, #site-canvas .text-gray-800, #site-canvas .text-gray-700 { color: var(--color-foreground); }

#site-canvas .text-white, #site-canvas .text-slate-200, #site-canvas .text-slate-300,
#site-canvas .text-zinc-200, #site-canvas .text-zinc-300 { color: var(--color-foreground); }

#site-canvas .text-zinc-500, #site-canvas .text-zinc-600, #site-canvas .text-zinc-400,
#site-canvas .text-slate-500, #site-canvas .text-slate-400,
#site-canvas .text-gray-500, #site-canvas .text-gray-600 { color: color-mix(in srgb, var(--color-foreground) 60%, transparent); }

/* Primary */
#site-canvas .bg-indigo-600, #site-canvas .bg-indigo-500, #site-canvas .bg-indigo-700,
#site-canvas .bg-blue-600, #site-canvas .bg-blue-500, #site-canvas .bg-blue-700,
#site-canvas .bg-purple-600, #site-canvas .bg-purple-500, #site-canvas .bg-purple-700,
#site-canvas .bg-emerald-600, #site-canvas .bg-emerald-500, #site-canvas .bg-emerald-700,
#site-canvas .bg-green-600, #site-canvas .bg-green-500,
#site-canvas .bg-amber-700, #site-canvas .bg-amber-600,
#site-canvas .bg-orange-600, #site-canvas .bg-orange-500,
#site-canvas .bg-rose-600, #site-canvas .bg-rose-500,
#site-canvas .bg-cyan-600, #site-canvas .bg-cyan-500,
#site-canvas .bg-teal-600, #site-canvas .bg-teal-500 { background-color: var(--color-primary); }

#site-canvas .text-indigo-600, #site-canvas .text-indigo-500,
#site-canvas .text-blue-600, #site-canvas .text-blue-500,
#site-canvas .text-purple-600, #site-canvas .text-purple-500,
#site-canvas .text-emerald-600, #site-canvas .text-emerald-500,
#site-canvas .text-green-600, #site-canvas .text-green-500,
#site-canvas .text-amber-700, #site-canvas .text-amber-600,
#site-canvas .text-orange-600, #site-canvas .text-orange-500,
#site-canvas .text-rose-600, #site-canvas .text-rose-500,
#site-canvas .text-cyan-600, #site-canvas .text-cyan-500,
#site-canvas .text-teal-600, #site-canvas .text-teal-500 { color: var(--color-primary); }

/* Primary tint backgrounds */
#site-canvas .bg-indigo-50, #site-canvas .bg-blue-50, #site-canvas .bg-purple-50,
#site-canvas .bg-emerald-50, #site-canvas .bg-green-50, #site-canvas .bg-amber-50,
#site-canvas .bg-orange-50, #site-canvas .bg-rose-50, #site-canvas .bg-cyan-50,
#site-canvas .bg-teal-50 { background-color: color-mix(in srgb, var(--color-primary) 8%, var(--color-background)); }

/* Borders */
#site-canvas .border-zinc-200, #site-canvas .border-zinc-100, #site-canvas .border-zinc-300,
#site-canvas .border-slate-200, #site-canvas .border-slate-700,
#site-canvas .border-gray-200 { border-color: color-mix(in srgb, var(--color-foreground) 15%, transparent); }

#site-canvas .border-indigo-100, #site-canvas .border-indigo-200,
#site-canvas .border-blue-100, #site-canvas .border-blue-200 { border-color: color-mix(in srgb, var(--color-primary) 25%, transparent); }

/* Gradients */
#site-canvas .from-indigo-600, #site-canvas .from-blue-600,
#site-canvas .from-purple-600 { --tw-gradient-from: var(--color-primary); }
#site-canvas .to-indigo-800, #site-canvas .to-purple-800,
#site-canvas .to-blue-800 { --tw-gradient-to: color-mix(in srgb, var(--color-primary) 80%, black); }

/* Buttons — keep white text on primary bg */
#site-canvas button.text-white, #site-canvas a.text-white,
#site-canvas [role="button"].text-white { color: #ffffff !important; }
`
}

function generateAnalyticsScripts(integrations: SiteIntegrations): { head: string; body: string } {
  const head: string[] = []
  const body: string[] = []

  // Google Analytics
  if (integrations.analytics?.provider === 'gtag' && integrations.analytics.id) {
    head.push(`<script async src="https://www.googletagmanager.com/gtag/js?id=${integrations.analytics.id}"></script>`)
    head.push(`<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${integrations.analytics.id}');</script>`)
  }

  // GTM
  if (integrations.gtm?.containerId) {
    head.push(`<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${integrations.gtm.containerId}');</script>`)
    body.push(`<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${integrations.gtm.containerId}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>`)
  }

  // Plausible
  if (integrations.analytics?.provider === 'plausible' && integrations.analytics.id) {
    head.push(`<script defer data-domain="${integrations.analytics.id}" src="https://plausible.io/js/script.js"></script>`)
  }

  // Umami
  if (integrations.analytics?.provider === 'umami' && integrations.analytics.id) {
    const host = integrations.analytics.host || 'https://cloud.umami.is'
    head.push(`<script defer data-website-id="${integrations.analytics.id}" src="${host}/script.js"></script>`)
  }

  // Meta Pixel
  if (integrations.metaPixel?.pixelId) {
    head.push(`<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${integrations.metaPixel.pixelId}');fbq('track','PageView');</script>`)
  }

  // Hotjar
  if (integrations.hotjar?.siteId) {
    head.push(`<script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:${integrations.hotjar.siteId},hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>`)
  }

  return { head: head.join('\n  '), body: body.join('\n  ') }
}
