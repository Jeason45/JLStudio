import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { generateSignedPDF } from '@/lib/signedPdfGenerator';
import {
  sendEmail,
  generateSignatureConfirmationHTML,
  generateSignatureAdminNotificationHTML,
} from '@/lib/emailUtils';
import {
  saveSignatureImage,
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

    // Fetch signature request
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

    // Verify PDF file exists
    const documentPath = signatureRequest.document.filePath;
    if (!documentPath || !fs.existsSync(documentPath)) {
      return NextResponse.json({ error: 'Fichier document introuvable' }, { status: 500 });
    }

    // Hash the original PDF
    const documentBuffer = fs.readFileSync(documentPath);
    const documentHash = crypto.createHash('sha256').update(documentBuffer).digest('hex');

    // Save signature image
    const signatureImagePath = saveSignatureImage(signatureImage, signatureRequest.documentId, signerEmail);
    const signatureImageAbsPath = path.join(process.cwd(), signatureImagePath);

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

    // Save proof file
    const proofsDir = path.join(process.cwd(), 'storage', 'proofs');
    if (!fs.existsSync(proofsDir)) {
      fs.mkdirSync(proofsDir, { recursive: true });
    }

    // Create signature in DB
    const signature = await prisma.signature.create({
      data: {
        document: { connect: { id: signatureRequest.documentId } },
        signerName,
        signerEmail,
        signatureImage: signatureImagePath,
        signatureType: 'draw',
        signedAt,
        ipAddress,
        userAgent,
        documentHash,
        proofData: JSON.stringify(proofData),
        isValid: true,
      },
    });

    // Save proof JSON file
    const proofFilePath = path.join(proofsDir, `proof_${signatureRequest.documentId}_${signature.id}.json`);
    fs.writeFileSync(proofFilePath, JSON.stringify(proofData, null, 2));

    // Update signature request
    await prisma.signatureRequest.update({
      where: { id: signatureRequest.id },
      data: {
        status: 'completed',
        signatureId: signature.id,
      },
    });

    // Generate signed PDF
    let signedPdfPath: string | null = null;
    try {
      signedPdfPath = await generateSignedPDF(
        documentPath,
        signatureImageAbsPath,
        {
          signerName,
          signerEmail,
          signedAt,
          ipAddress,
          documentHash,
        }
      );

      // Update document
      await prisma.document.update({
        where: { id: signatureRequest.documentId },
        data: {
          status: 'signed',
          signedAt,
          signedBy: signerName,
          signedPdfPath,
        },
      });

      // Auto-update contact status to client
      if (signatureRequest.document.contactId) {
        await prisma.contact.update({
          where: { id: signatureRequest.document.contactId },
          data: { status: 'client' },
        });
      }

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
            filename: (signatureRequest.document.fileName || 'document').replace('.pdf', '_SIGNED.pdf'),
            path: signedPdfPath,
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
              filename: (signatureRequest.document.fileName || 'document').replace('.pdf', '_SIGNED.pdf'),
              path: signedPdfPath,
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
