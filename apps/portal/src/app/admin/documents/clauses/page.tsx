'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, Plus, Edit3, Trash2, Sparkles, FileText, ShieldCheck } from 'lucide-react';
import { inputStyle, labelStyle, primaryBtnStyle } from '../_components/styles';

interface Clause {
  id: string;
  category: string;
  title: string;
  body: string;
  defaultOrder: number;
  autoInclude: boolean;
  conditionKey: string | null;
  active: boolean;
}

const CATEGORIES = [
  'OBJET', 'DUREE', 'FINANCIER', 'PROPRIETE_INTELLECTUELLE', 'RGPD',
  'MAINTENANCE', 'CONFIDENTIALITE', 'RESILIATION', 'DROIT_APPLICABLE', 'AUTRE',
] as const;

const CATEGORY_LABEL: Record<string, string> = {
  OBJET: 'Objet', DUREE: 'Durée', FINANCIER: 'Conditions financières',
  PROPRIETE_INTELLECTUELLE: 'Propriété intellectuelle', RGPD: 'RGPD / Données',
  MAINTENANCE: 'Maintenance', CONFIDENTIALITE: 'Confidentialité',
  RESILIATION: 'Résiliation', DROIT_APPLICABLE: 'Droit applicable', AUTRE: 'Autre',
};

const CONDITIONS = [
  { value: '', label: 'Toujours' },
  { value: 'has_crm', label: 'Si CRM' },
  { value: 'is_refonte', label: 'Si refonte' },
  { value: 'is_maintenance', label: 'Si maintenance' },
];
const conditionLabel = (k: string | null) => CONDITIONS.find((c) => c.value === (k || ''))?.label || 'Toujours';

type Draft = {
  id?: string;
  category: string;
  title: string;
  body: string;
  defaultOrder: number;
  autoInclude: boolean;
  conditionKey: string;
  active: boolean;
};

const emptyDraft = (): Draft => ({
  category: 'AUTRE', title: '', body: '', defaultOrder: 100,
  autoInclude: true, conditionKey: '', active: true,
});

