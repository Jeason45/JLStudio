// ============================================================================
// AUDIT CRITERIA DATABASE
// 30 critères répartis en 5 catégories, avec phrases d'impact par secteur
// Source unique de vérité pour l'audit et le PPTX
// ============================================================================

// ── Types ──

export type Severity = 'ok' | 'acceptable' | 'warning' | 'critical'
export type Category = 'speed' | 'mobile' | 'visibility' | 'trust' | 'conversion'
export type SiteType = 'vitrine' | 'ecommerce'
export type Sector = 'coiffeur' | 'restaurant' | 'artisan' | 'commerce' | 'sante' | 'immobilier' | 'default'

export interface CriterionResult {
  id: string
  category: Category
  label: string
  severity: Severity
  value: string           // valeur mesurée affichée ("6.2s", "Absent", "42/100")
  rawValue: number | boolean | string | null
  impact: string          // phrase d'impact business (sectorisée)
  source: string          // source de la norme
  recommendation: string  // quoi faire pour corriger
}

export interface AuditScores {
  global: number          // score pondéré /100
  speed: number
  mobile: number
  visibility: number
  trust: number
  conversion: number
  estimatedLostCustomers: string  // "~15-20 clients/mois"
  sectorPercentile: string        // "en dessous de 70% des sites de votre secteur"
}

// ── Poids des catégories ──

export const CATEGORY_WEIGHTS: Record<Category, number> = {
  speed: 0.30,
  mobile: 0.20,
  visibility: 0.20,
  trust: 0.20,
  conversion: 0.10,
}

export const CATEGORY_LABELS: Record<Category, string> = {
  speed: 'Rapidité',
  mobile: 'Mobile & Accessibilité',
  visibility: 'Visibilité Google',
  trust: 'Confiance & Sécurité',
  conversion: 'Conversion',
}

// ── Phrases d'impact par secteur ──

