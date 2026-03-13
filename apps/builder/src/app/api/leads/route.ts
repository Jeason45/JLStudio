import { NextRequest, NextResponse } from 'next/server'
import { createLeadFromForm } from '@/lib/repositories'
import { z } from 'zod'

const submitLeadSchema = z.object({
  siteId: z.string(),
  formId: z.string(),
  data: z.record(z.string(), z.unknown()),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { siteId, formId, data } = submitLeadSchema.parse(body)

    const lead = await createLeadFromForm({
      siteId,
      formId,
      formData: data,
      source: req.headers.get('referer') ?? undefined,
      userAgent: req.headers.get('user-agent') ?? undefined,
      ipAddress: req.headers.get('x-forwarded-for') ?? undefined,
    })

    return NextResponse.json(lead, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('[POST /api/leads]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
