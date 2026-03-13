import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId')
    if (!siteId) return NextResponse.json({ error: 'siteId requis' }, { status: 400 })

    const coupons = await prisma.coupon.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(coupons)
  } catch (error) {
    console.error('Coupons list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, code, type, value, minOrderAmount, maxUses, validFrom, validTo, active } = body

    if (!siteId || !code || !type || value == null) {
      return NextResponse.json({ error: 'siteId, code, type et value requis' }, { status: 400 })
    }

    const coupon = await prisma.coupon.create({
      data: {
        siteId, code: code.toUpperCase(), type, value,
        minOrderAmount: minOrderAmount || null,
        maxUses: maxUses || null,
        validFrom: validFrom ? new Date(validFrom) : null,
        validTo: validTo ? new Date(validTo) : null,
        active: active ?? true,
      },
    })

    return NextResponse.json(coupon, { status: 201 })
  } catch (error) {
    console.error('Coupon create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
