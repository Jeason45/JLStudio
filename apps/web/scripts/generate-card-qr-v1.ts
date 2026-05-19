/**
 * Variante V1 du QR pour carte de visite — optimisée détection / scan.
 *
 * Diffère de generate-card-qr.ts (variante "bicolore") sur 2 axes :
 *   - Modules carrés classiques (type: 'square') au lieu de "rounded"
 *     → patterns plus lisibles pour les scanners basiques (caméra téléphone)
 *   - Quiet zone élargie (margin: 60 au lieu de 30)
 *     → meilleure détection des bords du QR, surtout en print petit format
 *
 * Conservé identique :
 *   - URL encodée : https://jlstudio.dev/carte
 *   - Eyes (coins) : type "extra-rounded" + couleur beige #d4bf94
 *   - Logo JL au centre (favicon)
 *   - Couleur modules : navy #0B1E3F
 *   - Fond blanc
 *   - Taille : 2048×2048
 *   - Correction d'erreur : niveau H (30%)
 *
 * Usage : cd apps/web && pnpm exec tsx scripts/generate-card-qr-v1.ts
 */

import { QRCodeCanvas } from '@loskir/styled-qr-code-node';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL_TO_ENCODE = 'https://jlstudio.dev/carte';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'qr', 'card');
const LOGO_PATH = path.join(__dirname, 'assets', 'logo-jl.png');

const NAVY = '#0B1E3F';
const BEIGE = '#d4bf94';
const WHITE = '#ffffff';

const SIZE_PX = 2048;
const MARGIN = 60;                // ⬆ V1 : 60 au lieu de 30 (quiet zone élargie)
const IMAGE_SIZE_RATIO = 0.22;
const IMAGE_MARGIN = 8;

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  const logoBuffer = await fs.readFile(LOGO_PATH);

  console.log(`\n🎨 Génération QR V1 (modules carrés + quiet zone élargie)\n`);

  const qr = new QRCodeCanvas({
    width: SIZE_PX,
    height: SIZE_PX,
    type: 'canvas',
    data: URL_TO_ENCODE,
    image: logoBuffer as unknown as string,
    margin: MARGIN,
    qrOptions: { errorCorrectionLevel: 'H' },
    imageOptions: {
      margin: IMAGE_MARGIN,
      imageSize: IMAGE_SIZE_RATIO,
      hideBackgroundDots: true,
      crossOrigin: 'anonymous',
    },
    dotsOptions: { color: NAVY, type: 'square' },        // ⬆ V1 : square au lieu de rounded
    cornersSquareOptions: { color: BEIGE, type: 'extra-rounded' },
    cornersDotOptions: { color: BEIGE, type: 'dot' },
    backgroundOptions: { color: WHITE },
  });

  const pngPath = path.join(OUTPUT_DIR, 'bicolore-v1.png');
  const svgPath = path.join(OUTPUT_DIR, 'bicolore-v1.svg');

  await qr.toFile(pngPath, 'png');
  await qr.toFile(svgPath, 'svg');

  console.log(`   ✓ ${path.relative(process.cwd(), pngPath)}`);
  console.log(`   ✓ ${path.relative(process.cwd(), svgPath)}\n`);
}

main().catch((err) => {
  console.error('Erreur génération QR V1 :', err);
  process.exit(1);
});
