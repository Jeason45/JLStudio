import { z } from 'zod';

// ─── Auth ───────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
  siteSlug: z.string().min(1, 'Site requis'),
});

// ─── Portal Users ───────────────────────────
export const portalUserCreateSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caracteres'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['ADMIN', 'CLIENT', 'EDITOR']).default('CLIENT'),
});

export const portalUserUpdateSchema = z.object({
  email: z.string().email('Email invalide').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['ADMIN', 'CLIENT', 'EDITOR']).optional(),
  active: z.boolean().optional(),
  password: z.string().min(8, 'Minimum 8 caracteres').optional(),
});

// ─── Portal Config ──────────────────────────
export const portalConfigUpdateSchema = z.object({
  logoUrl: z.string().nullable().optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Couleur HEX invalide').optional(),
  moduleCRM: z.boolean().optional(),
  moduleDevis: z.boolean().optional(),
  moduleFactures: z.boolean().optional(),
  moduleContrats: z.boolean().optional(),
  moduleProjets: z.boolean().optional(),
  moduleCMS: z.boolean().optional(),
  moduleCalendrier: z.boolean().optional(),
});

// ─── Company Settings ───────────────────────
export const companySettingsUpdateSchema = z.object({
  companyName: z.string().optional(),
  address: z.string().optional(),
  zipCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email('Email invalide').optional(),
  website: z.string().optional(),
  siret: z.string().optional(),
  tvaNumber: z.string().optional(),
  iban: z.string().optional(),
  bic: z.string().optional(),
  logoUrl: z.string().nullable().optional(),
});

// ─── Contacts ───────────────────────────────
export const contactCreateSchema = z.object({
  email: z.string().email('Email invalide'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  tags: z.array(z.string()).default([]),
  notes: z.string().optional(),
  status: z.enum(['NEW', 'ACTIVE', 'INACTIVE']).default('NEW'),
});

export const contactUpdateSchema = z.object({
  email: z.string().email('Email invalide').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  status: z.enum(['NEW', 'ACTIVE', 'INACTIVE']).optional(),
});

// ─── Interactions ───────────────────────────
export const interactionCreateSchema = z.object({
  contactId: z.string().min(1),
  type: z.enum(['NOTE', 'CALL', 'MEETING', 'EMAIL', 'TASK']),
  title: z.string().min(1, 'Titre requis'),
  content: z.string().optional(),
  date: z.string().optional(),
});

// ─── Documents ──────────────────────────────
export const documentCreateSchema = z.object({
  type: z.enum(['DEVIS', 'FACTURE', 'CONTRAT']),
  title: z.string().min(1, 'Titre requis'),
  contactId: z.string().optional(),
  content: z.any().default({}),
  amount: z.number().optional(),
  taxRate: z.number().default(20),
  validUntil: z.string().optional(),
  notes: z.string().optional(),
});

export const documentStatusUpdateSchema = z.object({
  status: z.enum(['DRAFT', 'SENT', 'SIGNED', 'ACCEPTED', 'REJECTED', 'PAID', 'CANCELLED']),
});

export const sendDocumentSchema = z.object({
  documentId: z.string().min(1),
  to: z.string().email('Email invalide'),
  recipientName: z.string().optional(),
  message: z.string().optional(),
  requiresSignature: z.boolean().default(false),
});

// ─── Appointments ───────────────────────────
export const appointmentCreateSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  description: z.string().optional(),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  contactId: z.string().optional(),
  location: z.string().optional(),
});

export const appointmentUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  contactId: z.string().nullable().optional(),
  location: z.string().optional(),
});
