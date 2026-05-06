import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getAgencySite } from '@/lib/agencySite';
import { logger } from '@/lib/logger';

const briefSchema = z.object({
  contactId: z.string().optional(),
  projectName: z.string().min(1),
  projectType: z.string().min(1),
  briefTitle: z.string().min(1),
  objectives: z.string().optional().default(''),
  targetAudience: z.string().optional().default(''),
  budget: z.string().optional().default(''),
  estimatedBudget: z.number().nullable().optional(),
  deadline: z.string().optional().default(''),
  features: z.array(z.string()).optional().default([]),
  inspirations: z.string().optional().default(''),
  notes: z.string().optional().default(''),
  specificFields: z.record(z.string(), z.unknown()).optional().default({}),
  createProject: z.boolean().optional().default(true),
});

export async function POST(req: NextRequest) {
  const superAdmin = req.headers.get('x-portal-super-admin') === 'true';
  if (!superAdmin) return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });

  const body = await req.json();
  const parsed = briefSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const data = parsed.data;

  const site = await getAgencySite();

  try {
    let interactionId: string | null = null;
    let projectId: string | null = null;

    // 1. Save brief as Interaction (only if contact selected)
    if (data.contactId) {
      const contact = await prisma.contact.findFirst({
        where: { id: data.contactId, siteId: site.id, deletedAt: null },
        select: { id: true },
      });
      if (!contact) {
        return NextResponse.json({ error: 'Contact introuvable' }, { status: 404 });
      }

      const briefContent = JSON.stringify({
        briefType: data.projectType,
        briefTitle: data.briefTitle,
        ...data.specificFields,
        projectName: data.projectName,
        objectives: data.objectives,
        targetAudience: data.targetAudience,
        budget: data.budget,
        deadline: data.deadline,
        features: data.features,
        inspirations: data.inspirations,
        notes: data.notes,
        submittedAt: new Date().toISOString(),
      });

      const interaction = await prisma.interaction.create({
        data: {
          contactId: data.contactId,
          type: 'brief',
          subject: `Brief: ${data.projectName}`,
          content: briefContent,
        },
        select: { id: true },
      });
      interactionId = interaction.id;
    }

    // 2. Optionally create a project
    if (data.createProject) {
      const project = await prisma.portalProject.create({
        data: {
          siteId: site.id,
          name: data.projectName,
          description: data.objectives || null,
          status: 'PLANNING',
          priority: 'medium',
          projectType: data.projectType,
          contactId: data.contactId || null,
          endDate: data.deadline ? new Date(data.deadline) : null,
          estimatedBudget: data.estimatedBudget ?? null,
          notes: [
            `Brief ${data.briefTitle}`,
            data.targetAudience && `Public cible: ${data.targetAudience}`,
            data.budget && `Budget: ${data.budget}`,
            data.inspirations && `Inspirations: ${data.inspirations}`,
            data.notes && `Notes: ${data.notes}`,
          ].filter(Boolean).join('\n\n'),
        },
        select: { id: true },
      });
      projectId = project.id;
    }

    return NextResponse.json({ ok: true, interactionId, projectId });
  } catch (err) {
    logger.error({ err, brief: data.projectName }, 'Brief creation failed');
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
