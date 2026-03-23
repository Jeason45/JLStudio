import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { SiteConfig } from '@/types/site'
import { sendDeployNotification } from '@/lib/deployEmails'

/**
 * POST /api/sites/[siteId]/export
 *
 * Exports a site to static HTML files and writes them to the filesystem.
 * Creates a Deploy record and updates the site status to PUBLISHED on success.
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const startTime = Date.now()

  try {
    const { siteId } = await params

    // Fetch site from DB
    const site = await prisma.site.findUnique({
      where: { id: siteId },
    })

    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404 })
    }

    const siteConfig = site.config as unknown as SiteConfig

    if (!siteConfig.pages || siteConfig.pages.length === 0) {
      return NextResponse.json({ error: 'Aucune page à exporter' }, { status: 400 })
    }

    // Ensure the siteConfig has the site ID (needed for form submissions, component resolution, etc.)
    if (!siteConfig.id) {
      siteConfig.id = siteId
    }

    const totalSections = siteConfig.pages.reduce(
      (sum, p) => sum + (p.isUtilityPage ? 0 : p.sections.filter(s => s.visible).length),
      0
    )
    console.log(`[Export] Starting export for "${site.name}" (${site.slug}): ${siteConfig.pages.length} pages, ${totalSections} sections`)

    // CSS is loaded via Tailwind CDN in the HTML — allCss is for additional custom CSS
    const customCss = ''

    // Dynamic import to avoid Turbopack tracing client components into server module graph
    const { exportSite } = await import('@/lib/export/exportSite')

    // Run the export
    const result = await exportSite(siteConfig, site.slug, customCss)

    const deployUrl = siteConfig.meta.url || `https://${site.slug}.jlstudio.dev`
    const totalDuration = Date.now() - startTime

    if (!result.success) {
      console.error(`[Export] Failed for "${site.slug}":`, result.error)

      // Record failed deploy
      await prisma.deploy.create({
        data: {
          siteId,
          status: 'FAILED',
          pagesExported: 0,
          duration: totalDuration,
          outputDir: result.outputDir,
          error: result.error,
        },
      })

      return NextResponse.json({
        error: 'Export échoué',
        details: result.error,
      }, { status: 500 })
    }

    // Update site status to PUBLISHED
    await prisma.site.update({
      where: { id: siteId },
      data: {
        status: 'PUBLISHED',
        deployUrl,
      },
    })

    // Record successful deploy
    const deploy = await prisma.deploy.create({
      data: {
        siteId,
        status: 'SUCCESS',
        pagesExported: result.pagesExported,
        duration: totalDuration,
        outputDir: result.outputDir,
        deployUrl,
      },
    })

    console.log(`[Export] Success for "${site.slug}": ${result.pagesExported} pages in ${totalDuration}ms → ${result.outputDir}`)

    // Send deploy notification email (non-blocking)
    sendDeployNotification(
      site.name,
      site.slug,
      deployUrl,
      result.pagesExported,
      totalDuration,
    ).catch(err => console.error('[Export] Notification email failed:', err))

    return NextResponse.json({
      success: true,
      deployId: deploy.id,
      pagesExported: result.pagesExported,
      duration: totalDuration,
      outputDir: result.outputDir,
      deployUrl,
    })
  } catch (error) {
    console.error('[Export] Error:', error)
    return NextResponse.json({
      error: 'Erreur serveur lors de l\'export',
      details: String(error),
    }, { status: 500 })
  }
}
