export { prisma } from '@jlstudio/database'

export function getSiteId(): string {
  const siteId = process.env.SITE_ID;
  if (!siteId) throw new Error('SITE_ID environment variable is required');
  return siteId;
}
