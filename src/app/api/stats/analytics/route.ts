import { NextRequest, NextResponse } from 'next/server';

const UMAMI_API = process.env.UMAMI_API_URL || 'https://analytics.jlstudio.dev';

let tokenCache: { token: string; expiresAt: number } | null = null;

async function parseJson(res: Response, label: string) {
  const text = await res.text();
  const ct = res.headers.get('content-type') || '';
  if (!ct.includes('application/json')) {
    throw new Error(`${label}: attendu JSON, recu ${ct || 'inconnu'} (status ${res.status}) — ${text.slice(0, 150)}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`${label}: JSON invalide (status ${res.status}) — ${text.slice(0, 150)}`);
  }
}

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const url = `${UMAMI_API}/api/auth/login`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: process.env.UMAMI_USERNAME,
        password: process.env.UMAMI_PASSWORD,
      }),
    });
  } catch (e) {
    throw new Error(`Impossible de joindre Umami a ${url}: ${e instanceof Error ? e.message : e}`);
  }

  const data = await parseJson(res, `Login ${url}`);

  if (!res.ok || !data.token) {
    throw new Error(`Login echoue (${res.status}): ${JSON.stringify(data).slice(0, 200)}`);
  }

  tokenCache = { token: data.token, expiresAt: Date.now() + 55 * 60 * 1000 };
  return data.token;
}

async function umamiGet(path: string, token: string) {
  const url = `${UMAMI_API}/api${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
  } catch (e) {
    throw new Error(`Fetch ${path} echoue: ${e instanceof Error ? e.message : e}`);
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${path}: ${res.status} — ${text.slice(0, 150)}`);
  }

  return parseJson(res, path);
}

export async function GET(req: NextRequest) {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const username = process.env.UMAMI_USERNAME;
  const password = process.env.UMAMI_PASSWORD;

  if (!username || !password || !websiteId) {
    const missing = [
      !username && 'UMAMI_USERNAME',
      !password && 'UMAMI_PASSWORD',
      !websiteId && 'NEXT_PUBLIC_UMAMI_WEBSITE_ID',
    ].filter(Boolean).join(', ');
    return NextResponse.json(
      { error: `Variable(s) manquante(s): ${missing}. UMAMI_API_URL=${UMAMI_API}` },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const days = parseInt(searchParams.get('days') || '30', 10);

  const endAt = Date.now();
  const startAt = endAt - days * 24 * 60 * 60 * 1000;
  const qs = `startAt=${startAt}&endAt=${endAt}`;
  const base = `/websites/${websiteId}`;

  try {
    const token = await getToken();

    const [active, stats, pageviews, topPages, topReferrers, devices, countries, browsers] =
      await Promise.all([
        umamiGet(`${base}/active`, token),
        umamiGet(`${base}/stats?${qs}`, token),
        umamiGet(`${base}/pageviews?${qs}&unit=day&timezone=Europe/Paris`, token),
        umamiGet(`${base}/metrics?${qs}&type=path&limit=10`, token),
        umamiGet(`${base}/metrics?${qs}&type=referrer&limit=10`, token),
        umamiGet(`${base}/metrics?${qs}&type=device&limit=5`, token),
        umamiGet(`${base}/metrics?${qs}&type=country&limit=10`, token),
        umamiGet(`${base}/metrics?${qs}&type=browser&limit=5`, token),
      ]);

    return NextResponse.json({
      active,
      stats,
      pageviews,
      topPages,
      topReferrers,
      devices,
      countries,
      browsers,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erreur inconnue';
    console.error('Umami API error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
