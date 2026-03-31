import 'dotenv/config'

export const config = {
  databaseUrl: process.env.DATABASE_URL || '',
  pageSpeedApiKey: process.env.PAGESPEED_API_KEY || '',
  // Pappers replaced by free INSEE SIRENE — no key needed
  siteId: process.env.SITE_ID || '',

  // Rate limiting
  scrapDelayMs: 2000,       // 2s entre chaque page Pages Jaunes
  analysisDelayMs: 1500,    // 1.5s entre chaque analyse site
  pageSpeedDelayMs: 1200,   // 1.2s entre chaque appel PageSpeed

  // Timeouts
  httpTimeoutMs: 15000,     // 15s timeout pour les requêtes HTTP
  pageSpeedTimeoutMs: 30000, // 30s pour PageSpeed (lent)

  // Defaults
  defaultLimit: 20,
  maxRetries: 2,
}
