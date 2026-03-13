import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ couponId: string }> }) {
  try {
    const { couponId } = await params
    const body = await request.json()
    const coupon = await prisma.coupon.update({
      where: { id: couponId },
      data: body,
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
