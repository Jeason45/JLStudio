'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Globe, Shield, Zap, Eye, CheckCircle, XCircle, AlertTriangle, Leaf, X, FileText, UserPlus, Trash2, Clock, Building2, ExternalLink, Loader2, StickyNote } from 'lucide-react';

// ─── Types ───

interface Session {
  id: string;
  type: string;
  query: string | null;
  createdAt: string;
  _count: { prospects: number };
  prospects?: Prospect[];
}

interface AuditData {
  url: string;
  analyzedAt: string;
  mobileScore: number | null;
  mobileAccessibility: number | null;
  mobileSEO: number | null;
  mobileBestPractices: number | null;
  desktopScore: number | null;
  mobileFCP: number | null;
  mobileLCP: number | null;
  mobileTBT: number | null;
  mobileCLS: number | null;
  mobileSI: number | null;
  mobilePerformanceAudits: Array<{ id: string; title: string; score: number | null; displayValue: string | null }>;
  mobileAccessibilityAudits: Array<{ id: string; title: string; score: number | null; displayValue: string | null }>;
  mobileSEOAudits: Array<{ id: string; title: string; score: number | null; displayValue: string | null }>;
  mobileBestPracticesAudits: Array<{ id: string; title: string; score: number | null; displayValue: string | null }>;
  totalByteWeight: number | null;
  totalRequestCount: number | null;
  heaviestResources: Array<{ url: string; size: number }>;
  mobileScreenshot: string | null;
  isHttps: boolean;
  isResponsive: boolean;
  cmsDetected: string | null;
  estimatedAge: number | null;
  loadTimeMs: number | null;
  hasAnalytics: boolean;
  hasFavicon: boolean;
  hasMetaDescription: boolean;
  hasOpenGraph: boolean;
  hasSitemap: boolean;
  hasRobotsTxt: boolean;
  usesJquery: boolean;
  usesFlash: boolean;
  hasObsoleteTags: boolean;
  usesModernImages: boolean;
  internalLinkCount: number;
  ssl: { isValid: boolean; issuer: string | null; protocol: string | null; daysUntilExpiry: number | null; isExpiringSoon: boolean } | null;
  securityHeaders: { score: number; total: number; strictTransportSecurity: boolean; contentSecurityPolicy: boolean; xFrameOptions: boolean; xContentTypeOptions: boolean; referrerPolicy: boolean; permissionsPolicy: boolean } | null;
  observatoryGrade: string | null;
  carbon: { co2PerView: number | null; rating: string | null; isGreen: boolean; cleanerThan: number | null } | null;
  w3cErrors: number;
  w3cWarnings: number;
  w3cTopErrors: string[];
  yellowLabScore: number | null;
  yellowLabTopIssues: string[];
  socialPresence: { links: Record<string, string | null>; count: number };
  primaryEmail: string | null;
  emailConfidence: string;
  emails: string[];
}

interface Prospect {
  id: string;
  sessionId: string;
  contactId: string | null;
  name: string;
  siret: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
  dateCreation: string | null;
  nafLabel: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  category: string;
  auditData: AuditData | null;
  auditScore: number | null;
  auditedAt: string | null;
  addedToCRM: boolean;
  notes: string | null;
  claudeAnalysis: string | null;
  presentationData: string | null;
  createdAt: string;
}

// ─── Helpers ───

function scoreColor(score: number | null): string {
  if (score === null) return 'var(--text-tertiary)';
  if (score >= 90) return '#22c55e';
  if (score >= 50) return '#f59e0b';
  return '#ef4444';
}

function scoreBg(score: number | null): string {
  if (score === null) return 'var(--bg-secondary)';
  if (score >= 90) return 'rgba(34,197,94,0.1)';
  if (score >= 50) return 'rgba(245,158,11,0.1)';
  return 'rgba(239,68,68,0.1)';
}

function formatMs(ms: number | null): string {
  if (ms === null) return '—';
  return ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(1)}s`;
}

function formatBytes(bytes: number | null): string {
  if (bytes === null) return '—';
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function ScoreCircle({ score, label, size = 70 }: { score: number | null; label: string; size?: number }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: scoreBg(score),
        border: `3px solid ${scoreColor(score)}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 6px',
      }}>
        <span style={{ fontSize: size * 0.35, fontWeight: 700, color: scoreColor(score) }}>{score ?? '—'}</span>
      </div>
      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 0', fontSize: '12px' }}>
      {ok ? <CheckCircle size={14} color="#22c55e" /> : <XCircle size={14} color="#ef4444" />}
      <span style={{ color: 'var(--text-primary)' }}>{label}</span>
    </div>
  );
}

// ─── Styles ───

const cardStyle: React.CSSProperties = {
  background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
  padding: '16px', boxShadow: 'var(--shadow-card)',
};

const inputStyle: React.CSSProperties = {
  padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
  background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)',
  outline: 'none',
};

const btnPrimary: React.CSSProperties = {
  padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
  background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: '13px',
};

const btnSecondary: React.CSSProperties = {
  padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)',
  background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 500, fontSize: '12px',
  cursor: 'pointer',
};

// ─── Main Page ───

