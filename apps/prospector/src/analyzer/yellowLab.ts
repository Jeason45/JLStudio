import axios from 'axios'

export interface YellowLabResult {
  globalScore: number | null  // 0-100
  categories: YellowLabCategory[]
  topIssues: string[]         // top 5 issues
}

export interface YellowLabCategory {
  name: string
  score: number          // 0-100
  issueCount: number
}

// Yellow Lab Tools API — free, open source
// https://yellowlab.tools/
const YELLOWLAB_API = 'https://yellowlab.tools/api'

export async function analyzeYellowLab(url: string): Promise<YellowLabResult> {
  const result: YellowLabResult = {
    globalScore: null,
    categories: [],
    topIssues: [],
  }

  try {
    // 1. Start a run
    const startResponse = await axios.post(
      `${YELLOWLAB_API}/runs`,
      { url, waitForResponse: false },
      { timeout: 10000 }
    )

    const runId = startResponse.data?.runId
    if (!runId) return result

    // 2. Poll for completion (max 60s)
    for (let attempt = 0; attempt < 15; attempt++) {
      await new Promise(r => setTimeout(r, 4000))

      try {
        const statusResponse = await axios.get(
          `${YELLOWLAB_API}/runs/${runId}`,
          { timeout: 10000 }
        )

        const data = statusResponse.data
        if (!data || data.status?.statusCode === 'running') continue
        if (data.status?.statusCode === 'failed') return result

        // 3. Extract scores
        const scoreProfiles = data.scoreProfiles?.generic
        if (!scoreProfiles) return result

        result.globalScore = scoreProfiles.globalScore ?? null

        // Category scores
        const categoryMap: Record<string, string> = {
          'pageWeight': 'Poids de la page',
          'requests': 'Nombre de requêtes',
          'domComplexity': 'Complexité du DOM',
          'javascriptComplexity': 'Complexité JavaScript',
          'badJavascript': 'JavaScript problématique',
          'jQuery': 'jQuery',
          'cssComplexity': 'Complexité CSS',
          'badCSS': 'CSS problématique',
          'fonts': 'Polices',
          'serverConfig': 'Configuration serveur',
          'images': 'Images',
        }

        for (const [key, label] of Object.entries(categoryMap)) {
          const cat = scoreProfiles.categories?.[key]
          if (cat) {
            result.categories.push({
              name: label,
              score: cat.categoryScore ?? 0,
              issueCount: cat.rules ? Object.values(cat.rules).filter((r: any) => r.bad === true).length : 0,
            })
          }
        }

        // Top issues (worst scoring rules)
        const allRules: Array<{ label: string; score: number }> = []
        for (const cat of Object.values(scoreProfiles.categories || {}) as any[]) {
          for (const [, rule] of Object.entries(cat.rules || {}) as any) {
            if (rule.bad && rule.policy?.label) {
              allRules.push({ label: rule.policy.label, score: rule.score ?? 0 })
            }
          }
        }
        allRules.sort((a, b) => a.score - b.score)
        result.topIssues = allRules.slice(0, 5).map(r => r.label)

        return result
      } catch {
        continue
      }
    }

    return result
  } catch {
    return result
  }
}
