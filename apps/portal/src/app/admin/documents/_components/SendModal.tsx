'use client';

import { useEffect, useState } from 'react';
import { X, Send, FileSignature } from 'lucide-react';
import { inputStyle, labelStyle, primaryBtnStyle } from './styles';

// Conservé pour compat : 'send' = envoi simple. La demande de signature
// est désormais une case à cocher dans le modal (si canRequestSignature).
export type SendMode = 'send' | 'sign-request';

export function SendModal({
  open,
  canRequestSignature = false,
  documentId,
  documentNumber,
  defaultEmail,
  defaultName,
  onClose,
  onSuccess,
}: {
  open: boolean;
  canRequestSignature?: boolean;
  documentId: string;
  documentNumber: string | null;
  defaultEmail?: string;
  defaultName?: string;
  onClose: () => void;
  onSuccess: (didRequestSignature: boolean) => void;
}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [requestSignature, setRequestSignature] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setEmail(defaultEmail || '');
      setName(defaultName || '');
      setMessage('');
      setRequestSignature(false);
      setError('');
    }
  }, [open, defaultEmail, defaultName]);

  if (!open) return null;

  const isSign = canRequestSignature && requestSignature;
  const title = 'Envoyer par email';
  const ctaLabel = isSign ? 'Envoyer pour signature' : 'Envoyer';
  const Icon = isSign ? FileSignature : Send;

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const url = isSign
        ? `/api/admin/documents/${documentId}/sign-request`
        : `/api/admin/documents/${documentId}/send`;

      const body = isSign
        ? { email, recipientName: name, message: message || undefined }
        : { to: email, recipientName: name, message: message || undefined };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Erreur lors de l\'envoi');
      }

      onSuccess(isSign);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.65)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--agency-surface-1)',
          border: '1px solid var(--agency-border)',
          borderRadius: 14,
          width: '100%',
          maxWidth: 520,
          padding: 24,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'var(--agency-accent-soft)',
                color: 'var(--agency-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0 }}>{title}</h2>
              {documentNumber && (
                <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>{documentNumber}</div>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--agency-ink-3)',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {error && (
          <div
            style={{
              marginBottom: 14,
              padding: 10,
              background: 'rgba(248,113,113,0.12)',
              border: '1px solid #f87171',
              borderRadius: 8,
              color: '#f87171',
              fontSize: 12,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={labelStyle()}>Nom du destinataire</label>
            <input
              style={inputStyle()}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Marc Dupont"
            />
          </div>
          <div>
            <label style={labelStyle()}>Email</label>
            <input
              style={inputStyle()}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="client@example.com"
            />
          </div>
          <div>
            <label style={labelStyle()}>
              Message <span style={{ fontWeight: 400, color: 'var(--agency-ink-3)' }}>(optionnel)</span>
            </label>
            <textarea
              style={{ ...inputStyle(), minHeight: 90, resize: 'vertical', fontFamily: 'inherit' }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isSign
                  ? 'Bonjour, merci de signer ce devis pour valider la prestation…'
                  : 'Bonjour, vous trouverez ci-joint le document…'
              }
            />
          </div>

          {canRequestSignature && (
            <label
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12,
                background: requestSignature ? 'var(--agency-accent-soft)' : 'var(--agency-surface-2)',
                border: `1px solid ${requestSignature ? 'var(--agency-accent)' : 'var(--agency-border)'}`,
                borderRadius: 8, cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <input
                type="checkbox"
                checked={requestSignature}
                onChange={(e) => setRequestSignature(e.target.checked)}
                style={{ accentColor: 'var(--agency-accent)', marginTop: 2 }}
              />
              <span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
                  <FileSignature size={13} /> Demander une signature électronique
                </span>
                <span style={{ display: 'block', fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>
                  Le client reçoit un lien pour signer le devis en ligne. Le statut passera à « Signé ».
                </span>
              </span>
            </label>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 500,
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--agency-ink-3)',
              border: '1px solid var(--agency-border)',
            }}
          >
            Annuler
          </button>
          <button
            type="button"
            disabled={loading || !email || !name}
            onClick={handleSubmit}
            style={primaryBtnStyle(loading || !email || !name)}
          >
            <Icon size={13} />
            {loading ? 'Envoi…' : ctaLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
