import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { generateSignedPDF } from '@/lib/signedPdfGenerator';
import {
  sendEmail,
  generateSignatureConfirmationHTML,
  generateSignatureAdminNotificationHTML,
} from '@/lib/emailUtils';
import {
  createSignatureProof,
  getClientIP,
  getUserAgent,
} from '@/lib/signatureUtils';

// POST /api/sign/submit - Submit a signature
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, signerName, signerEmail, signatureImage } = body;

    if (!token || !signerName || !signerEmail || !signatureImage) {
      return NextResponse.json({ error: 'Donnees manquantes' }, { status: 400 });
    }

    // Fetch signature request with document data (including fileData)
    const signatureRequest = await prisma.signatureRequest.findUnique({
      where: { token },
      include: { document: true },
    });

    if (!signatureRequest) {
      return NextResponse.json({ error: 'Token invalide' }, { status: 404 });
    }

    if (new Date() > new Date(signatureRequest.expiresAt)) {
      return NextResponse.json({ error: 'Ce lien a expire' }, { status: 410 });
    }

    if (signatureRequest.status === 'completed') {
      return NextResponse.json({ error: 'Ce document a deja ete signe' }, { status: 409 });
    }

    const ipAddress = getClientIP(request);
    const userAgent = getUserAgent(request);

    // Get document PDF from database
    const documentData = signatureRequest.document.fileData;
    if (!documentData) {
      return NextResponse.json({ error: 'Fichier document introuvable' }, { status: 500 });
    }
    const documentBuffer = Buffer.from(documentData);

    // Hash the original PDF
    const documentHash = crypto.createHash('sha256').update(documentBuffer).digest('hex');

    // Decode signature image from base64
    const base64Image = signatureImage.replace(/^data:image\/\w+;base64,/, '');
    const signatureImageBuffer = Buffer.from(base64Image, 'base64');

    // Create signature proof
    const signedAt = new Date();
    const proofData = createSignatureProof({
      documentId: signatureRequest.documentId,
      documentHash,
      signerName,
      signerEmail,
      signatureType: 'draw',
      signedAt,
      ipAddress,
      userAgent,
    });

    // Create signature and update request in a transaction
    const signature = await prisma.$transaction(async (tx) => {
      const sig = await tx.signature.create({
        data: {
          document: { connect: { id: signatureRequest.documentId } },
          signerName,
          signerEmail,
          signatureImage: signatureImage,
          signatureType: 'draw',
          signedAt,
          ipAddress,
          userAgent,
          documentHash,
          proofData: JSON.stringify(proofData),
          isValid: true,
        },
      });

      await tx.signatureRequest.update({
        where: { id: signatureRequest.id },
        data: {
          status: 'completed',
          signatureId: sig.id,
        },
      });

      return sig;
    });

    // Generate signed PDF and store in database
    try {
      const signedPdfBuffer = await generateSignedPDF(
        documentBuffer,
        signatureImageBuffer,
        {
          signerName,
          signerEmail,
          signedAt,
          ipAddress,
          documentHash,
        }
      );

      // Update document with signed PDF data and status
      await prisma.$transaction(async (tx) => {
        await tx.document.update({
          where: { id: signatureRequest.documentId },
          data: {
            status: 'signed',
            signedAt,
            signedBy: signerName,
            signedFileData: Uint8Array.from(signedPdfBuffer),
          },
        });

        if (signatureRequest.document.contactId) {
          await tx.contact.update({
            where: { id: signatureRequest.document.contactId },
            data: { status: 'client' },
          });
        }
      });

      const signedFileName = (signatureRequest.document.fileName || 'document').replace('.pdf', '_SIGNED.pdf');

      // Send confirmation email to signer
      const confirmHTML = generateSignatureConfirmationHTML({
        signerName,
        documentName: signatureRequest.document.fileName || 'document.pdf',
        documentHash,
      });

      await sendEmail({
        to: signerEmail,
        subject: `Document Signe : ${signatureRequest.document.fileName}`,
        htmlContent: confirmHTML,
        type: 'signature_confirmation',
        documentId: signatureRequest.documentId,
        attachments: [
          {
            filename: signedFileName,
            content: signedPdfBuffer,
          },
        ],
      });

      // Send admin notification
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const adminHTML = generateSignatureAdminNotificationHTML({
          documentName: signatureRequest.document.fileName || 'document.pdf',
          signerName,
          signerEmail,
          ipAddress,
          documentHash,
        });

        await sendEmail({
          to: adminEmail,
          subject: `[Admin] Document signe par ${signerName}`,
          htmlContent: adminHTML,
          type: 'signature_admin_notification',
          documentId: signatureRequest.documentId,
          attachments: [
            {
              filename: signedFileName,
              content: signedPdfBuffer,
            },
          ],
        });
      }
    } catch (pdfError) {
      console.error('Erreur generation PDF signe:', pdfError);
      // Signature is still valid even if PDF generation fails
      await prisma.document.update({
        where: { id: signatureRequest.documentId },
        data: {
          status: 'signed',
          signedAt,
          signedBy: signerName,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Document signe avec succes',
      signature: {
        id: signature.id,
        timestamp: signature.signedAt,
        documentHash: signature.documentHash,
      },
    });
  } catch (error) {
    console.error('Erreur soumission signature:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors de la signature' },
      { status: 500 }
    );
  }
}
