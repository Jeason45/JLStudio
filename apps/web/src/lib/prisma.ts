import { prisma } from '@jlstudio/database';

export { prisma };

const JLSTUDIO_SLUG = 'jlstudio';
const JLSTUDIO_NAME = 'JL Studio';

let cachedSiteId: string | null = null;

/**
 * Returns the Site id for jlstudio.dev, creating the Site row if missing.
 * Idempotent. Cached after first call.
 *
 * Backward compat: if SITE_ID env var is set AND points to an existing Site,
 * we use it. Otherwise we auto-create / auto-resolve via the slug.
 */
export async function getSiteId(): Promise<string> {
  if (cachedSiteId) return cachedSiteId;

  // Backward compat path: explicit SITE_ID env var.
  const envSiteId = process.env.SITE_ID;
  if (envSiteId) {
    const existing = await prisma.site.findUnique({
      where: { id: envSiteId },
      select: { id: true },
    });
    if (existing) {
      cachedSiteId = existing.id;
      return existing.id;
    }
    // env var pointed to a deleted/missing site — fall through to auto-create
  }

  // Resolve by slug, create if missing.
  const found = await prisma.site.findUnique({
    where: { slug: JLSTUDIO_SLUG },
    select: { id: true },
  });
  if (found) {
    cachedSiteId = found.id;
    return found.id;
  }

  const created = await prisma.site.create({
    data: {
      slug: JLSTUDIO_SLUG,
      name: JLSTUDIO_NAME,
      status: 'PUBLISHED',
    },
    select: { id: true },
  });
  cachedSiteId = created.id;
  return created.id;
}
