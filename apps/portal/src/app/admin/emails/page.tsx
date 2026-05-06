'use client';

import { useState, useEffect, useMemo } from 'react';
import { Mail, Search, AlertCircle } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

interface MailLogEntry {
  id: string;
  to: string;
  subject: string | null;
  type: string | null;
  status: string;
  error: string | null;
  sentAt: string | null;
  createdAt: string;
  contact: { id: string; name: string; email: string | null } | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  sent: { label: 'Envoyé', color: '#22c55e' },
  failed: { label: 'Échoué', color: '#ef4444' },
  pending: { label: 'En attente', color: '#f59e0b' },
};

const FILTERS = [
  { key: 'all', label: 'Tous', color: 'var(--agency-accent)' },
  { key: 'sent', label: 'Envoyés', color: '#22c55e' },
  { key: 'failed', label: 'Échoués', color: '#ef4444' },
  { key: 'pending', label: 'En attente', color: '#f59e0b' },
];

export default function EmailsPage() {
  const { isMobile } = useAgencySidebar();
  const [emails, setEmails] = useState<MailLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/emails?limit=200')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setEmails(Array.isArray(data) ? data : []))
      .catch(() => setEmails([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return emails.filter((e) => {
      if (statusFilter !== 'all' && e.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return e.to.toLowerCase().includes(q) || (e.subject?.toLowerCase().includes(q) ?? false);
      }
      return true;
    });
  }, [emails, statusFilter, searchQuery]);

  const stats = useMemo(() => ([
    { label: 'Total envoyés', value: emails.filter((e) => e.status === 'sent').length, color: '#22c55e' },
    { label: 'Échecs', value: emails.filter((e) => e.status === 'failed').length, color: '#ef4444' },
    { label: 'En attente', value: emails.filter((e) => e.status === 'pending').length, color: '#f59e0b' },
  ]), [emails]);

  return (
    <div>
      <header style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
          Emails
        </h1>
        <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
          Historique des emails envoyés depuis le CRM agence — {emails.length} entrée{emails.length > 1 ? 's' : ''}
        </p>
      </header>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: 14, marginBottom: 24,
      }}>
        {stats.map((s) => (
          <div key={s.label} style={cardStyle()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--agency-ink-3)', fontWeight: 500 }}>{s.label}</span>
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: `${s.color}20`, color: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Mail size={16} />
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--agency-ink-1)', letterSpacing: '-0.02em' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 240px', minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--agency-ink-3)' }} />
          <input
            type="text"
            placeholder="Rechercher par email ou sujet…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ ...inputStyle(), paddingLeft: 32 }}
          />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              style={{
                padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: `1px solid ${statusFilter === f.key ? f.color : 'var(--agency-border)'}`,
                background: statusFilter === f.key ? `${f.color}20` : 'var(--agency-surface-2)',
                color: statusFilter === f.key ? f.color : 'var(--agency-ink-3)',
                transition: 'all 0.15s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ ...cardStyle(), padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: 60, textAlign: 'center', color: 'var(--agency-ink-3)', fontSize: 13 }}>
            Chargement…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: 60, textAlign: 'center' }}>
            <Mail size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 12 }} />
            <p style={{ color: 'var(--agency-ink-2)', fontSize: 14, fontWeight: 500, margin: 0, marginBottom: 4 }}>
              {emails.length === 0 ? 'Aucun email envoyé' : 'Aucun résultat'}
            </p>
            <p style={{ color: 'var(--agency-ink-3)', fontSize: 12, margin: 0 }}>
              {emails.length === 0
                ? 'Les emails envoyés depuis le CRM agence apparaîtront ici.'
                : 'Modifiez les filtres ou la recherche.'}
            </p>
          </div>
        ) : isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map((email) => (
              <MobileRow
                key={email.id}
                email={email}
                expanded={expandedId === email.id}
                onToggle={() => setExpandedId(expandedId === email.id ? null : email.id)}
              />
            ))}
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--agency-surface-2)' }}>
                {['Destinataire', 'Sujet', 'Type', 'Statut', 'Date'].map((h) => (
                  <th key={h} style={{
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
              {filtered.map((email) => (
                <DesktopRow
                  key={email.id}
                  email={email}
                  expanded={expandedId === email.id}
                  onToggle={() => setExpandedId(expandedId === email.id ? null : email.id)}
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

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: '#94a3b8' };
  return (
    <span style={{
      padding: '3px 10px', borderRadius: 12,
      fontSize: 10, fontWeight: 600,
      color: cfg.color, background: `${cfg.color}20`,
      whiteSpace: 'nowrap', display: 'inline-block',
    }}>
      {cfg.label}
    </span>
  );
}

function DesktopRow({ email, expanded, onToggle }: { email: MailLogEntry; expanded: boolean; onToggle: () => void }) {
  const clickable = email.status === 'failed' && email.error;
  return (
    <tr
      onClick={clickable ? onToggle : undefined}
      style={{
        borderTop: '1px solid var(--agency-border-soft)',
        cursor: clickable ? 'pointer' : 'default',
      }}
      onMouseOver={(e) => { e.currentTarget.style.background = 'var(--agency-surface-2)'; }}
      onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
    >
      <td style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--agency-ink-1)' }}>
          {email.contact?.name || email.to}
        </div>
        {email.contact?.name && (
          <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>
            {email.to}
          </div>
        )}
      </td>
      <td style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 12, color: 'var(--agency-ink-2)' }}>{email.subject || '—'}</div>
        {expanded && email.error && (
          <div style={{
            marginTop: 8, padding: '8px 12px', borderRadius: 6,
            background: 'var(--agency-danger-soft)', border: '1px solid rgba(248,113,113,0.2)',
            fontSize: 11, color: 'var(--agency-danger)', lineHeight: 1.5,
            display: 'flex', gap: 6, alignItems: 'flex-start',
          }}>
            <AlertCircle size={12} style={{ flexShrink: 0, marginTop: 1 }} />
            <span>{email.error}</span>
          </div>
        )}
      </td>
      <td style={{ padding: '12px 16px', fontSize: 12, color: 'var(--agency-ink-3)' }}>
        {email.type || '—'}
      </td>
      <td style={{ padding: '12px 16px' }}>
        <StatusBadge status={email.status} />
      </td>
      <td style={{ padding: '12px 16px', fontSize: 11, color: 'var(--agency-ink-3)', textAlign: 'right', whiteSpace: 'nowrap' }}>
        {new Date(email.sentAt || email.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
        })}
      </td>
    </tr>
  );
}

function MobileRow({ email, expanded, onToggle }: { email: MailLogEntry; expanded: boolean; onToggle: () => void }) {
  const clickable = email.status === 'failed' && email.error;
  return (
    <div
      onClick={clickable ? onToggle : undefined}
      style={{
        padding: '14px 16px',
        borderBottom: '1px solid var(--agency-border-soft)',
        cursor: clickable ? 'pointer' : 'default',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, gap: 8 }}>
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {email.contact?.name || email.to}
          </div>
          {email.contact?.name && (
            <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email.to}
            </div>
          )}
        </div>
        <StatusBadge status={email.status} />
      </div>
      <div style={{ fontSize: 12, color: 'var(--agency-ink-2)', marginBottom: 6, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {email.subject || '—'}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--agency-ink-3)' }}>{email.type || '—'}</span>
        <span style={{ fontSize: 10, color: 'var(--agency-ink-4)' }}>
          {new Date(email.sentAt || email.createdAt).toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
          })}
        </span>
      </div>
      {expanded && email.error && (
        <div style={{
          marginTop: 8, padding: '8px 12px', borderRadius: 6,
          background: 'var(--agency-danger-soft)', border: '1px solid rgba(248,113,113,0.2)',
          fontSize: 11, color: 'var(--agency-danger)', lineHeight: 1.5,
        }}>
          {email.error}
        </div>
      )}
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────

function cardStyle(): React.CSSProperties {
  return {
    background: 'var(--agency-surface-1)',
    border: '1px solid var(--agency-border)',
    borderRadius: 12,
    padding: 22,
  };
}
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
