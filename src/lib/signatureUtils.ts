import crypto from 'crypto';

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

export function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown';
}
