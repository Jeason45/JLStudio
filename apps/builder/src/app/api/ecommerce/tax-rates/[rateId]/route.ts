import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ rateId: string }> }) {
  try {
    const { rateId } = await params
    const body = await request.json()
    const rate = await prisma.taxRate.update({
      where: { id: rateId },
      data: body,
    })
    return NextResponse.json(rate)
  } catch (error) {
    console.error('Tax rate update error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ rateId: string }> }) {
  try {
    const { rateId } = await params
    await prisma.taxRate.delete({ where: { id: rateId } })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Tax rate delete error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
