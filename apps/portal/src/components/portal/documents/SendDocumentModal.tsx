'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import type { DocumentData } from '@/types/portal';
import { Dialog, Field, Input, Textarea, Button } from '@/components/ui';

export function SendDocumentModal({
  document,
  onClose,
  onSent,
}: {
  document: DocumentData;
  onClose: () => void;
  onSent: () => void;
}) {
  const [to, setTo] = useState(document.contact?.email || '');
  const [recipientName, setRecipientName] = useState(
    [document.contact?.firstName, document.contact?.lastName].filter(Boolean).join(' ') || ''
  );
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    if (!to || !recipientName) {
      setError('Email et nom du destinataire requis');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch(`/api/portal/documents/${document.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, recipientName, message: message || undefined }),
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
    <Dialog open onClose={onClose} title={`Envoyer ${document.documentNumber || document.title}`}>
      {success ? (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#10003;</div>
          <p style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 500 }}>Document envoye avec succes</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <Field label="Email du destinataire">
            <Input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="client@email.com" />
          </Field>
          <Field label="Nom du destinataire">
            <Input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Jean Dupont" />
          </Field>
          <Field label="Message personnalise (optionnel)" error={error}>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Veuillez trouver ci-joint..." rows={3} />
          </Field>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
            <Button variant="secondary" onClick={onClose}>Annuler</Button>
            <Button onClick={handleSend} loading={sending} iconLeft={<Send size={14} />}>
              {sending ? 'Envoi...' : 'Envoyer'}
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
