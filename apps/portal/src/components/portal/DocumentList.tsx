'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FileText, Download, Send, X, PenTool } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import type { DocumentData } from '@/types/portal';

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Brouillon', SENT: 'Envoye', SIGNED: 'Signe', ACCEPTED: 'Accepte',
  REJECTED: 'Refuse', PAID: 'Paye', CANCELLED: 'Annule',
};

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'var(--text-tertiary)', SENT: 'var(--accent)', SIGNED: 'var(--success)', ACCEPTED: 'var(--success)',
  REJECTED: 'var(--danger)', PAID: 'var(--success)', CANCELLED: 'var(--text-tertiary)',
};

const STATUS_BG: Record<string, string> = {
  DRAFT: 'var(--bg-badge)', SENT: 'var(--accent-light)', SIGNED: 'var(--success-light)', ACCEPTED: 'var(--success-light)',
  REJECTED: 'var(--danger-light)', PAID: 'var(--success-light)', CANCELLED: 'var(--bg-badge)',
};

const TYPE_LABELS: Record<string, { singular: string; plural: string }> = {
  DEVIS: { singular: 'Devis', plural: 'Devis' },
  FACTURE: { singular: 'Facture', plural: 'Factures' },
  CONTRAT: { singular: 'Contrat', plural: 'Contrats' },
};

