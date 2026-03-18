import { prisma } from './prisma';
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
    await prisma.activity.create({
      data: {
        siteId,
        userId,
        action,
        entity,
        entityId,
        details: details ? (details as Prisma.InputJsonValue) : undefined,
      },
    });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}
