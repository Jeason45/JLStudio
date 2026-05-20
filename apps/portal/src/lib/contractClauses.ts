import { prisma } from '@/lib/prisma';

// Clauses par défaut de la bibliothèque (Lot A). Éditables ensuite dans
// l'admin. `conditionKey` : null = toujours proposée ; sinon la clause n'est
// pré-cochée que si l'option correspondante est activée à la création du contrat.
//   - has_crm        → projet incluant un CRM (déclenche l'annexe RGPD/DPA)
//   - is_refonte     → refonte d'un site existant
//   - is_maintenance → contrat de maintenance / TMA

export type ClauseCategory =
  | 'OBJET' | 'DUREE' | 'FINANCIER' | 'PROPRIETE_INTELLECTUELLE' | 'RGPD'
  | 'MAINTENANCE' | 'CONFIDENTIALITE' | 'RESILIATION' | 'DROIT_APPLICABLE' | 'AUTRE';

export interface DefaultClause {
  category: ClauseCategory;
  title: string;
  body: string;
  defaultOrder: number;
  autoInclude: boolean;
  conditionKey: string | null;
}

export const DEFAULT_CLAUSES: DefaultClause[] = [
  {
    category: 'OBJET', defaultOrder: 10, autoInclude: true, conditionKey: null,
    title: 'Objet du contrat',
    body: `Le présent contrat a pour objet de définir les conditions dans lesquelles le Prestataire fournira au Client les prestations suivantes : {{objet_contrat}}.

{{#description_prestation}}Détail des prestations : {{description_prestation}}{{/description_prestation}}
{{#numero_devis_ref}}Les prestations sont réalisées conformément au devis n° {{numero_devis_ref}}.{{/numero_devis_ref}}`,
  },
  {
    category: 'AUTRE', defaultOrder: 15, autoInclude: true, conditionKey: 'is_refonte',
    title: 'Reprise de l\'existant et migration',
    body: `Le présent contrat porte sur la refonte d'un site existant. Le Prestataire réalisera au préalable un état des lieux technique de l'existant.

Le Client garantit détenir les droits sur les contenus et le code existants transmis. La migration des contenus et des données, ainsi que la mise en place des redirections (301) pour préserver le référencement (SEO), font partie de la prestation. Une recette comparative entre l'ancien et le nouveau site sera effectuée.`,
  },
  {
    category: 'DUREE', defaultOrder: 20, autoInclude: true, conditionKey: null,
    title: 'Durée et échéances',
    body: `Le contrat prend effet à la date de signature et reste en vigueur jusqu'à la livraison complète des prestations, sauf résiliation anticipée.

Date de début : {{date_debut}} — Date de fin prévue : {{date_fin}}.`,
  },
  {
    category: 'FINANCIER', defaultOrder: 30, autoInclude: true, conditionKey: null,
    title: 'Conditions financières',
    body: `Montant total : {{montant_total}} € (TVA non applicable, art. 293 B du CGI).

{{#acompte_pourcentage}}Un acompte de {{acompte_pourcentage}}% est versé à la signature du présent contrat ; le solde est dû à la livraison des prestations.{{/acompte_pourcentage}}
{{#conditions_paiement}}Conditions de paiement : {{conditions_paiement}}.{{/conditions_paiement}}

Tout retard de paiement entraîne de plein droit des pénalités égales à trois fois le taux d'intérêt légal, sans mise en demeure préalable, ainsi qu'une indemnité forfaitaire de recouvrement de 40 €.`,
  },
  {
    category: 'PROPRIETE_INTELLECTUELLE', defaultOrder: 40, autoInclude: true, conditionKey: null,
    title: 'Propriété intellectuelle et cession des droits',
    body: `Sous réserve du paiement intégral du prix, le Prestataire cède au Client, à titre exclusif, les droits patrimoniaux (reproduction, représentation, adaptation) sur les livrables finaux spécifiquement créés pour le Client (créations graphiques, contenus, code spécifique), pour la durée légale de protection et pour le monde entier.

Le Prestataire conserve la propriété des outils, briques logicielles, méthodologies et frameworks préexistants, sur lesquels le Client bénéficie d'un droit d'usage non exclusif nécessaire à l'exploitation des livrables. Sauf demande écrite contraire, le Prestataire peut mentionner la réalisation dans ses références.`,
  },
  {
    category: 'MAINTENANCE', defaultOrder: 50, autoInclude: true, conditionKey: 'is_maintenance',
    title: 'Maintenance et évolutions',
    body: `Le Prestataire assure la maintenance du site comprenant : la maintenance corrective (correction des anomalies), la maintenance préventive (mises à jour de sécurité et des composants) et, dans la limite d'un crédit d'heures convenu, la maintenance évolutive.

Délais d'intervention (SLA) : prise en compte sous 2 jours ouvrés pour une anomalie bloquante. Les évolutions mineures (≤ 2 h) sont incluses dans le crédit d'heures ; les évolutions majeures font l'objet d'un devis spécifique. Le contrat est conclu pour une durée d'un an, renouvelable par tacite reconduction, résiliable avec un préavis de 30 jours. Une clause de réversibilité garantit la restitution des accès et des données en fin de contrat.`,
  },
  {
    category: 'RGPD', defaultOrder: 60, autoInclude: true, conditionKey: 'has_crm',
    title: 'Protection des données personnelles (RGPD — art. 28)',
    body: `Dans le cadre du CRM, le Prestataire agit en qualité de sous-traitant au sens de l'article 28 du RGPD, le Client étant responsable de traitement.

Le Prestataire traite les données personnelles uniquement sur instruction documentée du Client, aux seules fins d'exploitation du CRM (gestion des contacts, prospects et clients du Client). Il met en œuvre des mesures de sécurité appropriées, garantit la confidentialité, notifie tout incident de sécurité dans les meilleurs délais, ne recourt à aucun sous-traitant ultérieur sans autorisation écrite, et n'utilise pas les données pour entraîner des modèles d'intelligence artificielle. À la fin du contrat, les données sont restituées au Client puis supprimées. Catégories de données : données d'identification et de contact. Personnes concernées : contacts, prospects et clients du Client.`,
  },
  {
    category: 'CONFIDENTIALITE', defaultOrder: 70, autoInclude: true, conditionKey: null,
    title: 'Confidentialité',
    body: `Chacune des Parties s'engage à conserver strictement confidentielles toutes les informations, documents et données auxquels elle aura accès dans le cadre de l'exécution du présent contrat. Cette obligation perdure pendant toute la durée du contrat et pour une période de deux (2) ans après son terme.`,
  },
  {
    category: 'RESILIATION', defaultOrder: 80, autoInclude: true, conditionKey: null,
    title: 'Résiliation',
    body: `En cas de manquement par l'une des Parties à ses obligations, l'autre Partie pourra, après mise en demeure restée infructueuse pendant trente (30) jours, résilier le contrat de plein droit, sans préjudice des dommages-intérêts éventuels.

En cas de résiliation, les sommes dues au titre des prestations effectivement réalisées restent acquises au Prestataire.`,
  },
  {
    category: 'DROIT_APPLICABLE', defaultOrder: 90, autoInclude: true, conditionKey: null,
    title: 'Droit applicable et juridiction',
    body: `Le présent contrat est soumis au droit français. Tout litige relatif à son interprétation ou à son exécution sera, à défaut de règlement amiable, de la compétence exclusive des tribunaux du ressort du siège social du Prestataire.`,
  },
];

/**
 * Insère les clauses par défaut pour un site si sa bibliothèque est vide.
 * Idempotent : ne fait rien si des clauses existent déjà.
 * Retourne le nombre de clauses créées.
 */
export async function seedDefaultClauses(siteId: string): Promise<number> {
  const count = await prisma.contractClause.count({ where: { siteId } });
  if (count > 0) return 0;
  await prisma.contractClause.createMany({
    data: DEFAULT_CLAUSES.map((c) => ({ ...c, siteId })),
  });
  return DEFAULT_CLAUSES.length;
}
