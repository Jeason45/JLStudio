import { PDFDocument, rgb, StandardFonts, PDFFont, PDFPage } from 'pdf-lib';
import type { DocumentData, CompanySettingsData } from '@/types/portal';

// ─── Colors ──────────────────────────────────
const COLORS = {
  primary: rgb(0.39, 0.55, 1),       // #638BFF
  dark: rgb(0.06, 0.09, 0.16),       // #0F1729
  text: rgb(0.2, 0.24, 0.32),        // #333D52
  gray: rgb(0.39, 0.46, 0.55),       // #63758C
  lightGray: rgb(0.7, 0.74, 0.78),   // #B3BCC7
  bgLight: rgb(0.96, 0.97, 0.98),    // #F5F7FA
  white: rgb(1, 1, 1),
  border: rgb(0.88, 0.9, 0.92),      // #E0E6EB
  success: rgb(0.13, 0.69, 0.44),    // #22B070
  accentLight: rgb(0.93, 0.95, 1),   // #EDF0FF
};

const TYPE_LABELS: Record<string, string> = {
  DEVIS: 'DEVIS',
  FACTURE: 'FACTURE',
  CONTRAT: 'CONTRAT',
};

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  unit?: string;
}

interface Fonts {
  bold: PDFFont;
  regular: PDFFont;
  oblique: PDFFont;
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' });
}

function drawLine(page: PDFPage, x1: number, y: number, x2: number, color = COLORS.border, thickness = 0.5) {
  page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, color, thickness });
}

