import { z } from 'zod';

const optionalString = z.string().optional().nullable();
const emailField = z.string().email('Email invalide');

// ─── Lead Create (public qualifier form) ────────────────────────────────────

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

// ─── Public Contact Form ────────────────────────────────────────────────────

export const publicContactSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: emailField,
  phone: optionalString,
  message: optionalString,
  selectedType: optionalString,
  wantCallback: z.boolean().optional().default(false),
});