const SECTOR_PHRASES: Record<string, Record<Sector, string>> = {
  slow_mobile: {
    coiffeur: "70% des recherches de coiffeur sont mobiles. {value} de chargement = le client entre chez votre concurrent avant même de voir votre salon.",
    restaurant: "83% des recherches de restaurant sont mobiles, souvent à l'heure du repas. {value} de chargement = ils choisissent le restaurant suivant.",
    artisan: "Les urgences (fuite, panne, serrure) sont cherchées sur mobile. {value} de chargement = ils appellent le suivant dans la liste.",
    commerce: "Les clients comparent les prix sur leur téléphone. {value} de chargement = ils ferment l'onglet et achètent ailleurs.",
    sante: "Un patient qui cherche un praticien veut un rendez-vous rapidement. {value} de chargement = il passe au profil suivant.",
    immobilier: "Les acheteurs consultent les annonces sur mobile pendant leurs déplacements. {value} de chargement = ils retournent sur SeLoger.",
    default: "53% des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger. Le vôtre en met {value}.",
  },
  not_responsive: {
    coiffeur: "70% des personnes qui cherchent un coiffeur le font depuis leur téléphone. Votre site est illisible sur mobile — ces clients vont chez un concurrent avec un site adapté.",
    restaurant: "Un client qui cherche où manger en marchant dans la rue ne va pas zoomer sur votre menu. Il va au restaurant d'après sur Google.",
    artisan: "Quand quelqu'un a une urgence, il cherche depuis son téléphone. Si votre site n'est pas lisible, il appelle le numéro suivant.",
    commerce: "Vos clients potentiels naviguent sur leur téléphone. Un site non adapté mobile = ils ne peuvent même pas voir vos produits correctement.",
    sante: "Les patients cherchent un praticien depuis leur téléphone. Un site non responsive les fait douter de votre professionnalisme.",
    immobilier: "Les acquéreurs consultent les biens sur mobile. Un site non responsive rend la navigation impossible — ils retournent sur les portails.",
    default: "Plus de 60% du trafic web est mobile. Un site non responsive perd la majorité de ses visiteurs.",
  },
  no_https: {
    coiffeur: "Votre site affiche 'Non sécurisé' dans le navigateur. Un client qui veut prendre rendez-vous en ligne voit cet avertissement et hésite.",
    restaurant: "Le cadenas 'Non sécurisé' fait fuir les clients, surtout ceux qui voudraient réserver ou consulter votre carte.",
    artisan: "Un site 'Non sécurisé' donne l'impression d'une entreprise pas fiable. Pour un artisan, la confiance est la base du contrat.",
    commerce: "Aucun client ne saisira ses coordonnées bancaires sur un site non sécurisé. C'est un bloqueur total pour la vente en ligne.",
    sante: "Un patient ne confiera pas ses informations personnelles à un site marqué 'Non sécurisé'.",
    immobilier: "Les acquéreurs manipulent des données sensibles (revenus, coordonnées). Un site non sécurisé = zéro confiance.",
    default: "Les navigateurs affichent 'Non sécurisé' — 85% des internautes n'interagissent pas avec un site non HTTPS.",
  },
  no_analytics: {
    coiffeur: "Sans analytics, vous ne savez pas combien de clients potentiels visitent votre site chaque semaine ni lesquels vous contactent.",
    restaurant: "Vous n'avez aucune idée du nombre de personnes qui consultent votre carte en ligne ou cherchent vos horaires.",
    artisan: "Impossible de savoir si vos clients vous trouvent par Google, par les Pages Jaunes ou par le bouche-à-oreille en ligne.",
    commerce: "Vous ne savez pas quels produits intéressent vos visiteurs ni à quel moment ils abandonnent leur visite.",
    sante: "Aucune donnée sur le parcours patient en ligne : combien viennent, d'où, et combien prennent rendez-vous.",
    immobilier: "Vous ne savez pas quelles annonces sont les plus consultées ni combien de leads vous perdez.",
    default: "Sans outil de mesure, vous pilotez à l'aveugle. Impossible de savoir ce qui fonctionne et ce qui fait fuir.",
  },
  no_meta_description: {
    coiffeur: "Sur Google, votre description est générée automatiquement — souvent un extrait incohérent. Le client hésite à cliquer quand il ne comprend pas ce que vous proposez.",
    restaurant: "Votre fiche Google affiche un texte aléatoire au lieu de 'Restaurant gastronomique à Bordeaux — Carte, réservation, horaires'.",
    artisan: "Sans description claire sur Google, votre fiche ressemble à un résultat générique — le client clique sur un concurrent mieux présenté.",
    commerce: "Vos produits phares n'apparaissent pas dans la description Google. Les clients ne savent pas ce que vous vendez avant de cliquer.",
    sante: "Votre spécialité, vos horaires, votre localisation — rien de tout ça n'apparaît clairement dans Google.",
    immobilier: "Votre agence n'affiche ni secteur géographique ni spécialité dans Google — les acquéreurs passent au résultat suivant.",
    default: "Google génère automatiquement votre description — le résultat est souvent incohérent et peu attractif. Moins de clics = moins de clients.",
  },
  no_sitemap: {
    coiffeur: "Google a plus de difficulté à trouver toutes vos pages — vos prestations, tarifs et photos peuvent être invisibles dans les résultats.",
    restaurant: "Votre carte, vos événements, votre page réservation — Google ne sait pas qu'elles existent sans sitemap.",
    artisan: "Vos pages de services spécifiques (plomberie, électricité, dépannage...) sont peut-être invisibles pour Google.",
    commerce: "Vos fiches produits risquent de ne pas être indexées par Google. Pas d'indexation = pas de vente via la recherche.",
    sante: "Vos pages de spécialités et de prise de rendez-vous peuvent ne pas apparaître dans Google.",
    immobilier: "Vos annonces immobilières ne sont pas signalées à Google — elles n'apparaissent pas dans les résultats de recherche.",
    default: "Sans sitemap, Google doit deviner la structure de votre site. Certaines pages importantes peuvent ne jamais être indexées.",
  },
  no_h1: {
    coiffeur: "Votre page d'accueil n'a pas de titre principal clair. Google ne comprend pas que vous êtes un salon de coiffure à {city}.",
    restaurant: "Sans titre principal, Google ne sait pas que vous êtes un restaurant. Votre positionnement sur '{sector} {city}' en souffre.",
    artisan: "Google cherche un titre principal pour comprendre votre activité. Sans lui, vous êtes invisible sur '{sector} {city}'.",
    commerce: "Votre page n'a pas de titre principal — Google ne peut pas déterminer ce que vous vendez.",
    sante: "Sans titre H1, Google a du mal à associer votre page à votre spécialité médicale.",
    immobilier: "Votre page n'indique pas clairement à Google que vous êtes une agence immobilière dans votre secteur.",
    default: "Le titre H1 est le premier signal que Google lit pour comprendre votre page. Son absence nuit directement à votre référencement.",
  },
  poor_security_headers: {
    coiffeur: "Votre site manque de protections contre les attaques web. Ce n'est pas visible pour vos clients, mais Google le détecte et peut vous pénaliser.",
    restaurant: "Des protections de sécurité basiques manquent. Si un hacker détourne votre site, vos clients verront du contenu indésirable.",
    artisan: "Votre site est vulnérable à certaines attaques. Un site piraté détruit la confiance de vos clients et votre réputation.",
    commerce: "Votre boutique en ligne manque de protections essentielles. Un piratage peut exposer les données de vos clients.",
    sante: "Des données patients pourraient être compromises. Les protections manquantes sont un risque RGPD direct.",
    immobilier: "Les données personnelles de vos clients (revenus, adresses) sont mal protégées par les headers actuels.",
    default: "Des protections web standard sont absentes. Le site est plus vulnérable aux attaques et peut être pénalisé par Google.",
  },
  no_phone_clickable: {
    coiffeur: "Votre numéro de téléphone n'est pas cliquable sur mobile. Un client qui veut vous appeler doit le recopier à la main — beaucoup abandonnent.",
    restaurant: "Impossible d'appeler pour réserver en un tap. Le client ferme votre site et appelle un restaurant qui rend ça facile.",
    artisan: "En urgence, le client veut appeler en un tap. S'il doit recopier le numéro, il appelle le concurrent suivant.",
    commerce: "Pour une question avant achat, le client veut appeler facilement. Un numéro non cliquable crée une friction inutile.",
    sante: "Un patient qui veut un rendez-vous rapide ne va pas recopier un numéro. Il appelle le praticien dont le numéro est cliquable.",
    immobilier: "Un acquéreur intéressé veut appeler immédiatement. Un numéro non cliquable = appel perdu, lead perdu.",
    default: "Sur mobile, un numéro non cliquable est une barrière. Chaque clic en moins entre le visiteur et l'appel = plus de contacts.",
  },
  no_contact_form: {
    coiffeur: "Pas de formulaire de contact. Les clients qui n'osent pas appeler (ou qui cherchent en dehors des heures d'ouverture) n'ont aucun moyen de vous joindre.",
    restaurant: "Sans formulaire, les demandes de privatisation, événements ou allergies alimentaires ne vous parviennent pas.",
    artisan: "Un client qui veut un devis en soirée ne peut pas vous écrire. Le lendemain, il aura appelé quelqu'un d'autre.",
    commerce: "Sans formulaire de contact, les questions avant achat restent sans réponse — et la vente ne se fait pas.",
    sante: "Les patients qui préfèrent écrire plutôt qu'appeler n'ont aucun moyen de vous contacter.",
    immobilier: "Un acquéreur intéressé par un bien ne peut pas vous écrire directement — il passe par un concurrent.",
    default: "Un formulaire de contact capture les prospects qui ne veulent pas ou ne peuvent pas appeler. Sans lui, vous les perdez.",
  },
  no_google_maps: {
    coiffeur: "Pas de carte Google Maps intégrée. Le client qui ne connaît pas le quartier ne sait pas comment venir — il choisit un salon plus facile à trouver.",
    restaurant: "Sans Google Maps, le client en déplacement ne sait pas où vous êtes. Il va au restaurant dont il voit l'itinéraire en un clic.",
    artisan: "Vos clients ont besoin de savoir où vous êtes basé pour estimer si vous intervenez dans leur zone.",
    commerce: "Un client veut vérifier l'itinéraire avant de se déplacer. Sans Maps, il achète en ligne chez un concurrent.",
    sante: "Un patient nouveau a besoin de l'itinéraire. Sans Google Maps, il peut se tromper d'adresse ou renoncer.",
    immobilier: "La localisation est le critère n°1 en immobilier. Sans carte, les biens n'ont aucun contexte géographique.",
    default: "Google Maps intégré aide le client à vous trouver physiquement. Sans lui, vous perdez les clients de passage.",
  },
  no_reviews: {
    coiffeur: "Aucun avis client visible sur votre site. 88% des consommateurs lisent les avis avant de choisir un prestataire — sans eux, vous dépendez uniquement du bouche-à-oreille.",
    restaurant: "Pas d'avis visibles. Les clients qui hésitent entre 2 restaurants choisiront celui qui affiche des témoignages positifs.",
    artisan: "Sans avis clients, un prospect n'a aucune preuve que vous faites du bon travail. Il choisit l'artisan avec des témoignages.",
    commerce: "Les avis produits augmentent les ventes de 18% en moyenne. Leur absence est un manque à gagner direct.",
    sante: "Les patients se fient aux avis en ligne autant qu'aux recommandations personnelles. Leur absence crée du doute.",
    immobilier: "Les vendeurs et acheteurs choisissent une agence qui a des preuves de satisfaction. Sans avis = sans confiance.",
    default: "88% des consommateurs consultent les avis en ligne avant un achat local. Leur absence sur votre site est un frein majeur.",
  },
  no_cta: {
    coiffeur: "Aucun bouton d'action clair (Prendre RDV, Appeler, Réserver) visible immédiatement. Le visiteur ne sait pas quoi faire → il part.",
    restaurant: "Pas de bouton 'Réserver' ou 'Voir la carte' visible. Le client doit chercher comment agir → friction → départ.",
    artisan: "Pas de bouton 'Demander un devis' ou 'Appeler' visible. Le client motivé ne trouve pas comment vous contacter rapidement.",
    commerce: "Aucun bouton d'action clair sur la page d'accueil. Le visiteur ne sait pas par où commencer → il repart.",
    sante: "Pas de bouton 'Prendre RDV' visible immédiatement. Le patient doit chercher → il va sur Doctolib.",
    immobilier: "Pas de CTA 'Estimer mon bien' ou 'Voir les annonces' visible. Le visiteur quitte sans interagir.",
    default: "Sans bouton d'action visible, le visiteur ne sait pas quoi faire sur votre site. Chaque seconde d'hésitation augmente le risque de départ.",
  },
  no_structured_data: {
    coiffeur: "Google ne peut pas afficher vos horaires, votre note et votre adresse directement dans les résultats de recherche. Vos concurrents qui ont ces données riches attirent plus de clics.",
    restaurant: "Votre carte, vos horaires, votre note Google ne s'affichent pas en résultat enrichi. Les restaurants avec ces infos obtiennent 20-30% de clics en plus.",
    artisan: "Vos informations (zone d'intervention, horaires, spécialités) n'apparaissent pas dans les résultats enrichis Google.",
    commerce: "Vos produits n'affichent ni prix ni disponibilité dans Google. Les boutiques avec Schema.org obtiennent plus de clics organiques.",
    sante: "Votre spécialité et vos horaires n'apparaissent pas dans les résultats enrichis Google.",
    immobilier: "Vos biens n'affichent pas de données enrichies (prix, surface, localisation) dans Google.",
    default: "Sans données structurées, Google affiche un résultat basique pour votre site. Les concurrents avec des résultats enrichis attirent plus de clics.",
  },
  heavy_page: {
    coiffeur: "Votre page pèse {value} — c'est comme envoyer {analogy} à chaque visiteur. Sur un réseau 4G moyen, ça prend {loadEstimate} à charger.",
    restaurant: "Votre page pèse {value} — sur le réseau 4G d'un client en terrasse, ça prend {loadEstimate} à charger. Il abandonne avant de voir votre carte.",
    artisan: "Votre page pèse {value}. Sur mobile en zone péri-urbaine (réseau faible), ça peut prendre {loadEstimate} à charger.",
    commerce: "Votre page pèse {value}. Chaque seconde de chargement supplémentaire réduit les conversions de 7% (source: Akamai).",
    sante: "Votre page pèse {value}. Les patients qui consultent depuis la salle d'attente (Wi-Fi faible) abandonneront.",
    immobilier: "Votre page pèse {value}. Les photos d'annonces haute résolution non optimisées ralentissent tout le site.",
    default: "Votre page pèse {value}. La recommandation est de rester sous 1.5 Mo. Chaque Mo supplémentaire = 1 seconde de chargement en plus sur 4G.",
  },
  w3c_errors: {
    coiffeur: "{value} erreurs de code détectées. Ça peut causer des bugs d'affichage sur certains téléphones — votre site ne s'affiche pas pareil pour tout le monde.",
    restaurant: "{value} erreurs de code. Certains éléments (menu, galerie photos) peuvent mal s'afficher selon le navigateur du client.",
    artisan: "{value} erreurs de code HTML. Votre site peut avoir des problèmes d'affichage sur certains appareils sans que vous le sachiez.",
    commerce: "{value} erreurs HTML détectées. Des bugs d'affichage sur les fiches produits = des ventes perdues.",
    sante: "{value} erreurs de code. Des problèmes d'affichage sur certains navigateurs nuisent à votre image professionnelle.",
    immobilier: "{value} erreurs HTML. Les galeries photos et formulaires de contact peuvent dysfonctionner sur certains appareils.",
    default: "{value} erreurs de code HTML détectées. Chaque erreur est un risque de bug d'affichage sur certains navigateurs ou appareils.",
  },
  not_google_visible: {
    coiffeur: "Votre site n'apparaît pas dans les 30 premiers résultats Google pour '{keyword}'. Vos clients potentiels ne vous trouvent pas.",
    restaurant: "Quand quelqu'un cherche '{keyword}' sur Google, votre restaurant n'apparaît pas. Vous êtes invisible pour vos futurs clients.",
    artisan: "Pour '{keyword}', votre site est introuvable sur Google. Les clients en urgence appellent ceux qu'ils trouvent en premier.",
    commerce: "Votre boutique n'apparaît pas quand on cherche '{keyword}'. Tout ce trafic va chez vos concurrents.",
    sante: "Votre cabinet n'apparaît pas pour '{keyword}'. Les patients utilisent Doctolib ou choisissent un praticien mieux référencé.",
    immobilier: "Votre agence est invisible pour '{keyword}'. Les acquéreurs et vendeurs vont sur les portails ou chez un concurrent mieux placé.",
    default: "Votre site n'apparaît pas dans les 30 premiers résultats pour '{keyword}'. Vous êtes invisible pour vos clients potentiels.",
  },
  no_mentions_legales: {
    coiffeur: "Pas de mentions légales détectées. C'est une obligation légale en France — un client averti (ou un concurrent) peut le signaler.",
    restaurant: "Les mentions légales sont obligatoires. Leur absence est une infraction et nuit à la confiance des clients.",
    artisan: "En tant que professionnel, les mentions légales sont obligatoires sur votre site. Leur absence peut entraîner une amende.",
    commerce: "Pour un site e-commerce, l'absence de mentions légales et CGV est une infraction grave qui peut entraîner des sanctions.",
    sante: "Les mentions légales sont obligatoires pour un professionnel de santé. Leur absence est un manquement réglementaire.",
    immobilier: "Les mentions légales incluant le numéro de carte professionnelle sont obligatoires pour les agents immobiliers.",
    default: "Les mentions légales sont obligatoires en France pour tout site professionnel (article 6 LCEN). Leur absence est passible d'amende.",
  },
  ssl_expiring: {
    coiffeur: "Votre certificat SSL expire dans {value} jours. Après expiration, votre site affichera un écran d'erreur effrayant qui bloquera tous les visiteurs.",
    restaurant: "SSL expire dans {value} jours. Après : écran rouge 'Ce site n'est pas sûr' — aucun client ne passera.",
    artisan: "Votre certificat de sécurité expire dans {value} jours. Sans renouvellement, votre site deviendra inaccessible.",
    commerce: "SSL expire dans {value} jours. Après expiration : impossible de passer commande, paiements bloqués.",
    sante: "Certificat SSL expire dans {value} jours. Un site médical inaccessible = patients perdus et image dégradée.",
    immobilier: "SSL expire dans {value} jours. Un site immobilier bloqué par le navigateur = aucune visite, aucun lead.",
    default: "Votre certificat SSL expire dans {value} jours. Après expiration, les navigateurs bloqueront l'accès à votre site avec un avertissement de sécurité.",
  },
}

