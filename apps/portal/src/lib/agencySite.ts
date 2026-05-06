// JL Studio agency site — singleton site that stores Jeason's own CRM data
// (his leads, his projects, his invoices to clients, etc.)

import { prisma } from './prisma';

const AGENCY_SLUG = 'jlstudio';
const AGENCY_NAME = 'JL Studio';
const MANUAL_FORM_NAME = 'Manuel (CRM agence)';

let cachedSiteId: string | null = null;
let cachedManualFormId: string | null = null;

/** Returns the JL Studio agency Site, creating it if missing. Idempotent. */
export async function getAgencySite(): Promise<{ id: string; name: string; slug: string }> {
  if (cachedSiteId) {
    const cached = await prisma.site.findUnique({
      where: { id: cachedSiteId },
      select: { id: true, name: true, slug: true },
    });
    if (cached) return cached;
    cachedSiteId = null;
  }

  const existing = await prisma.site.findUnique({
    where: { slug: AGENCY_SLUG },
    select: { id: true, name: true, slug: true },
  });
  if (existing) {
    cachedSiteId = existing.id;
    return existing;
  }

  const created = await prisma.site.create({
    data: {
      slug: AGENCY_SLUG,
      name: AGENCY_NAME,
      status: 'PUBLISHED',
    },
    select: { id: true, name: true, slug: true },
  });
  cachedSiteId = created.id;
  return created;
}

/** Returns the singleton "manual" Form for agency leads, creating it if missing. */
export async function getAgencyManualFormId(): Promise<string> {
  if (cachedManualFormId) {
    const cached = await prisma.form.findUnique({
      where: { id: cachedManualFormId },
      select: { id: true },
    });
    if (cached) return cached.id;
    cachedManualFormId = null;
  }

  const site = await getAgencySite();
  const existing = await prisma.form.findFirst({
    where: { siteId: site.id, name: MANUAL_FORM_NAME },
    select: { id: true },
  });
  if (existing) {
    cachedManualFormId = existing.id;
    return existing.id;
  }

  const created = await prisma.form.create({
    data: {
      siteId: site.id,
      name: MANUAL_FORM_NAME,
      fields: [],
      settings: { manual: true, hidden: true },
    },
    select: { id: true },
  });
  cachedManualFormId = created.id;
  return created.id;
}
