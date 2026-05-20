'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Trash2, AlertCircle } from 'lucide-react';
import { PageHeaderRibbon } from '@/components/admin/PageHeaderRibbon';

interface TrashedContact {
  id: string;
  name: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string;
  companyName: string | null;
  phone: string | null;
  deletedAt: string | null;
}

export default function ClientsCorbeillePage() {
  const [contacts, setContacts] = useState<TrashedContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [toast, setToast] = useState<{ kind: 'ok' | 'err'; msg: string } | null>(null);

  const fetchTrash = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/contacts?trash=1', { headers: { 'x-portal-super-admin': 'true' } });
      const data = await res.json();
      setContacts(Array.isArray(data) ? data : []);
    } catch {
      setContacts([]);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchTrash().finally(() => setLoading(false));
  }, [fetchTrash]);

  const showToast = (kind: 'ok' | 'err', msg: string) => {
    setToast({ kind, msg });
    window.setTimeout(() => setToast(null), 4000);
  };

  const handleRestore = async (c: TrashedContact) => {
    setBusy(c.id);
    try {
      const res = await fetch(`/api/admin/contacts/${c.id}/restore`, {
        method: 'POST',
        headers: { 'x-portal-super-admin': 'true' },
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Restauration impossible');
      showToast('ok', 'Contact restauré ✓');
      fetchTrash();
    } catch (e) {
      showToast('err', e instanceof Error ? e.message : 'Erreur');
    } finally {
      setBusy(null);
    }
  };

  const handlePermanentDelete = async (c: TrashedContact) => {
    const label = displayName(c);
    if (!confirm(`Supprimer DÉFINITIVEMENT "${label}" ? Cette action est irréversible.`)) return;
    setBusy(c.id);
    try {
      const res = await fetch(`/api/admin/contacts?id=${c.id}&permanent=1`, {
        method: 'DELETE',
        headers: { 'x-portal-super-admin': 'true' },
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Suppression impossible');
      showToast('ok', 'Contact supprimé définitivement');
      fetchTrash();
    } catch (e) {
      showToast('err', e instanceof Error ? e.message : 'Erreur');
    } finally {
      setBusy(null);
    }
  };

  return (
    <div>
      <PageHeaderRibbon label="Clients · Corbeille" />

      <div style={{ marginBottom: 16 }}>
        <Link href="/admin/clients" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={12} /> Retour aux clients
        </Link>
      </div>

      <header style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0 }}>
          {contacts.length} contact{contacts.length > 1 ? 's' : ''} dans la corbeille
        </p>
      </header>

      {loading ? (
        <div style={emptyBox()}><p>Chargement…</p></div>
      ) : contacts.length === 0 ? (
        <div style={emptyBox()}>
          <Trash2 size={28} style={{ color: 'var(--agency-ink-4)', marginBottom: 10 }} />
          <p style={{ fontSize: 14, fontWeight: 500, margin: 0 }}>Corbeille vide</p>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4 }}>
            Les contacts supprimés apparaîtront ici. Tu peux les restaurer ou les supprimer définitivement.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {contacts.map((c) => (
            <div
              key={c.id}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                padding: 14, background: 'var(--agency-surface-1)',
                border: '1px solid var(--agency-border)', borderRadius: 10,
                opacity: busy === c.id ? 0.5 : 1,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
                  {displayName(c)}
                </div>
                <div style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 2 }}>
                  {c.email}
                  {c.deletedAt && ` · supprimé le ${new Date(c.deletedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button onClick={() => handleRestore(c)} disabled={busy === c.id} style={restoreBtn()}>
                  <RotateCcw size={13} /> Restaurer
                </button>
                <button onClick={() => handlePermanentDelete(c)} disabled={busy === c.id} style={dangerBtn()} title="Supprimer définitivement">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 20, padding: 12, background: 'var(--agency-surface-2)', borderRadius: 8, border: '1px solid var(--agency-border)' }}>
        <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: 0, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <AlertCircle size={12} />
          La suppression définitive est bloquée si le contact a des devis/factures liés (préservation de l&apos;historique comptable).
        </p>
      </div>

      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed', top: 20, right: 20, zIndex: 1100,
            padding: '12px 16px',
            background: toast.kind === 'ok' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${toast.kind === 'ok' ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)'}`,
            borderRadius: 8, color: toast.kind === 'ok' ? '#86efac' : '#fca5a5',
            fontSize: 13, fontWeight: 600, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)',
          }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}

function displayName(c: TrashedContact): string {
  return c.companyName
    || `${c.firstName || ''} ${c.lastName || ''}`.trim()
    || c.name
    || c.email;
}

function emptyBox(): React.CSSProperties {
  return {
    padding: 50, textAlign: 'center' as const,
    background: 'var(--agency-surface-1)',
    border: '1px dashed var(--agency-border-strong)',
    borderRadius: 10, color: 'var(--agency-ink-2)',
  };
}
function restoreBtn(): React.CSSProperties {
  return {
    padding: '7px 12px', borderRadius: 8,
    border: '1px solid var(--agency-border)',
    background: 'var(--agency-surface-2)', color: 'var(--agency-ink-1)',
    fontSize: 12, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 5,
  };
}
function dangerBtn(): React.CSSProperties {
  return {
    width: 34, borderRadius: 8,
    border: '1px solid #ef444455',
    background: 'transparent', color: '#ef4444',
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}
