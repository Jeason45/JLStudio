import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { loginSchema, adminLoginSchema } from '@/lib/validations';
import { rateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const { allowed } = rateLimit(`portal-login:${ip}`, 5, 60_000);
    if (!allowed) {
      return NextResponse.json({ error: 'Trop de requetes, reessayez plus tard' }, { status: 429 });
    }

    const body = await req.json();
    const mode = body.mode || 'client';

    // ── Admin login mode ──
    if (mode === 'admin') {
      const parsed = adminLoginSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
          { status: 400 }
        );
      }

      const { email, password, siteId } = parsed.data;

      // Find all ADMIN portal users with this email
      const adminUsers = await prisma.portalUser.findMany({
        where: { email: email.toLowerCase(), role: 'ADMIN', active: true },
        include: { site: { select: { id: true, name: true, slug: true } } },
      });

      if (adminUsers.length === 0) {
        return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
      }

      // Verify password against any admin account
      let passwordValid = false;
      for (const u of adminUsers) {
        if (await bcrypt.compare(password, u.password)) {
          passwordValid = true;
          break;
        }
      }

      if (!passwordValid) {
        return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
      }

      // If no siteId specified, return the list of available sites
      if (!siteId) {
        const sites = adminUsers.map(u => ({
          id: u.site.id,
          name: u.site.name,
          slug: u.site.slug,
        }));
        return NextResponse.json({ needsSiteSelection: true, sites });
      }

      // siteId specified — find the matching user and create token
      const user = adminUsers.find(u => u.siteId === siteId);
      if (!user) {
        return NextResponse.json({ error: 'Acces refuse a ce site' }, { status: 403 });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
      }

      const token = await signToken({
        sub: user.id,
        email: user.email,
        siteId: user.siteId,
        role: user.role,
        contactId: user.contactId,
      });

      const response = NextResponse.json({ success: true, role: user.role, siteName: user.site.name });
      response.cookies.set('portal-token', token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ?? false,
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });

      return response;
    }

    // ── Client login mode ──
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, siteSlug } = parsed.data;

    const site = await prisma.site.findUnique({
      where: { slug: siteSlug },
    });

    if (!site) {
      return NextResponse.json({ error: 'Site introuvable' }, { status: 404 });
    }

    const user = await prisma.portalUser.findUnique({
      where: { siteId_email: { siteId: site.id, email: email.toLowerCase() } },
    });

    if (!user || !user.active || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
    }

    const token = await signToken({
      sub: user.id,
      email: user.email,
      siteId: site.id,
      role: user.role,
      contactId: user.contactId,
    });

    const response = NextResponse.json({ success: true, role: user.role });
    response.cookies.set('portal-token', token, {
      httpOnly: true,
      secure: process.env.NEXT_PUBLIC_APP_URL?.startsWith('https://') ?? false,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err) {
    console.error('Portal login error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
