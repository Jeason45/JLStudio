import { NextRequest, NextResponse } from 'next/server';

const UMAMI_API = process.env.UMAMI_API_URL || 'https://analytics.jlstudio.dev';

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const res = await fetch(`${UMAMI_API}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: process.env.UMAMI_USERNAME,
      password: process.env.UMAMI_PASSWORD,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Umami login failed: ${res.status} — ${text.slice(0, 200)}`);
  }
  const data = await res.json();
  tokenCache = { token: data.token, expiresAt: Date.now() + 55 * 60 * 1000 };
  return data.token;
}

async function umamiGet(path: string, token: string) {
  const res = await fetch(`${UMAMI_API}/api${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Umami ${path}: ${res.status} — ${text.slice(0, 200)}`);
  }
  return res.json();
}

export async function GET(req: NextRequest) {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!process.env.UMAMI_USERNAME || !process.env.UMAMI_PASSWORD || !websiteId) {
    return NextResponse.json(
      { error: 'UMAMI_USERNAME, UMAMI_PASSWORD ou NEXT_PUBLIC_UMAMI_WEBSITE_ID manquant' },
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
        umamiGet(`${base}/metrics?${qs}&type=url&limit=10`, token),
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
    return NextResponse.json(
      { error: message },
      { status: 502 }
    );
  }
}
