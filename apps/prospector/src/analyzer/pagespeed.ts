import axios from 'axios'
import { config } from '../config.js'
import type { SiteAnalysis } from './types.js'

const PAGESPEED_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'

interface PageSpeedResult {
  score: number | null
  fcp: number | null
  lcp: number | null
}

async function runPageSpeed(url: string, strategy: 'mobile' | 'desktop'): Promise<PageSpeedResult> {
  if (!config.pageSpeedApiKey) {
    return { score: null, fcp: null, lcp: null }
  }

  const response = await axios.get(PAGESPEED_URL, {
    params: {
      url,
      key: config.pageSpeedApiKey,
      strategy,
      category: 'performance',
    },
    timeout: config.pageSpeedTimeoutMs,
  })

  const lighthouse = response.data?.lighthouseResult
  if (!lighthouse) return { score: null, fcp: null, lcp: null }

  const score = Math.round((lighthouse.categories?.performance?.score ?? 0) * 100)
  const audits = lighthouse.audits || {}
  const fcp = audits['first-contentful-paint']?.numericValue ?? null
  const lcp = audits['largest-contentful-paint']?.numericValue ?? null

  return { score, fcp, lcp }
}

export async function analyzePageSpeed(url: string): Promise<Pick<SiteAnalysis, 'mobileScore' | 'desktopScore' | 'mobileFCP' | 'mobileLCP'>> {
  try {
    const mobile = await runPageSpeed(url, 'mobile')
    const desktop = await runPageSpeed(url, 'desktop')

    return {
      mobileScore: mobile.score,
      desktopScore: desktop.score,
      mobileFCP: mobile.fcp,
      mobileLCP: mobile.lcp,
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    if (msg.includes('429') || msg.includes('quota')) {
      throw new Error('PageSpeed API quota exceeded')
    }
    return { mobileScore: null, desktopScore: null, mobileFCP: null, mobileLCP: null }
  }
}
