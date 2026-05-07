// ============================================================================
// PDF GENERATOR — Converts HTML slides to PDF using Puppeteer
// ============================================================================

import { buildHtmlSlides } from './htmlSlideBuilder'
import type { AuditReport } from './auditJson'

export async function generateAuditPdf(report: AuditReport): Promise<Buffer> {
  const html = buildHtmlSlides(report)

  const puppeteer = (await import('puppeteer')).default
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })

    await page.setContent(html, { waitUntil: 'networkidle0' })

    // Wait a bit for external images (thum.io screenshots) to load
    await new Promise((r) => setTimeout(r, 3000))

    const pdfBuffer = await page.pdf({
      width: '1920px',
      height: '1080px',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    })

    return Buffer.from(pdfBuffer)
  } finally {
    await browser.close()
  }
}