// ─── Main Generator ──────────────────────────
export async function generateDocumentPDF(
  document: DocumentData,
  company: CompanySettingsData | null,
): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const fonts: Fonts = {
    bold: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
    regular: await pdfDoc.embedFont(StandardFonts.Helvetica),
    oblique: await pdfDoc.embedFont(StandardFonts.HelveticaOblique),
  };

  const pageWidth = 595.28; // A4
  const pageHeight = 841.89;
  const margin = 50;
  const contentWidth = pageWidth - margin * 2;

  const page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  // ═══════════════════════════════════════════
  // HEADER — Company info + Document type badge
  // ═══════════════════════════════════════════

  // Document type badge (top right)
  const typeLabel = TYPE_LABELS[document.type] || document.type;
  const badgeWidth = fonts.bold.widthOfTextAtSize(typeLabel, 14) + 24;
  page.drawRectangle({
    x: pageWidth - margin - badgeWidth,
    y: y - 20,
    width: badgeWidth,
    height: 28,
    color: COLORS.primary,
  });
  page.drawText(typeLabel, {
    x: pageWidth - margin - badgeWidth + 12,
    y: y - 14,
    size: 14,
    font: fonts.bold,
    color: COLORS.white,
  });

  // Company name
  if (company?.companyName) {
    page.drawText(company.companyName, { x: margin, y, size: 16, font: fonts.bold, color: COLORS.dark });
    y -= 18;
  }

  // Company details
  const companyLines: string[] = [];
  if (company?.address) companyLines.push(company.address);
  if (company?.zipCode || company?.city) companyLines.push([company.zipCode, company.city].filter(Boolean).join(' '));
  if (company?.phone) companyLines.push(`Tel : ${company.phone}`);
  if (company?.email) companyLines.push(company.email);
  if (company?.siret) companyLines.push(`SIRET : ${company.siret}`);
  if (company?.tvaNumber) companyLines.push(`TVA : ${company.tvaNumber}`);

  for (const line of companyLines) {
    page.drawText(line, { x: margin, y, size: 9, font: fonts.regular, color: COLORS.gray });
    y -= 13;
  }

  y -= 20;

  // ═══════════════════════════════════════════
  // DOCUMENT INFO BAR
  // ═══════════════════════════════════════════
  page.drawRectangle({ x: margin, y: y - 38, width: contentWidth, height: 38, color: COLORS.bgLight });

  const infoY = y - 14;
  // Document number
  if (document.documentNumber) {
    page.drawText(`N° ${document.documentNumber}`, { x: margin + 12, y: infoY, size: 10, font: fonts.bold, color: COLORS.dark });
  }
  // Date
  page.drawText(`Date : ${formatDate(document.createdAt)}`, { x: margin + 200, y: infoY, size: 9, font: fonts.regular, color: COLORS.text });
  // Valid until (devis only)
  if (document.type === 'DEVIS' && document.validUntil) {
    page.drawText(`Valide jusqu'au : ${formatDate(document.validUntil)}`, { x: margin + 200, y: infoY - 14, size: 9, font: fonts.regular, color: COLORS.text });
  }

  y -= 58;

  // ═══════════════════════════════════════════
  // CLIENT INFO
  // ═══════════════════════════════════════════
  if (document.contact) {
    page.drawText('Client', { x: margin, y, size: 8, font: fonts.bold, color: COLORS.lightGray });
    y -= 14;

    const clientName = [document.contact.firstName, document.contact.lastName].filter(Boolean).join(' ');
    if (clientName) {
      page.drawText(clientName, { x: margin, y, size: 11, font: fonts.bold, color: COLORS.dark });
      y -= 15;
    }
    if (document.contact.company) {
      page.drawText(document.contact.company, { x: margin, y, size: 10, font: fonts.regular, color: COLORS.text });
      y -= 14;
    }
    if (document.contact.email) {
      page.drawText(document.contact.email, { x: margin, y, size: 9, font: fonts.regular, color: COLORS.gray });
      y -= 14;
    }
  }

  // Title
  y -= 10;
  page.drawText(document.title, { x: margin, y, size: 13, font: fonts.bold, color: COLORS.dark });
  y -= 24;

  // ═══════════════════════════════════════════
  // TABLE — Line items
  // ═══════════════════════════════════════════
  const content = document.content as { lines?: LineItem[] };
  const lines: LineItem[] = content?.lines || [];

  if (lines.length > 0) {
    // Table header
    const colX = {
      desc: margin,
      qty: margin + contentWidth * 0.5,
      unit: margin + contentWidth * 0.6,
      price: margin + contentWidth * 0.72,
      total: margin + contentWidth * 0.88,
    };

    page.drawRectangle({ x: margin, y: y - 20, width: contentWidth, height: 22, color: COLORS.dark });
    page.drawText('Description', { x: colX.desc + 8, y: y - 14, size: 9, font: fonts.bold, color: COLORS.white });
    page.drawText('Qte', { x: colX.qty, y: y - 14, size: 9, font: fonts.bold, color: COLORS.white });
    page.drawText('Unite', { x: colX.unit, y: y - 14, size: 9, font: fonts.bold, color: COLORS.white });
    page.drawText('P.U. HT', { x: colX.price, y: y - 14, size: 9, font: fonts.bold, color: COLORS.white });
    page.drawText('Total HT', { x: colX.total, y: y - 14, size: 9, font: fonts.bold, color: COLORS.white });

    y -= 22;

    // Table rows
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineTotal = line.quantity * line.unitPrice;
      const rowY = y - 16;

      // Alternate row background
      if (i % 2 === 1) {
        page.drawRectangle({ x: margin, y: y - 22, width: contentWidth, height: 22, color: COLORS.bgLight });
      }

      // Truncate description if too long
      let desc = line.description || '';
      const maxDescWidth = contentWidth * 0.48;
      while (fonts.regular.widthOfTextAtSize(desc, 9) > maxDescWidth && desc.length > 3) {
        desc = desc.slice(0, -4) + '...';
      }

      page.drawText(desc, { x: colX.desc + 8, y: rowY, size: 9, font: fonts.regular, color: COLORS.text });
      page.drawText(String(line.quantity), { x: colX.qty, y: rowY, size: 9, font: fonts.regular, color: COLORS.text });
      page.drawText(line.unit || 'unite', { x: colX.unit, y: rowY, size: 9, font: fonts.regular, color: COLORS.text });
      page.drawText(formatCurrency(line.unitPrice), { x: colX.price, y: rowY, size: 9, font: fonts.regular, color: COLORS.text });
      page.drawText(formatCurrency(lineTotal), { x: colX.total, y: rowY, size: 9, font: fonts.bold, color: COLORS.text });

      y -= 22;
    }

    // Bottom line
    drawLine(page, margin, y, margin + contentWidth, COLORS.border, 1);
    y -= 16;

    // ═══════════════════════════════════════════
    // TOTALS
    // ═══════════════════════════════════════════
    const totalsX = margin + contentWidth * 0.6;
    const totalsValueX = margin + contentWidth * 0.88;

    // Sous-total HT
    if (document.amount != null) {
      page.drawText('Sous-total HT', { x: totalsX, y, size: 10, font: fonts.regular, color: COLORS.text });
      page.drawText(formatCurrency(document.amount), { x: totalsValueX, y, size: 10, font: fonts.regular, color: COLORS.text });
      y -= 16;
    }

    // TVA
    if (document.taxRate > 0 && document.taxAmount != null) {
      page.drawText(`TVA (${document.taxRate}%)`, { x: totalsX, y, size: 10, font: fonts.regular, color: COLORS.text });
      page.drawText(formatCurrency(document.taxAmount), { x: totalsValueX, y, size: 10, font: fonts.regular, color: COLORS.text });
      y -= 16;
    }

    // Total TTC
    if (document.totalAmount != null) {
      drawLine(page, totalsX, y + 4, margin + contentWidth, COLORS.dark, 1);
      y -= 4;
      page.drawRectangle({ x: totalsX - 8, y: y - 16, width: contentWidth - (totalsX - margin) + 8, height: 24, color: COLORS.accentLight });
      page.drawText('TOTAL TTC', { x: totalsX, y: y - 10, size: 11, font: fonts.bold, color: COLORS.dark });
      page.drawText(formatCurrency(document.totalAmount), { x: totalsValueX, y: y - 10, size: 11, font: fonts.bold, color: COLORS.primary });
      y -= 30;
    }
  }

  // ═══════════════════════════════════════════
  // NOTES
  // ═══════════════════════════════════════════
  if (document.notes) {
    y -= 16;
    page.drawText('Notes', { x: margin, y, size: 9, font: fonts.bold, color: COLORS.lightGray });
    y -= 14;

    // Word-wrap notes
    const noteWords = document.notes.split(' ');
    let noteLine = '';
    for (const word of noteWords) {
      const test = noteLine ? `${noteLine} ${word}` : word;
      if (fonts.oblique.widthOfTextAtSize(test, 9) > contentWidth - 20) {
        page.drawText(noteLine, { x: margin, y, size: 9, font: fonts.oblique, color: COLORS.gray });
        y -= 13;
        noteLine = word;
      } else {
        noteLine = test;
      }
    }
    if (noteLine) {
      page.drawText(noteLine, { x: margin, y, size: 9, font: fonts.oblique, color: COLORS.gray });
      y -= 13;
    }
  }

  // ═══════════════════════════════════════════
  // PAYMENT INFO (Factures only)
  // ═══════════════════════════════════════════
  if (document.type === 'FACTURE' && (company?.iban || company?.bic)) {
    y -= 20;
    page.drawText('Informations bancaires', { x: margin, y, size: 9, font: fonts.bold, color: COLORS.lightGray });
    y -= 14;
    if (company.iban) {
      page.drawText(`IBAN : ${company.iban}`, { x: margin, y, size: 9, font: fonts.regular, color: COLORS.text });
      y -= 13;
    }
    if (company.bic) {
      page.drawText(`BIC : ${company.bic}`, { x: margin, y, size: 9, font: fonts.regular, color: COLORS.text });
      y -= 13;
    }
  }

  // ═══════════════════════════════════════════
  // SIGNATURE ZONE (Devis / Contrats)
  // ═══════════════════════════════════════════
  if (document.type !== 'FACTURE') {
    y -= 30;
    const sigBoxX = pageWidth - margin - 200;
    page.drawRectangle({
      x: sigBoxX,
      y: y - 80,
      width: 200,
      height: 80,
      color: COLORS.white,
      borderColor: COLORS.border,
      borderWidth: 1,
    });
    page.drawText('Bon pour accord', { x: sigBoxX + 8, y: y - 16, size: 9, font: fonts.oblique, color: COLORS.gray });
    page.drawText('Date et signature', { x: sigBoxX + 8, y: y - 70, size: 8, font: fonts.regular, color: COLORS.lightGray });
  }

  // ═══════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════
  const footerY = 30;
  drawLine(page, margin, footerY + 10, margin + contentWidth, COLORS.border, 0.5);

  const footerParts: string[] = [];
  if (company?.companyName) footerParts.push(company.companyName);
  if (company?.siret) footerParts.push(`SIRET ${company.siret}`);
  if (company?.tvaNumber) footerParts.push(`TVA ${company.tvaNumber}`);

  if (footerParts.length > 0) {
    const footerText = footerParts.join(' — ');
    const footerWidth = fonts.regular.widthOfTextAtSize(footerText, 7);
    page.drawText(footerText, {
      x: (pageWidth - footerWidth) / 2,
      y: footerY,
      size: 7,
      font: fonts.regular,
      color: COLORS.lightGray,
    });
  }

  // Legal mention for devis
  if (document.type === 'DEVIS' && document.validUntil) {
    const legalText = `Ce devis est valable jusqu'au ${formatDate(document.validUntil)}`;
    const legalWidth = fonts.oblique.widthOfTextAtSize(legalText, 7);
    page.drawText(legalText, {
      x: (pageWidth - legalWidth) / 2,
      y: footerY - 10,
      size: 7,
      font: fonts.oblique,
      color: COLORS.lightGray,
    });
  }

  return pdfDoc.save();
}