// ── Sources officielles ──

export const SOURCES: Record<string, string> = {
  google_vitals: 'Google Web Vitals, 2024',
  google_mobile: 'Google/IPSOS, Think with Google, 2023',
  google_speed: 'Google DoubleClick, 2023 — "53% of mobile visits abandoned after 3s"',
  google_search: 'Google Search Central, 2024',
  owasp: 'OWASP Security Headers, 2024',
  observatory: 'Mozilla Observatory',
  w3c: 'W3C Markup Validation Service',
  akamai: 'Akamai — "100ms delay = 7% conversion drop"',
  reviews: 'BrightLocal Consumer Review Survey, 2024',
  lcen: 'Article 6 de la Loi pour la Confiance dans l\'Économie Numérique (LCEN)',
  schema: 'Google Search Central — Structured Data Guidelines, 2024',
  yellowlab: 'Yellow Lab Tools — Web performance audit',
  carbon: 'Website Carbon Calculator — The Green Web Foundation',
  lighthouse: 'Google Lighthouse, 2024',
}

// ── Détection du secteur depuis le NAF ou la requête de recherche ──

export function detectSector(nafLabel: string | null, query: string | null): Sector {
  const text = `${nafLabel || ''} ${query || ''}`.toLowerCase()

  if (/coiff|beaut[eé]|esth[eé]ti|ongle|manucure|barbier|barber/.test(text)) return 'coiffeur'
  if (/restaurant|brasserie|bistro|traiteur|pizz|sushi|burger|boulang|p[aâ]tiss/.test(text)) return 'restaurant'
  if (/plomb|[eé]lectri|chauffag|serru|peintr|ma[cç]on|couvreur|carrel|menuisi|charpent|jardin|paysag/.test(text)) return 'artisan'
  if (/m[eé]decin|dentist|kin[eé]|ost[eé]opath|infirm|pharmacie|opticien|psycholog|sage.?femme|podolog/.test(text)) return 'sante'
  if (/immobili|agence|location|gestion.?locative|syndic/.test(text)) return 'immobilier'
  if (/boutique|magasin|shop|vente|commerce|fleur|bijou|v[eê]tement|optique|sport/.test(text)) return 'commerce'

  return 'default'
}

