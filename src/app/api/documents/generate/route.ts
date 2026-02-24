import { NextRequest, NextResponse } from 'next/server';
import { generatePDFFromTemplate } from '@/lib/mustachePdfGenerator';
import { prisma } from '@/lib/prisma';
import { documentGenerateSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = documentGenerateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { templateSlug, data, fileName, documentNumber, contactId, amount, type, linkedDocumentId } = parsed.data;

    const result = await generatePDFFromTemplate({
      templateSlug,
      data,
    });

    if (!result.success || !result.buffer) {
      return NextResponse.json(
        { error: result.error || 'Erreur lors de la generation du PDF' },
        { status: 500 }
      );
    }

    const safeName = fileName || `${templateSlug}_${Date.now()}.pdf`;

    // Save PDF to storage and create Document record if documentNumber is provided
    let documentId = '';
    if (documentNumber) {
      const document = await prisma.document.create({
        data: {
          type: type || 'devis',
          templateSlug,
          fileName: safeName,
          fileData: Buffer.from(result.buffer),
          documentNumber,
          ...(contactId ? { contact: { connect: { id: contactId } } } : {}),
          formData: JSON.stringify(data || {}),
          amount: amount ? parseFloat(String(amount)) : null,
          status: 'draft',
          linkedDocumentId: linkedDocumentId || null,
        },
      });

      documentId = document.id;

      // Sync: update Contact.quoteAmount from document amount
      if (contactId && amount) {
        await prisma.contact.update({
          where: { id: contactId },
          data: { quoteAmount: parseFloat(String(amount)) },
        });
      }
    }

    return new NextResponse(new Uint8Array(result.buffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${safeName}"`,
        'Content-Length': result.buffer.length.toString(),
        'X-Document-Id': documentId,
      },
    });
  } catch (error) {
    console.error('Erreur API /documents/generate:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
