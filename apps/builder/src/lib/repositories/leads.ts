import prisma from '@/lib/db'
import { LeadStatus } from '@jlstudio/database'

export async function getLeadsBySite(siteId: string) {
  return prisma.lead.findMany({
    where: { siteId },
    include: {
      contact: true,
      form: { select: { name: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateLeadStatus(leadId: string, status: LeadStatus) {
  return prisma.lead.update({
    where: { id: leadId },
    data: { status },
  })
}

export async function createLeadFromForm(data: {
  siteId: string
  formId: string
  formData: Record<string, unknown>
  source?: string
  ipAddress?: string
  userAgent?: string
}) {
  const email = data.formData.email as string | undefined

  let contactId: string | undefined

  if (email) {
    const existingContact = await prisma.contact.findUnique({
      where: { siteId_email: { siteId: data.siteId, email } },
    })

    if (existingContact) {
      contactId = existingContact.id
    } else {
      const newContact = await prisma.contact.create({
        data: {
          siteId: data.siteId,
          email,
          firstName: data.formData.firstName as string | undefined,
          lastName: data.formData.lastName as string | undefined,
          phone: data.formData.phone as string | undefined,
          company: data.formData.company as string | undefined,
        },
      })
      contactId = newContact.id
    }
  }

  return prisma.lead.create({
    data: {
      siteId: data.siteId,
      formId: data.formId,
      contactId,
      data: data.formData as object,
      source: data.source,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    },
  })
}

export type LeadWithContact = Awaited<ReturnType<typeof getLeadsBySite>>[number]
