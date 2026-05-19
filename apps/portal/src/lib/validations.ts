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
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'CLIENT', 'EDITOR']).default('CLIENT'),
  contactId: z.string().optional(),
});

export const portalUserUpdateSchema = z.object({
  email: z.string().email('Email invalide').optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'CLIENT', 'EDITOR']).optional(),
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
  moduleProspection: z.boolean().optional(),
});

export const onboardingSchema = z.object({
  moduleCRM: z.boolean(),
  moduleDevis: z.boolean(),
  moduleFactures: z.boolean(),
  moduleContrats: z.boolean(),
  moduleProjets: z.boolean(),
  moduleCMS: z.boolean(),
  moduleCalendrier: z.boolean(),
  moduleProspection: z.boolean(),
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
  content: z.record(z.string(), z.unknown()).default({}),
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

// ─── Publications réseaux sociaux ──────────────
// Enums alignés sur Prisma
export const platformSchema = z.enum([
  'LINKEDIN',
  'INSTAGRAM_FEED',
  'INSTAGRAM_STORY',
  'INSTAGRAM_REEL',
]);
export type PlatformZ = z.infer<typeof platformSchema>;

export const postCampaignStatusSchema = z.enum([
  'DRAFT',
  'SCHEDULED',
  'ACTIVE',
  'PUBLISHED',
  'ARCHIVED',
]);

export const postTargetStatusSchema = z.enum([
  'DRAFT',
  'SCHEDULED',
  'PUBLISHING',
  'PUBLISHED',
  'FAILED',
  'CANCELLED',
]);

// Schémas content polymorphes par plateforme.
// Discriminated union → Zod choisit le schéma selon le champ `platform`.
const linkedinContentSchema = z.object({
  platform: z.literal('LINKEDIN'),
  text: z.string().min(1, 'Texte requis').max(3000, 'Max 3000 caractères'),
  hashtags: z.array(z.string().regex(/^[A-Za-z0-9_]+$/, 'Hashtag invalide')).max(30).default([]),
  firstCommentText: z.string().max(1250).optional(),
});

const instagramFeedContentSchema = z.object({
  platform: z.literal('INSTAGRAM_FEED'),
  caption: z.string().max(2200, 'Max 2200 caractères').default(''),
  hashtags: z.array(z.string().regex(/^[A-Za-z0-9_]+$/)).max(30).default([]),
  altText: z.string().max(1000).optional(),
  location: z.string().max(255).optional(),
});

const instagramStoryContentSchema = z.object({
  platform: z.literal('INSTAGRAM_STORY'),
  link: z.string().url().optional(),
  stickerText: z.string().max(200).optional(),
});

const instagramReelContentSchema = z.object({
  platform: z.literal('INSTAGRAM_REEL'),
  caption: z.string().max(2200).default(''),
  hashtags: z.array(z.string().regex(/^[A-Za-z0-9_]+$/)).max(30).default([]),
  audioCredit: z.string().max(200).optional(),
});

export const postTargetContentSchema = z.discriminatedUnion('platform', [
  linkedinContentSchema,
  instagramFeedContentSchema,
  instagramStoryContentSchema,
  instagramReelContentSchema,
]);
export type PostTargetContent = z.infer<typeof postTargetContentSchema>;

// Campaigns
export const postCampaignCreateSchema = z.object({
  title: z.string().min(1, 'Titre requis').max(200),
  description: z.string().max(2000).optional(),
  isPinnedToCRM: z.boolean().optional(),
  status: postCampaignStatusSchema.optional(),
});

export const postCampaignUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).nullable().optional(),
  isPinnedToCRM: z.boolean().optional(),
  status: postCampaignStatusSchema.optional(),
});

// Targets — on accepte string ISO datetime en entrée
const isoDateString = z.string().datetime({ offset: true }).or(z.string().datetime());

export const postTargetCreateSchema = z
  .object({
    platform: platformSchema,
    content: postTargetContentSchema,
    scheduledAt: isoDateString.nullable().optional(),
    status: postTargetStatusSchema.optional(),
    priority: z.number().int().min(0).max(100).optional(),
    mediaIds: z.array(z.string().cuid()).max(10).default([]),
  })
  .refine(
    (data) => !(data.platform === 'INSTAGRAM_STORY' && data.mediaIds.length === 0),
    { message: 'Instagram Story exige au moins 1 média', path: ['mediaIds'] },
  )
  .refine(
    (data) => data.platform === data.content.platform,
    { message: 'platform et content.platform doivent correspondre', path: ['content'] },
  );

export const postTargetUpdateSchema = z.object({
  content: postTargetContentSchema.optional(),
  scheduledAt: isoDateString.nullable().optional(),
  status: postTargetStatusSchema.optional(),
  priority: z.number().int().min(0).max(100).optional(),
  mediaIds: z.array(z.string().cuid()).max(10).optional(),
});

// ─── Sites (éditeur de site web client) ─────────────────────────────
//
// Convention slug : kebab-case, 3-40 caractères, [a-z0-9-]
// Le slug est figé à la création (pas modifiable via PATCH).
const siteSlugSchema = z
  .string()
  .min(3, 'Slug : 3 caractères minimum')
  .max(40, 'Slug : 40 caractères maximum')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug : kebab-case uniquement (a-z, 0-9, tirets)');

export const siteCreateSchema = z.object({
  name: z.string().min(1, 'Nom requis').max(120),
  slug: siteSlugSchema,
  description: z.string().max(500).optional(),
  config: z.record(z.string(), z.unknown()).optional(),
});

export const siteUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  description: z.string().max(500).nullable().optional(),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']).optional(),
  deployUrl: z.string().url().nullable().optional(),
  thumbnail: z.string().url().nullable().optional(),
});

// Brouillon : payload JSON libre (sera mergé dans draftConfig côté serveur)
export const siteDraftSchema = z.object({
  config: z.record(z.string(), z.unknown()),
});

// ─── Pages (éditeur de site web client) ─────────────────────────────
const pageSlugSchema = z
  .string()
  .min(1, 'Slug requis')
  .max(60)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug : kebab-case uniquement (a-z, 0-9, tirets)');

export const pageCreateSchema = z.object({
  slug: pageSlugSchema,
  title: z.string().min(1, 'Titre requis').max(200),
  config: z.record(z.string(), z.unknown()).optional(),
  order: z.number().int().min(0).max(10000).optional(),
  isHome: z.boolean().optional(),
});

export const pageUpdateSchema = z.object({
  // slug NON modifiable : on garde l'URL stable côté site live
  title: z.string().min(1).max(200).optional(),
  order: z.number().int().min(0).max(10000).optional(),
  isHome: z.boolean().optional(),
});

// Brouillon page : payload JSON libre (sections + contenu)
export const pageDraftSchema = z.object({
  config: z.record(z.string(), z.unknown()),
});
