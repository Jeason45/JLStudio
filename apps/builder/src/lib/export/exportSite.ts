import { mkdir, writeFile, rm } from 'fs/promises'
import { join } from 'path'
import type { SiteConfig } from '@/types/site'
import { generatePageHtml } from './generateHtml'

// Base directory where exported sites are stored
// In production (Coolify), this should be a volume mounted to Nginx
const EXPORT_BASE = process.env.EXPORT_DIR || '/var/www/sites'

export interface ExportResult {
  success: boolean
  siteSlug: string
  pagesExported: number
  outputDir: string
  duration: number
  error?: string
}

/**
 * Export a site to static HTML files.
 *
 * Structure:
 *   /var/www/sites/{slug}/
 *   ├── index.html          (home page)
 *   ├── about/index.html    (about page)
 *   ├── contact/index.html  (contact page)
 *   ├── robots.txt
 *   └── sitemap.xml
 */
export async function exportSite(
  siteConfig: SiteConfig,
  siteSlug: string,
  tailwindCss: string,
): Promise<ExportResult> {
  const startTime = Date.now()
  const outputDir = join(EXPORT_BASE, siteSlug)

  try {
    // Clean previous export
    await rm(outputDir, { recursive: true, force: true })
    await mkdir(outputDir, { recursive: true })

    let pagesExported = 0

    for (const page of siteConfig.pages) {
      if (page.isUtilityPage) continue

      // Generate HTML
      const html = generatePageHtml(siteConfig, page, tailwindCss, siteSlug)

      // Determine output path
      const slug = page.slug === '/' || page.slug === '' ? '' : page.slug.replace(/^\//, '')

      if (slug === '') {
        // Home page
        await writeFile(join(outputDir, 'index.html'), html, 'utf-8')
      } else {
        // Sub-page: /about → /about/index.html
        const pageDir = join(outputDir, slug)
        await mkdir(pageDir, { recursive: true })
        await writeFile(join(pageDir, 'index.html'), html, 'utf-8')
      }

      pagesExported++
    }

    // Generate robots.txt
    const robotsTxt = siteConfig.robotsTxt || `User-agent: *\nAllow: /\nSitemap: ${siteConfig.meta.url || ''}/sitemap.xml`
    await writeFile(join(outputDir, 'robots.txt'), robotsTxt, 'utf-8')

    // Generate sitemap.xml
    const sitemapXml = generateSitemap(siteConfig)
    await writeFile(join(outputDir, 'sitemap.xml'), sitemapXml, 'utf-8')

    // Generate 404.html
    const notFoundPage = siteConfig.pages.find(p => p.slug === '404' || p.isUtilityPage)
    if (notFoundPage) {
      const html404 = generatePageHtml(siteConfig, notFoundPage, tailwindCss, siteSlug)
      await writeFile(join(outputDir, '404.html'), html404, 'utf-8')
    } else {
      await writeFile(join(outputDir, '404.html'), generate404Html(siteConfig), 'utf-8')
    }

    return {
      success: true,
      siteSlug,
      pagesExported,
      outputDir,
      duration: Date.now() - startTime,
    }
  } catch (error) {
    return {
      success: false,
      siteSlug,
      pagesExported: 0,
      outputDir,
      duration: Date.now() - startTime,
      error: String(error),
    }
  }
}

function generateSitemap(config: SiteConfig): string {
  const baseUrl = config.meta.url || ''
  const pages = config.pages
    .filter(p => !p.isUtilityPage && !p.seo.noIndex)
    .map(p => {
      const slug = p.slug === '/' || p.slug === '' ? '' : p.slug.replace(/^\//, '')
      const loc = slug === '' ? baseUrl : `${baseUrl}/${slug}`
      return `  <url><loc>${loc}</loc></url>`
    })

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.join('\n')}
</urlset>`
}

function generate404Html(config: SiteConfig): string {
  const { brand } = config
  return `<!DOCTYPE html>
<html lang="${config.meta.lang || 'fr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Page introuvable</title>
  <style>
    body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: ${brand.typography.body}, system-ui, sans-serif; background: ${brand.colors.background}; color: ${brand.colors.foreground}; }
    .container { text-align: center; }
    h1 { font-size: 6rem; font-weight: 800; margin: 0; opacity: 0.2; }
    p { font-size: 1.25rem; opacity: 0.6; margin: 1rem 0 2rem; }
    a { color: ${brand.colors.primary}; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="container">
    <h1>404</h1>
    <p>Page introuvable</p>
    <a href="/">Retour \u00E0 l'accueil</a>
  </div>
</body>
</html>`
}
