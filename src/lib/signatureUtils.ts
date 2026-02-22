import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export function generateFileHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex');
}

export function generateStringHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export interface SignatureProofData {
  documentId: string;
  documentHash: string;
  signerName: string;
  signerEmail: string;
  signatureType: string;
  signedAt: string;
  ipAddress: string;
  userAgent: string;
  proofHash: string;
}

export function createSignatureProof(data: {
  documentId: string;
  documentHash: string;
  signerName: string;
  signerEmail: string;
  signatureType: string;
  signedAt: Date;
  ipAddress: string;
  userAgent: string;
}): SignatureProofData {
  const signedAtISO = data.signedAt.toISOString();
  const proofString = [
    data.documentId, data.documentHash, data.signerName, data.signerEmail,
    data.signatureType, signedAtISO, data.ipAddress, data.userAgent,
  ].join('|');

  return {
    documentId: data.documentId,
    documentHash: data.documentHash,
    signerName: data.signerName,
    signerEmail: data.signerEmail,
    signatureType: data.signatureType,
    signedAt: signedAtISO,
    ipAddress: data.ipAddress,
    userAgent: data.userAgent,
    proofHash: generateStringHash(proofString),
  };
}

export function verifySignatureProof(proof: SignatureProofData): boolean {
  const proofString = [
    proof.documentId, proof.documentHash, proof.signerName, proof.signerEmail,
    proof.signatureType, proof.signedAt, proof.ipAddress, proof.userAgent,
  ].join('|');
  return generateStringHash(proofString) === proof.proofHash;
}

export function saveSignatureImage(base64Data: string, documentId: string, signerEmail: string): string {
  const base64Image = base64Data.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = Buffer.from(base64Image, 'base64');
  const emailHash = generateStringHash(signerEmail).substring(0, 8);
  const fileName = `signature_${documentId}_${emailHash}_${Date.now()}.png`;
  const dirPath = path.join(process.cwd(), 'storage', 'signatures');
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(path.join(dirPath, fileName), imageBuffer);
  return `storage/signatures/${fileName}`;
}

export function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown';
}
