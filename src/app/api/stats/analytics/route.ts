import { NextRequest, NextResponse } from 'next/server';

const UMAMI_API = 'https://api.umami.is/v1';

async function umamiGet(path: string, apiKey: string) {
  const res = await fetch(`${UMAMI_API}${path}`, {
    headers: { 'x-umami-api-key': apiKey },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`Umami ${path}: ${res.status}`);
  return res.json();
}

export async function GET(req: NextRequest) {
  const apiKey = process.env.UMAMI_API_KEY;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

  if (!apiKey || !websiteId) {
    return NextResponse.json(
      { error: 'UMAMI_API_KEY ou NEXT_PUBLIC_UMAMI_WEBSITE_ID manquant' },
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
    const [active, stats, pageviews, topPages, topReferrers, devices, countries, browsers] =
      await Promise.all([
        umamiGet(`${base}/active`, apiKey),
        umamiGet(`${base}/stats?${qs}`, apiKey),
        umamiGet(`${base}/pageviews?${qs}&unit=day&timezone=Europe/Paris`, apiKey),
        umamiGet(`${base}/metrics?${qs}&type=url&limit=10`, apiKey),
        umamiGet(`${base}/metrics?${qs}&type=referrer&limit=10`, apiKey),
        umamiGet(`${base}/metrics?${qs}&type=device&limit=5`, apiKey),
        umamiGet(`${base}/metrics?${qs}&type=country&limit=10`, apiKey),
        umamiGet(`${base}/metrics?${qs}&type=browser&limit=5`, apiKey),
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
    console.error('Umami API error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recuperation des analytics' },
      { status: 502 }
    );
  }
}