export default function ProspectionPage() {
  // Sessions
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  // Search form
  const [searchMetier, setSearchMetier] = useState('');
  const [searchVille, setSearchVille] = useState('');
  const [searching, setSearching] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

  // Audit URL form
  const [auditUrl, setAuditUrl] = useState('');
  const [auditing, setAuditing] = useState(false);

  // Filters + Sort
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('score');

  // Detail panel
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);

  // Inline audit loading
  const [auditingId, setAuditingId] = useState<string | null>(null);

  // Notes editing
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesText, setNotesText] = useState('');
  const [claudeText, setClaudeText] = useState('');
  const [presentationText, setPresentationText] = useState('');

  // Error
  const [error, setError] = useState('');

  // ─── Load sessions ───

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/portal/prospection/sessions');
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch {} finally {
      setLoadingSessions(false);
    }
  }, []);

  useEffect(() => { loadSessions(); }, [loadSessions]);

  // ─── Load session detail ───

  const loadSessionDetail = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/portal/prospection/sessions/${sessionId}?filter=${filter}&sort=${sort}`);
      if (res.ok) {
        const data = await res.json();
        setActiveSession(data);
        setProspects(data.prospects || []);
      }
    } catch {}
  }, [filter, sort]);

  // Reload when filter/sort changes
  useEffect(() => {
    if (activeSession?.id) loadSessionDetail(activeSession.id);
  }, [filter, sort]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Search ───

  const handleSearch = useCallback(async () => {
    if (!searchMetier || !searchVille) return;
    setSearching(true);
    setError('');
    setSelectedProspect(null);
    try {
      const res = await fetch('/api/portal/prospection/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'search', metier: searchMetier, ville: searchVille }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Erreur'); return; }
      setActiveSession(data);
      setProspects(data.prospects || []);
      loadSessions(); // Refresh sidebar
    } catch { setError('Erreur de connexion'); } finally { setSearching(false); }
  }, [searchMetier, searchVille, loadSessions]);

  // ─── Audit URL ───

  const handleAuditUrl = useCallback(async () => {
    if (!auditUrl) return;
    setAuditing(true);
    setError('');
    setSelectedProspect(null);
    try {
      const res = await fetch('/api/portal/prospection/sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'audit', url: auditUrl }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Erreur'); return; }
      setActiveSession(data);
      setProspects(data.prospects || []);
      if (data.prospects?.[0]) setSelectedProspect(data.prospects[0]);
      loadSessions();
    } catch { setError('Erreur de connexion'); } finally { setAuditing(false); }
  }, [auditUrl, loadSessions]);

  // ─── Audit single prospect ───

  const handleAuditProspect = useCallback(async (prospect: Prospect) => {
    if (!activeSession || !prospect.website) return;
    setAuditingId(prospect.id);
    try {
      const res = await fetch(`/api/portal/prospection/sessions/${activeSession.id}/prospects/${prospect.id}/audit`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok) {
        setProspects(prev => prev.map(p => p.id === prospect.id ? data : p));
        setSelectedProspect(data);
      }
    } catch {} finally { setAuditingId(null); }
  }, [activeSession]);

  // ─── Add to CRM ───

  const handleAddCRM = useCallback(async (prospect: Prospect) => {
    if (!activeSession) return;
    try {
      const res = await fetch(`/api/portal/prospection/sessions/${activeSession.id}/prospects/${prospect.id}/crm`, {
        method: 'POST',
      });
      if (res.ok) {
        setProspects(prev => prev.map(p => p.id === prospect.id ? { ...p, addedToCRM: true } : p));
        if (selectedProspect?.id === prospect.id) setSelectedProspect({ ...prospect, addedToCRM: true });
      }
    } catch {}
  }, [activeSession, selectedProspect]);

  // ─── Save notes ───

  const handleSaveNotes = useCallback(async (prospect: Prospect) => {
    if (!activeSession) return;
    try {
      const res = await fetch(`/api/portal/prospection/sessions/${activeSession.id}/prospects/${prospect.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesText }),
      });
      if (res.ok) {
        const data = await res.json();
        setProspects(prev => prev.map(p => p.id === prospect.id ? data : p));
        setEditingNotes(null);
      }
    } catch {}
  }, [activeSession, notesText]);

  // ─── Delete prospect ───

  const handleDeleteProspect = useCallback(async (prospect: Prospect) => {
    if (!activeSession) return;
    try {
      const res = await fetch(`/api/portal/prospection/sessions/${activeSession.id}/prospects/${prospect.id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setProspects(prev => prev.filter(p => p.id !== prospect.id));
        if (selectedProspect?.id === prospect.id) setSelectedProspect(null);
      }
    } catch {}
  }, [activeSession, selectedProspect]);

  // ─── Delete session ───

  const handleDeleteSession = useCallback(async (sessionId: string) => {
    try {
      const res = await fetch(`/api/portal/prospection/sessions/${sessionId}`, { method: 'DELETE' });
      if (res.ok) {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        if (activeSession?.id === sessionId) {
          setActiveSession(null);
          setProspects([]);
          setSelectedProspect(null);
        }
      }
    } catch {}
  }, [activeSession]);

  // ─── Bulk actions ───

  const handleAuditAll = useCallback(async () => {
    const toAudit = prospects.filter(p => p.website && !p.auditedAt);
    for (const p of toAudit) {
      await handleAuditProspect(p);
    }
  }, [prospects, handleAuditProspect]);

  const handleAllToCRM = useCallback(async () => {
    const toAdd = prospects.filter(p => !p.addedToCRM);
    for (const p of toAdd) {
      await handleAddCRM(p);
    }
  }, [prospects, handleAddCRM]);

  // ─── Client filter (for instant UX) ───

  const filteredProspects = prospects; // Server-side filtered already, but we keep the array as-is

  // ─── Stats ───

  const stats = activeSession ? {
    total: prospects.length,
    withSite: prospects.filter(p => p.website).length,
    withoutSite: prospects.filter(p => !p.website).length,
    audited: prospects.filter(p => p.auditedAt).length,
  } : null;

  // ─── Render ───

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Search size={20} color="var(--accent)" />
          </div>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Prospection</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>Recherche, audit et gestion de prospects</p>
          </div>
        </div>

        {/* History dropdown */}
        {sessions.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={14} color="var(--text-tertiary)" />
            <select
              value={activeSession?.id || ''}
              onChange={(e) => {
                const sid = e.target.value;
                if (sid) {
                  loadSessionDetail(sid);
                  setSelectedProspect(null);
                }
              }}
              style={{
                ...inputStyle, padding: '6px 10px', fontSize: '12px', minWidth: '220px',
              }}
            >
              <option value="">-- Historique des sessions --</option>
              {sessions.map(s => (
                <option key={s.id} value={s.id}>
                  {s.type === 'search' ? s.query : s.query} ({s._count.prospects} prospects) — {new Date(s.createdAt).toLocaleDateString('fr-FR')}
                </option>
              ))}
            </select>
            {activeSession && (
              <button onClick={() => handleDeleteSession(activeSession.id)} style={{ ...btnSecondary, padding: '6px 8px', color: 'var(--danger)' }} title="Supprimer la session">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search zone */}
      <div style={{ ...cardStyle, marginBottom: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Search businesses */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={14} /> Rechercher des entreprises
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                placeholder="Metier (coiffeur, plombier...)"
                value={searchMetier}
                onChange={(e) => setSearchMetier(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{ ...inputStyle, flex: 1 }}
              />
              <input
                placeholder="Ville"
                value={searchVille}
                onChange={(e) => setSearchVille(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                onClick={handleSearch}
                disabled={searching || !searchMetier || !searchVille}
                style={{ ...btnPrimary, opacity: searching || !searchMetier || !searchVille ? 0.5 : 1, whiteSpace: 'nowrap' }}
              >
                {searching ? 'Recherche...' : 'Rechercher'}
              </button>
            </div>
            {searching && <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>Recherche SIRENE + detection de sites web (30-60s)...</div>}
          </div>

          {/* Audit URL */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Globe size={14} /> Auditer un site
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                placeholder="URL du site (ex: restaurant-bordeaux.fr)"
                value={auditUrl}
                onChange={(e) => setAuditUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuditUrl()}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                onClick={handleAuditUrl}
                disabled={auditing || !auditUrl}
                style={{ ...btnPrimary, opacity: auditing || !auditUrl ? 0.5 : 1, whiteSpace: 'nowrap' }}
              >
                {auditing ? 'Analyse...' : 'Auditer'}
              </button>
            </div>
            {auditing && <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '6px' }}>Audit complet en cours (30-60s)...</div>}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '13px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {/* Stats cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
          {[
            { label: 'Total', value: stats.total, color: 'var(--accent)' },
            { label: 'Avec site', value: stats.withSite, color: '#22c55e' },
            { label: 'Sans site', value: stats.withoutSite, color: '#f59e0b' },
            { label: 'Audites', value: stats.audited, color: '#8b5cf6' },
          ].map(s => (
            <div key={s.label} style={{ ...cardStyle, padding: '12px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filter pills + Sort */}
      {activeSession && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { key: 'all', label: 'Tous' },
              { key: 'withSite', label: 'Avec site' },
              { key: 'withoutSite', label: 'Sans site' },
              { key: 'audited', label: 'Audites' },
              { key: 'inCRM', label: 'Dans CRM' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: 500,
                  border: filter === f.key ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: filter === f.key ? 'var(--accent-light)' : 'var(--bg-card)',
                  color: filter === f.key ? 'var(--accent)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ ...inputStyle, padding: '6px 10px', fontSize: '12px' }}
          >
            <option value="score">Tri: Score</option>
            <option value="name">Tri: Nom</option>
            <option value="date">Tri: Date</option>
          </select>
        </div>
      )}

      {/* Main content: prospect list + detail panel */}
      {activeSession && (
        <div style={{ display: 'grid', gridTemplateColumns: selectedProspect ? '60% 40%' : '1fr', gap: '16px', alignItems: 'start' }}>
          {/* Prospect list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: 'calc(100vh - 380px)', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredProspects.length === 0 && (
              <div style={{ ...cardStyle, textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)' }}>
                Aucun prospect pour ce filtre
              </div>
            )}
            {filteredProspects.map(p => (
              <ProspectCard
                key={p.id}
                prospect={p}
                isSelected={selectedProspect?.id === p.id}
                isAuditing={auditingId === p.id}
                isEditingNotes={editingNotes === p.id}
                notesText={notesText}
                onSelect={() => setSelectedProspect(p)}
                onAudit={() => handleAuditProspect(p)}
                onAddCRM={() => handleAddCRM(p)}
                onDelete={() => handleDeleteProspect(p)}
                onStartNotes={() => { setEditingNotes(p.id); setNotesText(p.notes || ''); }}
                onSaveNotes={() => handleSaveNotes(p)}
                onCancelNotes={() => setEditingNotes(null)}
                onNotesChange={setNotesText}
              />
            ))}
          </div>

          {/* Detail panel */}
          {selectedProspect && (
            <DetailPanel
              prospect={selectedProspect}
              onClose={() => setSelectedProspect(null)}
              onAudit={() => handleAuditProspect(selectedProspect)}
              onAddCRM={() => handleAddCRM(selectedProspect)}
              isAuditing={auditingId === selectedProspect.id}
            />
          )}
        </div>
      )}

      {/* Action bar */}
      {activeSession && prospects.length > 0 && (
        <div style={{
          display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px', padding: '16px',
          ...cardStyle,
        }}>
          <button
            onClick={handleAuditAll}
            disabled={!!auditingId || !prospects.some(p => p.website && !p.auditedAt)}
            style={{
              ...btnPrimary,
              opacity: !!auditingId || !prospects.some(p => p.website && !p.auditedAt) ? 0.5 : 1,
            }}
          >
            Auditer tous les sites
          </button>
          <button
            onClick={handleAllToCRM}
            disabled={!prospects.some(p => !p.addedToCRM)}
            style={{
              ...btnSecondary,
              opacity: !prospects.some(p => !p.addedToCRM) ? 0.5 : 1,
            }}
          >
            <UserPlus size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Tout ajouter au CRM
          </button>
          {activeSession?.type === 'search' && (
            <button
              onClick={async () => {
                if (!activeSession) return;
                setLoadingMore(true);
                const nextPage = searchPage + 1;
                const existingSirens = prospects.map(p => p.siret).filter(Boolean) as string[];
                const query = activeSession.query || '';
                const [metier, ...villeParts] = query.split(' ');
                const ville = villeParts.join(' ');
                try {
                  const res = await fetch('/api/portal/prospection/sessions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      type: 'search', metier, ville,
                      excludeSirens: existingSirens,
                      page: nextPage,
                      sessionId: activeSession.id,
                    }),
                  });
                  if (res.ok) {
                    const data = await res.json();
                    setProspects(data.prospects || []);
                    setSearchPage(nextPage);
                  }
                } catch {}
                setLoadingMore(false);
              }}
              disabled={loadingMore}
              style={{
                ...btnSecondary,
                opacity: loadingMore ? 0.5 : 1,
              }}
            >
              {loadingMore ? 'Chargement...' : `Charger plus (+50)`}
            </button>
          )}
        </div>
      )}

      {/* Empty state */}
      {!activeSession && !loadingSessions && sessions.length === 0 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '60px 20px', marginTop: '20px' }}>
          <Search size={48} color="var(--text-tertiary)" style={{ marginBottom: '16px' }} />
          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Commencez votre prospection
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', maxWidth: '400px', margin: '0 auto' }}>
            Recherchez des entreprises par metier et ville, ou auditez directement un site web pour generer un rapport complet.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Prospect Card ───

function ProspectCard({
  prospect: p, isSelected, isAuditing, isEditingNotes, notesText,
  onSelect, onAudit, onAddCRM, onDelete, onStartNotes, onSaveNotes, onCancelNotes, onNotesChange,
}: {
  prospect: Prospect;
  isSelected: boolean;
  isAuditing: boolean;
  isEditingNotes: boolean;
  notesText: string;
  onSelect: () => void;
  onAudit: () => void;
  onAddCRM: () => void;
  onDelete: () => void;
  onStartNotes: () => void;
  onSaveNotes: () => void;
  onCancelNotes: () => void;
  onNotesChange: (v: string) => void;
}) {
  const audit = p.auditData;

  // Top 3 problems from audit
  const topProblems: string[] = [];
  if (audit) {
    const allAudits = [
      ...(audit.mobilePerformanceAudits || []),
      ...(audit.mobileAccessibilityAudits || []),
      ...(audit.mobileSEOAudits || []),
      ...(audit.mobileBestPracticesAudits || []),
    ].filter(a => a.score !== null && a.score < 0.5).slice(0, 3);
    topProblems.push(...allAudits.map(a => a.title));
  }

  return (
    <div
      onClick={onSelect}
      style={{
        ...cardStyle,
        cursor: 'pointer',
        border: isSelected ? '1px solid var(--accent)' : '1px solid var(--border)',
        position: 'relative',
        transition: 'border-color 0.15s',
      }}
    >
      {/* Audit spinner overlay */}
      {isAuditing && (
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-card)', padding: '12px 20px', borderRadius: '8px' }}>
            <Loader2 size={16} color="var(--accent)" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>Audit en cours...</span>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* Row 1: Name + score/category badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</span>
          {p.auditScore !== null ? (
            <span style={{
              width: '24px', height: '24px', borderRadius: '50%',
              background: scoreBg(p.auditScore), border: `2px solid ${scoreColor(p.auditScore)}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10px', fontWeight: 700, color: scoreColor(p.auditScore),
            }}>{p.auditScore}</span>
          ) : p.category === 'creation' || p.category === 'platform' || p.category === 'directory' ? (
            <span style={{
              padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 600,
              background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
            }}>{p.category === 'platform' ? 'PLATEFORME' : p.category === 'directory' ? 'ANNUAIRE' : 'CREATION'}</span>
          ) : null}
          {p.addedToCRM && (
            <span style={{
              padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 600,
              background: 'rgba(34,197,94,0.1)', color: '#22c55e',
            }}>Dans le CRM</span>
          )}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(); }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'var(--text-tertiary)' }}>
          <Trash2 size={14} />
        </button>
      </div>

      {/* Row 2: Info */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
        {p.city && <span>{p.city}{p.postalCode ? ` (${p.postalCode})` : ''}</span>}
        {p.siret && <span>SIRET: {p.siret}</span>}
        {p.dateCreation && <span>Cree: {p.dateCreation}</span>}
        {p.nafLabel && <span>{p.nafLabel}</span>}
      </div>

      {/* Row 3: Website + email */}
      <div style={{ display: 'flex', gap: '12px', fontSize: '12px', marginBottom: '6px' }}>
        {p.website ? (
          <a href={p.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ExternalLink size={12} /> {new URL(p.website).hostname}
          </a>
        ) : (
          <span style={{ color: 'var(--text-tertiary)' }}>Pas de site</span>
        )}
        {p.email && (
          <a href={`mailto:${p.email}`} onClick={(e) => e.stopPropagation()} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{p.email}</a>
        )}
      </div>

      {/* Row 4: Mini scores (if audited) */}
      {p.auditedAt && audit && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
          {[
            { label: 'Perf', score: audit.mobileScore },
            { label: 'A11y', score: audit.mobileAccessibility },
            { label: 'SEO', score: audit.mobileSEO },
            { label: 'BP', score: audit.mobileBestPractices },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: scoreColor(s.score) }} />
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.label}: {s.score ?? '—'}</span>
            </div>
          ))}
        </div>
      )}

      {/* Row 5: Top problems */}
      {topProblems.length > 0 && (
        <div style={{ marginBottom: '6px' }}>
          {topProblems.map((prob, i) => (
            <div key={i} style={{ fontSize: '11px', color: '#ef4444', padding: '1px 0' }}>
              <AlertTriangle size={10} style={{ verticalAlign: 'middle', marginRight: '4px' }} />{prob}
            </div>
          ))}
        </div>
      )}

      {/* Notes display */}
      {p.notes && !isEditingNotes && (
        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontStyle: 'italic', marginBottom: '6px', padding: '4px 8px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
          {p.notes}
        </div>
      )}

      {/* Notes editor */}
      {isEditingNotes && (
        <div style={{ marginBottom: '6px' }} onClick={(e) => e.stopPropagation()}>
          <textarea
            value={notesText}
            onChange={(e) => onNotesChange(e.target.value)}
            placeholder="Notes..."
            style={{ ...inputStyle, width: '100%', minHeight: '60px', resize: 'vertical', fontSize: '12px' }}
          />
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
            <button onClick={onSaveNotes} style={{ ...btnPrimary, padding: '4px 12px', fontSize: '11px' }}>Sauvegarder</button>
            <button onClick={onCancelNotes} style={{ ...btnSecondary, padding: '4px 12px', fontSize: '11px' }}>Annuler</button>
          </div>
        </div>
      )}

      {/* Buttons row */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }} onClick={(e) => e.stopPropagation()}>
        {p.website && !p.auditedAt && (
          <button onClick={onAudit} disabled={isAuditing} style={{ ...btnSecondary, fontSize: '11px', padding: '4px 10px' }}>
            <Zap size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Auditer
          </button>
        )}
        {!p.addedToCRM && (
          <button onClick={onAddCRM} style={{ ...btnSecondary, fontSize: '11px', padding: '4px 10px' }}>
            <UserPlus size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />CRM
          </button>
        )}
        <button onClick={onStartNotes} style={{ ...btnSecondary, fontSize: '11px', padding: '4px 10px' }}>
          <StickyNote size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Notes
        </button>
      </div>
    </div>
  );
}

