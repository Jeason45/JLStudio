export type PortalUserRole = 'ADMIN' | 'CLIENT' | 'EDITOR';

export interface PortalModules {
  moduleCRM: boolean;
  moduleDevis: boolean;
  moduleFactures: boolean;
  moduleContrats: boolean;
  moduleProjets: boolean;
  moduleCMS: boolean;
  moduleCalendrier: boolean;
}

export interface PortalConfigData extends PortalModules {
  id: string;
  siteId: string;
  logoUrl: string | null;
  primaryColor: string;
}

export interface PortalUserData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: PortalUserRole;
  active: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalContacts: number;
  totalLeads: number;
  newLeadsThisMonth: number;
  totalDevis: number;
  devisEnAttente: number;
  montantDevisEnAttente: number;
  totalFactures: number;
  facturesImpayees: number;
  montantFacturesImpayees: number;
  totalContrats: number;
  rdvAujourdhui: number;
  totalCmsItems: number;
}

export interface ContactData {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  company: string | null;
  position: string | null;
  tags: string[];
  notes: string | null;
  status: 'NEW' | 'ACTIVE' | 'INACTIVE';
  createdAt: string;
  _count?: {
    leads: number;
    portalDocuments: number;
    portalInteractions: number;
    portalAppointments: number;
  };
}

export interface InteractionData {
  id: string;
  contactId: string;
  type: 'NOTE' | 'CALL' | 'MEETING' | 'EMAIL' | 'TASK';
  title: string;
  content: string | null;
  date: string;
  createdAt: string;
}

export interface DocumentData {
  id: string;
  type: 'DEVIS' | 'FACTURE' | 'CONTRAT';
  status: 'DRAFT' | 'SENT' | 'SIGNED' | 'ACCEPTED' | 'REJECTED' | 'PAID' | 'CANCELLED';
  documentNumber: string | null;
  title: string;
  content: Record<string, unknown>;
  amount: number | null;
  taxRate: number;
  taxAmount: number | null;
  totalAmount: number | null;
  validUntil: string | null;
  sentAt: string | null;
  signedAt: string | null;
  paidAt: string | null;
  notes: string | null;
  createdAt: string;
  contact?: { id: string; firstName: string | null; lastName: string | null; email: string; company: string | null } | null;
}

export interface AppointmentData {
  id: string;
  title: string;
  description: string | null;
  startTime: string;
  endTime: string;
  location: string | null;
  contactId: string | null;
  contact?: { id: string; firstName: string | null; lastName: string | null; email: string } | null;
}

export interface CompanySettingsData {
  id: string;
  companyName: string | null;
  address: string | null;
  zipCode: string | null;
  city: string | null;
  country: string;
  phone: string | null;
  email: string | null;
  website: string | null;
  siret: string | null;
  tvaNumber: string | null;
  iban: string | null;
  bic: string | null;
  logoUrl: string | null;
}
