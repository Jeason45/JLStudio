import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { SiteConfig } from '@/types/site'
import { sendDeployNotification } from '@/lib/deployEmails'
import { deploySiteToCoolify, isCoolifyConfigured } from '@/lib/coolify'
import { collectExportedFiles } from '@/lib/deploy/collectExportedFiles'

/**
 * POST /api/sites/[siteId]/export
 *
 * Exports a site to static HTML, pushes to GitHub, and deploys via Coolify.
 * If Coolify is not configured, falls back to filesystem-only export.
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  const startTime = Date.now()

  try {
    const { siteId } = await params

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

    if (!siteConfig.id) {
      siteConfig.id = siteId
    }

    const totalSections = siteConfig.pages.reduce(
      (sum, p) => sum + (p.isUtilityPage ? 0 : p.sections.filter(s => s.visible).length),
      0
    )
    console.log(`[Export] Starting export for "${site.name}" (${site.slug}): ${siteConfig.pages.length} pages, ${totalSections} sections`)

    // Create a PENDING deploy record
    const deploy = await prisma.deploy.create({
      data: {
        siteId,
        status: 'PENDING',
        environment: 'production',
      },
    })

    // CSS is loaded via Tailwind CDN in the HTML
    const customCss = ''

    // Dynamic import to avoid Turbopack tracing client components into server module graph
    const { exportSite } = await import('@/lib/export/exportSite')

    // Step 1: Export to filesystem
    const result = await exportSite(siteConfig, site.slug, customCss)

    if (!result.success) {
      console.error(`[Export] Failed for "${site.slug}":`, result.error)

      await prisma.deploy.update({
        where: { id: deploy.id },
        data: {
          status: 'FAILED',
          duration: Date.now() - startTime,
          outputDir: result.outputDir,
          error: result.error,
        },
      })

      return NextResponse.json({
        error: 'Export échoué',
        details: result.error,
      }, { status: 500 })
    }

    const defaultDomain = `${site.slug}.jlstudio.dev`
    const customDomain = siteConfig.deploy?.customDomain
    const deployUrl = customDomain
      ? `https://${customDomain}`
      : siteConfig.meta.url || `https://${defaultDomain}`

    // Step 2: Deploy to Coolify (if configured)
    let coolifyDeployId: string | null = null
    let coolifyAppUuid = site.coolifyAppUuid

    if (isCoolifyConfigured()) {
      console.log(`[Export] Coolify is configured — deploying to Coolify...`)

      await prisma.deploy.update({
        where: { id: deploy.id },
        data: { status: 'BUILDING' },
      })

      const files = await collectExportedFiles(result.outputDir)
      const coolifyResult = await deploySiteToCoolify(
        site.slug,
        files,
        coolifyAppUuid,
        customDomain || defaultDomain,
      )

      if (!coolifyResult.success) {
        console.error(`[Export] Coolify deploy failed for "${site.slug}":`, coolifyResult.error)

        await prisma.deploy.update({
          where: { id: deploy.id },
          data: {
            status: 'FAILED',
            duration: Date.now() - startTime,
            outputDir: result.outputDir,
            error: `Export OK, Coolify failed: ${coolifyResult.error}`,
          },
        })

        return NextResponse.json({
          error: 'Export réussi mais déploiement Coolify échoué',
          details: coolifyResult.error,
          pagesExported: result.pagesExported,
        }, { status: 500 })
      }

      coolifyDeployId = coolifyResult.deploymentUuid || null
      coolifyAppUuid = coolifyResult.appUuid || null

      // Save app UUID on the site for future deploys
      if (coolifyResult.appUuid && coolifyResult.appUuid !== site.coolifyAppUuid) {
        await prisma.site.update({
          where: { id: siteId },
          data: { coolifyAppUuid: coolifyResult.appUuid },
        })
      }
    }

    const totalDuration = Date.now() - startTime

    // Update site status
    await prisma.site.update({
      where: { id: siteId },
      data: {
        status: 'PUBLISHED',
        deployUrl,
      },
    })

    // Update deploy record
    await prisma.deploy.update({
      where: { id: deploy.id },
      data: {
        status: coolifyDeployId ? 'BUILDING' : 'SUCCESS',
        pagesExported: result.pagesExported,
        duration: totalDuration,
        outputDir: result.outputDir,
        deployUrl,
        coolifyDeployId,
      },
    })

    console.log(`[Export] ${coolifyDeployId ? 'Building' : 'Success'} for "${site.slug}": ${result.pagesExported} pages in ${totalDuration}ms → ${result.outputDir}`)

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
      coolifyDeployId,
      coolifyAppUuid,
      building: !!coolifyDeployId,
    })
  } catch (error) {
    console.error('[Export] Error:', error)
    return NextResponse.json({
      error: 'Erreur serveur lors de l\'export',
      details: String(error),
    }, { status: 500 })
  }
}
