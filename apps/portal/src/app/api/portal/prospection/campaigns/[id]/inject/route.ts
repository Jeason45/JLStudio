import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserId } from '@/lib/auth';
import { logActivity } from '@/lib/activity';
import { logger } from '@/lib/logger';

const injectSchema = z.object({
  resultIds: z.array(z.string()).optional(),
}).optional();

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const userId = extractUserId(req.headers);
  const { id } = await params;
  if (!siteId) return NextResponse.json({ error: 'Non autorise' }, { status: 401 });

  const campaign = await prisma.prospectionCampaign.findFirst({
    where: { id, siteId },
  });

  if (!campaign) return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });

  // Parse optional body
  let resultIds: string[] | undefined;
  try {
    const body = await req.json();
    const parsed = injectSchema.safeParse(body);
    if (parsed.success && parsed.data?.resultIds) {
      resultIds = parsed.data.resultIds;
    }
  } catch {
    // Empty body is fine — inject all
  }

  // Get results not yet linked to a contact
  const where: Record<string, unknown> = {
    campaignId: id,
    contactId: null,
  };
  if (resultIds && resultIds.length > 0) {
    where.id = { in: resultIds };
  }

  const results = await prisma.prospectionResult.findMany({ where });

  if (results.length === 0) {
    return NextResponse.json({ injected: 0, message: 'Aucun resultat a injecter' });
  }

  let injected = 0;

  for (const result of results) {
    try {
      // Build a unique email for the contact
      // Use the extracted email, or generate one from the name
      const email = result.email
        || `prospect-${result.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')}@noemail.prospection`;

      // Upsert contact: if email already exists for this site, link to it
      const contact = await prisma.contact.upsert({
        where: {
          siteId_email: { siteId, email: email.toLowerCase() },
        },
        create: {
          siteId,
          email: email.toLowerCase(),
          firstName: result.name,
          company: result.name,
          phone: result.phone || undefined,
          tags: [result.category, result.status],
          notes: [
            `Source: Prospection "${campaign.metier}" a ${campaign.ville}`,
            result.url ? `Site: ${result.url}` : 'Pas de site web',
            `Score: ${result.priorityScore}/100 (${result.status})`,
            result.address ? `Adresse: ${result.address}` : null,
          ].filter(Boolean).join('\n'),
          status: 'NEW',
        },
        update: {
          // If contact already exists, just update tags to include prospection info
          tags: {
            push: [result.category, result.status],
          },
        },
      });

      // Link result to contact
      await prisma.prospectionResult.update({
        where: { id: result.id },
        data: { contactId: contact.id },
      });

      injected++;
    } catch (err) {
      logger.error({ err, prospectName: result.name }, 'Inject failed for result');
    }
  }

  await logActivity(siteId, userId, 'create', 'prospectionInject', id, {
    injected,
    total: results.length,
  });

  return NextResponse.json({ injected, total: results.length });
}
