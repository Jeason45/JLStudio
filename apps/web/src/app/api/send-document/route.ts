import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendDocumentSchema } from '@/lib/validations';
import crypto from 'crypto';
import { sendEmail, generateDocumentEmailHTML } from '@/lib/emailUtils';

// POST /api/send-document - Send a document by email, optionally requesting signature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = sendDocumentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const { documentId, to, recipientName, message, requiresSignature } = parsed.data;

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { contact: true },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
    }

    const name = recipientName || document.contact?.name || to;
    let signatureLink: string | undefined;

    // Wrap all DB mutations in a transaction
    await prisma.$transaction(async (tx) => {
      if (requiresSignature) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

        await tx.signatureRequest.create({
          data: {
            document: { connect: { id: document.id } },
            token,
            recipientEmail: to,
            recipientName: name,
            expiresAt,
            status: 'pending',
          },
        });

        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3004';
        signatureLink = `${baseUrl}/sign/${token}`;

        await tx.document.update({
          where: { id: documentId },
          data: { status: 'pending_signature', sentAt: new Date() },
        });

        if (document.contactId) {
          await tx.contact.update({
            where: { id: document.contactId },
            data: { status: 'pending_signature' },
          });
        }
      } else {
        await tx.document.update({
          where: { id: documentId },
          data: { status: 'sent', sentAt: new Date() },
        });

        if (document.contactId) {
          await tx.contact.update({
            where: { id: document.contactId },
            data: { status: 'quote_sent' },
          });
        }
      }
    });

    // Build email
    const htmlContent = generateDocumentEmailHTML({
      recipientName: name,
      documentName: document.fileName || 'document.pdf',
      message: message || undefined,
      signatureLink,
    });

    // Send email with PDF attachment
    const result = await sendEmail({
      to,
      subject: requiresSignature
        ? `Document a signer : ${document.fileName}`
        : `Document : ${document.fileName}`,
      htmlContent,
      type: requiresSignature ? 'signature_request' : 'document_sent',
      contactId: document.contactId || undefined,
      documentId: document.id,
      attachments: document.fileData && document.fileName
        ? [{ filename: document.fileName, content: Buffer.from(document.fileData) }]
        : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Erreur envoi email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      signatureLink,
    });
  } catch (error) {
    console.error('Erreur POST /api/send-document:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur serveur' },
      { status: 500 }
    );
  }
}