// ── Obtenir la phrase d'impact pour un critère ──

export function getImpactPhrase(
  criterionId: string,
  sector: Sector,
  replacements: Record<string, string> = {},
): string {
  const phrases = SECTOR_PHRASES[criterionId]
  if (!phrases) return ''

  let phrase = phrases[sector] || phrases.default
  for (const [key, val] of Object.entries(replacements)) {
    phrase = phrase.replace(new RegExp(`\\{${key}\\}`, 'g'), val)
  }
  return phrase
}

// ── Estimation des clients perdus par secteur ──

export function estimateLostCustomers(sector: Sector, criticalCount: number, warningCount: number): string {
  // Estimations basées sur le nombre de problèmes critiques/importants
  const baseEstimates: Record<Sector, [number, number]> = {
    coiffeur: [8, 15],     // 8-15 clients/mois perdus pour un salon moyen
    restaurant: [15, 30],  // 15-30 couverts/mois
    artisan: [5, 12],      // 5-12 appels/mois
    commerce: [10, 25],    // 10-25 ventes/mois
    sante: [8, 18],        // 8-18 patients/mois
    immobilier: [3, 8],    // 3-8 leads/mois
    default: [10, 20],     // 10-20 prospects/mois
  }

  const [low, high] = baseEstimates[sector]
  const multiplier = Math.min(1 + (criticalCount * 0.3) + (warningCount * 0.1), 2.5)

  const estLow = Math.round(low * multiplier)
  const estHigh = Math.round(high * multiplier)

  return `~${estLow}-${estHigh}`
}

// ── Labels pour unités ──

export function formatUnit(sector: Sector): string {
  switch (sector) {
    case 'restaurant': return 'couverts/mois'
    case 'artisan': return 'appels/mois'
    case 'commerce': return 'ventes/mois'
    case 'sante': return 'patients/mois'
    case 'immobilier': return 'leads/mois'
    default: return 'clients potentiels/mois'
  }
}
