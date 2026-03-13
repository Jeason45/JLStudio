import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId')
    if (!siteId) return NextResponse.json({ error: 'siteId requis' }, { status: 400 })

    const zones = await prisma.shippingZone.findMany({
      where: { siteId },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(zones)
  } catch (error) {
    console.error('Shipping zones list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, name, countries, rates } = body

    if (!siteId || !name) {
      return NextResponse.json({ error: 'siteId et name requis' }, { status: 400 })
    }

    const zone = await prisma.shippingZone.create({
      data: {
        siteId, name,
        countries: countries || [],
        rates: rates || [],
      },
    })

    return NextResponse.json(zone, { status: 201 })
  } catch (error) {
    console.error('Shipping zone create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
