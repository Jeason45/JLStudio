import { NextRequest, NextResponse } from 'next/server';
import * as OTPAuth from 'otpauth';
import QRCode from 'qrcode';
import { prisma } from '@/lib/db';
import { setupTotpSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-builder-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const user = await prisma.builderUser.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 });
    }

    if (user.totpEnabled) {
      return NextResponse.json({ error: '2FA déjà activé' }, { status: 400 });
    }

    // Generate a new TOTP secret
    const secret = new OTPAuth.Secret({ size: 20 });
    const totp = new OTPAuth.TOTP({
      issuer: 'JL Studio Builder',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret,
    });

    // Save secret (not yet enabled until verified)
    await prisma.builderUser.update({
      where: { id: userId },
      data: { totpSecret: secret.base32 },
    });

    // Generate QR code
    const otpauthUrl = totp.toString();
    const qrCodeDataUrl = await QRCode.toDataURL(otpauthUrl);

    return NextResponse.json({
      qrCode: qrCodeDataUrl,
      secret: secret.base32,
      otpauthUrl,
    });
  } catch (err) {
    console.error('Setup 2FA error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-builder-user-id');
    if (!userId) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await req.json();
    const parsed = setupTotpSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Code à 6 chiffres requis' }, { status: 400 });
    }
    const { code } = parsed.data;

    const user = await prisma.builderUser.findUnique({
      where: { id: userId },
    });

    if (!user || !user.totpSecret) {
      return NextResponse.json({ error: 'Configurez d\'abord le 2FA' }, { status: 400 });
    }

    // Verify the code to confirm the user has the right app configured
    const totp = new OTPAuth.TOTP({
      issuer: 'JL Studio Builder',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(user.totpSecret),
    });

    const delta = totp.validate({ token: code, window: 1 });
    if (delta === null) {
      return NextResponse.json({ error: 'Code invalide. Vérifiez votre application.' }, { status: 401 });
    }

    // Enable 2FA
    await prisma.builderUser.update({
      where: { id: userId },
      data: { totpEnabled: true },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Confirm 2FA error:', err);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
