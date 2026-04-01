import type { RawProspect } from './types'

// The portal does NOT run the scraper itself.
// The local agent (apps/prospector npm run agent) handles scraping via Playwright.
// This file is kept for the type export and as a no-op fallback.

export async function scrapePagesJaunes(
  _metier: string,
  _ville: string,
  _limit: number,
  _onProgress?: (pct: number) => Promise<void>,
): Promise<RawProspect[]> {
  // Scraping is handled by the local agent, not the portal server.
  // The portal creates a PENDING campaign; the agent picks it up.
  return []
}
