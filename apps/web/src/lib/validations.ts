import { z } from 'zod';

// ─── Shared helpers ──────────────────────────────────────────────────────────

const optionalString = z.string().optional().nullable();
const optionalFloat = z.number().optional().nullable();
const optionalInt = z.number().int().optional().nullable();
const optionalDate = z.union([z.string(), z.date()]).optional().nullable();
const emailField = z.string().email('Email invalide');
const optionalEmail = z.string().email('Email invalide').optional().nullable().or(z.literal(''));

// ─── Contact ─────────────────────────────────────────────────────────────────

const contactStatuses = [
  'new', 'contacted', 'qualified', 'rdv_planned',
  'quote_sent', 'pending_signature', 'client', 'lost',
] as const;

const contactTypes = ['particulier', 'entreprise'] as const;

const paymentStatuses = ['none', 'partial', 'paid'] as const;

export const contactCreateSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  companyName: optionalString,
  email: optionalEmail,
  phone: optionalString,
  address: optionalString,
  city: optionalString,
  postalCode: optionalString,
  type: z.enum(contactTypes).optional().default('particulier'),
  status: z.enum(contactStatuses).optional().default('new'),
  source: optionalString,
  score: z.number().int().min(0).max(100).optional().default(0),
  projectType: optionalString,
  budget: optionalString,
  estimatedPrice: optionalFloat,
  notes: optionalString,
  lostReason: optionalString,
  quoteAmount: optionalFloat,
  paymentStatus: z.enum(paymentStatuses).optional().default('none'),
  paidAmount: z.number().min(0).optional().default(0),
  paidAt: optionalDate,
});

export const contactUpdateSchema = contactCreateSchema.partial();

// ─── Appointment ─────────────────────────────────────────────────────────────

const appointmentStatuses = ['scheduled', 'confirmed', 'cancelled', 'completed'] as const;

export const appointmentCreateSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: optionalString,
  startTime: z.union([z.string(), z.date()], { message: 'Date de debut requise' }),
  endTime: z.union([z.string(), z.date()], { message: 'Date de fin requise' }),
  contactId: optionalString,
  status: z.enum(appointmentStatuses).optional().default('scheduled'),
  location: optionalString,
});

export const appointmentUpdateSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').optional(),
  description: optionalString,
  startTime: z.union([z.string(), z.date()]).optional(),
  endTime: z.union([z.string(), z.date()]).optional(),
  contactId: optionalString,
  status: z.enum(appointmentStatuses).optional(),
  location: optionalString,
});

// ─── Project ─────────────────────────────────────────────────────────────────

const projectStatuses = [
  'planification', 'en_cours', 'tests', 'livre', 'en_pause', 'annule',
] as const;

const priorityValues = ['low', 'medium', 'high', 'urgent'] as const;

export const projectCreateSchema = z.object({
  name: z.string().min(1, 'Le nom du projet est requis'),
  description: optionalString,
  status: z.enum(projectStatuses).optional().default('planification'),
  priority: z.enum(priorityValues).optional().default('medium'),
  projectType: optionalString,
  technologies: optionalString,
  startDate: optionalDate,
  endDate: optionalDate,
  estimatedBudget: z.union([z.number(), z.string()]).optional().nullable(),
  actualBudget: z.union([z.number(), z.string()]).optional().nullable(),
  progress: z.number().int().min(0).max(100).optional().default(0),
  notes: optionalString,
  contactId: optionalString,
});

export const projectUpdateSchema = z.object({
  name: z.string().min(1, 'Le nom du projet est requis').optional(),
  description: optionalString,
  status: z.enum(projectStatuses).optional(),
  priority: z.enum(priorityValues).optional(),
  projectType: optionalString,
  technologies: optionalString,
  startDate: optionalDate,
  endDate: optionalDate,
  estimatedBudget: z.union([z.number(), z.string()]).optional().nullable(),
  actualBudget: z.union([z.number(), z.string()]).optional().nullable(),
  progress: z.union([z.number(), z.string()]).optional(),
  notes: optionalString,
  contactId: optionalString,
});

// ─── Task ────────────────────────────────────────────────────────────────────

const taskStatuses = ['todo', 'in_progress', 'blocked', 'completed'] as const;

export const taskCreateSchema = z.object({
  projectId: z.string().min(1, 'projectId est requis'),
  title: z.string().min(1, 'Le titre est requis'),
  description: optionalString,
  status: z.enum(taskStatuses).optional().default('todo'),
  priority: z.enum(priorityValues).optional().default('medium'),
  startDate: optionalDate,
  dueDate: optionalDate,
  duration: optionalInt,
  estimatedHours: z.union([z.number(), z.string()]).optional().nullable(),
  actualHours: z.union([z.number(), z.string()]).optional().nullable(),
  kanbanColumn: optionalString,
  tags: optionalString,
  blockedReason: optionalString,
  isCriticalPath: z.boolean().optional().default(false),
  order: z.number().int().optional().default(0),
  sectionId: optionalString,
  parentTaskId: optionalString,
  dependencies: z.array(z.string()).optional(),
});

