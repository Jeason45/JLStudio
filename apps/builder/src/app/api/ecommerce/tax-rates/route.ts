import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId')
    if (!siteId) return NextResponse.json({ error: 'siteId requis' }, { status: 400 })

    const rates = await prisma.taxRate.findMany({
      where: { siteId },
      orderBy: { name: 'asc' },
    })

    return NextResponse.json(rates)
  } catch (error) {
    console.error('Tax rates list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, name, rate, country, region, includeInPrice, active } = body

    if (!siteId || !name || rate == null) {
      return NextResponse.json({ error: 'siteId, name et rate requis' }, { status: 400 })
    }

    const taxRate = await prisma.taxRate.create({
      data: {
        siteId, name, rate,
        country: country || null,
        region: region || null,
        includeInPrice: includeInPrice ?? false,
        active: active ?? true,
      },
    })

    return NextResponse.json(taxRate, { status: 201 })
  } catch (error) {
    console.error('Tax rate create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
