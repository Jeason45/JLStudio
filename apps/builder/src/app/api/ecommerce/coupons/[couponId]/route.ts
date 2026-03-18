import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const updateCouponSchema = z.object({
  code: z.string().min(1).optional(),
  type: z.enum(['DISCOUNT_PERCENT', 'DISCOUNT_FIXED', 'FREE_SHIPPING']).optional(),
  value: z.number().int().min(0).optional(),
  minOrderAmount: z.number().int().min(0).nullable().optional(),
  maxUses: z.number().int().min(0).nullable().optional(),
  usedCount: z.number().int().min(0).optional(),
  validFrom: z.string().datetime().nullable().optional(),
  validTo: z.string().datetime().nullable().optional(),
  active: z.boolean().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ couponId: string }> }) {
  try {
    const { couponId } = await params
    const body = await request.json()
    const parsed = updateCouponSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 })
    }
    const coupon = await prisma.coupon.update({
      where: { id: couponId },
      data: parsed.data,
    })
    return NextResponse.json(coupon)
  } catch (error) {
    console.error('Coupon update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ couponId: string }> }) {
  try {
    const { couponId } = await params
    await prisma.coupon.delete({ where: { id: couponId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Coupon delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
