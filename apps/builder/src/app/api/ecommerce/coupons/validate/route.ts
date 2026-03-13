import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, code, subtotal } = body as { siteId: string; code: string; subtotal: number }

    if (!siteId || !code || subtotal == null) {
      return NextResponse.json({ error: 'siteId, code et subtotal requis' }, { status: 400 })
    }

    const coupon = await prisma.coupon.findUnique({
      where: { siteId_code: { siteId, code: code.toUpperCase() } },
    })

    if (!coupon || !coupon.active) {
      return NextResponse.json({ error: 'Coupon invalide ou inactif' }, { status: 404 })
    }

    const now = new Date()
    if (coupon.validFrom && now < coupon.validFrom) {
      return NextResponse.json({ error: 'Coupon pas encore valide' }, { status: 400 })
    }
    if (coupon.validTo && now > coupon.validTo) {
      return NextResponse.json({ error: 'Coupon expiré' }, { status: 400 })
    }
    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ error: 'Coupon épuisé' }, { status: 400 })
    }
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) {
      return NextResponse.json({ error: `Minimum de commande : ${coupon.minOrderAmount / 100}€` }, { status: 400 })
    }

    let discount = 0
    if (coupon.type === 'DISCOUNT_PERCENT') {
      discount = Math.round(subtotal * coupon.value / 100)
    } else if (coupon.type === 'DISCOUNT_FIXED') {
      discount = Math.min(coupon.value, subtotal)
    }
    // FREE_SHIPPING → discount = 0, shipping is set to 0 at checkout

    return NextResponse.json({
      valid: true,
      couponId: coupon.id,
      type: coupon.type,
      value: coupon.value,
      discount,
    })
  } catch (error) {
    console.error('Coupon validate error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
