export interface Contact {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  companyName?: string | null;
  email: string;
  phone?: string | null;
  address?: string | null;
  postalCode?: string | null;
  city?: string | null;
  type?: string | null;
}

export interface CompanySettings {
  companyName: string;
  address: string | null;
  zipCode: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  siret: string | null;
  tvaNumber: string | null;
  iban: string | null;
  bic: string | null;
  logoUrl: string | null;
}

export interface LigneDocument {
  description: string;
  prix_unitaire: string;
  quantite: string;
  unite: string;
}

export interface ClientInfo {
  nom_client: string;
  adresse_client: string;
  code_postal_client: string;
  ville_client: string;
  telephone_client: string;
  email_client: string;
}

export interface Destinataire {
  nom_destinataire: string;
  adresse_destinataire: string;
  telephone_destinataire: string;
  email_destinataire: string;
}

export const emptyClient = (): ClientInfo => ({
  nom_client: '',
  adresse_client: '',
  code_postal_client: '',
  ville_client: '',
  telephone_client: '',
  email_client: '',
});

export const emptyDestinataire = (): Destinataire => ({
  nom_destinataire: '',
  adresse_destinataire: '',
  telephone_destinataire: '',
  email_destinataire: '',
});

export const emptyLigne = (): LigneDocument => ({
  description: '',
  prix_unitaire: '',
  quantite: '1',
  unite: '',
});
