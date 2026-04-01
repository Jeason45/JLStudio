import { createObjectCsvWriter } from 'csv-writer'
import { existsSync, mkdirSync } from 'fs'
import { join } from 'path'
import type { ScoredProspect } from '../scorer/types.js'

export async function exportCSV(prospects: ScoredProspect[], metier: string, ville: string): Promise<string> {
  const outputDir = join(process.cwd(), 'output')
  if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true })

  const date = new Date().toISOString().slice(0, 10)
  const filename = `prospects_${ville.toLowerCase().replace(/\s+/g, '-')}_${metier.toLowerCase().replace(/\s+/g, '-')}_${date}.csv`
  const filepath = join(outputDir, filename)

  const csvWriter = createObjectCsvWriter({
    path: filepath,
    header: [
      { id: 'name', title: 'Nom' },
      { id: 'category', title: 'Catégorie' },
      { id: 'priorityScore', title: 'Score' },
      { id: 'status', title: 'Statut' },
      { id: 'email', title: 'Email' },
      { id: 'phone', title: 'Téléphone' },
      { id: 'city', title: 'Ville' },
      { id: 'address', title: 'Adresse' },
      { id: 'url', title: 'URL' },
      { id: 'topReasons', title: 'Raisons principales' },
      { id: 'siret', title: 'SIRET' },
      { id: 'dateCreation', title: 'Création entreprise' },
      { id: 'effectif', title: 'Effectif' },
      { id: 'activite', title: 'Activité (NAF)' },
      { id: 'socialCount', title: 'Réseaux sociaux' },
      { id: 'mobileScore', title: 'PageSpeed Mobile' },
      { id: 'cmsDetected', title: 'CMS' },
      { id: 'isHttps', title: 'HTTPS' },
      { id: 'isResponsive', title: 'Responsive' },
      { id: 'hasAnalytics', title: 'Analytics' },
      { id: 'observatoryGrade', title: 'Sécurité' },
      { id: 'w3cErrors', title: 'Erreurs HTML' },
      { id: 'yellowLabScore', title: 'Yellow Lab' },
      { id: 'topOpportunities', title: 'Opportunités PageSpeed' },
    ],
    encoding: 'utf8',
    fieldDelimiter: ';',
  })

  const records = prospects.map(p => ({
    name: p.name,
    category: p.category === 'creation' ? 'Création' : 'Refonte',
    priorityScore: p.priorityScore,
    status: p.status,
    email: p.realEmail || '',
    phone: p.phone || '',
    city: p.city || p.ville,
    address: p.sireneData?.adresse || p.address || '',
    url: p.url || 'Aucun site',
    topReasons: p.breakdown.sort((a, b) => b.points - a.points).slice(0, 3).map(b => b.label).join(' | '),
    siret: p.sireneData?.siret || '',
    dateCreation: p.sireneData?.dateCreation || '',
    effectif: p.sireneData?.effectif || '',
    activite: p.sireneData?.libelleNAF || '',
    socialCount: p.analysis?.socialPresence ? `${p.analysis.socialPresence.count}` : '',
    mobileScore: p.analysis?.mobileScore ?? '',
    cmsDetected: p.analysis?.cmsDetected || '',
    isHttps: p.analysis ? (p.analysis.isHttps ? 'Oui' : 'Non') : '',
    isResponsive: p.analysis ? (p.analysis.isResponsive ? 'Oui' : 'Non') : '',
    hasAnalytics: p.analysis ? (p.analysis.hasAnalytics ? 'Oui' : 'Non') : '',
    observatoryGrade: p.analysis?.observatoryGrade || '',
    w3cErrors: p.analysis?.w3cErrors ?? '',
    yellowLabScore: p.analysis?.yellowLabScore ?? '',
    topOpportunities: p.analysis?.mobilePerformanceAudits?.slice(0, 3).map(o => o.title).join(' | ') || '',
  }))

  await csvWriter.writeRecords(records)
  return filepath
}
