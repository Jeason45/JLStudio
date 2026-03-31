import { createRequire } from 'module'
import { config } from '../config.js'
import { log } from '../utils/logger.js'
import type { ScoredProspect } from '../scorer/types.js'

const require_ = createRequire(import.meta.url)
const { PrismaClient } = require_('@jlstudio/database/generated/prisma')
const prisma = new PrismaClient()

function extractEmailFromUrl(url: string): string {
  try {
    const domain = new URL(url).hostname.replace('www.', '')
    return `contact@${domain}`
  } catch {
    return `prospect-${Date.now()}@unknown.com`
  }
}

function generateEmailFromName(name: string, city: string): string {
  const slug = name.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${slug}@prospect-${city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')}.local`
}

function getBestEmail(prospect: ScoredProspect): string {
  // 1. Real email extracted from website
  if (prospect.realEmail) return prospect.realEmail.toLowerCase()
  // 2. From URL domain
  if (prospect.url) return extractEmailFromUrl(prospect.url).toLowerCase()
  // 3. Generated from name
  return generateEmailFromName(prospect.name, prospect.ville).toLowerCase()
}

export async function injectIntoCRM(
  prospects: ScoredProspect[],
  metier: string,
  ville: string,
): Promise<{ created: number; updated: number; errors: number }> {
  const siteId = config.siteId
  if (!siteId) {
    log.error('SITE_ID non configuré dans .env — injection CRM ignorée')
    return { created: 0, updated: 0, errors: 0 }
  }

  let created = 0
  let updated = 0
  let errors = 0

  for (const prospect of prospects) {
    const email = getBestEmail(prospect)

    const metadata: Record<string, unknown> = {
      category: prospect.category,
      metier,
      ville,
      prospectedAt: new Date().toISOString(),
      priorityScore: prospect.priorityScore,
      priorityStatus: prospect.status,
      breakdown: prospect.breakdown.map(b => `${b.label} (+${b.points})`),
    }

    // Site analysis
    if (prospect.analysis) {
      metadata.siteUrl = prospect.analysis.url
      metadata.pageSpeedMobile = prospect.analysis.mobileScore
      metadata.pageSpeedDesktop = prospect.analysis.desktopScore
      metadata.cmsDetected = prospect.analysis.cmsDetected
      metadata.isHttps = prospect.analysis.isHttps
      metadata.isResponsive = prospect.analysis.isResponsive
      metadata.hasAnalytics = prospect.analysis.hasAnalytics
      metadata.observatoryGrade = prospect.analysis.observatoryGrade
      metadata.estimatedAge = prospect.analysis.estimatedAge
      metadata.loadTimeMs = prospect.analysis.loadTimeMs
      metadata.emailsFound = prospect.analysis.emailData?.emails || []
      metadata.hasMxRecord = prospect.analysis.emailData?.hasMxRecord || false
      if (prospect.analysis.socialPresence) {
        metadata.socialPresence = {
          facebook: prospect.analysis.socialPresence.facebook,
          instagram: prospect.analysis.socialPresence.instagram,
          linkedin: prospect.analysis.socialPresence.linkedin,
          twitter: prospect.analysis.socialPresence.twitter,
          count: prospect.analysis.socialPresence.count,
        }
      }
    }

    // SIRENE data
    if (prospect.sireneData) {
      metadata.siret = prospect.sireneData.siret
      metadata.siren = prospect.sireneData.siren
      metadata.dateCreation = prospect.sireneData.dateCreation
      metadata.effectif = prospect.sireneData.effectif
      metadata.codeNAF = prospect.sireneData.codeNAF
      metadata.libelleNAF = prospect.sireneData.libelleNAF
      metadata.formeJuridique = prospect.sireneData.formeJuridique
      metadata.adresseSirene = prospect.sireneData.adresse
    }

    const projectType = prospect.category === 'creation' ? 'vitrine' : 'refonte'
    const tags = ['prospect-auto', metier.toLowerCase(), ville.toLowerCase(), prospect.category]

    const notes = buildNotes(prospect)

    try {
      const existing = await prisma.contact.findUnique({
        where: { siteId_email: { siteId, email } },
      })

      if (existing) {
        const existingMeta = (existing.metadata as Record<string, unknown>) || {}
        await prisma.contact.update({
          where: { id: existing.id },
          data: {
            score: prospect.priorityScore,
            metadata: { ...existingMeta, ...metadata },
            notes,
          },
        })
        updated++
      } else {
        await prisma.contact.create({
          data: {
            siteId,
            email,
            firstName: prospect.name,
            companyName: prospect.name,
            phone: prospect.phone,
            city: prospect.city || ville,
            address: prospect.sireneData?.adresse || prospect.address,
            source: 'prospector',
            projectType,
            score: prospect.priorityScore,
            status: 'NEW',
            type: 'entreprise',
            tags,
            notes,
            metadata,
          },
        })
        created++
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      log.error(`CRM — erreur pour ${prospect.name}: ${msg}`)
      errors++
    }
  }

  return { created, updated, errors }
}

function buildNotes(p: ScoredProspect): string {
  const lines: string[] = []
  lines.push(`Prospect auto — ${p.status} (score ${p.priorityScore}/100)`)
  lines.push(`Catégorie: ${p.category === 'creation' ? 'Création de site' : 'Refonte de site'}`)

  if (p.url) lines.push(`Site actuel: ${p.url}`)
  else lines.push('Pas de site web actuellement')

  if (p.realEmail) lines.push(`Email trouvé: ${p.realEmail}`)
  if (p.sireneData?.siret) lines.push(`SIRET: ${p.sireneData.siret}`)
  if (p.sireneData?.dateCreation) lines.push(`Entreprise créée: ${p.sireneData.dateCreation}`)
  if (p.sireneData?.effectif) lines.push(`Effectif: ${p.sireneData.effectif}`)

  if (p.analysis?.cmsDetected) lines.push(`CMS: ${p.analysis.cmsDetected}`)
  if (p.analysis?.mobileScore !== null && p.analysis?.mobileScore !== undefined) lines.push(`PageSpeed mobile: ${p.analysis.mobileScore}/100`)
  if (p.analysis?.socialPresence) lines.push(`Réseaux sociaux: ${p.analysis.socialPresence.count > 0 ? p.analysis.socialPresence.count + ' trouvé(s)' : 'aucun'}`)

  if (p.breakdown.length > 0) {
    lines.push('')
    lines.push('Points faibles:')
    for (const b of p.breakdown.sort((a, b) => b.points - a.points).slice(0, 5)) {
      lines.push(`• ${b.label} — ${b.reason}`)
    }
  }

  return lines.join('\n')
}
