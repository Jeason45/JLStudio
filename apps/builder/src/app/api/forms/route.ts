import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import type { Prisma } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const siteId = request.nextUrl.searchParams.get('siteId')
    if (!siteId) {
      return NextResponse.json({ error: 'siteId requis' }, { status: 400 })
    }

    const forms = await prisma.form.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { leads: true } } },
    })

    return NextResponse.json(forms)
  } catch (error) {
    console.error('Forms list error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { siteId, name, fields, settings } = body as {
      siteId: string
      name: string
      fields?: Prisma.InputJsonValue
      settings?: Prisma.InputJsonValue
    }

    if (!siteId || !name) {
      return NextResponse.json({ error: 'siteId et name requis' }, { status: 400 })
    }

    const form = await prisma.form.create({
      data: {
        siteId,
        name,
        fields: fields ?? [],
        settings: settings ?? {},
      },
    })

    return NextResponse.json(form, { status: 201 })
  } catch (error) {
    console.error('Form create error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
