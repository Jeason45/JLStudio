/**
 * Génère les PNG des logos JL Studio depuis le HTML de référence.
 *
 * Usage : pnpm logos:gen (depuis apps/portal)
 *
 * Sorties :
 *   public/brand/logo-light.png  → E07 (mono navy, sidebar light)
 *   public/brand/logo-dark.png   → E08 (mono blanc, sidebar dark)
 *   public/brand/logo-pdf.png    → D13 (wordmark + crochets dorés, en-tête PDF)
 *   public/brand/logo-mark.png   → A01 (mark + wordmark, fallback)
 */

import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs/promises';

const RENDER_HTML = path.join(__dirname, 'logo-render.html');
const OUT_DIR = path.join(__dirname, '..', 'public', 'brand');

interface LogoSpec {
  selector: string;
  filename: string;
  description: string;
}

const LOGOS: LogoSpec[] = [
  { selector: '#d13', filename: 'logo-pdf.png',   description: 'D13 — wordmark + crochets dorés (PDFs)' },
  { selector: '#e07', filename: 'logo-light.png', description: 'E07 — mono navy (sidebar light)' },
  { selector: '#e08', filename: 'logo-dark.png',  description: 'E08 — mono blanc (sidebar dark)' },
  { selector: '#a01', filename: 'logo-mark.png',  description: 'A01 — mark + wordmark (favicon/alt)' },
];

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  // 3x DPR pour rétina + zoom
  await page.setViewport({ width: 1024, height: 768, deviceScaleFactor: 3 });

  await page.goto(`file://${RENDER_HTML}`, { waitUntil: 'networkidle0' });

  // Attendre que les Google Fonts soient bien chargées
  await page.evaluate(() => (document as Document & { fonts: { ready: Promise<unknown> } }).fonts.ready);
  await new Promise((r) => setTimeout(r, 300)); // marge de sécurité

  for (const logo of LOGOS) {
    const element = await page.$(logo.selector);
    if (!element) {
      console.error(`✗ Sélecteur introuvable : ${logo.selector}`);
      continue;
    }
    const out = path.join(OUT_DIR, logo.filename);
    await element.screenshot({ path: out as `${string}.png`, omitBackground: true });
    console.log(`✓ ${logo.filename}  (${logo.description})`);
  }

  await browser.close();
  console.log(`\n→ ${LOGOS.length} logos générés dans ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
