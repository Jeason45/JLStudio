import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getCoolifyDeploymentStatus, isCoolifyConfigured } from '@/lib/coolify'

/**
 * GET /api/sites/[siteId]/deploys/[deployId]
 *
 * Returns the status of a specific deploy.
 * If the deploy has a coolifyDeployId and is still BUILDING,
 * polls Coolify for the latest status and updates the record.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ siteId: string; deployId: string }> }
) {
  try {
    const { siteId, deployId } = await params

    const deploy = await prisma.deploy.findFirst({
      where: { id: deployId, siteId },
    })

    if (!deploy) {
      return NextResponse.json({ error: 'Deploy introuvable' }, { status: 404 })
    }

    // If still building and we have a Coolify deployment ID, check status
    if (
      deploy.status === 'BUILDING' &&
      deploy.coolifyDeployId &&
      isCoolifyConfigured()
    ) {
      try {
        const coolifyStatus = await getCoolifyDeploymentStatus(deploy.coolifyDeployId)
        const status = coolifyStatus.status?.toLowerCase()

        let newStatus: 'BUILDING' | 'SUCCESS' | 'FAILED' = 'BUILDING'
        if (status === 'finished' || status === 'running') {
          newStatus = 'SUCCESS'
        } else if (status === 'failed' || status === 'cancelled') {
          newStatus = 'FAILED'
        }

        if (newStatus !== 'BUILDING') {
          const updated = await prisma.deploy.update({
            where: { id: deployId },
            data: {
              status: newStatus,
              error: newStatus === 'FAILED' ? `Coolify deploy ${status}` : null,
            },
          })

          // If successful, update the site status
          if (newStatus === 'SUCCESS') {
            await prisma.site.update({
              where: { id: siteId },
              data: { status: 'PUBLISHED' },
            })
          }

          return NextResponse.json({ deploy: updated })
        }
      } catch (error) {
        console.error('[Deploy Status] Coolify poll error:', error)
        // Continue with existing status — don't fail the request
      }
    }

    return NextResponse.json({ deploy })
  } catch (error) {
    console.error('[GET /api/sites/[siteId]/deploys/[deployId]]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
