import type { RawProspect } from '../scraper/types.js'
import type { SiteAnalysis } from '../analyzer/types.js'
import type { SireneData } from '../analyzer/sirene.js'

export interface ScoreBreakdown {
  label: string
  points: number
  reason: string
}

export interface ScoredProspect extends RawProspect {
  category: 'creation' | 'refonte'
  analysis: SiteAnalysis | null
  sireneData: SireneData | null
  realEmail: string | null          // extracted from site or generated
  priorityScore: number
  rawScore: number
  breakdown: ScoreBreakdown[]
  status: 'Chaud' | 'Tiède' | 'Froid'
}
