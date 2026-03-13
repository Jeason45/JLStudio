import prisma from '@/lib/db'
import { ContactStatus } from '@/generated/prisma'

export async function getContactsBySite(siteId: string) {
  return prisma.contact.findMany({
    where: { siteId },
    include: {
      _count: { select: { leads: true } },
    },
    orderBy: { createdAt: 'desc' },
  })
}

export async function updateContactStatus(contactId: string, status: ContactStatus) {
  return prisma.contact.update({
    where: { id: contactId },
    data: { status },
  })
}

export async function updateContactNotes(contactId: string, notes: string) {
  return prisma.contact.update({
    where: { id: contactId },
    data: { notes },
  })
}

export type ContactWithCount = Awaited<ReturnType<typeof getContactsBySite>>[number]
