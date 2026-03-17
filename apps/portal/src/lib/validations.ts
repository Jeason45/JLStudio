import { z } from 'zod';

// ─── Auth ───────────────────────────────────
export const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
  siteSlug: z.string().min(1, 'Site requis'),
});

export const adminLoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
  siteId: z.string().optional(),
});

// ─── Portal Users ───────────────────────────
export const portalUserCreateSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Minimum 8 caracteres'),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['ADMIN', 'CLIENT', 'EDITOR']).default('CLIENT'),
  contactId: z.string().optional(),
});

export const portalUserUpdateSchema = z.object({
  email: z.string().email('Email invalide').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['ADMIN', 'CLIENT', 'EDITOR']).optional(),
  contactId: z.string().nullable().optional(),
  active: z.boolean().optional(),
  password: z.string().min(8, 'Minimum 8 caracteres').optional(),
});

// ─── Portal Config ──────────────────────────
export const portalConfigUpdateSchema = z.object({
  logoUrl: z.string().nullable().optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Couleur HEX invalide').optional(),
  onboardingDone: z.boolean().optional(),
  moduleCRM: z.boolean().optional(),
  moduleDevis: z.boolean().optional(),
  moduleFactures: z.boolean().optional(),
  moduleContrats: z.boolean().optional(),
  moduleProjets: z.boolean().optional(),
  moduleCMS: z.boolean().optional(),
  moduleCalendrier: z.boolean().optional(),
});

export const onboardingSchema = z.object({
  moduleCRM: z.boolean(),
  moduleDevis: z.boolean(),
  moduleFactures: z.boolean(),
  moduleContrats: z.boolean(),
  moduleProjets: z.boolean(),
  moduleCMS: z.boolean(),
  moduleCalendrier: z.boolean(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, 'Couleur HEX invalide').optional(),
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

// ─── Leads ─────────────────────────────────
export const leadCreateSchema = z.object({
  contactId: z.string().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
  data: z.record(z.string(), z.unknown()).default({}),
});

export const leadUpdateSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED', 'LOST']).optional(),
  contactId: z.string().nullable().optional(),
  source: z.string().optional(),
  notes: z.string().optional(),
  data: z.record(z.string(), z.unknown()).optional(),
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

// ─── Projects ──────────────────────────────
export const projectCreateSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  description: z.string().optional(),
  contactId: z.string().optional(),
  dueDate: z.string().optional(),
});

export const projectUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  status: z.enum(['IN_PROGRESS', 'COMPLETED', 'ON_HOLD', 'CANCELLED']).optional(),
  contactId: z.string().nullable().optional(),
  dueDate: z.string().nullable().optional(),
});

export const projectTaskCreateSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  order: z.number().int().optional(),
});

export const projectTaskUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
  order: z.number().int().optional(),
});

// ─── CMS Collections ──────────────────────────
const cmsFieldSchema = z.object({
  name: z.string().min(1, 'Nom du champ requis'),
  label: z.string().min(1, 'Label requis'),
  type: z.enum(['text', 'textarea', 'number', 'boolean', 'date', 'image']),
});

export const cmsCollectionCreateSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  slug: z.string().min(1, 'Slug requis').regex(/^[a-z0-9-]+$/, 'Slug invalide (a-z, 0-9, -)'),
  fields: z.array(cmsFieldSchema).default([]),
  settings: z.record(z.string(), z.unknown()).default({}),
});

export const cmsCollectionUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug invalide').optional(),
  fields: z.array(cmsFieldSchema).optional(),
  settings: z.record(z.string(), z.unknown()).optional(),
});

// ─── CMS Items ─────────────────────────────────
export const cmsItemCreateSchema = z.object({
  collectionId: z.string().min(1, 'Collection requise'),
  slug: z.string().min(1, 'Slug requis').regex(/^[a-z0-9-]+$/, 'Slug invalide (a-z, 0-9, -)'),
  data: z.record(z.string(), z.unknown()).default({}),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']).default('DRAFT'),
  scheduledAt: z.string().optional(),
});

export const cmsItemUpdateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug invalide').optional(),
  data: z.record(z.string(), z.unknown()).optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'SCHEDULED']).optional(),
  scheduledAt: z.string().nullable().optional(),
});
