import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/db';

// Route temporaire pour reset le mot de passe — À SUPPRIMER après usage
export async function GET() {
  const email = 'contact@jlstudio.dev';
  const password = 'Daytona45!';
  const hash = await bcrypt.hash(password, 10);

  const user = await prisma.builderUser.findUnique({ where: { email } });

  if (user) {
    await prisma.builderUser.update({ where: { email }, data: { password: hash } });
    return NextResponse.json({ ok: true, action: 'updated', email });
  } else {
    await prisma.builderUser.create({ data: { email, password: hash, name: 'JL Studio' } });
    return NextResponse.json({ ok: true, action: 'created', email });
  }
}
