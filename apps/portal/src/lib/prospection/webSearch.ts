// Web search module — Serper.dev (Google results) with SearXNG fallback

export interface WebSearchResult {
  title: string
  link: string
  snippet: string
}

export interface PlaceResult {
  title: string
  address: string
  phone: string | null
  website: string | null
  rating: number | null
  reviewCount: number | null
}

export interface SearchResponse {
  organic: WebSearchResult[]
  places: PlaceResult[]
  creditsRemaining: number | null
  source: 'serper' | 'searxng'
}

const SERPER_URL = 'https://google.serper.dev'
const SEARXNG_URL = process.env.SEARXNG_URL || 'http://searxng:8080'

// ── Serper.dev (Google results — 2500 free credits) ──

async function searchSerper(query: string, apiKey: string): Promise<SearchResponse | null> {
  try {
    // Search for organic + places results
    const [organicRes, placesRes] = await Promise.all([
      fetch(`${SERPER_URL}/search`, {
        method: 'POST',
        headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query, gl: 'fr', hl: 'fr', num: 10 }),
        signal: AbortSignal.timeout(10000),
      }),
      fetch(`${SERPER_URL}/places`, {
        method: 'POST',
        headers: { 'X-API-KEY': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: query, gl: 'fr', hl: 'fr' }),
        signal: AbortSignal.timeout(10000),
      }),
    ])

    if (!organicRes.ok && !placesRes.ok) return null

    const organicData = organicRes.ok ? await organicRes.json() as any : { organic: [] }
    const placesData = placesRes.ok ? await placesRes.json() as any : { places: [] }

    const organic: WebSearchResult[] = (organicData.organic || []).map((r: any) => ({
      title: r.title || '',
      link: r.link || '',
      snippet: r.snippet || '',
    }))

    const places: PlaceResult[] = (placesData.places || []).map((r: any) => ({
      title: r.title || '',
      address: r.address || '',
      phone: r.phoneNumber || null,
      website: r.website || null,
      rating: r.rating || null,
      reviewCount: r.reviewsCount || r.reviews || null,
    }))

    return {
      organic,
      places,
      creditsRemaining: organicData.credits ?? null,
      source: 'serper',
    }
  } catch {
    return null
  }
}

// ── Check Serper credits ──

export async function checkSerperCredits(apiKey: string): Promise<number | null> {
  try {
    const res = await fetch(`${SERPER_URL}/account`, {
      method: 'GET',
      headers: { 'X-API-KEY': apiKey },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return null
    const data = await res.json() as any
    return data.credits ?? null
  } catch {
    return null
  }
}

// ── SearXNG (self-hosted meta-search — unlimited) ──

async function searchSearXNG(query: string): Promise<SearchResponse | null> {
  try {
    const res = await fetch(`${SEARXNG_URL}/search?${new URLSearchParams({
      q: query,
      format: 'json',
      language: 'fr',
      categories: 'general',
    })}`, {
      headers: { 'User-Agent': 'JLStudio-Portal/1.0' },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) return null

    const data = await res.json() as any
    const results = data.results || []

    const organic: WebSearchResult[] = results.map((r: any) => ({
      title: r.title || '',
      link: r.url || '',
      snippet: r.content || '',
    }))

    return {
      organic,
      places: [], // SearXNG doesn't have a places endpoint
      creditsRemaining: null,
      source: 'searxng',
    }
  } catch {
    return null
  }
}

// ── Main search function (Serper first, SearXNG fallback) ──

export async function webSearch(query: string): Promise<SearchResponse> {
  const serperKey = process.env.SERPER_API_KEY || ''

  // Try Serper first (better quality — real Google results)
  if (serperKey) {
    const serperResult = await searchSerper(query, serperKey)
    if (serperResult && (serperResult.organic.length > 0 || serperResult.places.length > 0)) {
      return serperResult
    }
  }

  // Fallback to SearXNG (unlimited)
  const searxResult = await searchSearXNG(query)
  if (searxResult && searxResult.organic.length > 0) {
    return searxResult
  }

  // Nothing found
  return { organic: [], places: [], creditsRemaining: null, source: 'searxng' }
}

// ── Search for businesses in a city ──

export async function searchBusinessesWeb(
  metier: string,
  ville: string,
): Promise<{ organic: WebSearchResult[]; places: PlaceResult[]; source: string; creditsRemaining: number | null }> {
  const query = `${metier} ${ville}`
  const result = await webSearch(query)
  return result
}
