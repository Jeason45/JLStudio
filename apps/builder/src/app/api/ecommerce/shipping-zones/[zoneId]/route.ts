import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    const { zoneId } = await params
    const body = await request.json()
    const zone = await prisma.shippingZone.update({
      where: { id: zoneId },
      data: body,
    })
    return NextResponse.json(zone)
  } catch (error) {
    console.error('Shipping zone update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    const { zoneId } = await params
    await prisma.shippingZone.delete({ where: { id: zoneId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Shipping zone delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
