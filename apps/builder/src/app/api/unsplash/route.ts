import { NextRequest, NextResponse } from 'next/server'

interface UnsplashPhoto {
  id: string
  urls: { small: string; regular: string; full: string; thumb: string }
  alt_description: string | null
  description: string | null
  user: { name: string; links: { html: string } }
  width: number
  height: number
  links: { download_location: string }
}

interface UnsplashSearchResponse {
  total: number
  total_pages: number
  results: UnsplashPhoto[]
}

// Mock data when no API key is configured
const MOCK_PHOTOS: UnsplashPhoto[] = Array.from({ length: 20 }, (_, i) => ({
  id: `mock-${i + 1}`,
  urls: {
    thumb: `https://picsum.photos/seed/unsplash${i + 1}/200/200`,
    small: `https://picsum.photos/seed/unsplash${i + 1}/400/300`,
    regular: `https://picsum.photos/seed/unsplash${i + 1}/1080/720`,
    full: `https://picsum.photos/seed/unsplash${i + 1}/1920/1280`,
  },
  alt_description: `Photo placeholder ${i + 1}`,
  description: `Demo photo ${i + 1}`,
  user: { name: 'Demo User', links: { html: 'https://unsplash.com' } },
  width: 1920,
  height: 1280,
  links: { download_location: '' },
}))

function formatPhoto(photo: UnsplashPhoto) {
  return {
    id: photo.id,
    urls: photo.urls,
    alt_description: photo.alt_description || photo.description || '',
    user: { name: photo.user.name, url: photo.user.links.html },
    width: photo.width,
    height: photo.height,
    download_location: photo.links.download_location,
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const query = searchParams.get('query')
  const page = parseInt(searchParams.get('page') ?? '1')
  const perPage = Math.min(parseInt(searchParams.get('per_page') ?? '20'), 30)
  const orderBy = searchParams.get('order_by') ?? 'relevant'

  const accessKey = process.env.UNSPLASH_ACCESS_KEY

  // No API key: return mock data
  if (!accessKey) {
    const start = (page - 1) * perPage
    const slice = MOCK_PHOTOS.slice(start, start + perPage)
    return NextResponse.json({
      results: slice.map(formatPhoto),
      total: MOCK_PHOTOS.length,
      total_pages: Math.ceil(MOCK_PHOTOS.length / perPage),
      is_mock: true,
    })
  }

  try {
    const headers = { Authorization: `Client-ID ${accessKey}` }

    if (query) {
      // Search photos
      const url = new URL('https://api.unsplash.com/search/photos')
      url.searchParams.set('query', query)
      url.searchParams.set('page', String(page))
      url.searchParams.set('per_page', String(perPage))
      url.searchParams.set('order_by', orderBy)

      const res = await fetch(url.toString(), { headers })
      if (!res.ok) {
        const errText = await res.text()
        console.error('Unsplash search error:', res.status, errText)
        return NextResponse.json({ error: 'Unsplash API error' }, { status: res.status })
      }

      const data: UnsplashSearchResponse = await res.json()
      return NextResponse.json({
        results: data.results.map(formatPhoto),
        total: data.total,
        total_pages: data.total_pages,
      })
    } else {
      // List popular/editorial photos
      const url = new URL('https://api.unsplash.com/photos')
      url.searchParams.set('page', String(page))
      url.searchParams.set('per_page', String(perPage))
      url.searchParams.set('order_by', 'popular')

      const res = await fetch(url.toString(), { headers })
      if (!res.ok) {
        const errText = await res.text()
        console.error('Unsplash list error:', res.status, errText)
        return NextResponse.json({ error: 'Unsplash API error' }, { status: res.status })
      }

      const data: UnsplashPhoto[] = await res.json()
      return NextResponse.json({
        results: data.map(formatPhoto),
        total: 1000, // Unsplash doesn't return total for list endpoint
        total_pages: 50,
      })
    }
  } catch (error) {
    console.error('Unsplash API error:', error)
    return NextResponse.json({ error: 'Failed to fetch from Unsplash' }, { status: 500 })
  }
}

// POST: trigger download event (required by Unsplash API guidelines)
export async function POST(request: NextRequest) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) {
    return NextResponse.json({ ok: true })
  }

  try {
    const { download_location } = await request.json()
    if (download_location) {
      await fetch(`${download_location}?client_id=${accessKey}`)
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: true })
  }
}
