import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

export async function generateSignedPDF(
  originalPdfPath: string,
  signatureImagePath: string,
  signatureData: {
    signerName: string;
    signerEmail: string;
    signedAt: Date;
    ipAddress: string;
    documentHash: string;
  }
): Promise<string> {
  const existingPdfBytes = fs.readFileSync(originalPdfPath);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const signatureImageBytes = fs.readFileSync(signatureImagePath);
  const signatureImage = await pdfDoc.embedPng(signatureImageBytes);

  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const primaryColor = rgb(0.39, 0.55, 1); // #638BFF
  const darkColor = rgb(0.06, 0.09, 0.16);
  const grayColor = rgb(0.39, 0.46, 0.55);

  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];
  const { width } = lastPage.getSize();

  const sigWidth = 200;
  const sigHeight = (signatureImage.height / signatureImage.width) * sigWidth;
  const boxX = width - 260;
  const baseY = 88;
  const bonPourAccordY = baseY + 36 + sigHeight;
  const boxTop = bonPourAccordY + 16;
  const boxBottom = baseY - 10;

  lastPage.drawRectangle({ x: boxX - 12, y: boxBottom, width: sigWidth + 24, height: boxTop - boxBottom, color: rgb(1, 1, 1), borderColor: primaryColor, borderWidth: 1 });
  lastPage.drawText('"Bon pour accord"', { x: boxX, y: bonPourAccordY, size: 11, font: helveticaOblique, color: darkColor });
  lastPage.drawImage(signatureImage, { x: boxX, y: baseY + 30, width: sigWidth, height: sigHeight });
  lastPage.drawText(signatureData.signerName, { x: boxX, y: baseY + 14, size: 10, font: helveticaBold, color: darkColor });

  const dateStr = signatureData.signedAt.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  lastPage.drawText(`Signe le ${dateStr}`, { x: boxX, y: baseY, size: 8, font: helvetica, color: grayColor });

  lastPage.drawRectangle({ x: 0, y: 48, width, height: 3, color: rgb(1, 1, 1) });
  lastPage.drawRectangle({ x: 0, y: 0, width, height: 40, color: rgb(0.97, 0.98, 0.99) });

  const footerText = `Signe electroniquement par ${signatureData.signerName} (${signatureData.signerEmail})`;
  const footerWidth = helvetica.widthOfTextAtSize(footerText, 8);
  lastPage.drawText(footerText, { x: (width - footerWidth) / 2, y: 25, size: 8, font: helvetica, color: darkColor });

  const legalText = `Signature conforme eIDAS - Hash SHA-256: ${signatureData.documentHash}`;
  const legalWidth = helvetica.widthOfTextAtSize(legalText, 7);
  lastPage.drawText(legalText, { x: (width - legalWidth) / 2, y: 12, size: 7, font: helvetica, color: grayColor });

  const pdfBytes = await pdfDoc.save();
  const originalFileName = path.basename(originalPdfPath, '.pdf');
  const signedDir = path.join(process.cwd(), 'storage', 'documents', 'signed');
  if (!fs.existsSync(signedDir)) fs.mkdirSync(signedDir, { recursive: true });
  const signedFilePath = path.join(signedDir, `${originalFileName}_SIGNED.pdf`);
  fs.writeFileSync(signedFilePath, pdfBytes);
  return signedFilePath;
}
