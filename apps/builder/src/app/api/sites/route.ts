import { NextRequest, NextResponse } from 'next/server'
import { getAllSites, createSite } from '@/lib/repositories'
import prisma from '@/lib/db'
import { z } from 'zod'
import { PAGE_TEMPLATES } from '@/data/templates'
import { randomBytes } from 'crypto'
import { hash } from 'bcryptjs'
import { sendPortalInvitation } from '@/lib/portalEmails'

const createSiteSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  templateId: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientFirstName: z.string().optional(),
  clientLastName: z.string().optional(),
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
    const { name, description, templateId, clientEmail, clientFirstName, clientLastName } = createSiteSchema.parse(body)
    const template = templateId ? PAGE_TEMPLATES.find(t => t.id === templateId) : undefined
    const site = await createSite(name, description, template?.sections, template?.pages, template?.brand)

    // Create PortalConfig with default modules
    await prisma.portalConfig.create({
      data: {
        siteId: site.id,
        moduleCRM: true,
        moduleDevis: true,
        moduleFactures: true,
        moduleContrats: false,
        moduleProjets: false,
        moduleCMS: false,
        moduleCalendrier: false,
        onboardingDone: false,
      },
    })

    // Create admin PortalUser + send invitation if email provided
    if (clientEmail) {
      const inviteToken = randomBytes(32).toString('hex')
      const inviteExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      const tempPassword = await hash(randomBytes(32).toString('hex'), 10)

      await prisma.portalUser.create({
        data: {
          siteId: site.id,
          email: clientEmail,
          password: tempPassword,
          firstName: clientFirstName || null,
          lastName: clientLastName || null,
          role: 'ADMIN',
          inviteToken,
          inviteExpiresAt,
        },
      })

      // Build invite URL — portal URL from env or fallback
      const portalUrl = process.env.PORTAL_URL || 'http://localhost:3002'
      const inviteUrl = `${portalUrl}/invite?token=${inviteToken}`
      await sendPortalInvitation(clientEmail, name, inviteUrl)
    }

    return NextResponse.json(site, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    console.error('[POST /api/sites]', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
