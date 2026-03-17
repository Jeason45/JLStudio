import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const acceptInviteSchema = z.object({
  token: z.string().min(1),
  password: z.string().min(8, 'Minimum 8 caracteres'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = acceptInviteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { token, password } = parsed.data;

    const user = await prisma.portalUser.findUnique({
      where: { inviteToken: token },
      include: { site: { select: { slug: true } } },
    });

    if (!user) {
      return NextResponse.json({ error: 'Lien d\'invitation invalide' }, { status: 404 });
    }

    if (user.inviteExpiresAt && user.inviteExpiresAt < new Date()) {
      return NextResponse.json({ error: 'Ce lien d\'invitation a expire' }, { status: 410 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.portalUser.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        inviteToken: null,
        inviteExpiresAt: null,
      },
    });

    return NextResponse.json({
      ok: true,
      siteSlug: user.site.slug,
      email: user.email,
    });
  } catch (error) {
    console.error('[POST /api/auth/accept-invite]', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
