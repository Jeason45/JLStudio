import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const updateShippingZoneSchema = z.object({
  name: z.string().min(1).optional(),
  countries: z.array(z.string()).optional(),
  rates: z.array(z.record(z.string(), z.unknown())).optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ zoneId: string }> }) {
  try {
    const { zoneId } = await params
    const body = await request.json()
    const parsed = updateShippingZoneSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 })
    }
    const zone = await prisma.shippingZone.update({
      where: { id: zoneId },
      data: parsed.data as Record<string, unknown>,
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
