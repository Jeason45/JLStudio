import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

// Encadré "Le Prestataire" pré-apposé sur le contrat, dessiné par pdf-lib en
// MIROIR exact de la zone e-signature client (signedPdfGenerator.ts) :
//   client : x ∈ [width-272, width-48], y ∈ [78, 212]  (bas-droite)
//   presta : x ∈ [48, 272],            y ∈ [78, 212]  (bas-gauche)
// Les deux encadrés sont ainsi parfaitement alignés sur la dernière page.

const SIGNATURE_CANDIDATES = [
  path.join(process.cwd(), 'public', 'brand', 'signature-jl.png'),
  path.join(process.cwd(), 'apps', 'portal', 'public', 'brand', 'signature-jl.png'),
];

function loadSignaturePng(): Buffer | null {
  for (const p of SIGNATURE_CANDIDATES) {
    if (fs.existsSync(p)) {
      try { return fs.readFileSync(p); } catch { /* ignore */ }
    }
  }
  return null;
}

export async function applyPrestataireSignature(
  pdfBuffer: Buffer,
  dateStr: string,
): Promise<Buffer> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const blue = rgb(0.39, 0.55, 1);
  const navy = rgb(0.043, 0.118, 0.247);
  const dark = rgb(0.12, 0.16, 0.22);
  const gray = rgb(0.42, 0.45, 0.5);

  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];

  const boxX = 48;
  const boxBottom = 78;
  const boxWidth = 224;
  const boxHeight = 134;
  const innerX = boxX + 12;

  // Encadré (mêmes style/cote que la zone client)
  lastPage.drawRectangle({
    x: boxX, y: boxBottom, width: boxWidth, height: boxHeight,
    color: rgb(1, 1, 1), borderColor: blue, borderWidth: 1,
  });

  lastPage.drawText('LE PRESTATAIRE', { x: innerX, y: boxBottom + 118, size: 9, font: helveticaBold, color: navy });

  const sigBytes = loadSignaturePng();
  if (sigBytes) {
    try {
      const img = await pdfDoc.embedPng(sigBytes);
      const sigWidth = 130;
      const sigHeight = (img.height / img.width) * sigWidth;
      lastPage.drawImage(img, { x: innerX - 2, y: boxBottom + 40, width: sigWidth, height: sigHeight });
    } catch { /* signature illisible — on garde le texte */ }
  }

  lastPage.drawText('JL Studio - Jeason Lemoine', { x: innerX, y: boxBottom + 22, size: 9, font: helveticaBold, color: dark });
  lastPage.drawText(`Signe le ${dateStr}`, { x: innerX, y: boxBottom + 8, size: 8, font: helvetica, color: gray });

  return Buffer.from(await pdfDoc.save());
}
