import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

/**
 * GET /api/sites/[siteId]/deploys
 *
 * Returns the deploy history for a site, ordered by most recent first.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteId: string }> }
) {
  try {
    const { siteId } = await params

    const limit = Number(request.nextUrl.searchParams.get('limit') || '20')

    const deploys = await prisma.deploy.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
      take: Math.min(limit, 100),
    })

    return NextResponse.json({ deploys })
  } catch (error) {
    console.error('[GET /api/sites/[siteId]/deploys]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
