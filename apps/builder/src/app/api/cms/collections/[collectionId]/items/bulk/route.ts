import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { CmsFieldDef } from '@/types/cms'
import { parseCsvToItems, itemsToCsv, generateSlug } from '@/lib/cmsResolver'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    const body = await request.json()
    const { action, ids, status, csv } = body as {
      action: 'status' | 'delete' | 'import'
      ids?: string[]
      status?: string
      csv?: string
    }

    if (action === 'status' && ids?.length && status) {
      const updateData: Record<string, unknown> = { status }
      if (status === 'PUBLISHED') updateData.publishedAt = new Date()
      await prisma.cmsItem.updateMany({
        where: { id: { in: ids }, collectionId },
        data: updateData,
      })
      return NextResponse.json({ ok: true, count: ids.length })
    }

    if (action === 'delete' && ids?.length) {
      await prisma.cmsItem.deleteMany({
        where: { id: { in: ids }, collectionId },
      })
      return NextResponse.json({ ok: true, count: ids.length })
    }

    if (action === 'import' && csv) {
      const collection = await prisma.cmsCollection.findUnique({ where: { id: collectionId } })
      if (!collection) {
        return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 })
      }
      const fields = collection.fields as unknown as CmsFieldDef[]
      const itemsData = parseCsvToItems(csv, fields)
      const primarySlug = (collection.settings as Record<string, unknown>)?.primaryFieldSlug as string | undefined

      const created = await Promise.all(
        itemsData.map(async (data, i) => {
          const slugBase = primarySlug && data[primarySlug]
            ? generateSlug(String(data[primarySlug]))
            : `item-${Date.now()}-${i}`
          return prisma.cmsItem.create({
            data: {
              collectionId,
              slug: slugBase,
              data: data as import('@/generated/prisma').Prisma.InputJsonValue,
              status: 'DRAFT',
            },
          })
        })
      )

      return NextResponse.json({ ok: true, count: created.length }, { status: 201 })
    }

    return NextResponse.json({ error: 'Action invalide' }, { status: 400 })
  } catch (error) {
    console.error('CMS bulk error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ collectionId: string }> }
) {
  try {
    const { collectionId } = await params
    const collection = await prisma.cmsCollection.findUnique({ where: { id: collectionId } })
    if (!collection) {
      return NextResponse.json({ error: 'Collection introuvable' }, { status: 404 })
    }

    const fields = collection.fields as unknown as CmsFieldDef[]
    const items = await prisma.cmsItem.findMany({
      where: { collectionId },
      orderBy: { createdAt: 'desc' },
    })

    const csv = itemsToCsv(
      items.map(i => ({
        ...i,
        data: i.data as Record<string, unknown>,
        createdAt: i.createdAt.toISOString(),
        updatedAt: i.updatedAt.toISOString(),
        publishedAt: i.publishedAt?.toISOString() ?? null,
        scheduledAt: i.scheduledAt?.toISOString() ?? null,
        status: i.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'SCHEDULED',
      })),
      fields,
    )

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${collection.slug}-export.csv"`,
      },
    })
  } catch (error) {
    console.error('CMS export error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
