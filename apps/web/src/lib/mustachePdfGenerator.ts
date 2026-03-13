import Mustache from 'mustache';
import fs from 'fs';
import path from 'path';

export async function generatePDFFromTemplate(params: {
  templateSlug: string;
  data: Record<string, unknown>;
}): Promise<{ success: boolean; buffer?: Buffer; error?: string }> {
  const { templateSlug, data } = params;

  try {
    const templatePath = path.join(process.cwd(), 'templates', 'documents', `${templateSlug}.html`);
    if (!fs.existsSync(templatePath)) {
      return { success: false, error: `Template introuvable : ${templateSlug}.html` };
    }

    const htmlContent = fs.readFileSync(templatePath, 'utf-8');
    const renderedHTML = Mustache.render(htmlContent, data);

    const puppeteer = (await import('puppeteer')).default;
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(renderedHTML, { waitUntil: 'networkidle0' });
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: '5mm', right: '10mm', bottom: '15mm', left: '10mm' },
      });
      await browser.close();
      return { success: true, buffer: Buffer.from(pdfBuffer) };
    } catch (error) {
      await browser.close();
      throw error;
    }
  } catch (error) {
    console.error('Erreur generatePDFFromTemplate:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Erreur inconnue' };
  }
}
