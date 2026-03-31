import axios from 'axios'
import { config } from '../config.js'

export interface SocialPresence {
  facebook: string | null
  instagram: string | null
  linkedin: string | null
  twitter: string | null
  youtube: string | null
  tiktok: string | null
  count: number              // number of social networks found
}

const SOCIAL_PATTERNS: Array<{ key: keyof Omit<SocialPresence, 'count'>; pattern: RegExp }> = [
  { key: 'facebook', pattern: /href=["'](https?:\/\/(?:www\.)?facebook\.com\/[^"'\s>]+)["']/gi },
  { key: 'instagram', pattern: /href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"'\s>]+)["']/gi },
  { key: 'linkedin', pattern: /href=["'](https?:\/\/(?:www\.)?linkedin\.com\/(?:company|in)\/[^"'\s>]+)["']/gi },
  { key: 'twitter', pattern: /href=["'](https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[^"'\s>]+)["']/gi },
  { key: 'youtube', pattern: /href=["'](https?:\/\/(?:www\.)?youtube\.com\/(?:channel|c|@)[^"'\s>]+)["']/gi },
  { key: 'tiktok', pattern: /href=["'](https?:\/\/(?:www\.)?tiktok\.com\/@[^"'\s>]+)["']/gi },
]

export async function detectSocialPresence(url: string, existingHtml?: string): Promise<SocialPresence> {
  const result: SocialPresence = {
    facebook: null,
    instagram: null,
    linkedin: null,
    twitter: null,
    youtube: null,
    tiktok: null,
    count: 0,
  }

  let html = existingHtml || ''

  // Fetch if we don't have the HTML already
  if (!html) {
    try {
      const res = await axios.get(url, {
        timeout: config.httpTimeoutMs,
        maxContentLength: 200_000,
        headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' },
      })
      html = typeof res.data === 'string' ? res.data : ''
    } catch {
      return result
    }
  }

  for (const { key, pattern } of SOCIAL_PATTERNS) {
    const matches = html.matchAll(pattern)
    for (const match of matches) {
      const link = match[1]
      // Skip share buttons (they contain the current page URL)
      if (link.includes('sharer') || link.includes('share') || link.includes('intent/tweet')) continue
      result[key] = cleanSocialUrl(link)
      break  // take first match per platform
    }
  }

  result.count = [result.facebook, result.instagram, result.linkedin, result.twitter, result.youtube, result.tiktok]
    .filter(Boolean).length

  return result
}

function cleanSocialUrl(url: string): string {
  // Remove trailing slashes, query params, fragments
  return url.replace(/[?#].*$/, '').replace(/\/+$/, '')
}
