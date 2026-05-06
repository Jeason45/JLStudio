// Zod schemas for external APIs used by prospection module.
// Permissive (passthrough + optional) — these are 3rd-party APIs that may evolve.
// Goal: eliminate `as any`, get typed access to fields we use, fail soft on shape changes.

import { z } from 'zod';

// ─── Serper.dev (Google search) ──────────────────────────────────────────

export const SerperOrganicItemSchema = z.object({
  title: z.string().optional(),
  link: z.string().optional(),
  snippet: z.string().optional(),
}).passthrough();

export const SerperOrganicResponseSchema = z.object({
  organic: z.array(SerperOrganicItemSchema).optional(),
  credits: z.number().optional(),
}).passthrough();

export const SerperPlaceItemSchema = z.object({
  title: z.string().optional(),
  address: z.string().optional(),
  phoneNumber: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  rating: z.number().nullable().optional(),
  reviewsCount: z.number().nullable().optional(),
  reviews: z.number().nullable().optional(),
}).passthrough();

export const SerperPlacesResponseSchema = z.object({
  places: z.array(SerperPlaceItemSchema).optional(),
}).passthrough();

export const SerperAccountResponseSchema = z.object({
  credits: z.number().optional(),
}).passthrough();

// ─── SearXNG (self-hosted meta search) ───────────────────────────────────

export const SearXNGItemSchema = z.object({
  title: z.string().optional(),
  url: z.string().optional(),
  content: z.string().optional(),
}).passthrough();

export const SearXNGResponseSchema = z.object({
  results: z.array(SearXNGItemSchema).optional(),
}).passthrough();

// ─── PageSpeed (Google Lighthouse) ───────────────────────────────────────
// Lighthouse output is deeply nested and audit-keyed; we keep deep parts as
// Record<string, unknown> and strictly type only the outer scaffold.

export const PageSpeedCategorySchema = z.object({
  score: z.number().nullable().optional(),
}).passthrough();

export const PageSpeedAuditItemSchema = z.object({
  id: z.string().optional(),
  title: z.string().optional(),
  score: z.number().nullable().optional(),
  numericValue: z.number().nullable().optional(),
  displayValue: z.string().nullable().optional(),
  details: z.unknown().optional(),
}).passthrough();

export const PageSpeedLighthouseSchema = z.object({
  categories: z.record(z.string(), PageSpeedCategorySchema).optional(),
  audits: z.record(z.string(), PageSpeedAuditItemSchema).optional(),
}).passthrough();

export const PageSpeedResponseSchema = z.object({
  lighthouseResult: PageSpeedLighthouseSchema.optional(),
  error: z.unknown().optional(),
}).passthrough();

// ─── Website Carbon API ──────────────────────────────────────────────────

export const CarbonResponseSchema = z.object({
  green: z.union([z.boolean(), z.string()]).optional(),
  cleanerThan: z.number().optional(),
  statistics: z.object({
    co2: z.object({
      grid: z.object({ grams: z.number().optional() }).passthrough().optional(),
    }).passthrough().optional(),
  }).passthrough().optional(),
}).passthrough();

// ─── geo.api.gouv.fr (French postal codes) ───────────────────────────────

export const GeoCommuneSchema = z.object({
  codesPostaux: z.array(z.string()).optional(),
}).passthrough();

export const GeoCommunesResponseSchema = z.array(GeoCommuneSchema);

// ─── SIRENE (recherche-entreprises.api.gouv.fr) ──────────────────────────

export const SireneEtablissementSchema = z.object({
  siret: z.string().optional(),
  adresse: z.string().nullable().optional(),
  code_postal: z.string().nullable().optional(),
  libelle_commune: z.string().nullable().optional(),
}).passthrough();

export const SireneResultSchema = z.object({
  siren: z.string().optional(),
  nom_complet: z.string().nullable().optional(),
  nom_raison_sociale: z.string().nullable().optional(),
  date_creation: z.string().nullable().optional(),
  tranche_effectif_salarie: z.string().nullable().optional(),
  activite_principale: z.string().nullable().optional(),
  siege: SireneEtablissementSchema.optional(),
  matching_etablissements: z.array(SireneEtablissementSchema).optional(),
}).passthrough();

export const SireneResponseSchema = z.object({
  results: z.array(SireneResultSchema).optional(),
}).passthrough();

// ─── YellowLab Tools ─────────────────────────────────────────────────────

export const YellowLabRuleSchema = z.object({
  bad: z.boolean().optional(),
  policy: z.object({ label: z.string().optional() }).passthrough().optional(),
}).passthrough();

export const YellowLabCategorySchema = z.object({
  rules: z.record(z.string(), YellowLabRuleSchema).optional(),
}).passthrough();

export const YellowLabGenericProfileSchema = z.object({
  globalScore: z.number().nullable().optional(),
  categories: z.record(z.string(), YellowLabCategorySchema).optional(),
}).passthrough();

export const YellowLabRunResponseSchema = z.object({
  status: z.object({
    statusCode: z.string().optional(),
  }).passthrough().optional(),
  scoreProfiles: z.object({
    generic: YellowLabGenericProfileSchema.optional(),
  }).passthrough().optional(),
}).passthrough();

// ─── Helper: parse JSON with fallback ────────────────────────────────────

export function safeParseJson<T extends z.ZodType>(
  schema: T,
  data: unknown,
): z.infer<T> | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}