export default function ClausesLibraryPage() {
  const [clauses, setClauses] = useState<Clause[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [contacts, setContacts] = useState<{ id: string; name: string; companyName: string | null }[]>([]);
  const [dpaContact, setDpaContact] = useState('');
  const [modal, setModal] = useState<{ open: boolean; draft: Draft }>({ open: false, draft: emptyDraft() });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchClauses = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/contract-clauses');
      const data = await res.json();
      setClauses(Array.isArray(data) ? data : []);
    } catch { setClauses([]); }
  }, []);

  useEffect(() => { setLoading(true); fetchClauses().finally(() => setLoading(false)); }, [fetchClauses]);
  useEffect(() => {
    fetch('/api/admin/contacts').then((r) => (r.ok ? r.json() : [])).then((d) => setContacts(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const handleSeed = async () => {
    setSeeding(true);
    try {
      await fetch('/api/admin/contract-clauses/seed', { method: 'POST' });
      await fetchClauses();
    } finally { setSeeding(false); }
  };

  const openCreate = () => { setError(''); setModal({ open: true, draft: emptyDraft() }); };
  const openEdit = (c: Clause) => {
    setError('');
    setModal({ open: true, draft: { id: c.id, category: c.category, title: c.title, body: c.body, defaultOrder: c.defaultOrder, autoInclude: c.autoInclude, conditionKey: c.conditionKey || '', active: c.active } });
  };

  const save = async () => {
    const d = modal.draft;
    if (!d.title.trim() || !d.body.trim()) { setError('Titre et texte requis'); return; }
    setSaving(true); setError('');
    try {
      const payload = {
        category: d.category, title: d.title, body: d.body,
        defaultOrder: Number(d.defaultOrder) || 100,
        autoInclude: d.autoInclude, conditionKey: d.conditionKey || null, active: d.active,
      };
      const res = d.id
        ? await fetch(`/api/admin/contract-clauses/${d.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
        : await fetch('/api/admin/contract-clauses', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Erreur'); }
      setModal({ open: false, draft: emptyDraft() });
      await fetchClauses();
    } catch (e) { setError(e instanceof Error ? e.message : 'Erreur'); }
    finally { setSaving(false); }
  };

  const remove = async (c: Clause) => {
    if (!confirm(`Supprimer la clause « ${c.title} » ?`)) return;
    await fetch(`/api/admin/contract-clauses/${c.id}`, { method: 'DELETE' });
    fetchClauses();
  };

  const byCategory = CATEGORIES
    .map((cat) => ({ cat, items: clauses.filter((c) => c.category === cat) }))
    .filter((g) => g.items.length > 0);

  return (
    <div style={{ width: '100%' }}>
      <header style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href="/admin/documents" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: 8, color: 'var(--agency-ink-3)', textDecoration: 'none' }}>
          <ArrowLeft size={16} />
        </a>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>Bibliothèque de clauses</h1>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: 0, marginTop: 4 }}>Briques de texte réutilisées pour assembler les contrats.</p>
        </div>
        <button onClick={openCreate} style={primaryBtnStyle(false)}><Plus size={14} /> Nouvelle clause</button>
      </header>

      {/* Documents juridiques autonomes */}
      <div style={{ marginBottom: 22, padding: '16px 18px', border: '1px solid var(--agency-border)', borderRadius: 12, background: 'var(--agency-surface-1)' }}>
        <h2 style={{ fontSize: 13, fontWeight: 700, color: 'var(--agency-ink-1)', margin: '0 0 4px' }}>Documents juridiques</h2>
        <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: '0 0 12px' }}>Génère tes CGV (génériques) ou un DPA (par client) à télécharger / joindre.</p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <a href="/api/admin/legal-doc?kind=cgv" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500, border: '1px solid var(--agency-border)', background: 'transparent', color: 'var(--agency-ink-1)' }}>
            <FileText size={14} /> Télécharger les CGV
          </a>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <div>
              <label style={{ ...labelStyle(), display: 'block' }}>DPA pour un client</label>
              <select style={{ ...inputStyle(), minWidth: 220 }} value={dpaContact} onChange={(e) => setDpaContact(e.target.value)}>
                <option value="">— Choisir un client —</option>
                {contacts.map((c) => <option key={c.id} value={c.id}>{c.companyName || c.name}</option>)}
              </select>
            </div>
            <button
              type="button"
              disabled={!dpaContact}
              onClick={() => { if (dpaContact) window.open(`/api/admin/legal-doc?kind=dpa&contactId=${dpaContact}`, '_blank'); }}
              style={{ ...primaryBtnStyle(!dpaContact) }}
            >
              <ShieldCheck size={14} /> Générer le DPA
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: 60, textAlign: 'center', color: 'var(--agency-ink-3)', fontSize: 13 }}>Chargement…</div>
      ) : clauses.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', border: '1px dashed var(--agency-border)', borderRadius: 12 }}>
          <p style={{ fontSize: 14, color: 'var(--agency-ink-2)', margin: '0 0 6px' }}>Aucune clause pour le moment.</p>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', margin: '0 0 18px' }}>Démarre avec un jeu de clauses prêtes à l&apos;emploi (objet, paiement, propriété intellectuelle, RGPD, maintenance…).</p>
          <button onClick={handleSeed} disabled={seeding} style={primaryBtnStyle(seeding)}>
            <Sparkles size={14} /> {seeding ? 'Initialisation…' : 'Initialiser les clauses par défaut'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {byCategory.map(({ cat, items }) => (
            <section key={cat}>
              <h2 style={{ fontSize: 11, fontWeight: 700, color: 'var(--agency-ink-3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' }}>{CATEGORY_LABEL[cat]}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((c) => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', background: 'var(--agency-surface-1)', border: '1px solid var(--agency-border)', borderRadius: 10, opacity: c.active ? 1 : 0.5 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)' }}>{c.title}</span>
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#2F6BFF', background: '#2F6BFF18', padding: '1px 7px', borderRadius: 10 }}>{conditionLabel(c.conditionKey)}</span>
                        {!c.active && <span style={{ fontSize: 10, color: 'var(--agency-ink-4)' }}>(inactive)</span>}
                      </div>
                      <p style={{ fontSize: 11.5, color: 'var(--agency-ink-3)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.body}</p>
                    </div>
                    <div style={{ display: 'inline-flex', gap: 2, flexShrink: 0 }}>
                      <button onClick={() => openEdit(c)} title="Modifier" style={iconBtn()}><Edit3 size={13} /></button>
                      <button onClick={() => remove(c)} title="Supprimer" style={iconBtn('var(--agency-danger)')}><Trash2 size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {modal.open && (
        <div onClick={() => setModal({ open: false, draft: emptyDraft() })} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 50 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 640, maxHeight: '88vh', overflowY: 'auto', background: 'var(--agency-surface-1)', border: '1px solid var(--agency-border)', borderRadius: 12, padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--agency-ink-1)', margin: '0 0 16px' }}>{modal.draft.id ? 'Modifier la clause' : 'Nouvelle clause'}</h2>
            {error && <div style={{ marginBottom: 12, padding: 10, background: 'rgba(248,113,113,0.12)', border: '1px solid #f87171', borderRadius: 8, color: '#f87171', fontSize: 12 }}>{error}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
              <div>
                <label style={labelStyle()}>Catégorie</label>
                <select style={inputStyle()} value={modal.draft.category} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, category: e.target.value } }))}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle()}>Condition d&apos;inclusion</label>
                <select style={inputStyle()} value={modal.draft.conditionKey} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, conditionKey: e.target.value } }))}>
                  {CONDITIONS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle()}>Titre</label>
              <input style={inputStyle()} value={modal.draft.title} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, title: e.target.value } }))} placeholder="Ex. Propriété intellectuelle et cession des droits" />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label style={labelStyle()}>Texte de la clause <span style={{ fontWeight: 400, color: 'var(--agency-ink-4)' }}>(variables : {'{{montant_total}}'}, {'{{nom_client}}'}…)</span></label>
              <textarea style={{ ...inputStyle(), minHeight: 180, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }} value={modal.draft.body} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, body: e.target.value } }))} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20, alignItems: 'end' }}>
              <div>
                <label style={labelStyle()}>Ordre</label>
                <input type="number" style={inputStyle()} value={modal.draft.defaultOrder} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, defaultOrder: Number(e.target.value) } }))} />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--agency-ink-2)', cursor: 'pointer' }}>
                <input type="checkbox" checked={modal.draft.autoInclude} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, autoInclude: e.target.checked } }))} /> Incluse d&apos;office
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--agency-ink-2)', cursor: 'pointer' }}>
                <input type="checkbox" checked={modal.draft.active} onChange={(e) => setModal((m) => ({ ...m, draft: { ...m.draft, active: e.target.checked } }))} /> Active
              </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setModal({ open: false, draft: emptyDraft() })} style={{ padding: '9px 16px', borderRadius: 8, border: '1px solid var(--agency-border)', background: 'transparent', color: 'var(--agency-ink-2)', fontSize: 13, cursor: 'pointer' }}>Annuler</button>
              <button onClick={save} disabled={saving} style={primaryBtnStyle(saving)}>{saving ? 'Enregistrement…' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function iconBtn(color = 'var(--agency-ink-3)'): React.CSSProperties {
  return { width: 28, height: 28, borderRadius: 6, border: 'none', background: 'transparent', color, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };
}
