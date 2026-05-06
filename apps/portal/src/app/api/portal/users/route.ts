import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { extractSiteId, extractUserRole } from '@/lib/auth';
import { portalUserCreateSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);

  if (!siteId || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const users = await prisma.portalUser.findMany({
    where: { siteId },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      active: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const siteId = extractSiteId(req.headers);
  const role = extractUserRole(req.headers);

  if (!siteId || role !== 'ADMIN') {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 403 });
  }

  const body = await req.json();
  const parsed = portalUserCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { email, password, firstName, lastName, role: userRole, contactId } = parsed.data;

  // Check if user already exists for this site
  const existing = await prisma.portalUser.findUnique({
    where: { siteId_email: { siteId, email: email.toLowerCase() } },
    select: { id: true },
  });

  if (existing) {
    return NextResponse.json({ error: 'Un utilisateur avec cet email existe deja' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.portalUser.create({
    data: {
      siteId,
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      role: userRole,
      contactId: contactId || null,
    },
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

  return NextResponse.json(user, { status: 201 });
}
