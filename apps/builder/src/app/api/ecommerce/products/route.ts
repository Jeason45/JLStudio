import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams
    const siteId = sp.get('siteId')
    if (!siteId) return NextResponse.json({ error: 'siteId requis' }, { status: 400 })

    const status = sp.get('status') || undefined
    const categoryId = sp.get('categoryId') || undefined
    const search = sp.get('search') || undefined
    const page = parseInt(sp.get('page') || '1')
    const limit = parseInt(sp.get('limit') || '50')

    const where = {
      siteId,
      ...(status && { status: status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' }),
      ...(categoryId && { categoryId }),
      ...(search && { name: { contains: search, mode: 'insensitive' as const } }),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { category: true },
      }),
      prisma.product.count({ where }),
    ])

    return NextResponse.json({ products, total, page, limit })
  } catch (error) {
    console.error('Products list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, name, slug, description, images, price, compareAtPrice, currency, sku, stock, trackInventory, isDigital, digitalFileUrl, categoryId, tags, status, variants, metadata } = body

    if (!siteId || !name || !slug || price == null) {
      return NextResponse.json({ error: 'siteId, name, slug et price requis' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        siteId, name, slug,
        description: description || null,
        images: images || [],
        price,
        compareAtPrice: compareAtPrice || null,
        currency: currency || 'EUR',
        sku: sku || null,
        stock: stock || 0,
        trackInventory: trackInventory || false,
        isDigital: isDigital || false,
        digitalFileUrl: digitalFileUrl || null,
        categoryId: categoryId || null,
        tags: tags || [],
        status: status || 'DRAFT',
        variants: variants || [],
        metadata: metadata || {},
      },
      include: { category: true },
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Product create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
