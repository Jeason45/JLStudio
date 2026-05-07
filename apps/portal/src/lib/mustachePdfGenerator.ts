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

export async function generatePDFFromTemplate(
  params: PdfGenerationParams,
): Promise<PdfGenerationResult> {
  const { templateSlug, data } = params;

  const tpl = resolveTemplate(templateSlug);
  if (!tpl.ok) return { success: false, error: tpl.error };

  let renderedHtml: string;
  try {
    renderedHtml = Mustache.render(tpl.content, data);
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
