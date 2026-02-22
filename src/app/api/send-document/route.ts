import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail, generateDocumentEmailHTML } from '@/lib/emailUtils';

// POST /api/send-document - Send a document by email, optionally requesting signature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentId, to, recipientName, message, requiresSignature } = body;

    if (!documentId || !to) {
      return NextResponse.json(
        { error: 'documentId et to sont requis' },
        { status: 400 }
      );
    }

    const document = await prisma.document.findUnique({
      where: { id: documentId },
      include: { contact: true },
    });

    if (!document) {
      return NextResponse.json({ error: 'Document introuvable' }, { status: 404 });
    }

    const name = recipientName || document.contact?.name || to;
    let signatureLink: string | undefined;

    // If signature is required, create a SignatureRequest with a secure token
    if (requiresSignature) {
      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

      await prisma.signatureRequest.create({
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

      // Update document status
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'pending_signature', sentAt: new Date() },
      });

      // Auto-update contact status
      if (document.contactId) {
        await prisma.contact.update({
          where: { id: document.contactId },
          data: { status: 'pending_signature' },
        });
      }
    } else {
      await prisma.document.update({
        where: { id: documentId },
        data: { status: 'sent', sentAt: new Date() },
      });

      // Auto-update contact status
      if (document.contactId) {
        await prisma.contact.update({
          where: { id: document.contactId },
          data: { status: 'quote_sent' },
        });
      }
    }

    // Build email
    const htmlContent = generateDocumentEmailHTML({
      recipientName: name,
      documentName: document.fileName || 'document.pdf',
      message,
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
      attachments: document.filePath && document.fileName
        ? [{ filename: document.fileName, path: document.filePath }]
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
