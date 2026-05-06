export const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Brouillon',
  SENT: 'Envoye',
  SIGNED: 'Signe',
  ACCEPTED: 'Accepte',
  REJECTED: 'Refuse',
  PAID: 'Paye',
  CANCELLED: 'Annule',
};

export const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'var(--text-tertiary)',
  SENT: 'var(--accent)',
  SIGNED: 'var(--success)',
  ACCEPTED: 'var(--success)',
  REJECTED: 'var(--danger)',
  PAID: 'var(--success)',
  CANCELLED: 'var(--text-tertiary)',
};

export const STATUS_BG: Record<string, string> = {
  DRAFT: 'var(--bg-badge)',
  SENT: 'var(--accent-light)',
  SIGNED: 'var(--success-light)',
  ACCEPTED: 'var(--success-light)',
  REJECTED: 'var(--danger-light)',
  PAID: 'var(--success-light)',
  CANCELLED: 'var(--bg-badge)',
};

export const TYPE_LABELS: Record<string, { singular: string; plural: string }> = {
  DEVIS: { singular: 'Devis', plural: 'Devis' },
  FACTURE: { singular: 'Facture', plural: 'Factures' },
  CONTRAT: { singular: 'Contrat', plural: 'Contrats' },
};

export const STATUSES_BY_TYPE: Record<string, string[]> = {
  FACTURE: ['DRAFT', 'SENT', 'PAID', 'CANCELLED'],
  CONTRAT: ['DRAFT', 'SENT', 'SIGNED', 'CANCELLED'],
  DEVIS: ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'CANCELLED'],
};

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);

export const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR');
