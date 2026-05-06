// ============================================================================
// PDF GENERATOR — Converts HTML slides to PDF using Playwright
// ============================================================================

import { chromium } from 'playwright'
import { buildHtmlSlides } from './htmlSlideBuilder'
import type { AuditReport } from './auditJson'

export async function generateAuditPdf(report: AuditReport): Promise<Buffer> {
  const html = buildHtmlSlides(report)

  const browser = await chromium.launch({ headless: true })
  try {
    const page = await browser.newPage({
      viewport: { width: 1920, height: 1080 },
    })

    await page.setContent(html, { waitUntil: 'networkidle' })

    // Wait a bit for external images (thum.io screenshots) to load
    await page.waitForTimeout(3000)

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
