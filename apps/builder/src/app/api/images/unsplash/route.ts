import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') ?? 'business'
  const page = request.nextUrl.searchParams.get('page') ?? '1'

  try {
    const perPage = 12
    const results = []

    const keywords = query.split(' ').join(',')
    for (let i = 0; i < perPage; i++) {
      const seed = `${query}-${page}-${i}`
      results.push({
        id: seed,
        url: `https://source.unsplash.com/800x600/?${encodeURIComponent(keywords)}&sig=${i + (parseInt(page) - 1) * perPage}`,
        thumb: `https://source.unsplash.com/400x300/?${encodeURIComponent(keywords)}&sig=${i + (parseInt(page) - 1) * perPage}`,
        alt: `Photo ${query} ${i + 1}`,
        author: 'Unsplash',
      })
    }

    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [] })
  }
}
