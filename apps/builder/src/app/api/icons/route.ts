import { NextRequest, NextResponse } from 'next/server'

const ICONIFY_API = 'https://api.iconify.design'

interface IconifySearchResult {
  icons: string[]    // e.g. ["lucide:arrow-right", "mdi:arrow-left"]
  total: number
}

interface IconifyCollectionIcons {
  prefix: string
  icons: Record<string, { body: string; width?: number; height?: number }>
  width?: number
  height?: number
}

function buildSvg(body: string, width: number, height: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const query = searchParams.get('query')
  const prefix = searchParams.get('prefix')
  const limit = parseInt(searchParams.get('limit') || '60', 10)

  try {
    // --- Search mode: ?query=arrow&prefix=lucide&limit=60 ---
    if (query) {
      const params = new URLSearchParams({ query, limit: String(limit) })
      if (prefix) params.set('prefix', prefix)

      const res = await fetch(`${ICONIFY_API}/search?${params}`, {
        next: { revalidate: 3600 },
      })
      if (!res.ok) {
        return NextResponse.json({ icons: [] }, { status: 200 })
      }

      const data: IconifySearchResult = await res.json()
      if (!data.icons?.length) {
        return NextResponse.json({ icons: [], total: 0 })
      }

      // Group icons by prefix to batch-fetch SVG data
      const byPrefix: Record<string, string[]> = {}
      for (const full of data.icons) {
        const [pfx, ...rest] = full.split(':')
        const name = rest.join(':')
        if (!byPrefix[pfx]) byPrefix[pfx] = []
        byPrefix[pfx].push(name)
      }

      const icons: { name: string; prefix: string; svg: string }[] = []

      await Promise.all(
        Object.entries(byPrefix).map(async ([pfx, names]) => {
          const svgRes = await fetch(
            `${ICONIFY_API}/${pfx}.json?icons=${names.join(',')}`,
            { next: { revalidate: 3600 } }
          )
          if (!svgRes.ok) return

          const svgData: IconifyCollectionIcons = await svgRes.json()
          const defaultW = svgData.width || 24
          const defaultH = svgData.height || 24

          for (const iconName of names) {
            const icon = svgData.icons[iconName]
            if (!icon) continue
            const w = icon.width || defaultW
            const h = icon.height || defaultH
            icons.push({
              name: iconName,
              prefix: pfx,
              svg: buildSvg(icon.body, w, h),
            })
          }
        })
      )

      return NextResponse.json({ icons, total: data.total })
    }

    // --- Collection list mode: ?prefix=lucide&limit=60 ---
    if (prefix) {
      // Fetch the full collection JSON (contains all icons)
      const res = await fetch(`${ICONIFY_API}/${prefix}.json`, {
        next: { revalidate: 3600 },
      })
      if (!res.ok) {
        return NextResponse.json({ icons: [] }, { status: 200 })
      }

      const data: IconifyCollectionIcons = await res.json()
      const defaultW = data.width || 24
      const defaultH = data.height || 24
      const allNames = Object.keys(data.icons).slice(0, limit)

      const icons = allNames.map(name => {
        const icon = data.icons[name]
        const w = icon.width || defaultW
        const h = icon.height || defaultH
        return {
          name,
          prefix,
          svg: buildSvg(icon.body, w, h),
        }
      })

      const total = Object.keys(data.icons).length

      return NextResponse.json({ icons, total })
    }

    return NextResponse.json({ error: 'Missing query or prefix parameter' }, { status: 400 })
  } catch (error) {
    console.error('[API /icons] Error:', error)
    return NextResponse.json({ icons: [], error: 'Failed to fetch icons' }, { status: 500 })
  }
}
