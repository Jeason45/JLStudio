import { NextRequest, NextResponse } from 'next/server'
import { getAllSites, createSite } from '@/lib/repositories'
import { z } from 'zod'
import { PAGE_TEMPLATES } from '@/data/templates'

const createSiteSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  templateId: z.string().optional(),
})

export async function GET() {
  try {
    const sites = await getAllSites()
    return NextResponse.json(sites)
  } catch (error) {
    console.error('[GET /api/sites]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, description, templateId } = createSiteSchema.parse(body)
    const template = templateId ? PAGE_TEMPLATES.find(t => t.id === templateId) : undefined
    const site = await createSite(name, description, template?.sections, template?.pages, template?.brand)
    return NextResponse.json(site, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('[POST /api/sites]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
