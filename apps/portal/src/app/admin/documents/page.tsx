'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { FileText, Receipt, FileSignature, Search, Trash2, Download, ExternalLink } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

type DocType = 'DEVIS' | 'FACTURE' | 'CONTRAT';
type DocStatus = 'DRAFT' | 'SENT' | 'SIGNED' | 'ACCEPTED' | 'REJECTED' | 'PAID' | 'CANCELLED';

interface Document {
  id: string;
  type: DocType;
  status: DocStatus;
  documentNumber: string | null;
  title: string;
  amount: number | null;
  totalAmount: number | null;
  taxRate: number;
  taxAmount: number | null;
  validUntil: string | null;
  sentAt: string | null;
  signedAt: string | null;
  paidAt: string | null;
  createdAt: string;
  contact: { id: string; name: string; email: string | null; companyName: string | null; firstName: string | null; lastName: string | null } | null;
  signature: { id: string; signerName: string; signedAt: string } | null;
}

const TABS: { type: DocType; label: string; icon: React.ReactNode }[] = [
  { type: 'DEVIS', label: 'Devis', icon: <FileText size={14} /> },
  { type: 'FACTURE', label: 'Factures', icon: <Receipt size={14} /> },
  { type: 'CONTRAT', label: 'Contrats', icon: <FileSignature size={14} /> },
];

const STATUS_CONFIG: Record<DocStatus, { label: string; color: string }> = {
  DRAFT: { label: 'Brouillon', color: '#94a3b8' },
  SENT: { label: 'Envoyé', color: '#3B82F6' },
  SIGNED: { label: 'Signé', color: '#22c55e' },
  ACCEPTED: { label: 'Accepté', color: '#22c55e' },
  REJECTED: { label: 'Refusé', color: '#ef4444' },
  PAID: { label: 'Payé', color: '#22c55e' },
  CANCELLED: { label: 'Annulé', color: '#94a3b8' },
};

const STATUS_FILTERS_BY_TYPE: Record<DocType, DocStatus[]> = {
  DEVIS: ['DRAFT', 'SENT', 'ACCEPTED', 'REJECTED', 'CANCELLED'],
  FACTURE: ['DRAFT', 'SENT', 'PAID', 'CANCELLED'],
  CONTRAT: ['DRAFT', 'SENT', 'SIGNED', 'CANCELLED'],
};

