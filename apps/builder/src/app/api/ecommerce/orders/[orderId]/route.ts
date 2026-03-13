import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(_request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await params
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true, coupon: true },
    })
    if (!order) return NextResponse.json({ error: 'Commande introuvable' }, { status: 404 })
    return NextResponse.json(order)
  } catch (error) {
    console.error('Order get error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ orderId: string }> }) {
  try {
    const { orderId } = await params
    const body = await request.json()
    const { status, notes, metadata } = body

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(metadata && { metadata }),
      },
      include: { items: true, coupon: true },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('Order update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
