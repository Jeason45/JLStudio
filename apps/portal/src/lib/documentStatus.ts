// Finite state machine for PortalDocument.status
// DRAFT → SENT → (SIGNED | ACCEPTED | REJECTED | PAID) → (PAID | CANCELLED)
// REJECTED, PAID, CANCELLED are terminal.

export type DocumentStatus =
  | 'DRAFT'
  | 'SENT'
  | 'SIGNED'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'PAID'
  | 'CANCELLED';

const TRANSITIONS: Record<DocumentStatus, DocumentStatus[]> = {
  DRAFT: ['SENT', 'CANCELLED'],
  SENT: ['SIGNED', 'ACCEPTED', 'REJECTED', 'PAID', 'CANCELLED'],
  SIGNED: ['PAID', 'CANCELLED'],
  ACCEPTED: ['SIGNED', 'PAID', 'CANCELLED'],
  REJECTED: [],
  PAID: [],
  CANCELLED: [],
};

export function isValidTransition(from: DocumentStatus, to: DocumentStatus): boolean {
  if (from === to) return true; // idempotent
  return TRANSITIONS[from]?.includes(to) ?? false;
}
