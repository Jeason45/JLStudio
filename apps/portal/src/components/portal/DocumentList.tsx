'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, FileText, Download, Send, X, PenTool } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import type { DocumentData } from '@/types/portal';
import {
  STATUS_LABELS,
  TYPE_LABELS,
  STATUSES_BY_TYPE,
  formatCurrency,
  formatDate,
} from './documents/constants';
import { SendDocumentModal } from './documents/SendDocumentModal';
import { SignRequestModal } from './documents/SignRequestModal';
import { Button, Card, Badge, StatCard, SkeletonRows, EmptyState, Tabs, Tooltip } from '@/components/ui';

type Tone = 'neutral' | 'accent' | 'success' | 'danger';

function iconBtnStyle(hoverTone: 'accent' | 'success' | 'danger'): React.CSSProperties {
  const hoverBg = hoverTone === 'success' ? 'var(--success-light)' : hoverTone === 'danger' ? 'var(--danger-light)' : 'var(--accent-light)';
  const hoverColor = hoverTone === 'success' ? 'var(--success)' : hoverTone === 'danger' ? 'var(--danger)' : 'var(--accent)';
  return {
    padding: '4px 6px',
    borderRadius: '6px',
    fontSize: '11px',
    background: 'transparent',
    color: 'var(--text-tertiary)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.15s',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    // Hover handled via inline event handlers since we can't use :hover with style prop
    // We accept the slight DRY trade-off here
    ['--hover-bg' as string]: hoverBg,
    ['--hover-color' as string]: hoverColor,
  };
}

const STATUS_TONE: Record<string, Tone> = {
  DRAFT: 'neutral',
  SENT: 'accent',
  SIGNED: 'success',
  ACCEPTED: 'success',
  PAID: 'success',
  REJECTED: 'danger',
  CANCELLED: 'neutral',
};

type DocType = 'DEVIS' | 'FACTURE' | 'CONTRAT';

export default function DocumentList({ type, createHref }: { type: DocType; createHref: string }) {
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

  const statuses = STATUSES_BY_TYPE[type];
  const totalAmount = documents.reduce((sum, d) => sum + (d.totalAmount || 0), 0);
  const pendingCount = documents.filter((d) => ['DRAFT', 'SENT'].includes(d.status)).length;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{TYPE_LABELS[type].plural}</h1>
        {!isClient && (
          <Button onClick={() => router.push(createHref)} iconLeft={<Plus size={16} />}>
            Nouveau {TYPE_LABELS[type].singular.toLowerCase()}
          </Button>
        )}
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StatCard label="Total" value={documents.length} />
        <StatCard label="En attente" value={pendingCount} />
        <StatCard label="Montant total" value={formatCurrency(totalAmount)} />
      </div>

      {/* Filters */}
      <div style={{ marginBottom: '16px' }}>
        <Tabs
          size="sm"
          value={statusFilter}
          onChange={setStatusFilter}
          items={[
            { value: '', label: 'Tous', count: documents.length },
            ...statuses.map((s) => ({
              value: s,
              label: STATUS_LABELS[s],
              count: documents.filter((d) => d.status === s).length,
            })),
          ]}
        />
      </div>

      {/* List */}
      {loading ? (
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <SkeletonRows rows={5} columns={5} />
        </Card>
      ) : documents.length === 0 ? (
        <Card padding={0}>
          <EmptyState
            icon={<FileText size={24} />}
            title={`Aucun ${TYPE_LABELS[type].singular.toLowerCase()}`}
            description={!isClient ? `Créez votre premier ${TYPE_LABELS[type].singular.toLowerCase()} pour commencer.` : undefined}
            action={!isClient && (
              <Button onClick={() => router.push(createHref)} iconLeft={<Plus size={14} />} size="sm">
                Nouveau {TYPE_LABELS[type].singular.toLowerCase()}
              </Button>
            )}
          />
        </Card>
      ) : (
        <Card padding={0} style={{ overflow: 'hidden' }}>
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
              <Badge tone={STATUS_TONE[doc.status] || 'neutral'}>{STATUS_LABELS[doc.status]}</Badge>
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
                  <Tooltip content="Demander signature">
                    <button onClick={() => setSignModal(doc)} style={iconBtnStyle('success')}>
                      <PenTool size={12} />
                    </button>
                  </Tooltip>
                )}
                {!isClient && (
                  <Tooltip content="Envoyer par email">
                    <button onClick={() => setSendModal(doc)} style={iconBtnStyle('accent')}>
                      <Send size={12} />
                    </button>
                  </Tooltip>
                )}
                <Tooltip content="Télécharger le PDF">
                  <button onClick={() => handleDownloadPDF(doc)} style={iconBtnStyle('accent')}>
                    <Download size={12} />
                  </button>
                </Tooltip>
                {!isClient && (
                  <Tooltip content="Supprimer">
                    <button onClick={() => handleDelete(doc.id)} style={iconBtnStyle('danger')}>
                      <X size={12} />
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </Card>
      )}

      {sendModal && (
        <SendDocumentModal
          document={sendModal}
          onClose={() => setSendModal(null)}
          onSent={() => { setSendModal(null); refreshDocuments(); }}
        />
      )}

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
