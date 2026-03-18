import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    const url = request.nextUrl
    const status = url.searchParams.get('status')
    const sort = url.searchParams.get('sort') || 'createdAt'
    const dir = url.searchParams.get('dir') || 'desc'
    const limit = Math.min(Number(url.searchParams.get('limit')) || 50, 100)
    const offset = Number(url.searchParams.get('offset')) || 0
    const search = url.searchParams.get('search') || ''

    // Auto-publish scheduled items
    await prisma.cmsItem.updateMany({
      where: {
        collectionId,
        status: 'SCHEDULED',
        scheduledAt: { lte: new Date() },
      },
      data: { status: 'PUBLISHED', publishedAt: new Date() },
    })

    const where: Record<string, unknown> = { collectionId }
    if (status) where.status = status

    // Search in JSON data — use raw query for slug search + cast
    if (search) {
      where.OR = [
        { slug: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [items, total] = await Promise.all([
      prisma.cmsItem.findMany({
        where,
        orderBy: { [sort]: dir as 'asc' | 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.cmsItem.count({ where }),
    ])

    return NextResponse.json({ data: items, meta: { total, limit, offset } })
  } catch (error) {
    console.error('CMS items list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    const body = await request.json()
    const { slug, data, status, publishedAt, scheduledAt } = body as {
      slug: string
      data: Record<string, unknown>
      status?: string
      publishedAt?: string
      scheduledAt?: string
    }

    if (!slug) {
      return NextResponse.json({ error: 'slug requis' }, { status: 400 })
    }

    const item = await prisma.cmsItem.create({
      data: {
        collectionId,
        slug,
        data: data as import('@jlstudio/database').Prisma.InputJsonValue,
        status: (status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED') ?? 'DRAFT',
        publishedAt: publishedAt ? new Date(publishedAt) : status === 'PUBLISHED' ? new Date() : null,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      },
    })

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('CMS item create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
