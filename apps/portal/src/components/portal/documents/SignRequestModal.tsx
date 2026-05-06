'use client';

import { useState } from 'react';
import { PenTool } from 'lucide-react';
import type { DocumentData } from '@/types/portal';
import { Dialog, Field, Input, Textarea, Button } from '@/components/ui';

export function SignRequestModal({
  document,
  onClose,
  onSent,
}: {
  document: DocumentData;
  onClose: () => void;
  onSent: () => void;
}) {
  const [email, setEmail] = useState(document.contact?.email || '');
  const [recipientName, setRecipientName] = useState(
    [document.contact?.firstName, document.contact?.lastName].filter(Boolean).join(' ') || ''
  );
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    if (!email || !recipientName) {
      setError('Email et nom du signataire requis');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/documents/${document.id}/sign-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, recipientName, message: message || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur lors de l'envoi");
        return;
      }
      setSuccess(true);
      setTimeout(onSent, 1500);
    } catch {
      setError('Erreur reseau');
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog
      open
      onClose={onClose}
      title="Demander une signature"
      subtitle={`${document.documentNumber || document.title} — Un lien de signature sera envoye par email`}
    >
      {success ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#9997;</div>
          <p style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 500 }}>Demande de signature envoyee</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Field label="Email du signataire">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@email.com" />
          </Field>
          <Field label="Nom du signataire">
            <Input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Jean Dupont" />
          </Field>
          <Field label="Message personnalise (optionnel)" error={error}>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Merci de bien vouloir signer..." rows={3} />
          </Field>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
            <Button variant="secondary" onClick={onClose}>Annuler</Button>
            <Button onClick={handleSend} loading={sending} iconLeft={<PenTool size={14} />}>
              {sending ? 'Envoi...' : 'Envoyer la demande'}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
