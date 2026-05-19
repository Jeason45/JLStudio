/**
 * Source de vérité unique pour les couleurs par section du CRM admin.
 * Utilisé par AdminSidebar (titre de groupe + item actif) et par
 * PageHeaderRibbon (ligne en haut de chaque page).
 *
 * Palette E — "pop saturé" style Linear/Notion.
 */

export const SECTION_COLORS = {
  pilotage:      '#818cf8', // indigo — vision/contrôle
  contacts:      '#34d399', // emerald — relation humaine
  projets:       '#fbbf24', // amber — production/énergie
  sites:         '#06b6d4', // cyan — web/tech (sites web clients)
  facturation:   '#0ea5e9', // sky blue — argent/business (évite conflit avec emerald contacts)
  marketing:     '#E1306C', // pink IG — rappel Instagram
  communication: '#a78bfa', // lavender — échange transactionnel (évite conflit avec marketing pink)
  systeme:       '#94a3b8', // slate — neutre
} as const;

export type SectionKey = keyof typeof SECTION_COLORS;

/**
 * Retourne la couleur de la section à laquelle appartient un pathname /admin/*.
 * Fallback : or laiton brand (#b89868) si la route ne match aucune section connue.
 */
export function getSectionColor(pathname: string): string {
  if (pathname === '/admin' || pathname.startsWith('/admin/analytics')) {
    return SECTION_COLORS.pilotage;
  }
  if (pathname.startsWith('/admin/leads') || pathname.startsWith('/admin/clients')) {
    return SECTION_COLORS.contacts;
  }
  if (
    pathname.startsWith('/admin/projets') ||
    pathname.startsWith('/admin/kanban') ||
    pathname.startsWith('/admin/gantt') ||
    pathname.startsWith('/admin/brief')
  ) {
    return SECTION_COLORS.projets;
  }
  if (pathname.startsWith('/admin/sites')) {
    return SECTION_COLORS.sites;
  }
  if (pathname.startsWith('/admin/documents')) {
    return SECTION_COLORS.facturation;
  }
  if (pathname.startsWith('/admin/publications')) {
    return SECTION_COLORS.marketing;
  }
  if (
    pathname.startsWith('/admin/emails') ||
    pathname.startsWith('/admin/calendar')
  ) {
    return SECTION_COLORS.communication;
  }
  if (pathname.startsWith('/admin/parametres')) {
    return SECTION_COLORS.systeme;
  }
  return '#b89868'; // fallback or laiton brand
}
