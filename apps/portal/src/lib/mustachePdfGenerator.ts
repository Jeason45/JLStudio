/**
 * Generates a PDF from a Mustache HTML template using Playwright (Chromium).
 *
 * Templates live in `apps/portal/templates/documents/{slug}.html` and use
 * standard {{mustache}} syntax. The PDF is returned as a Buffer (inline storage).
 *
 * Ported from Flamme's mustachePdfGenerator.ts but uses Playwright (already
 * installed) instead of Puppeteer.
 */

import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

export interface PdfGenerationParams {
  /** Template slug (filename without .html), e.g. "devis-moderne" */
  templateSlug: string;
  /** Data passed to Mustache. Available keys depend on the template. */
  data: Record<string, unknown>;
}

export interface PdfGenerationResult {
  success: boolean;
  buffer?: Buffer;
  error?: string;
}

const TEMPLATE_DIR_CANDIDATES = [
  // Local dev: from apps/portal/
  path.join(process.cwd(), 'templates', 'documents'),
  // From .next standalone runtime: cwd is /app, templates copied to /app/apps/portal/templates
  path.join(process.cwd(), 'apps', 'portal', 'templates', 'documents'),
];

const BRAND_DIR_CANDIDATES = [
  path.join(process.cwd(), 'public', 'brand'),
  path.join(process.cwd(), 'apps', 'portal', 'public', 'brand'),
];

function resolveTemplate(slug: string): { ok: true; content: string } | { ok: false; error: string } {
  for (const dir of TEMPLATE_DIR_CANDIDATES) {
    const fullPath = path.join(dir, `${slug}.html`);
    if (fs.existsSync(fullPath)) {
      try {
        return { ok: true, content: fs.readFileSync(fullPath, 'utf-8') };
      } catch (err) {
        return { ok: false, error: `Template lu mais erreur de lecture : ${err instanceof Error ? err.message : err}` };
      }
    }
  }
  return { ok: false, error: `Template introuvable : ${slug}.html (cherché dans ${TEMPLATE_DIR_CANDIDATES.join(', ')})` };
}

// Cache du logo en base64 — le fichier ne change pas entre 2 requests
let _defaultLogoDataUrlCache: string | null = null;

function getDefaultLogoDataUrl(): string | null {
  if (_defaultLogoDataUrlCache !== null) return _defaultLogoDataUrlCache;
  for (const dir of BRAND_DIR_CANDIDATES) {
    const fullPath = path.join(dir, 'logo-pdf.png');
    if (fs.existsSync(fullPath)) {
      try {
        const bytes = fs.readFileSync(fullPath);
        _defaultLogoDataUrlCache = `data:image/png;base64,${bytes.toString('base64')}`;
        return _defaultLogoDataUrlCache;
      } catch {
        // ignore — fall through
      }
    }
  }
  _defaultLogoDataUrlCache = ''; // évite de re-tenter à chaque appel
  return null;
}

export async function generatePDFFromTemplate(
  params: PdfGenerationParams,
): Promise<PdfGenerationResult> {
  const { templateSlug, data } = params;

  const tpl = resolveTemplate(templateSlug);
  if (!tpl.ok) return { success: false, error: tpl.error };

  // Si aucun logoUrl custom n'est fourni par PortalCompanySettings, on injecte
  // le logo JL Studio par défaut (D13) en base64 → zéro requête réseau.
  const dataWithLogo: Record<string, unknown> = { ...data };
  if (!dataWithLogo.logoUrl) {
    const fallback = getDefaultLogoDataUrl();
    if (fallback) dataWithLogo.logoUrl = fallback;
  }

  let renderedHtml: string;
  try {
    renderedHtml = Mustache.render(tpl.content, dataWithLogo);
  } catch (err) {
    return {
      success: false,
      error: `Mustache render échoué : ${err instanceof Error ? err.message : err}`,
    };
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1240, height: 1754 } });
    const page = await context.newPage();
    await page.setContent(renderedHtml, { waitUntil: 'networkidle' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '5mm', right: '10mm', bottom: '15mm', left: '10mm' },
    });

    return { success: true, buffer: Buffer.from(pdfBuffer) };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Erreur inconnue' };
  } finally {
    await browser.close();
  }
}