export default function AdminDocumentsPage() {
  const { isMobile } = useAgencySidebar();
  const [tab, setTab] = useState<DocType>('DEVIS');
  const [docs, setDocs] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchDocs = useCallback(async () => {
    try {
      const params = new URLSearchParams({ type: tab });
      if (statusFilter) params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());
      const res = await fetch(`/api/admin/documents?${params.toString()}`);
      const data = await res.json();
      setDocs(Array.isArray(data) ? data : []);
    } catch {
      setDocs([]);
    }
  }, [tab, statusFilter, search]);

  useEffect(() => {
    setLoading(true);
    fetchDocs().finally(() => setLoading(false));
  }, [fetchDocs]);

  const stats = useMemo(() => {
    const total = docs.length;
    const totalAmount = docs.reduce((s, d) => s + (d.totalAmount || 0), 0);
    const pending = docs.filter((d) => ['DRAFT', 'SENT'].includes(d.status)).length;
    const paid = docs.filter((d) => d.status === 'PAID').length;
    return { total, totalAmount, pending, paid };
  }, [docs]);

  const handleStatusChange = async (id: string, status: DocStatus) => {
    setDocs((prev) => prev.map((d) => (d.id === id ? { ...d, status } : d)));
    await fetch('/api/admin/documents', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
  };

  const handleDelete = async (id: string, num: string) => {
    if (!confirm(`Supprimer ${num} ?`)) return;
    await fetch(`/api/admin/documents?id=${id}`, { method: 'DELETE' });
    fetchDocs();
  };

  const handleDownloadPDF = async (doc: Document) => {
    try {
      const res = await fetch(`/api/portal/documents/${doc.id}/pdf`);
      if (!res.ok) {
        alert('Erreur téléchargement');
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      const typePrefix = doc.type === 'DEVIS' ? 'Devis' : doc.type === 'FACTURE' ? 'Facture' : 'Contrat';
      a.href = url;
      a.download = `${typePrefix}_${doc.documentNumber || doc.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch { /* silent */ }
  };

  const tabLabel = TABS.find((t) => t.type === tab)?.label || tab;
  const createHref = tab === 'DEVIS' ? '/devis/create' : tab === 'FACTURE' ? '/factures/create' : '/contrats/create';

  return (
    <div>
      <header style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
              Documents
            </h1>
            <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
              {stats.total} {tabLabel.toLowerCase()} · {stats.pending} en attente · {stats.paid} payé{stats.paid > 1 ? 's' : ''} · {stats.totalAmount.toLocaleString('fr-FR')} €
            </p>
          </div>
          <a
            href={createHref}
            style={{
              ...primaryBtn(), textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}
            title="La création utilise l'éditeur du portail (vérifie que tu es bien sur le site JL Studio)"
          >
            <ExternalLink size={13} /> Créer un{tab === 'FACTURE' ? 'e' : ''} {tabLabel.toLowerCase().replace(/s$/, '')}
          </a>
        </div>
      </header>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4, marginBottom: 20,
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 10, padding: 4, width: 'fit-content',
      }}>
        {TABS.map((t) => (
          <button
            key={t.type}
            onClick={() => { setTab(t.type); setStatusFilter(''); }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 7,
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              border: 'none',
              background: tab === t.type ? 'var(--agency-accent-soft)' : 'transparent',
              color: tab === t.type ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
              transition: 'all 0.15s',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--agency-ink-3)' }} />
          <input
            type="text"
            placeholder="Rechercher numéro ou titre…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle(), paddingLeft: 32 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setStatusFilter('')}
            style={filterBtnStyle(!statusFilter)}
          >
            Tous
          </button>
          {STATUS_FILTERS_BY_TYPE[tab].map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} style={filterBtnStyle(statusFilter === s, STATUS_CONFIG[s].color)}>
              {STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--agency-surface-1)',
        border: '1px solid var(--agency-border)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--agency-ink-3)', fontSize: 13 }}>
            Chargement…
          </div>
        ) : docs.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <FileText size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 12 }} />
            <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, fontWeight: 500, margin: 0, marginBottom: 4 }}>
              {search || statusFilter ? 'Aucun résultat' : `Aucun ${tabLabel.toLowerCase().replace(/s$/, '')}`}
            </p>
            <p style={{ color: 'var(--agency-ink-3)', fontSize: 12, margin: 0 }}>
              {search || statusFilter
                ? 'Modifie ta recherche ou tes filtres.'
                : `Crée ton premier ${tabLabel.toLowerCase().replace(/s$/, '')} via le portail.`}
            </p>
          </div>
        ) : isMobile ? (
          <div>
            {docs.map((d) => (
              <MobileRow
                key={d.id}
                doc={d}
                onDownload={() => handleDownloadPDF(d)}
                onDelete={() => handleDelete(d.id, d.documentNumber || d.title)}
                onStatusChange={(s) => handleStatusChange(d.id, s)}
                allowedStatuses={STATUS_FILTERS_BY_TYPE[tab]}
              />
            ))}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--agency-surface-2)' }}>
                {['Numéro', 'Client', 'Titre', 'Montant', 'Statut', 'Date', ''].map((h, i) => (
                  <th key={i} style={{
                    padding: '10px 16px', textAlign: 'left',
                    fontSize: 10, fontWeight: 700,
                    color: 'var(--agency-ink-3)',
                    textTransform: 'uppercase', letterSpacing: '0.08em',
                    borderBottom: '1px solid var(--agency-border)',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <DesktopRow
                  key={d.id}
                  doc={d}
                  onDownload={() => handleDownloadPDF(d)}
                  onDelete={() => handleDelete(d.id, d.documentNumber || d.title)}
                  onStatusChange={(s) => handleStatusChange(d.id, s)}
                  allowedStatuses={STATUS_FILTERS_BY_TYPE[tab]}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── Rows ────────────────────────────────────────────────────────────

function StatusSelect({
  status, allowed, onChange,
}: {
  status: DocStatus;
  allowed: DocStatus[];
  onChange: (s: DocStatus) => void;
}) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as DocStatus)}
      onClick={(e) => e.stopPropagation()}
      style={{
        padding: '3px 8px', borderRadius: 12, fontSize: 10, fontWeight: 600,
        color: STATUS_CONFIG[status].color,
        background: `${STATUS_CONFIG[status].color}20`,
        border: `1px solid ${STATUS_CONFIG[status].color}40`,
        cursor: 'pointer', outline: 'none',
      }}
    >
      {allowed.map((s) => (
        <option key={s} value={s}>
          {STATUS_CONFIG[s].label}
        </option>
      ))}
    </select>
  );
}

function DesktopRow({
  doc, onDownload, onDelete, onStatusChange, allowedStatuses,
}: {
  doc: Document;
  onDownload: () => void;
  onDelete: () => void;
  onStatusChange: (s: DocStatus) => void;
  allowedStatuses: DocStatus[];
}) {
  const clientName = doc.contact
    ? doc.contact.companyName
      || `${doc.contact.firstName || ''} ${doc.contact.lastName || ''}`.trim()
      || doc.contact.name
    : '—';
  return (
    <tr style={{ borderTop: '1px solid var(--agency-border-soft)' }}
      onMouseOver={(e) => { e.currentTarget.style.background = 'var(--agency-surface-2)'; }}
      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <td style={{ padding: '12px 16px', fontSize: 12, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
        {doc.documentNumber || '—'}
      </td>
      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-2)' }}>
        {clientName}
      </td>
      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-2)', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {doc.title}
      </td>
      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-1)', fontWeight: 600 }}>
        {doc.totalAmount !== null ? `${doc.totalAmount.toLocaleString('fr-FR')} €` : '—'}
      </td>
      <td style={{ padding: '12px 16px' }}>
        <StatusSelect status={doc.status} allowed={allowedStatuses} onChange={onStatusChange} />
      </td>
      <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--agency-ink-3)', whiteSpace: 'nowrap' }}>
        {new Date(doc.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
      </td>
      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
        <div style={{ display: 'inline-flex', gap: 4 }}>
          <button onClick={onDownload} title="Télécharger PDF" style={iconBtn()}>
            <Download size={13} />
          </button>
          <button onClick={onDelete} title="Supprimer" style={iconBtn('var(--agency-danger)')}>
            <Trash2 size={13} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function MobileRow({
  doc, onDownload, onDelete, onStatusChange, allowedStatuses,
}: {
  doc: Document;
  onDownload: () => void;
  onDelete: () => void;
  onStatusChange: (s: DocStatus) => void;
  allowedStatuses: DocStatus[];
}) {
  const clientName = doc.contact
    ? doc.contact.companyName
      || `${doc.contact.firstName || ''} ${doc.contact.lastName || ''}`.trim()
      || doc.contact.name
    : '—';
  return (
    <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--agency-border-soft)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
            {doc.documentNumber || doc.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>{clientName}</div>
        </div>
        <StatusSelect status={doc.status} allowed={allowedStatuses} onChange={onStatusChange} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--agency-ink-2)', margin: '6px 0' }}>
        {doc.totalAmount !== null ? `${doc.totalAmount.toLocaleString('fr-FR')} €` : '—'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--agency-ink-4)' }}>
          {new Date(doc.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
        </span>
        <div style={{ display: 'inline-flex', gap: 6 }}>
          <button onClick={onDownload} style={iconBtn()}><Download size={12} /></button>
          <button onClick={onDelete} style={iconBtn('var(--agency-danger)')}><Trash2 size={12} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function inputStyle(): React.CSSProperties {
  return {
    width: '100%', padding: '8px 12px',
    border: '1px solid var(--agency-border)', borderRadius: 8,
    fontSize: 13, outline: 'none',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontFamily: 'inherit',
  };
}
function primaryBtn(): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '7px 14px', borderRadius: 8,
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: 'var(--agency-accent)', color: 'white', border: 'none',
  };
}
function iconBtn(color = 'var(--agency-ink-3)'): React.CSSProperties {
  return {
    width: 26, height: 26, borderRadius: 6,
    border: 'none', background: 'transparent',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', color, transition: 'all 0.15s',
  };
}
function filterBtnStyle(active: boolean, color = 'var(--agency-accent)'): React.CSSProperties {
  return {
    padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
    border: `1px solid ${active ? color : 'var(--agency-border)'}`,
    background: active ? `${color}20` : 'var(--agency-surface-2)',
    color: active ? color : 'var(--agency-ink-3)',
    transition: 'all 0.15s',
  };
}
