import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole } from '@/lib/auth';
import { portalUserUpdateSchema } from '@/lib/validations';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;

  if (!siteId || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = portalUserUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data: Record<string, unknown> = { ...parsed.data };
  if (data.password) {
    data.password = await bcrypt.hash(data.password as string, 12);
  }
  if (data.email) {
    data.email = (data.email as string).toLowerCase();
  }

  const user = await prisma.portalUser.update({
    where: { id, siteId },
    data,
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      active: true,
      createdAt: true,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);
  const { id } = await params;

  if (!siteId || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  await prisma.portalUser.delete({
    where: { id, siteId },
  });

  return NextResponse.json({ success: true });
}
