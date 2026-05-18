import { NextRequest, NextResponse } from 'next/server';

/**
 * Auth middleware pour les routes /api/n8n/*.
 *
 * n8n doit envoyer le header :
 *   Authorization: Bearer <N8N_API_KEY>
 *
 * La clé est définie dans la variable d'environnement N8N_API_KEY côté portail.
 * À configurer dans n8n via un Credential "Header Auth" :
 *   Name  → Authorization
 *   Value → Bearer <même valeur que portail>
 */
export function ensureN8nAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.N8N_API_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: 'N8N_API_KEY non configurée côté portail' },
      { status: 503 },
    );
  }
  const auth = req.headers.get('authorization');
  if (!auth || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  return null;
}
