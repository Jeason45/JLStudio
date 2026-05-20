import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

// POST /api/revalidate
// Appelé par le CRM portal au moment du "Publier" pour rafraîchir
// immédiatement la home (et l'aperçu) sans attendre l'ISR de 60s.
// Auth : Bearer ${INTERNAL_API_SECRET} (partagé portal ↔ apps/web).

export async function POST(req: NextRequest) {
  const secret = process.env.INTERNAL_API_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'INTERNAL_API_SECRET non configuré' }, { status: 503 });
  }
  const header = req.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!token || token !== secret) {
    return NextResponse.json({ error: 'Acces refuse' }, { status: 401 });
  }

  try {
    revalidatePath('/');
    revalidatePath('/preview');
    return NextResponse.json({ ok: true, revalidated: ['/', '/preview'], at: new Date().toISOString() });
  } catch (err) {
    return NextResponse.json({ error: 'Revalidation échouée', detail: String(err) }, { status: 500 });
  }
}
