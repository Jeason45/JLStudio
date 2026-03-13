import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ siteSlug: string }> }
) {
  try {
    const { siteSlug } = await params
    const url = request.nextUrl
    const limit = Math.min(Number(url.searchParams.get('limit')) || 50, 100)
    const offset = Number(url.searchParams.get('offset')) || 0
    const categorySlug = url.searchParams.get('category') || undefined
    const statusParam = url.searchParams.get('status') || 'published'
    const sort = url.searchParams.get('sort') || 'createdAt'
    const dir = url.searchParams.get('dir') || 'desc'

    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404, headers: CORS_HEADERS })
    }

    // Resolve category filter
    let categoryId: string | undefined
    if (categorySlug) {
      const category = await prisma.productCategory.findUnique({
        where: { siteId_slug: { siteId: site.id, slug: categorySlug } },
      })
      if (category) categoryId = category.id
    }

    // Map status param to ProductStatus enum
    const statusMap: Record<string, string> = {
      published: 'PUBLISHED',
      draft: 'DRAFT',
      archived: 'ARCHIVED',
    }
    const productStatus = statusMap[statusParam.toLowerCase()] ?? 'PUBLISHED'

    const where = {
      siteId: site.id,
      status: productStatus as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
      ...(categoryId ? { categoryId } : {}),
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { [sort]: dir as 'asc' | 'desc' },
        take: limit,
        skip: offset,
        include: { category: { select: { id: true, name: true, slug: true } } },
      }),
      prisma.product.count({ where }),
    ])

    const data = products.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      images: p.images,
      price: p.price,
      compareAtPrice: p.compareAtPrice,
      currency: p.currency,
      sku: p.sku,
      stock: p.stock,
      isDigital: p.isDigital,
      tags: p.tags,
      variants: p.variants,
      metadata: p.metadata,
      category: p.category,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    }))

    return NextResponse.json({ data, meta: { total, limit, offset } }, { headers: CORS_HEADERS })
  } catch (error) {
    console.error('Public products API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500, headers: CORS_HEADERS })
  }
}
