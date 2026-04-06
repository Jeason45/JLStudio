// Categorize a website URL into: platform, directory, own-site, or none

export type WebsiteCategory = 'platform' | 'directory' | 'own-site' | 'none'

const PLATFORMS: string[] = [
  'planity.com', 'fresha.com', 'treatwell.fr', 'kiute.com', 'balinea.com',
  'doctolib.fr', 'mondocteur.fr', 'rdvmedicaux.com', 'maiia.com',
  'lafourchette.com', 'thefork.com', 'booking.com', 'airbnb.com',
  'uber.com', 'deliveroo.com', 'justeat.fr',
  'etsy.com', 'leboncoin.fr', 'vinted.fr',
  'shopify.com', 'myshopify.com', 'wix.com', 'squarespace.com',
]

const DIRECTORIES: string[] = [
  'pagesjaunes.fr', 'artisan-en-ligne.com', 'gowork.fr', 'societe.com',
  'infonet.fr', 'autour-de-moi.pro', 'e-pro.fr', 'lagazettefrance.fr',
  'entreprises.lagazettefrance.fr', 'kompass.com', 'cylex.fr',
  'infobel.com', 'horairesdouverture24.fr', 'justacote.com',
  'europages.fr', 'manageo.fr', 'verif.com', 'pappers.fr',
  'annuaire-entreprises.fr', 'hoodspot.fr', 'toutlocal.fr',
  'starofservice.com', 'mesdepanneurs.fr', 'habitatpresto.com',
  'lesbonsartisans.fr', 'purposestudio.fr', 'bookizee.com',
  'net1901.org', 'teamesthetique.fr',
]

const MEDIA: string[] = [
  'sudouest.fr', 'lefigaro.fr', 'lemonde.fr', 'linternaute.com',
  'lebonbon.fr', 'wikipedia.org', 'facebook.com', 'instagram.com',
  'linkedin.com', 'twitter.com', 'youtube.com', 'tiktok.com',
]

export function categorizeWebsite(url: string | null): { category: WebsiteCategory; label: string; color: string } {
  if (!url) return { category: 'none', label: 'Aucun site', color: '#6b7280' }

  const domain = extractDomain(url)

  // Check platforms
  if (PLATFORMS.some(p => domain.includes(p))) {
    return { category: 'platform', label: 'Sur plateforme', color: '#f59e0b' }
  }

  // Check directories
  if (DIRECTORIES.some(d => domain.includes(d))) {
    return { category: 'directory', label: 'Annuaire', color: '#ef4444' }
  }

  // Check media
  if (MEDIA.some(m => domain.includes(m))) {
    return { category: 'directory', label: 'Media/Reseau', color: '#ef4444' }
  }

  // It's their own site
  return { category: 'own-site', label: 'Site propre', color: '#22c55e' }
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase().replace('www.', '')
  } catch {
    return url.toLowerCase().replace('www.', '')
  }
}

// Get a prospect category for the database
export function getProspectCategory(url: string | null): string {
  if (!url) return 'creation'
  const { category } = categorizeWebsite(url)
  if (category === 'own-site') return 'refonte'
  if (category === 'platform') return 'platform'
  if (category === 'directory') return 'directory'
  return 'creation'
}
