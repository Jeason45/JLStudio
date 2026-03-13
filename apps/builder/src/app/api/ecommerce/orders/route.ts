import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { OrderStatus } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams
    const siteId = sp.get('siteId')
    if (!siteId) return NextResponse.json({ error: 'siteId requis' }, { status: 400 })

    const status = sp.get('status') || undefined
    const page = parseInt(sp.get('page') || '1')
    const limit = parseInt(sp.get('limit') || '50')

    const where = {
      siteId,
      ...(status && { status: status as OrderStatus }),
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
        include: { items: true, coupon: true },
      }),
      prisma.order.count({ where }),
    ])

    return NextResponse.json({ orders, total, page, limit })
  } catch (error) {
    console.error('Orders list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
