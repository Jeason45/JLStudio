import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const updateTaxRateSchema = z.object({
  name: z.string().min(1).optional(),
  rate: z.number().min(0).optional(),
  country: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  includeInPrice: z.boolean().optional(),
  active: z.boolean().optional(),
})

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ rateId: string }> }) {
  try {
    const { rateId } = await params
    const body = await request.json()
    const parsed = updateTaxRateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Données invalides', details: parsed.error.issues }, { status: 400 })
    }
    const rate = await prisma.taxRate.update({
      where: { id: rateId },
      data: parsed.data,
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
