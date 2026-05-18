/**
 * Génère le QR code stylé de la carte de visite virtuelle JL Studio.
 *
 * Usage :
 *   cd apps/web && pnpm tsx scripts/generate-card-qr.ts
 *
 * Output : apps/web/public/qr/card/{variant}.{svg,png}
 *
 * 3 variantes générées (au choix selon le rendu print de ta carte) :
 *
 *   - sobre   : modules navy uni, eyes navy, logo JL au centre — recommandé
 *   - bicolore: modules navy, eyes BEIGE doré — accent luxe
 *   - gradient: modules en dégradé diagonal navy → bleu accent — luxe moderne
 *
 * Toutes scannables (correction d'erreur niveau H = 30% redondance, supporte
 * le logo central). Sortie SVG vectorielle (impression nette à n'importe
 * quelle taille) + PNG 2048×2048 (preview / fallback raster).
 *
 * URL encodée : https://jlstudio.dev/carte
 *
 * Pour changer l'URL ou ajouter une variante, modifie les constantes
 * en haut de fichier et relance le script.
 */

import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Config ───────────────────────────────────────────────────────────
const URL_TO_ENCODE = 'https://jlstudio.dev/carte';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'qr', 'card');
const LOGO_PATH = path.join(__dirname, 'assets', 'logo-jl.png');

const NAVY = '#0B1E3F';
const BEIGE = '#d4bf94';
const ACCENT_BLUE = '#638BFF';
const WHITE = '#ffffff';

const SIZE_PX = 2048;       // résolution PNG
const MARGIN = 30;          // quiet zone autour du QR
const IMAGE_SIZE_RATIO = 0.22; // taille du logo central (proportion du QR)
const IMAGE_MARGIN = 8;     // marge autour du logo (modules cachés)

interface Variant {
  name: string;
  description: string;
  buildOptions: (logoBuffer: Buffer) => ConstructorParameters<typeof QRCodeCanvas>[0];
}

const VARIANTS: Variant[] = [
  {
    name: 'sobre',
    description: 'Navy uni, eyes navy — sobre et classique',
    buildOptions: (logo) => ({
      width: SIZE_PX,
      height: SIZE_PX,
      type: 'canvas',
      data: URL_TO_ENCODE,
      image: logo as unknown as string,
      margin: MARGIN,
      qrOptions: { errorCorrectionLevel: 'H' },
      imageOptions: {
        margin: IMAGE_MARGIN,
        imageSize: IMAGE_SIZE_RATIO,
        hideBackgroundDots: true,
        crossOrigin: 'anonymous',
      },
      dotsOptions: { color: NAVY, type: 'rounded' },
      cornersSquareOptions: { color: NAVY, type: 'extra-rounded' },
      cornersDotOptions: { color: NAVY, type: 'dot' },
      backgroundOptions: { color: WHITE },
    }),
  },
  {
    name: 'bicolore',
    description: 'Navy + eyes BEIGE doré — accent luxe',
    buildOptions: (logo) => ({
      width: SIZE_PX,
      height: SIZE_PX,
      type: 'canvas',
      data: URL_TO_ENCODE,
      image: logo as unknown as string,
      margin: MARGIN,
      qrOptions: { errorCorrectionLevel: 'H' },
      imageOptions: {
        margin: IMAGE_MARGIN,
        imageSize: IMAGE_SIZE_RATIO,
        hideBackgroundDots: true,
        crossOrigin: 'anonymous',
      },
      dotsOptions: { color: NAVY, type: 'rounded' },
      cornersSquareOptions: { color: BEIGE, type: 'extra-rounded' },
      cornersDotOptions: { color: BEIGE, type: 'dot' },
      backgroundOptions: { color: WHITE },
    }),
  },
  {
    name: 'gradient',
    description: 'Gradient diagonal navy → bleu accent — luxe moderne',
    buildOptions: (logo) => ({
      width: SIZE_PX,
      height: SIZE_PX,
      type: 'canvas',
      data: URL_TO_ENCODE,
      image: logo as unknown as string,
      margin: MARGIN,
      qrOptions: { errorCorrectionLevel: 'H' },
      imageOptions: {
        margin: IMAGE_MARGIN,
        imageSize: IMAGE_SIZE_RATIO,
        hideBackgroundDots: true,
        crossOrigin: 'anonymous',
      },
      dotsOptions: {
        type: 'classy-rounded',
        gradient: {
          type: 'linear',
          rotation: Math.PI / 4, // 45°
          colorStops: [
            { offset: 0, color: NAVY },
            { offset: 1, color: ACCENT_BLUE },
          ],
        },
      },
      cornersSquareOptions: { color: NAVY, type: 'extra-rounded' },
      cornersDotOptions: { color: NAVY, type: 'dot' },
      backgroundOptions: { color: WHITE },
    }),
  },
];

// ─── Main ──────────────────────────────────────────────────────────────
async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // Le logo est passé directement en path. La lib lit le fichier.
  // Selon la version, le param `image` accepte un path ou un Buffer.
  const logoBuffer = await fs.readFile(LOGO_PATH);

  console.log(`\n🎨 Génération des QR codes stylés vers ${URL_TO_ENCODE}\n`);

  for (const variant of VARIANTS) {
    console.log(`→ Variante "${variant.name}" : ${variant.description}`);
    const qr = new QRCodeCanvas(variant.buildOptions(logoBuffer));

    const pngPath = path.join(OUTPUT_DIR, `${variant.name}.png`);
    const svgPath = path.join(OUTPUT_DIR, `${variant.name}.svg`);

    await qr.toFile(pngPath, 'png');
    await qr.toFile(svgPath, 'svg');

    console.log(`   ✓ ${path.relative(process.cwd(), pngPath)}`);
    console.log(`   ✓ ${path.relative(process.cwd(), svgPath)}\n`);
  }

  console.log(`✅ Fichiers générés dans ${path.relative(process.cwd(), OUTPUT_DIR)}/`);
  console.log(`   Accessibles en prod via : https://jlstudio.dev/qr/card/{variant}.{svg|png}\n`);
}

main().catch((err) => {
  console.error('Erreur génération QR :', err);
  process.exit(1);
});
