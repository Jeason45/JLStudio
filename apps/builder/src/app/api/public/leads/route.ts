import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { z } from 'zod'

const submitSchema = z.object({
  data: z.record(z.string(), z.unknown()),
  source: z.string().optional(),
})

/**
 * POST /api/public/leads?siteSlug=xxx
 *
 * Public endpoint for form submissions from exported static sites.
 * Accepts CORS from any origin (exported sites can be on any domain).
 */
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '*'

  try {
    const siteSlug = req.nextUrl.searchParams.get('siteSlug')
    if (!siteSlug) {
      return cors(NextResponse.json({ error: 'siteSlug requis' }, { status: 400 }), origin)
    }

    const body = await req.json()
    const { data, source } = submitSchema.parse(body)

    // Find the site by slug
    const site = await prisma.site.findUnique({ where: { slug: siteSlug } })
    if (!site) {
      return cors(NextResponse.json({ error: 'Site introuvable' }, { status: 404 }), origin)
    }

    // Get or create default form for this site
    let form = await prisma.form.findFirst({
      where: { siteId: site.id, name: '__website_default' },
    })
    if (!form) {
      form = await prisma.form.create({
        data: {
          siteId: site.id,
          name: '__website_default',
          fields: [],
          settings: { source: 'exported-site' },
        },
      })
    }

    // Extract email and create/link contact
    const email = (data.email ?? data.Email ?? data.EMAIL) as string | undefined
    let contactId: string | undefined

    if (email && typeof email === 'string' && email.includes('@')) {
      const existingContact = await prisma.contact.findUnique({
        where: { siteId_email: { siteId: site.id, email } },
      })

      if (existingContact) {
        contactId = existingContact.id
      } else {
        const firstName = (data.firstName ?? data.prenom ?? data.Prenom ?? data.name ?? data.Nom) as string | undefined
        const lastName = (data.lastName ?? data.nom ?? data.Nom) as string | undefined
        const phone = (data.phone ?? data.telephone ?? data.tel ?? data.Phone) as string | undefined
        const company = (data.company ?? data.entreprise ?? data.Company) as string | undefined

        const newContact = await prisma.contact.create({
          data: {
            siteId: site.id,
            email,
            firstName: typeof firstName === 'string' ? firstName : undefined,
            lastName: typeof lastName === 'string' ? lastName : undefined,
            phone: typeof phone === 'string' ? phone : undefined,
            company: typeof company === 'string' ? company : undefined,
          },
        })
        contactId = newContact.id
      }
    }

    // Create the lead
    const lead = await prisma.lead.create({
      data: {
        siteId: site.id,
        formId: form.id,
        contactId,
        data: data as object,
        source: source ?? req.headers.get('referer') ?? undefined,
        userAgent: req.headers.get('user-agent') ?? undefined,
        ipAddress: req.headers.get('x-forwarded-for') ?? undefined,
      },
    })

    return cors(NextResponse.json({ success: true, id: lead.id }, { status: 201 }), origin)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return cors(NextResponse.json({ error: error.issues }, { status: 400 }), origin)
    }
    console.error('[POST /api/public/leads]', error)
    return cors(NextResponse.json({ error: 'Erreur serveur' }, { status: 500 }), origin)
  }
}

/**
 * OPTIONS /api/public/leads — CORS preflight
 */
export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get('origin') ?? '*'
  return cors(new NextResponse(null, { status: 204 }), origin)
}

function cors(response: NextResponse, origin: string): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', origin)
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
  response.headers.set('Access-Control-Max-Age', '86400')
  return response
}