// ─── Detail Panel ───

function DetailPanel({
  prospect, onClose, onAudit, onAddCRM, isAuditing,
}: {
  prospect: Prospect;
  onClose: () => void;
  onAudit: () => void;
  onAddCRM: () => void;
  isAuditing: boolean;
}) {
  const audit = prospect.auditData;

  const panelCardStyle: React.CSSProperties = {
    background: 'var(--bg-card)', borderRadius: '10px', border: '1px solid var(--border)',
    padding: '14px', marginBottom: '12px',
  };

  return (
    <div style={{
      ...cardStyle,
      maxHeight: 'calc(100vh - 380px)', overflowY: 'auto', position: 'sticky', top: '80px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{prospect.name}</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
          <X size={18} />
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {prospect.website && !prospect.auditedAt && (
          <button onClick={onAudit} disabled={isAuditing} style={{ ...btnPrimary, fontSize: '12px', padding: '8px 14px' }}>
            {isAuditing ? 'Audit en cours...' : 'Lancer l\'audit'}
          </button>
        )}
        {!prospect.addedToCRM && (
          <button onClick={onAddCRM} style={{ ...btnSecondary, fontSize: '12px' }}>
            <UserPlus size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Ajouter au CRM
          </button>
        )}
        {prospect.addedToCRM && (
          <span style={{ padding: '6px 14px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', color: '#22c55e', fontSize: '12px', fontWeight: 600 }}>
            <CheckCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Dans le CRM
          </span>
        )}
      </div>

      {/* Basic info */}
      <div style={panelCardStyle}>
        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px' }}>
          {prospect.city && <div><strong>Ville:</strong> {prospect.city} {prospect.postalCode ? `(${prospect.postalCode})` : ''}</div>}
          {prospect.siret && <div><strong>SIRET:</strong> {prospect.siret}</div>}
          {prospect.dateCreation && <div><strong>Creation:</strong> {prospect.dateCreation}</div>}
          {prospect.nafLabel && <div><strong>NAF:</strong> {prospect.nafLabel}</div>}
          {prospect.website && <div><strong>Site:</strong> <a href={prospect.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>{prospect.website}</a></div>}
          {prospect.email && <div><strong>Email:</strong> <a href={`mailto:${prospect.email}`} style={{ color: 'var(--accent)' }}>{prospect.email}</a></div>}
          <div><strong>Categorie:</strong> {
            prospect.category === 'creation' ? 'Creation de site' :
            prospect.category === 'platform' ? 'Sur plateforme (Planity, Fresha...)' :
            prospect.category === 'directory' ? 'Presente sur annuaire uniquement' :
            'Refonte de site'
          }</div>
        </div>
      </div>

      {/* Full audit display */}
      {audit && (
        <>
          {/* Score circles */}
          <div style={panelCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '12px' }}>
              <ScoreCircle score={audit.mobileScore} label="Performance" />
              <ScoreCircle score={audit.mobileAccessibility} label="Accessibilite" />
              <ScoreCircle score={audit.mobileSEO} label="SEO" />
              <ScoreCircle score={audit.mobileBestPractices} label="Bonnes pratiques" />
            </div>
            {audit.desktopScore !== null && (
              <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Desktop: <strong style={{ color: scoreColor(audit.desktopScore) }}>{audit.desktopScore}</strong>
              </div>
            )}
          </div>

          {/* Core Web Vitals */}
          <div style={panelCardStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
              <Zap size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Core Web Vitals (Mobile)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
              {[
                { label: 'FCP', value: formatMs(audit.mobileFCP), good: (audit.mobileFCP ?? 9999) < 1800 },
                { label: 'LCP', value: formatMs(audit.mobileLCP), good: (audit.mobileLCP ?? 9999) < 2500 },
                { label: 'TBT', value: formatMs(audit.mobileTBT), good: (audit.mobileTBT ?? 9999) < 200 },
                { label: 'CLS', value: audit.mobileCLS?.toFixed(3) ?? '—', good: (audit.mobileCLS ?? 1) < 0.1 },
                { label: 'SI', value: formatMs(audit.mobileSI), good: (audit.mobileSI ?? 9999) < 3400 },
              ].map(v => (
                <div key={v.label} style={{ textAlign: 'center', padding: '8px', borderRadius: '6px', background: v.good ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: v.good ? '#22c55e' : '#ef4444' }}>{v.value}</div>
                  <div style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>{v.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          {prospect.website && (
            <div style={panelCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  <Eye size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Captures du site
                </h3>
                <button
                  onClick={async () => {
                    const slug = prospect.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                    const urls = [
                      { name: `${slug}_desktop-complet`, url: `https://image.thum.io/get/width/1280/fullpage/${prospect.website}` },
                      { name: `${slug}_desktop-haut`, url: `https://image.thum.io/get/width/1280/${prospect.website}` },
                      { name: `${slug}_mobile-complet`, url: `https://image.thum.io/get/width/375/fullpage/${prospect.website}` },
                      { name: `${slug}_mobile-haut`, url: `https://image.thum.io/get/width/375/${prospect.website}` },
                    ];
                    for (const { name, url } of urls) {
                      try {
                        const res = await fetch(url);
                        const blob = await res.blob();
                        const blobUrl = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = blobUrl;
                        a.download = `${name}.png`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(blobUrl);
                        await new Promise(r => setTimeout(r, 500));
                      } catch { /* skip failed downloads */ }
                    }
                  }}
                  style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 500,
                    background: 'var(--bg-secondary)', color: 'var(--accent)', border: '1px solid var(--border)',
                    cursor: 'pointer',
                  }}
                >
                  Telecharger les 4 screenshots
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '10px' }}>
                {audit.mobileScreenshot && (
                  <div>
                    <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginBottom: '3px', textAlign: 'center' }}>Mobile (PageSpeed)</div>
                    <img src={audit.mobileScreenshot} alt="Mobile fold" style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} />
                  </div>
                )}
                <div>
                  <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginBottom: '3px', textAlign: 'center' }}>Desktop (haut)</div>
                  <img src={`https://image.thum.io/get/width/800/${prospect.website}`} alt="Desktop fold" style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border)' }} loading="lazy" />
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginBottom: '3px', textAlign: 'center' }}>Mobile (complet)</div>
                  <img src={`https://image.thum.io/get/width/375/fullpage/${prospect.website}`} alt="Mobile full" style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border)', maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
                </div>
                <div>
                  <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginBottom: '3px', textAlign: 'center' }}>Desktop (complet)</div>
                  <img src={`https://image.thum.io/get/width/800/fullpage/${prospect.website}`} alt="Desktop full" style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border)', maxHeight: '200px', objectFit: 'cover', objectPosition: 'top' }} loading="lazy" />
                </div>
              </div>

              {/* Claude analysis button */}
              <button
                onClick={() => {
                  const prompt = `Tu es un expert senior en design web, UX, strategie digitale et conversion. Tu regardes en ce moment le site web d'un prospect que je souhaite demarcher pour lui proposer une refonte.

CONSIGNES IMPORTANTES :
- Tu VOIS cette page web en direct. Scroll la page ENTIEREMENT de haut en bas avant de repondre.
- Regarde chaque section, chaque image, chaque bouton, chaque texte.
- Reduis la taille de la fenetre pour simuler un affichage mobile et analyse le responsive.
- Clique sur les liens du menu pour verifier si les autres pages sont coherentes.
- Verifie si le formulaire de contact fonctionne.
- Cherche les mentions legales et la politique de confidentialite.

INFORMATIONS SUR LE PROSPECT :
- Entreprise : ${prospect.name}
- Ville : ${prospect.city || ''}
- Secteur : ${prospect.nafLabel || 'commerce local'}
- SIRET : ${prospect.siret || 'inconnu'}
- Site analyse : ${prospect.website}

Fournis une analyse EXHAUSTIVE et IMPITOYABLE au format suivant. Chaque probleme doit etre explique en termes d'IMPACT BUSINESS (perte de clients, perte de chiffre d'affaires), pas en jargon technique.

## 1. SCORE GLOBAL (/100)
Note globale avec justification en une phrase percutante.

## 2. PREMIERE IMPRESSION (test des 3 secondes)
Mets-toi a la place d'un client qui arrive pour la premiere fois :
- Que voit-il en premier ? Est-ce engageant ?
- Comprend-il immediatement ce que propose cette entreprise ?
- Y a-t-il un appel a l'action clair (reserver, appeler, acheter) ?
- Le site inspire-t-il confiance ou donne-t-il envie de partir ?
- Le design fait-il 2026, 2020 ou 2015 ? Quelle impression d'epoque ?
- Compare avec ce qu'un client attendrait d'un(e) ${prospect.nafLabel || 'commerce'} en 2026.

## 3. IDENTITE VISUELLE & BRANDING
Analyse CHAQUE element visuel que tu vois :
- Logo : qualite, taille, placement. Est-il professionnel ou fait maison ?
- Couleurs : combien de couleurs differentes ? Sont-elles harmonieuses ? Y a-t-il une charte graphique ?
- Typographie : les polices sont-elles lisibles ? Coherentes ? Combien de polices differentes ?
- Photos/Images : sont-elles de qualite pro ou amateur ? Libres de droits generiques ou originales ?
- Icones et elements graphiques : coherents entre eux ?
- Y a-t-il une identite de marque reconnaissable ou c'est un site generique ?

## 4. NAVIGATION & STRUCTURE
Navigue sur le site et analyse :
- Le menu est-il clair ? Combien d'elements ? Sont-ils bien nommes ?
- La hierarchie des informations est-elle logique ?
- Le footer contient-il des informations utiles (contact, horaires, liens) ?
- Les pages internes sont-elles coherentes avec la page d'accueil ?
- Y a-t-il des liens casses ou des pages vides ?
- Le fil d'Ariane est-il present ?

## 5. EXPERIENCE MOBILE (CRITIQUE)
Reduis la fenetre pour simuler un mobile et analyse :
- Le site est-il VRAIMENT responsive ou juste "pas completement casse" ?
- Les boutons et liens sont-ils assez grands pour etre cliques au doigt ?
- Le texte est-il lisible sans zoomer ?
- Le menu fonctionne-t-il correctement sur mobile ?
- Les images s'adaptent-elles ?
- Le numero de telephone est-il cliquable (click-to-call) ?
- Pour un ${prospect.nafLabel || 'commerce local'}, 70%+ des clients cherchent sur mobile.

## 6. CONTENU & COPYWRITING
- Les textes sont-ils ecrits pour CONVAINCRE ou juste pour remplir ?
- Y a-t-il des fautes d'orthographe ou de grammaire ?
- Les services/produits sont-ils clairement presentes avec des prix ?
- Y a-t-il des appels a l'action ("Reservez maintenant", "Appelez-nous") ?
- Le contenu est-il unique ou generique (copie de template) ?
- Y a-t-il assez de contenu ou la page est-elle vide ?

## 7. PREUVES SOCIALES & CONFIANCE
- Avis clients visibles ? Combien ? Note moyenne ?
- Temoignages avec photos et noms reels ?
- Logos de partenaires, certifications, labels ?
- Photos de l'equipe, du local, des realisations ?
- Lien vers Google Maps avec la fiche etablissement ?
- Nombre d'abonnes/avis sur les reseaux sociaux lies ?

## 8. PARCOURS DE CONVERSION
Simule le parcours d'un client qui veut :
a) Prendre rendez-vous / reserver → combien de clics ? Possible ou non ?
b) Appeler le commerce → le numero est-il visible et cliquable ?
c) Trouver l'adresse et les horaires → accessible en combien de clics ?
d) Voir les tarifs → sont-ils affiches ?
e) Envoyer un message → formulaire present et fonctionnel ?
Pour chaque parcours, note le nombre de clics necessaires et les frictions rencontrees.

## 9. RESEAUX SOCIAUX & PRESENCE DIGITALE
- Le site renvoie-t-il vers des reseaux sociaux ? Lesquels ?
- Les liens fonctionnent-ils ?
- Les comptes sont-ils actifs et coherents avec le site ?
- Y a-t-il une integration Google Maps / fiche Google Business ?

## 10. CONFORMITE LEGALE
- Mentions legales presentes et completes ?
- Politique de confidentialite / RGPD ?
- Bandeau de consentement cookies conforme ?
- CGV si e-commerce ?
- Numero de SIRET affiche ?

## 11. TOP 10 DES PROBLEMES CRITIQUES
Liste NUMEROTEE du plus grave au moins grave.
Pour CHAQUE probleme :
- 🔴/🟠/🟡 Niveau (CRITIQUE / IMPORTANT / MINEUR)
- Description precise de ce que tu as vu
- Impact business concret (ex: "un client sur mobile ne peut pas appeler → vous perdez X% de clients potentiels")
- Solution recommandee (en termes simples, pas techniques)

## 12. VERDICT FINAL
| Critere | Score /100 |
|---------|-----------|
| Design & Modernite | |
| UX & Ergonomie | |
| Confiance & Credibilite | |
| Mobile & Responsive | |
| Contenu & Copywriting | |
| Conversion & Business | |
| **SCORE GLOBAL** | |

- Ce site convertit-il les visiteurs en clients ? Reponse franche.
- En UNE phrase : quel est LE probleme #1 de ce site ?
- Ce site est-il au niveau des standards 2026 pour un(e) ${prospect.nafLabel || 'commerce local'} ?

## 13. PLAN D'ACTION STRATEGIQUE
5 actions concretes classees par IMPACT sur le chiffre d'affaires :
1. [Action] — Impact estime — Difficulte — Delai
2. ...

## 14. ARGUMENTS DE VENTE
Ecris 3 phrases percutantes que je pourrais utiliser pour convaincre ce prospect de refaire son site. Chaque phrase doit pointer un probleme concret vu sur SON site et l'impact sur SON business.

Sois IMPITOYABLE dans ton analyse. Je prefere un diagnostic dur mais honnete qui me permettra de closer ce prospect. Chaque probleme est une opportunite de vente pour moi.`;
                  navigator.clipboard.writeText(prompt).then(() => {
                    alert('Prompt copie !\n\n1. Cliquez sur "Ouvrir le site du prospect" ci-dessous\n2. Sur le site, ouvrez l\'extension Claude (sidebar Chrome)\n3. Collez le prompt (Ctrl+V)\n4. Claude verra et analysera le site en direct');
                  });
                }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  width: '100%', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                  background: 'linear-gradient(135deg, #d4a574, #c084fc)', color: 'white',
                  border: 'none', cursor: 'pointer', marginBottom: '6px',
                }}
              >
                📋 Copier le prompt d'analyse (pour Claude extension Chrome)
              </button>
              <a
                href={prospect.website || '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  width: '100%', padding: '8px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 500,
                  background: 'var(--bg-secondary)', color: 'var(--accent)',
                  textDecoration: 'none', border: '1px solid var(--border)',
                }}
              >
                Ouvrir le site du prospect ↗
              </a>
            </div>
          )}

          {/* Technical checks */}
          <div style={panelCardStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Technique</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
              <Check ok={audit.isHttps} label="HTTPS" />
              <Check ok={audit.isResponsive} label="Responsive" />
              <Check ok={audit.hasAnalytics} label="Analytics" />
              <Check ok={audit.hasFavicon} label="Favicon" />
              <Check ok={audit.hasMetaDescription} label="Meta description" />
              <Check ok={audit.hasOpenGraph} label="Open Graph" />
              <Check ok={audit.hasSitemap} label="Sitemap.xml" />
              <Check ok={audit.hasRobotsTxt} label="Robots.txt" />
              <Check ok={audit.usesModernImages} label="Images modernes" />
              <Check ok={!audit.usesJquery} label="Pas de jQuery" />
              <Check ok={!audit.hasObsoleteTags} label="Pas de HTML obsolete" />
              <Check ok={!audit.usesFlash} label="Pas de Flash" />
            </div>
            {audit.cmsDetected && <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>CMS: {audit.cmsDetected}</div>}
            {audit.loadTimeMs && <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Temps de chargement: {formatMs(audit.loadTimeMs)}</div>}
            {audit.totalByteWeight && <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Poids: {formatBytes(audit.totalByteWeight)} ({audit.totalRequestCount ?? '?'} requetes)</div>}
          </div>

          {/* Security */}
          <div style={panelCardStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <Shield size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Securite
            </h3>
            {audit.ssl && (
              <div style={{ marginBottom: '6px' }}>
                <Check ok={audit.ssl.isValid} label={`SSL ${audit.ssl.protocol || ''}`} />
                {audit.ssl.daysUntilExpiry !== null && (
                  <div style={{ color: audit.ssl.isExpiringSoon ? '#ef4444' : 'var(--text-secondary)', fontSize: '10px', marginLeft: '20px' }}>
                    Expire dans {audit.ssl.daysUntilExpiry} jours
                  </div>
                )}
              </div>
            )}
            {audit.securityHeaders && (
              <>
                <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-primary)', margin: '6px 0 4px' }}>
                  Headers: {audit.securityHeaders.score}/{audit.securityHeaders.total}
                </div>
                <Check ok={audit.securityHeaders.strictTransportSecurity} label="HSTS" />
                <Check ok={audit.securityHeaders.contentSecurityPolicy} label="CSP" />
                <Check ok={audit.securityHeaders.xFrameOptions} label="X-Frame-Options" />
                <Check ok={audit.securityHeaders.xContentTypeOptions} label="X-Content-Type" />
                <Check ok={audit.securityHeaders.referrerPolicy} label="Referrer-Policy" />
              </>
            )}
            {audit.observatoryGrade && (
              <div style={{ marginTop: '6px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                Observatory: <strong style={{ color: ['A', 'A+', 'B'].includes(audit.observatoryGrade) ? '#22c55e' : '#ef4444' }}>{audit.observatoryGrade}</strong>
              </div>
            )}
          </div>

          {/* Environment */}
          <div style={panelCardStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              <Leaf size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />Environnement & Qualite
            </h3>
            {audit.carbon && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                  Carbone: <strong style={{ color: ['A', 'B'].includes(audit.carbon.rating || '') ? '#22c55e' : '#ef4444' }}>{audit.carbon.rating || '—'}</strong>
                  {audit.carbon.co2PerView !== null && ` (${audit.carbon.co2PerView.toFixed(2)}g CO2/vue)`}
                </div>
                {audit.carbon.cleanerThan !== null && (
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Plus propre que {audit.carbon.cleanerThan}% des sites</div>
                )}
                <Check ok={audit.carbon.isGreen} label="Hebergement vert" />
              </div>
            )}
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
              W3C: <strong style={{ color: audit.w3cErrors > 20 ? '#ef4444' : 'var(--text-primary)' }}>{audit.w3cErrors} erreurs</strong>, {audit.w3cWarnings} warnings
            </div>
            {audit.yellowLabScore !== null && (
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                Yellow Lab: <strong style={{ color: audit.yellowLabScore >= 60 ? '#22c55e' : '#ef4444' }}>{audit.yellowLabScore}/100</strong>
              </div>
            )}
            {audit.yellowLabTopIssues.length > 0 && (
              <div style={{ marginTop: '4px' }}>
                {audit.yellowLabTopIssues.slice(0, 3).map((issue, i) => (
                  <div key={i} style={{ fontSize: '10px', color: 'var(--text-tertiary)', padding: '1px 0' }}>- {issue}</div>
                ))}
              </div>
            )}
          </div>

          {/* Heaviest resources */}
          {audit.heaviestResources && audit.heaviestResources.length > 0 && (
            <div style={panelCardStyle}>
              <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                <AlertTriangle size={13} style={{ verticalAlign: 'middle', marginRight: '4px', color: '#f59e0b' }} />
                Ressources les plus lourdes
              </h3>
              {audit.heaviestResources.slice(0, 5).map((r, i) => {
                const sizeStr = formatBytes(r.size);
                const barWidth = Math.min(100, (r.size / (audit.heaviestResources[0]?.size || 1)) * 100);
                const filename = r.url.split('/').pop()?.split('?')[0] || r.url;
                return (
                  <div key={i} style={{ padding: '4px 0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '2px' }}>
                      <span style={{ color: 'var(--text-primary)', maxWidth: '65%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.url}>{filename}</span>
                      <span style={{ fontWeight: 600, color: r.size > 500000 ? '#ef4444' : r.size > 100000 ? '#f59e0b' : 'var(--text-secondary)' }}>{sizeStr}</span>
                    </div>
                    <div style={{ width: '100%', height: '3px', borderRadius: '2px', background: 'var(--bg-secondary)' }}>
                      <div style={{ width: `${barWidth}%`, height: '100%', borderRadius: '2px', background: r.size > 500000 ? '#ef4444' : r.size > 100000 ? '#f59e0b' : 'var(--accent)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Detailed audits by category */}
          {[
            { title: 'Performance', audits: audit.mobilePerformanceAudits, color: '#ef4444' },
            { title: 'Accessibilite', audits: audit.mobileAccessibilityAudits, color: '#8b5cf6' },
            { title: 'SEO', audits: audit.mobileSEOAudits, color: '#3b82f6' },
            { title: 'Bonnes pratiques', audits: audit.mobileBestPracticesAudits, color: '#f59e0b' },
          ].filter(s => s.audits.length > 0).map(section => (
            <div key={section.title} style={panelCardStyle}>
              <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                <AlertTriangle size={13} style={{ verticalAlign: 'middle', marginRight: '4px', color: section.color }} />
                {section.title}
                <span style={{ fontSize: '10px', fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: '6px' }}>
                  {section.audits.length} probleme{section.audits.length > 1 ? 's' : ''}
                </span>
              </h3>
              {section.audits.map((a, i) => {
                const sc = a.score === null ? 'var(--text-tertiary)' : a.score === 0 ? '#ef4444' : '#f59e0b';
                return (
                  <div key={a.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '5px 8px', marginBottom: '2px', borderRadius: '4px',
                    background: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent', fontSize: '11px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flex: 1 }}>
                      <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: sc, flexShrink: 0 }} />
                      <span style={{ color: 'var(--text-primary)' }}>{a.title}</span>
                    </div>
                    {a.displayValue && (
                      <span style={{
                        fontSize: '10px', fontWeight: 600, color: sc,
                        padding: '1px 6px', borderRadius: '3px',
                        background: a.score === 0 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                        whiteSpace: 'nowrap', marginLeft: '6px',
                      }}>
                        {a.displayValue}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Design & UX */}
          {audit.design && (
            <div style={panelCardStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Design & UX</h3>
                <span style={{
                  fontSize: '13px', fontWeight: 700,
                  color: audit.design.score >= 70 ? '#22c55e' : audit.design.score >= 40 ? '#f59e0b' : '#ef4444',
                }}>{audit.design.score}/100</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 12px', fontSize: '11px', marginBottom: '8px' }}>
                <div style={{ color: audit.design.imageCount >= 3 ? 'var(--text-secondary)' : '#ef4444' }}>
                  {audit.design.imageCount >= 3 ? '✓' : '✗'} {audit.design.imageCount} image{audit.design.imageCount !== 1 ? 's' : ''}
                </div>
                <div style={{ color: audit.design.hasHeroImage ? 'var(--text-secondary)' : '#ef4444' }}>
                  {audit.design.hasHeroImage ? '✓' : '✗'} Hero/Banner
                </div>
                <div style={{ color: audit.design.hasCustomFonts ? 'var(--text-secondary)' : '#ef4444' }}>
                  {audit.design.hasCustomFonts ? '✓' : '✗'} Polices custom
                </div>
                <div style={{ color: audit.design.hasNavigation ? 'var(--text-secondary)' : '#ef4444' }}>
                  {audit.design.hasNavigation ? '✓' : '✗'} Navigation
                </div>
                <div style={{ color: audit.design.hasLogo ? 'var(--text-secondary)' : '#ef4444' }}>
                  {audit.design.hasLogo ? '✓' : '✗'} Logo
                </div>
                <div style={{ color: audit.design.hasFooterContent ? 'var(--text-secondary)' : '#ef4444' }}>
                  {audit.design.hasFooterContent ? '✓' : '✗'} Footer
                </div>
                <div style={{ color: audit.design.usesFlexboxOrGrid ? 'var(--text-secondary)' : '#f59e0b' }}>
                  {audit.design.usesFlexboxOrGrid ? '✓' : '!'} Flexbox/Grid
                </div>
                <div style={{ color: audit.design.hasAnimations ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>
                  {audit.design.hasAnimations ? '✓' : '—'} Animations
                </div>
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
                {audit.design.wordCount} mots · {audit.design.headingCount} headings · {audit.design.fontFamilyCount} police{audit.design.fontFamilyCount !== 1 ? 's' : ''} · Ratio texte {audit.design.textToHtmlRatio}%
              </div>
              {audit.design.issues.length > 0 && (
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '6px' }}>
                  {audit.design.issues.slice(0, 5).map((issue: any, i: number) => (
                    <div key={i} style={{
                      fontSize: '10px', padding: '2px 0',
                      color: issue.severity === 'critical' ? '#ef4444' : issue.severity === 'warning' ? '#f59e0b' : 'var(--text-tertiary)',
                    }}>
                      {issue.severity === 'critical' ? '✗' : issue.severity === 'warning' ? '!' : '·'} {issue.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Social + Email */}
          <div style={panelCardStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>Presence en ligne</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '11px' }}>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Reseaux sociaux ({audit.socialPresence.count})</div>
                {Object.entries(audit.socialPresence.links).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k}><a href={v!} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>{k}</a></div>
                ))}
                {audit.socialPresence.count === 0 && <div style={{ color: 'var(--text-tertiary)' }}>Aucun detecte</div>}
              </div>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Emails</div>
                {audit.primaryEmail ? (
                  <div>
                    <a href={`mailto:${audit.primaryEmail}`} style={{ color: 'var(--accent)', textDecoration: 'none' }}>{audit.primaryEmail}</a>
                    {audit.emailConfidence && (
                      <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginLeft: '4px' }}>({audit.emailConfidence})</span>
                    )}
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-tertiary)' }}>Non trouve</div>
                )}
                {audit.emails.filter(e => e !== audit.primaryEmail).slice(0, 3).map((e, i) => (
                  <div key={i} style={{ color: 'var(--text-secondary)' }}>{e}</div>
                ))}
              </div>
            </div>
          </div>
          {/* Claude Analysis */}
          <div style={panelCardStyle}>
            <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
              ✨ Analyse visuelle (Claude)
            </h3>
            {prospect.claudeAnalysis ? (
              <>
                <div style={{
                  fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.6',
                  maxHeight: '200px', overflowY: 'auto', whiteSpace: 'pre-wrap',
                  background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px',
                  marginBottom: '8px',
                }}>
                  {prospect.claudeAnalysis.slice(0, 1000)}{prospect.claudeAnalysis.length > 1000 ? '...' : ''}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => {
                      setClaudeText(prospect.claudeAnalysis || '');
                      // Clear the saved analysis to show the textarea
                      setSelectedProspect(prev => prev ? { ...prev, claudeAnalysis: null } : prev);
                    }}
                    style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer' }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      if (!prospect.claudeAnalysis || !audit) return;
                      // Generate fusion prompt for presentation
                      const fusionPrompt = `Tu es un expert en creation de presentations commerciales pour une agence web premium.

A partir des donnees ci-dessous, cree le CONTENU TEXTUEL de chaque slide d'une presentation PowerPoint de closing.

## DONNEES DU PROSPECT
- Entreprise : ${prospect.name}
- Ville : ${prospect.city || ''}
- Site actuel : ${prospect.website || 'Aucun'}
- Secteur : ${prospect.nafLabel || ''}
- SIRET : ${prospect.siret || ''}
- Cree en : ${prospect.dateCreation || ''}

## AUDIT TECHNIQUE (automatique)
- Performance mobile : ${audit.mobileScore ?? 'N/A'}/100
- Accessibilite : ${audit.mobileAccessibility ?? 'N/A'}/100
- SEO : ${audit.mobileSEO ?? 'N/A'}/100
- Bonnes pratiques : ${audit.mobileBestPractices ?? 'N/A'}/100
- Desktop : ${audit.desktopScore ?? 'N/A'}/100
- CMS : ${audit.cmsDetected || 'Non detecte'}
- HTTPS : ${audit.isHttps ? 'Oui' : 'Non'}
- Responsive : ${audit.isResponsive ? 'Oui' : 'Non'}
- Analytics : ${audit.hasAnalytics ? 'Oui' : 'Non'}
- W3C : ${audit.w3cErrors} erreurs
- Headers securite : ${audit.securityHeaders?.score ?? '?'}/${audit.securityHeaders?.total ?? '?'}
- Poids page : ${audit.totalByteWeight ? Math.round(audit.totalByteWeight / 1024) + 'KB' : 'N/A'}
- Requetes : ${audit.totalRequestCount ?? 'N/A'}
${audit.design ? `- Score design : ${audit.design.score}/100` : ''}

## ANALYSE VISUELLE (Claude)
${prospect.claudeAnalysis}

## INSTRUCTIONS
Cree le contenu de 10 slides :

SLIDE 1 - COUVERTURE
Titre + sous-titre + nom du prospect

SLIDE 2 - CONSTAT
Resume en 3 bullets de l'etat actuel du site (scores + problemes majeurs)

SLIDE 3 - PREMIERE IMPRESSION
Ce que voit un client qui arrive sur le site (basé sur l'analyse visuelle)

SLIDE 4 - PROBLEMES CRITIQUES
Top 5 problemes classes par impact business (pas technique)

SLIDE 5 - IMPACT BUSINESS
Chiffres concrets : "X% des visiteurs partent", "Invisible sur mobile", etc.

SLIDE 6 - CE QUE FONT LES CONCURRENTS
Comparaison avec les standards du secteur (${prospect.nafLabel || 'commerce local'})

SLIDE 7 - NOTRE SOLUTION
Ce que JL Studio propose concretement (site moderne, responsive, rapide, SEO)

SLIDE 8 - AVANT / APRES
Description textuelle de la transformation (actuel vs ce qu'on propose)

SLIDE 9 - PROCESSUS & DELAI
Les etapes du projet (decouverte, maquette, dev, livraison) + delai estime

SLIDE 10 - INVESTISSEMENT & CONTACT
Fourchette de prix adaptee au projet + coordonnees JL Studio

Pour chaque slide, donne :
- Le TITRE de la slide
- Le CONTENU (bullets ou paragraphes courts)
- Les NOTES DU PRESENTATEUR (ce que tu dirais a l'oral)

Sois percutant, oriente business, pas technique. Le client doit comprendre pourquoi il perd de l'argent et comment on peut l'aider.`;
                      window.open(`https://claude.ai/new?q=${encodeURIComponent(fusionPrompt)}`, '_blank');
                    }}
                    style={{
                      padding: '4px 10px', borderRadius: '6px', fontSize: '10px', fontWeight: 600,
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: 'white',
                      border: 'none', cursor: 'pointer',
                    }}
                  >
                    Preparer la presentation (Claude)
                  </button>
                </div>
              </>
            ) : (
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                Collez ici le resultat de l'analyse Claude pour enrichir l'audit.
              </div>
            )}
            {!prospect.claudeAnalysis && (
              <>
                <textarea
                  placeholder="Collez ici l'analyse de Claude..."
                  value={claudeText}
                  onChange={(e) => setClaudeText(e.target.value)}
                  style={{
                    width: '100%', minHeight: '120px', padding: '8px', borderRadius: '8px',
                    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
                    color: 'var(--text-primary)', fontSize: '11px', resize: 'vertical',
                    fontFamily: 'inherit', lineHeight: '1.5',
                  }}
                />
                <button
                  onClick={async () => {
                    if (!claudeText.trim()) { alert('Collez d\'abord l\'analyse de Claude dans le champ ci-dessus.'); return; }
                    const res = await fetch(`/api/portal/prospection/sessions/${prospect.sessionId}/prospects/${prospect.id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ claudeAnalysis: claudeText.trim() }),
                    });
                    if (res.ok) {
                      const updated = await res.json();
                      setProspects(prev => prev.map(p => p.id === updated.id ? { ...p, claudeAnalysis: updated.claudeAnalysis } : p));
                      setSelectedProspect(prev => prev ? { ...prev, claudeAnalysis: updated.claudeAnalysis } : prev);
                      setClaudeText('');
                    } else {
                      alert('Erreur lors de la sauvegarde');
                    }
                  }}
                  style={{
                    marginTop: '6px', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                    background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
                  }}
                >
                  Sauvegarder l'analyse
                </button>
              </>
            )}
          </div>

          {/* Presentation Generator */}
          {prospect.claudeAnalysis && (
            <div style={panelCardStyle}>
              <h3 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                📊 Generer la presentation
              </h3>
              {prospect.presentationData ? (
                <>
                  <div style={{
                    fontSize: '11px', color: 'var(--text-secondary)', lineHeight: '1.5',
                    maxHeight: '150px', overflowY: 'auto', whiteSpace: 'pre-wrap',
                    background: 'var(--bg-secondary)', borderRadius: '8px', padding: '10px',
                    marginBottom: '8px',
                  }}>
                    {prospect.presentationData.slice(0, 500)}...
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => {
                        setPresentationText(prospect.presentationData || '');
                        setSelectedProspect(prev => prev ? { ...prev, presentationData: null } : prev);
                      }}
                      style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '10px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border)', cursor: 'pointer' }}
                    >
                      Modifier
                    </button>
                    <button
                      onClick={async () => {
                        if (!prospect.presentationData) return;
                        const pptx = (await import('pptxgenjs')).default;
                        const pres = new pptx();
                        pres.layout = 'LAYOUT_16x9';

                        // Parse slides from text
                        const slideBlocks = prospect.presentationData.split(/SLIDE \d+/i).filter(s => s.trim());
                        const BRAND_COLOR = '638BFF';
                        const DARK = '1a1a2e';

                        // Cover slide
                        const cover = pres.addSlide();
                        cover.background = { color: DARK };
                        cover.addText(`Audit Web`, { x: 0.8, y: 1.5, w: 8.4, h: 1, fontSize: 36, fontFace: 'Arial', color: BRAND_COLOR, bold: true });
                        cover.addText(prospect.name, { x: 0.8, y: 2.5, w: 8.4, h: 0.8, fontSize: 28, fontFace: 'Arial', color: 'FFFFFF' });
                        cover.addText(`JL Studio — jlstudio.dev`, { x: 0.8, y: 4.5, w: 8.4, h: 0.4, fontSize: 14, fontFace: 'Arial', color: '888888' });
                        cover.addText(new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }), { x: 0.8, y: 4.9, w: 8.4, h: 0.4, fontSize: 12, fontFace: 'Arial', color: '666666' });

                        // Content slides
                        for (let i = 0; i < slideBlocks.length && i < 10; i++) {
                          const block = slideBlocks[i].trim();
                          const lines = block.split('\n').filter(l => l.trim());

                          // First line = title (after "- TITRE" or similar)
                          let title = lines[0] || `Slide ${i + 2}`;
                          title = title.replace(/^[-—:*#]+\s*/, '').replace(/COUVERTURE|CONSTAT|PREMIERE|PROBLEMES|IMPACT|CONCURRENTS|SOLUTION|AVANT|PROCESSUS|INVESTISSEMENT/i, '').trim();
                          if (!title || title.length < 3) title = `Slide ${i + 2}`;

                          const slide = pres.addSlide();
                          slide.background = { color: 'FFFFFF' };

                          // Header bar
                          slide.addShape(pres.ShapeType.rect, { x: 0, y: 0, w: 10, h: 0.8, fill: { color: DARK } });
                          slide.addText(title.slice(0, 60), { x: 0.5, y: 0.15, w: 9, h: 0.5, fontSize: 18, fontFace: 'Arial', color: 'FFFFFF', bold: true });

                          // Content
                          const contentLines = lines.slice(1).filter(l => !l.toLowerCase().includes('notes du presentateur'));
                          const notesStart = lines.findIndex(l => l.toLowerCase().includes('notes du presentateur'));
                          const content = contentLines.join('\n').replace(/^\s*[-•]\s*/gm, '• ').trim();

                          slide.addText(content.slice(0, 800) || '', {
                            x: 0.5, y: 1.2, w: 9, h: 4,
                            fontSize: 13, fontFace: 'Arial', color: '333333',
                            lineSpacingMultiple: 1.3,
                            valign: 'top',
                          });

                          // Presenter notes
                          if (notesStart > -1) {
                            const notes = lines.slice(notesStart + 1).join('\n').trim();
                            slide.addNotes(notes);
                          }

                          // Footer
                          slide.addText('JL Studio — jlstudio.dev', { x: 0.5, y: 5.0, w: 9, h: 0.3, fontSize: 9, fontFace: 'Arial', color: '999999' });
                        }

                        // Final slide
                        const final = pres.addSlide();
                        final.background = { color: DARK };
                        final.addText('Merci', { x: 0.8, y: 1.5, w: 8.4, h: 1, fontSize: 40, fontFace: 'Arial', color: BRAND_COLOR, bold: true });
                        final.addText('JL Studio\nCreation de sites web premium', { x: 0.8, y: 2.8, w: 8.4, h: 0.8, fontSize: 18, fontFace: 'Arial', color: 'FFFFFF' });
                        final.addText('jlstudio.dev\ncontact@jlstudio.dev\n07 67 58 10 61', { x: 0.8, y: 3.8, w: 8.4, h: 1, fontSize: 14, fontFace: 'Arial', color: '888888', lineSpacingMultiple: 1.5 });

                        const slug = prospect.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
                        await pres.writeFile({ fileName: `audit_${slug}_${new Date().toISOString().slice(0, 10)}.pptx` });
                      }}
                      style={{
                        padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)', color: 'white',
                        border: 'none', cursor: 'pointer',
                      }}
                    >
                      📥 Generer le PowerPoint
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                  Apres avoir utilise "Preparer la presentation (Claude)", collez ici le contenu des slides genere par Claude.
                </div>
              )}
              {!prospect.presentationData && (
                <>
                  <textarea
                    placeholder="Collez ici le contenu des slides genere par Claude..."
                    value={presentationText}
                    onChange={(e) => setPresentationText(e.target.value)}
                    style={{
                      width: '100%', minHeight: '120px', padding: '8px', borderRadius: '8px',
                      background: 'var(--bg-input)', border: '1px solid var(--border-input)',
                      color: 'var(--text-primary)', fontSize: '11px', resize: 'vertical',
                      fontFamily: 'inherit', lineHeight: '1.5',
                    }}
                  />
                  <button
                    onClick={async () => {
                      if (!presentationText.trim()) { alert('Collez d\'abord le contenu des slides.'); return; }
                      const res = await fetch(`/api/portal/prospection/sessions/${prospect.sessionId}/prospects/${prospect.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ presentationData: presentationText.trim() }),
                      });
                      if (res.ok) {
                        const updated = await res.json();
                        setProspects(prev => prev.map(p => p.id === updated.id ? { ...p, presentationData: updated.presentationData } : p));
                        setSelectedProspect(prev => prev ? { ...prev, presentationData: updated.presentationData } : prev);
                        setPresentationText('');
                      } else {
                        alert('Erreur lors de la sauvegarde');
                      }
                    }}
                    style={{
                      marginTop: '6px', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                      background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer',
                    }}
                  >
                    Sauvegarder le contenu
                  </button>
                </>
              )}
            </div>
          )}
        </>
      )}

      {/* No audit yet */}
      {!audit && (
        <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-tertiary)', fontSize: '13px' }}>
          {prospect.website ? (
            <>
              <Zap size={32} color="var(--text-tertiary)" style={{ marginBottom: '8px' }} />
              <div>Aucun audit realise. Lancez un audit pour voir le rapport complet.</div>
            </>
          ) : (
            <>
              <Globe size={32} color="var(--text-tertiary)" style={{ marginBottom: '8px' }} />
              <div>Ce prospect n'a pas de site web detecte.</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
