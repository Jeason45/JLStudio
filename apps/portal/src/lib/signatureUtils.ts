import crypto from 'crypto';

export function generateStringHash(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export interface SignatureProofData {
  documentId: string;
  documentHash: string;
  signerName: string;
  signerEmail: string;
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
  signedAt: Date;
  ipAddress: string;
  userAgent: string;
}): SignatureProofData {
  const signedAtISO = data.signedAt.toISOString();
  const proofString = [
    data.documentId, data.documentHash, data.signerName, data.signerEmail,
    signedAtISO, data.ipAddress, data.userAgent,
  ].join('|');

  return {
    documentId: data.documentId,
    documentHash: data.documentHash,
    signerName: data.signerName,
    signerEmail: data.signerEmail,
    signedAt: signedAtISO,
    ipAddress: data.ipAddress,
    userAgent: data.userAgent,
    proofHash: generateStringHash(proofString),
  };
}

export function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';
}

export function getUserAgent(request: Request): string {
  return request.headers.get('user-agent') || 'unknown';
}
