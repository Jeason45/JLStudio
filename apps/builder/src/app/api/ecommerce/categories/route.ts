import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId')
    if (!siteId) return NextResponse.json({ error: 'siteId requis' }, { status: 400 })

    const categories = await prisma.productCategory.findMany({
      where: { siteId },
      orderBy: { name: 'asc' },
      include: { _count: { select: { products: true } } },
    })

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Categories list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, name, slug, parentId, image } = body

    if (!siteId || !name || !slug) {
      return NextResponse.json({ error: 'siteId, name et slug requis' }, { status: 400 })
    }

    const category = await prisma.productCategory.create({
      data: {
        siteId, name, slug,
        parentId: parentId || null,
        image: image || null,
      },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error) {
    console.error('Category create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
