import { prisma } from './prisma';
import { logger } from './logger';
import type { Prisma } from '@jlstudio/database';

export async function logActivity(
  siteId: string,
  userId: string | null,
  action: 'create' | 'update' | 'delete' | 'send',
  entity: string,
  entityId?: string,
  details?: Record<string, unknown>
) {
  try {
    // Verify userId is a valid PortalUser before linking
    // (admin logins use BuilderUser IDs which don't exist in PortalUser table)
    let validUserId: string | null = null;
    if (userId) {
      const portalUser = await prisma.portalUser.findUnique({ where: { id: userId }, select: { id: true } });
      if (portalUser) validUserId = userId;
    }

    await prisma.activity.create({
      data: {
        siteId,
        userId: validUserId,
        action,
        entity,
        entityId,
        details: details ? (details as Prisma.InputJsonValue) : undefined,
      },
    });
  } catch (err) {
    logger.error({ err }, 'Failed to log activity');
  }
}
