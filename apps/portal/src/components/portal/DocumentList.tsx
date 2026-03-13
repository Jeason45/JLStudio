'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FileText } from 'lucide-react';
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
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const params = new URLSearchParams({ type });
    if (statusFilter) params.set('status', statusFilter);
    fetch(`/api/portal/documents?${params}`)
      .then((r) => r.json())
      .then((data) => { setDocuments(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [type, statusFilter]);

  const handleStatusChange = async (id: string, status: string) => {
    await fetch(`/api/portal/documents/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const params = new URLSearchParams({ type });
    if (statusFilter) params.set('status', statusFilter);
    const res = await fetch(`/api/portal/documents?${params}`);
    setDocuments(await res.json());
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
        <button onClick={() => router.push(createHref)} style={{
          display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
          background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
        }}>
          <Plus size={16} /> Nouveau {TYPE_LABELS[type].singular.toLowerCase()}
        </button>
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
            display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px 100px',
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
              display: 'grid', gridTemplateColumns: '1fr 140px 100px 100px 100px',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
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
                <button onClick={() => handleDelete(doc.id)} style={{
                  padding: '4px 8px', borderRadius: '6px', fontSize: '11px',
                  background: 'transparent', color: 'var(--text-tertiary)', border: 'none', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--danger-light)'; e.currentTarget.style.color = 'var(--danger)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
                >Suppr.</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