export default function DocumentList({ type, createHref }: { type: 'DEVIS' | 'FACTURE' | 'CONTRAT'; createHref: string }) {
  const router = useRouter();
  const { userRole } = useSidebar();
  const isClient = userRole === 'CLIENT';
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [sendModal, setSendModal] = useState<DocumentData | null>(null);
  const [signModal, setSignModal] = useState<DocumentData | null>(null);

  const refreshDocuments = async () => {
    const params = new URLSearchParams({ type });
    if (statusFilter) params.set('status', statusFilter);
    const res = await fetch(`/api/portal/documents?${params}`);
    const json = await res.json();
    setDocuments(json.data ?? json);
  };

  useEffect(() => {
    const params = new URLSearchParams({ type });
    if (statusFilter) params.set('status', statusFilter);
    fetch(`/api/portal/documents?${params}`)
      .then((r) => r.json())
      .then((res) => { setDocuments(res.data ?? res); setLoading(false); })
      .catch(() => setLoading(false));
  }, [type, statusFilter]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/portal/documents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    await refreshDocuments();
  };

  const handleDownloadPDF = async (doc: DocumentData) => {
    try {
      const res = await fetch(`/api/portal/documents/${doc.id}/pdf`);
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      const typePrefix = doc.type === 'DEVIS' ? 'Devis' : doc.type === 'FACTURE' ? 'Facture' : 'Contrat';
      a.href = url;
      a.download = `${typePrefix}_${doc.documentNumber || doc.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // silent
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(`Supprimer ce ${TYPE_LABELS[type].singular.toLowerCase()} ?`)) return;
    await fetch(`/api/portal/documents/${id}`, { method: 'DELETE' });
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const formatCurrency = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('fr-FR');

  const statuses = type === 'FACTURE'
    ? ['DRAFT', 'SENT', 'PAID', 'CANCELLED']
    : type === 'CONTRAT'
    ? ['DRAFT', 'SENT', 'SIGNED', 'CANCELLED']
    : ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'CANCELLED'];

  const totalAmount = documents.reduce((sum, d) => sum + (d.totalAmount || 0), 0);
  const pendingCount = documents.filter((d) => ['DRAFT', 'SENT'].includes(d.status)).length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{TYPE_LABELS[type].plural}</h1>
        {!isClient && (
          <button onClick={() => router.push(createHref)} style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
            background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
          }}>
            <Plus size={16} /> Nouveau {TYPE_LABELS[type].singular.toLowerCase()}
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: documents.length },
          { label: 'En attente', value: pendingCount },
          { label: 'Montant total', value: formatCurrency(totalAmount) },
        ].map((s) => (
          <div key={s.label} style={{ padding: '12px 16px', borderRadius: '12px', background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>{s.label}</div>
            <div style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '16px', flexWrap: 'wrap' }}>
        <button onClick={() => setStatusFilter('')} style={{
          padding: '5px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
          background: !statusFilter ? 'var(--text-primary)' : 'var(--bg-secondary)',
          color: !statusFilter ? 'var(--bg-card)' : 'var(--text-secondary)',
          border: 'none', cursor: 'pointer', transition: 'all 0.15s',
        }}>Tous</button>
        {statuses.map((s) => (
          <button key={s} onClick={() => setStatusFilter(statusFilter === s ? '' : s)} style={{
            padding: '5px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 500,
            background: statusFilter === s ? 'var(--text-primary)' : 'var(--bg-secondary)',
            color: statusFilter === s ? 'var(--bg-card)' : 'var(--text-secondary)',
            border: 'none', cursor: 'pointer', transition: 'all 0.15s',
          }}>{STATUS_LABELS[s]}</button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <p style={{ color: 'var(--text-tertiary)' }}>Chargement...</p>
      ) : documents.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-tertiary)' }}>
          <FileText size={32} style={{ marginBottom: '10px', opacity: 0.4 }} />
          <p style={{ fontSize: '13px' }}>Aucun {TYPE_LABELS[type].singular.toLowerCase()}</p>
        </div>
      ) : (
        <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)', overflow: 'hidden' }}>
          {/* Table header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px 140px',
            padding: '10px 16px', background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border)',
          }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Document</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Date</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Statut</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Montant</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', textAlign: 'right' }}>Actions</span>
          </div>
          {documents.map((doc, idx) => (
            <div key={doc.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px 140px',
              alignItems: 'center', padding: '12px 16px',
              borderBottom: idx < documents.length - 1 ? '1px solid var(--border-light)' : 'none',
              transition: 'background 0.1s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{doc.documentNumber || doc.title}</div>
                {doc.contact && (
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                    {doc.contact.firstName || ''} {doc.contact.lastName || ''} {doc.contact.company ? `(${doc.contact.company})` : ''}
                  </div>
                )}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{formatDate(doc.createdAt)}</span>
              <span style={{
                padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 500,
                background: STATUS_BG[doc.status], color: STATUS_COLORS[doc.status],
                display: 'inline-block', width: 'fit-content',
              }}>{STATUS_LABELS[doc.status]}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'right' }}>
                {doc.totalAmount != null ? formatCurrency(doc.totalAmount) : '—'}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                {!isClient && (
                  <select
                    value={doc.status}
                    onChange={(e) => handleStatusChange(doc.id, e.target.value)}
                    style={{
                      padding: '4px 6px', borderRadius: '6px', fontSize: '11px',
                      background: 'var(--bg-input)', border: '1px solid var(--border-input)',
                      color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none',
                    }}
                  >
                    {statuses.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                  </select>
                )}
                {!isClient && doc.type !== 'FACTURE' && doc.status !== 'SIGNED' && (
                  <button onClick={() => setSignModal(doc)} title="Demander signature" style={{
                    padding: '4px 6px', borderRadius: '6px', fontSize: '11px',
                    background: 'transparent', color: 'var(--text-tertiary)', border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '2px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--success-light)'; e.currentTarget.style.color = 'var(--success)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                  ><PenTool size={12} /></button>
                )}
                {!isClient && (
                  <button onClick={() => setSendModal(doc)} title="Envoyer par email" style={{
                    padding: '4px 6px', borderRadius: '6px', fontSize: '11px',
                    background: 'transparent', color: 'var(--text-tertiary)', border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '2px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                  ><Send size={12} /></button>
                )}
                <button onClick={() => handleDownloadPDF(doc)} title="Telecharger PDF" style={{
                  padding: '4px 6px', borderRadius: '6px', fontSize: '11px',
                  background: 'transparent', color: 'var(--text-tertiary)', border: 'none', cursor: 'pointer',
                  transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '2px',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                ><Download size={12} /></button>
                {!isClient && (
                  <button onClick={() => handleDelete(doc.id)} title="Supprimer" style={{
                    padding: '4px 6px', borderRadius: '6px', fontSize: '11px',
                    background: 'transparent', color: 'var(--text-tertiary)', border: 'none', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; e.currentTarget.style.color = 'var(--danger)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                  ><X size={12} /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Send Modal */}
      {sendModal && (
        <SendDocumentModal
          document={sendModal}
          onClose={() => setSendModal(null)}
          onSent={() => { setSendModal(null); refreshDocuments(); }}
        />
      )}

      {/* Sign Request Modal */}
      {signModal && (
        <SignRequestModal
          document={signModal}
          onClose={() => setSignModal(null)}
          onSent={() => { setSignModal(null); refreshDocuments(); }}
        />
      )}
    </div>
  );
}

// ─── Send Modal ──────────────────────────────
function SendDocumentModal({ document, onClose, onSent }: { document: DocumentData; onClose: () => void; onSent: () => void }) {
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
        setError(data.error || 'Erreur lors de l\'envoi');
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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '13px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Envoyer {document.documentNumber || document.title}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#10003;</div>
            <p style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 500 }}>Document envoye avec succes</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Email du destinataire</label>
              <input type="email" value={to} onChange={(e) => setTo(e.target.value)} placeholder="client@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nom du destinataire</label>
              <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Jean Dupont" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Message personnalise (optionnel)</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Veuillez trouver ci-joint..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {error && (
              <p style={{ fontSize: '12px', color: 'var(--danger)', margin: 0 }}>{error}</p>
            )}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button onClick={onClose} style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer',
              }}>Annuler</button>
              <button onClick={handleSend} disabled={sending} style={{
                padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
                opacity: sending ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <Send size={14} /> {sending ? 'Envoi...' : 'Envoyer'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sign Request Modal ─────────────────────
function SignRequestModal({ document, onClose, onSent }: { document: DocumentData; onClose: () => void; onSent: () => void }) {
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
        setError(data.error || 'Erreur lors de l\'envoi');
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

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '13px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', outline: 'none',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block',
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: 'var(--bg-card)', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '440px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)', border: '1px solid var(--border)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
            Demander une signature
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '4px' }}>
            <X size={18} />
          </button>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
          {document.documentNumber || document.title} — Un lien de signature sera envoye par email
        </p>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>&#9997;</div>
            <p style={{ fontSize: '14px', color: 'var(--success)', fontWeight: 500 }}>Demande de signature envoyee</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={labelStyle}>Email du signataire</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@email.com" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Nom du signataire</label>
              <input type="text" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} placeholder="Jean Dupont" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Message personnalise (optionnel)</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Merci de bien vouloir signer..." rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
            </div>

            {error && (
              <p style={{ fontSize: '12px', color: 'var(--danger)', margin: 0 }}>{error}</p>
            )}

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
              <button onClick={onClose} style={{
                padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: 'none', cursor: 'pointer',
              }}>Annuler</button>
              <button onClick={handleSend} disabled={sending} style={{
                padding: '8px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
                background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
                opacity: sending ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <PenTool size={14} /> {sending ? 'Envoi...' : 'Envoyer la demande'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