// For POST /api/projects/[id]/tasks (projectId comes from URL)
export const taskCreateInProjectSchema = taskCreateSchema.omit({ projectId: true });

export const taskUpdateSchema = z.object({
  id: z.string().min(1, 'Task ID manquant'),
  title: z.string().min(1).optional(),
  description: optionalString,
  status: z.enum(taskStatuses).optional(),
  priority: z.enum(priorityValues).optional(),
  startDate: optionalDate,
  dueDate: optionalDate,
  duration: z.union([z.number(), z.string()]).optional().nullable(),
  estimatedHours: z.union([z.number(), z.string()]).optional().nullable(),
  actualHours: z.union([z.number(), z.string()]).optional().nullable(),
  kanbanColumn: optionalString,
  tags: optionalString,
  blockedReason: optionalString,
  isCriticalPath: z.boolean().optional(),
  order: z.union([z.number(), z.string()]).optional(),
  sectionId: optionalString,
  parentTaskId: optionalString,
  projectId: z.string().optional(),
});

// ─── Kanban Task Update ──────────────────────────────────────────────────────

export const kanbanTaskUpdateSchema = z.object({
  id: z.string().min(1, 'Task ID manquant'),
  kanbanColumn: z.string().optional(),
  status: z.enum(taskStatuses).optional(),
  order: z.union([z.number(), z.string()]).optional(),
});

// ─── Document Generate ───────────────────────────────────────────────────────

export const documentGenerateSchema = z.object({
  templateSlug: z.string().min(1, 'templateSlug est requis'),
  data: z.record(z.string(), z.unknown()),
  fileName: z.string().optional(),
  documentNumber: z.string().optional(),
  contactId: z.string().optional(),
  amount: z.union([z.number(), z.string()]).optional(),
  type: z.string().optional(),
  linkedDocumentId: z.string().optional(),
});

// ─── Document Status ─────────────────────────────────────────────────────────

const documentStatuses = [
  'draft', 'sent', 'pending_signature', 'signed', 'paid', 'cancelled',
] as const;

export const documentStatusUpdateSchema = z.object({
  id: z.string().min(1, 'id est requis'),
  status: z.enum(documentStatuses, { message: 'Statut invalide' }),
});

// ─── Send Document Email ─────────────────────────────────────────────────────

export const sendDocumentSchema = z.object({
  documentId: z.string().min(1, 'documentId est requis'),
  to: emailField,
  recipientName: optionalString,
  message: optionalString,
  requiresSignature: z.boolean().optional().default(false),
});

// ─── Interaction ─────────────────────────────────────────────────────────────

const interactionTypes = ['email', 'call', 'meeting', 'document_shared', 'note'] as const;

export const interactionCreateSchema = z.object({
  contactId: z.string().min(1, 'contactId est requis'),
  type: z.enum(interactionTypes, { message: 'Type d\'interaction invalide' }),
  subject: optionalString,
  content: optionalString,
  direction: z.enum(['inbound', 'outbound']).optional().nullable(),
  duration: optionalInt,
});

// ─── Lead Create (public form) ───────────────────────────────────────────────

export const leadCreateSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: emailField,
  phone: optionalString,
  company: optionalString,
  message: optionalString,
  projectType: optionalString,
  budget: optionalString,
  source: optionalString,
  appointmentDay: optionalString,
  appointmentSlot: optionalString,
});

// ─── Public Contact Form ─────────────────────────────────────────────────────

export const publicContactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: emailField,
  phone: optionalString,
  message: optionalString,
  selectedType: optionalString,
  wantCallback: z.boolean().optional().default(false),
});

// ─── Settings ────────────────────────────────────────────────────────────────

export const settingsUpdateSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  siret: z.string().optional(),
  iban: z.string().optional(),
  bic: z.string().optional(),
  tvaNumber: z.string().optional(),
  defaultPaymentTerms: z.string().optional(),
  penaltyRate: z.union([z.number(), z.string()]).optional(),
  legalForm: z.string().optional(),
  capital: z.string().optional(),
  rcsCity: z.string().optional(),
  representantName: z.string().optional(),
  representantRole: z.string().optional(),
});

// ─── Login ───────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Le mot de passe est requis'),
});

// ─── Milestone ───────────────────────────────────────────────────────────────

export const milestoneCreateSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  date: z.union([z.string(), z.date()], { message: 'La date est requise' }),
  status: z.enum(['pending', 'completed']).optional().default('pending'),
  color: z.string().optional(),
});

// ─── Task Section ────────────────────────────────────────────────────────────

export const taskSectionCreateSchema = z.object({
  name: z.string().min(1, 'Le nom de la section est requis'),
  color: z.string().optional(),
  order: z.number().int().optional().default(0),
  isCollapsed: z.boolean().optional().default(false),
});
