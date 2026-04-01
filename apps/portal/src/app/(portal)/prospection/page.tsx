'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSidebar } from '@/components/portal/SidebarContext';
import { Radar, Plus, ArrowLeft, Trash2, X, Download, Filter, Search } from 'lucide-react';

// ─── Types ───

interface CampaignListItem {
  id: string;
  metier: string;
  ville: string;
  limit: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  progress: number;
  totalFound: number | null;
  withSite: number | null;
  withoutSite: number | null;
  error: string | null;
  createdAt: string;
  _count: { results: number };
}

interface ProspectionResult {
  id: string;
  name: string;
  url: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  email: string | null;
  category: string;
  priorityScore: number;
  status: string;
  breakdown: { label: string; score: number }[];
  sireneData: { siret?: string } | null;
  contactId: string | null;
}

interface CampaignDetail {
  id: string;
  metier: string;
  ville: string;
  limit: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  progress: number;
  totalFound: number | null;
  withSite: number | null;
  withoutSite: number | null;
  error: string | null;
  createdAt: string;
  results: ProspectionResult[];
}

// ─── Status config ───

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  PENDING: { label: 'En attente', color: 'var(--text-tertiary)', bg: 'var(--bg-secondary)' },
  RUNNING: { label: 'En cours', color: 'var(--info, #3b82f6)', bg: 'rgba(59,130,246,0.1)' },
  COMPLETED: { label: 'Termine', color: 'var(--success, #22c55e)', bg: 'rgba(34,197,94,0.1)' },
  FAILED: { label: 'Echoue', color: 'var(--danger, #ef4444)', bg: 'rgba(239,68,68,0.1)' },
};

export default function ProspectionPage() {
  const { isMobile } = useSidebar();

  // ─── List state ───
  const [campaigns, setCampaigns] = useState<CampaignListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ─── Creation modal ───
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ metier: '', ville: '', limit: 20 });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  // ─── Detail state ───
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignDetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // ─── Progress polling ───
  const [liveProgress, setLiveProgress] = useState<{ status: string; progress: number; resultCount: number } | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ─── Filters ───
  const [filterStatus, setFilterStatus] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // ─── Inject ───
  const [injecting, setInjecting] = useState(false);
  const [injectResult, setInjectResult] = useState<{ injected: number; total: number } | null>(null);

  // ─── Deleting ───
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // ─── Styles ───
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '8px 12px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
  };

  // ─── Fetch campaigns list ───
  const fetchCampaigns = useCallback(() => {
    fetch('/api/portal/prospection/campaigns')
      .then((r) => r.json())
      .then((res) => {
        setCampaigns(res.data ?? res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => { fetchCampaigns(); }, [fetchCampaigns]);

  // ─── Fetch campaign detail ───
  const fetchDetail = useCallback((id: string) => {
    setLoadingDetail(true);
    const params = new URLSearchParams();
    if (filterStatus) params.set('status', filterStatus);
    if (filterCategory) params.set('category', filterCategory);
    fetch(`/api/portal/prospection/campaigns/${id}?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setSelectedCampaign(data);
        setLoadingDetail(false);
      })
      .catch(() => setLoadingDetail(false));
  }, [filterStatus, filterCategory]);

  // ─── Poll progress for running campaigns ───
  const startPolling = useCallback((id: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = setInterval(() => {
      fetch(`/api/portal/prospection/campaigns/${id}/progress`)
        .then((r) => r.json())
        .then((data) => {
          setLiveProgress({ status: data.status, progress: data.progress, resultCount: data.resultCount });
          if (data.status !== 'RUNNING' && data.status !== 'PENDING') {
            if (pollingRef.current) clearInterval(pollingRef.current);
            pollingRef.current = null;
            // Refresh full detail
            fetchDetail(id);
            fetchCampaigns();
          }
        })
        .catch(() => {});
    }, 2000);
  }, [fetchDetail, fetchCampaigns]);

  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // Start polling when viewing a running campaign
  useEffect(() => {
    if (selectedCampaign && (selectedCampaign.status === 'RUNNING' || selectedCampaign.status === 'PENDING')) {
      startPolling(selectedCampaign.id);
    } else {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
        pollingRef.current = null;
      }
      setLiveProgress(null);
    }
  }, [selectedCampaign?.id, selectedCampaign?.status, startPolling]);

  // Re-fetch detail when filters change
  useEffect(() => {
    if (selectedCampaign) {
      fetchDetail(selectedCampaign.id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterStatus, filterCategory]);

  // ─── Create campaign ───
  const handleCreate = async () => {
    if (!createForm.metier || !createForm.ville) return;
    setCreating(true);
    setCreateError('');
    try {
      const res = await fetch('/api/portal/prospection/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      });
      if (!res.ok) {
        const data = await res.json();
        setCreateError(data.error || 'Erreur lors de la creation');
        setCreating(false);
        return;
      }
      const campaign = await res.json();

      // Immediately run the campaign
      await fetch(`/api/portal/prospection/campaigns/${campaign.id}/run`, { method: 'POST' });

      setShowCreate(false);
      setCreateForm({ metier: '', ville: '', limit: 20 });
      setCreating(false);
      fetchCampaigns();

      // Open the campaign detail and start polling
      setSelectedCampaign({ ...campaign, status: 'RUNNING', results: [] });
    } catch {
      setCreateError('Erreur reseau');
      setCreating(false);
    }
  };

  // ─── Select campaign from list ───
  const handleSelectCampaign = (campaign: CampaignListItem) => {
    setFilterStatus('');
    setFilterCategory('');
    setInjectResult(null);
    setConfirmDelete(false);
    fetchDetail(campaign.id);
  };

  // ─── Back to list ───
  const handleBack = () => {
    setSelectedCampaign(null);
    setLiveProgress(null);
    setFilterStatus('');
    setFilterCategory('');
    setInjectResult(null);
    setConfirmDelete(false);
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    fetchCampaigns();
  };

  // ─── Inject into CRM ───
  const handleInject = async () => {
    if (!selectedCampaign) return;
    setInjecting(true);
    setInjectResult(null);
    try {
      const res = await fetch(`/api/portal/prospection/campaigns/${selectedCampaign.id}/inject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setInjectResult(data);
      // Refresh detail to update contactId links
      fetchDetail(selectedCampaign.id);
    } catch {
      setInjectResult({ injected: 0, total: 0 });
    }
    setInjecting(false);
  };

  // ─── Delete campaign ───
  const handleDelete = async () => {
    if (!selectedCampaign) return;
    setDeleting(true);
    try {
      await fetch(`/api/portal/prospection/campaigns/${selectedCampaign.id}`, { method: 'DELETE' });
      setSelectedCampaign(null);
      setDeleting(false);
      setConfirmDelete(false);
      fetchCampaigns();
    } catch {
      setDeleting(false);
    }
  };

  // ─── Compute stats from results ───
  const results = selectedCampaign?.results ?? [];
  const stats = {
    chaud: results.filter((r) => r.status === 'Chaud').length,
    tiede: results.filter((r) => r.status === 'Tiede' || r.status === 'Ti\u00e8de').length,
    froid: results.filter((r) => r.status === 'Froid').length,
    creation: results.filter((r) => r.category === 'creation').length,
    refonte: results.filter((r) => r.category === 'refonte').length,
  };

  // ─── Filtered results ───
  const filteredResults = results;

  const currentStatus = liveProgress?.status ?? selectedCampaign?.status ?? 'PENDING';
  const currentProgress = liveProgress?.progress ?? selectedCampaign?.progress ?? 0;

  // ═══════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════

  return (
    <div>
      {/* ─── Header ─── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {selectedCampaign && (
            <button onClick={handleBack} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border)',
              cursor: 'pointer', color: 'var(--text-secondary)',
            }}>
              <ArrowLeft size={16} />
            </button>
          )}
          <Radar size={20} style={{ color: 'var(--accent)' }} />
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0 }}>
            Prospection
          </h1>
        </div>
        {!selectedCampaign && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/prospection/search" style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
              background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)',
              cursor: 'pointer', fontSize: '13px', fontWeight: 500, textDecoration: 'none',
            }}>
              <Search size={16} /> Recherche entreprises
            </a>
            <a href="/prospection/audit" style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
              background: 'var(--bg-secondary)', color: 'var(--accent)', border: '1px solid var(--accent)',
              cursor: 'pointer', fontSize: '13px', fontWeight: 500, textDecoration: 'none',
            }}>
              <Search size={16} /> Audit site web
            </a>
            <button onClick={() => setShowCreate(true)} style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
              background: 'var(--accent)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500,
            }}>
              <Plus size={16} /> Nouvelle campagne
            </button>
          </div>
        )}
      </div>

      {/* ═══════════════════ CREATE MODAL ═══════════════════ */}
      {showCreate && (
        <>
          <div onClick={() => setShowCreate(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--overlay)', zIndex: 2000 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '440px', maxWidth: '95vw', background: 'var(--bg-card)',
            borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
            padding: '24px', zIndex: 2001,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Nouvelle campagne</h3>
              <button onClick={() => setShowCreate(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'block' }}>Metier *</label>
                <input
                  placeholder="ex: Boulangerie, Plombier, Restaurant..."
                  value={createForm.metier}
                  onChange={(e) => setCreateForm({ ...createForm, metier: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'block' }}>Ville *</label>
                <input
                  placeholder="ex: Paris, Lyon, Marseille..."
                  value={createForm.ville}
                  onChange={(e) => setCreateForm({ ...createForm, ville: e.target.value })}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)', marginBottom: '4px', display: 'block' }}>Nombre max de resultats</label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  value={createForm.limit}
                  onChange={(e) => setCreateForm({ ...createForm, limit: parseInt(e.target.value) || 20 })}
                  style={inputStyle}
                />
              </div>
              {createError && <p style={{ color: 'var(--danger)', fontSize: '12px', margin: 0 }}>{createError}</p>}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={handleCreate}
                  disabled={creating || !createForm.metier || !createForm.ville}
                  style={{
                    padding: '8px 20px', borderRadius: '8px', background: 'var(--accent)', color: 'white',
                    border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                    opacity: creating || !createForm.metier || !createForm.ville ? 0.5 : 1,
                  }}
                >
                  {creating ? 'Lancement...' : 'Lancer la prospection'}
                </button>
                <button onClick={() => setShowCreate(false)} style={{
                  padding: '8px 20px', borderRadius: '8px', background: 'var(--bg-secondary)',
                  color: 'var(--text-secondary)', border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
                }}>Annuler</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════ CAMPAIGN LIST ═══════════════════ */}
      {!selectedCampaign && (
        <>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)', fontSize: '13px' }}>Chargement...</div>
          ) : campaigns.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px 20px', background: 'var(--bg-card)',
              borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
            }}>
              <Radar size={40} style={{ color: 'var(--text-tertiary)', marginBottom: '12px' }} />
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Aucune campagne</p>
              <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Lancez votre premiere campagne de prospection</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))', gap: '12px' }}>
              {campaigns.map((campaign) => {
                const conf = STATUS_CONFIG[campaign.status] ?? STATUS_CONFIG.PENDING;
                return (
                  <div
                    key={campaign.id}
                    onClick={() => handleSelectCampaign(campaign)}
                    style={{
                      background: 'var(--bg-card)', borderRadius: '12px',
                      border: '1px solid var(--border)', boxShadow: 'var(--shadow-card)',
                      padding: '16px', cursor: 'pointer', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    {/* Title row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '8px' }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>
                          {campaign.metier}
                        </h3>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>{campaign.ville}</p>
                      </div>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '4px',
                        padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 500,
                        color: conf.color, background: conf.bg, whiteSpace: 'nowrap',
                        animation: campaign.status === 'RUNNING' ? 'pulse 2s ease-in-out infinite' : 'none',
                      }}>
                        {campaign.status === 'RUNNING' && (
                          <span style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: conf.color, display: 'inline-block',
                            animation: 'pulse 1.5s ease-in-out infinite',
                          }} />
                        )}
                        {conf.label}
                      </span>
                    </div>

                    {/* Progress bar for running */}
                    {campaign.status === 'RUNNING' && (
                      <div style={{ marginBottom: '8px' }}>
                        <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--bg-secondary)' }}>
                          <div style={{
                            width: `${campaign.progress}%`, height: '100%', borderRadius: '2px',
                            background: 'var(--info, #3b82f6)', transition: 'width 0.3s',
                          }} />
                        </div>
                      </div>
                    )}

                    {/* Meta row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        {new Date(campaign.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {campaign._count.results} resultat{campaign._count.results !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* ═══════════════════ CAMPAIGN DETAIL ═══════════════════ */}
      {selectedCampaign && (
        <>
          {/* Campaign info header */}
          <div style={{
            background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)', padding: '16px', marginBottom: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>
                  {selectedCampaign.metier} - {selectedCampaign.ville}
                </h2>
                <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>
                  {new Date(selectedCampaign.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                color: (STATUS_CONFIG[currentStatus] ?? STATUS_CONFIG.PENDING).color,
                background: (STATUS_CONFIG[currentStatus] ?? STATUS_CONFIG.PENDING).bg,
              }}>
                {(STATUS_CONFIG[currentStatus] ?? STATUS_CONFIG.PENDING).label}
              </span>
            </div>

            {/* Progress bar for running campaigns */}
            {(currentStatus === 'RUNNING' || currentStatus === 'PENDING') && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {currentStatus === 'PENDING' ? 'En attente de l\'agent local...' : 'Analyse en cours...'}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--info, #3b82f6)' }}>
                    {currentProgress}%
                  </span>
                </div>
                <div style={{ width: '100%', height: '6px', borderRadius: '3px', background: 'var(--bg-secondary)', overflow: 'hidden' }}>
                  <div style={{
                    width: `${currentProgress}%`, height: '100%', borderRadius: '3px',
                    background: 'linear-gradient(90deg, var(--info, #3b82f6), var(--accent))',
                    transition: 'width 0.5s ease',
                    animation: currentStatus === 'RUNNING' ? 'shimmer 2s ease-in-out infinite' : 'none',
                  }} />
                </div>
              </div>
            )}

            {/* Agent hint for pending campaigns */}
            {currentStatus === 'PENDING' && currentProgress === 0 && (
              <div style={{
                marginTop: '10px', padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
                fontSize: '11px', color: 'var(--info, #3b82f6)', lineHeight: '1.5',
              }}>
                En attente de l'agent de prospection... L'analyse demarrera automatiquement.
              </div>
            )}

            {/* Error message */}
            {selectedCampaign.error && (
              <div style={{
                marginTop: '12px', padding: '10px 12px', borderRadius: '8px',
                background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
              }}>
                <p style={{ fontSize: '12px', color: 'var(--danger)', margin: 0 }}>{selectedCampaign.error}</p>
              </div>
            )}
          </div>

          {loadingDetail ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-tertiary)', fontSize: '13px' }}>Chargement des resultats...</div>
          ) : (
            <>
              {/* Stats row */}
              {results.length > 0 && (
                <div style={{
                  display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap',
                }}>
                  {[
                    { emoji: '\uD83D\uDD25', label: 'Chaud', value: stats.chaud, color: 'var(--danger, #ef4444)' },
                    { emoji: '\uD83D\uDFE1', label: 'Tiede', value: stats.tiede, color: 'var(--warning, #f59e0b)' },
                    { emoji: '\u2744\uFE0F', label: 'Froid', value: stats.froid, color: 'var(--info, #3b82f6)' },
                    { emoji: '\uD83C\uDD95', label: 'Creation', value: stats.creation, color: 'var(--success, #22c55e)' },
                    { emoji: '\uD83D\uDD04', label: 'Refonte', value: stats.refonte, color: 'var(--accent)' },
                  ].map((s) => (
                    <div key={s.label} style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
                      borderRadius: '8px', background: 'var(--bg-card)', border: '1px solid var(--border)',
                    }}>
                      <span style={{ fontSize: '14px' }}>{s.emoji}</span>
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{s.label}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: s.color }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Filter pills */}
              {results.length > 0 && (
                <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Filter size={14} style={{ color: 'var(--text-tertiary)' }} />
                  {/* Status filters */}
                  {['', 'Chaud', 'Tiede', 'Froid'].map((s) => (
                    <button
                      key={s || 'all-status'}
                      onClick={() => setFilterStatus(filterStatus === s ? '' : s)}
                      style={{
                        padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                        border: '1px solid var(--border)',
                        background: filterStatus === s ? 'var(--accent)' : 'var(--bg-card)',
                        color: filterStatus === s ? 'white' : 'var(--text-secondary)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {s || 'Tous'}
                    </button>
                  ))}
                  <span style={{ width: '1px', height: '16px', background: 'var(--border)', margin: '0 4px' }} />
                  {/* Category filters */}
                  {['', 'creation', 'refonte'].map((c) => (
                    <button
                      key={c || 'all-cat'}
                      onClick={() => setFilterCategory(filterCategory === c ? '' : c)}
                      style={{
                        padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500, cursor: 'pointer',
                        border: '1px solid var(--border)',
                        background: filterCategory === c ? 'var(--accent)' : 'var(--bg-card)',
                        color: filterCategory === c ? 'white' : 'var(--text-secondary)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {c === 'creation' ? 'Creation' : c === 'refonte' ? 'Refonte' : 'Tous'}
                    </button>
                  ))}
                </div>
              )}

              {/* Results table */}
              {filteredResults.length > 0 ? (
                <div style={{
                  background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)', overflow: 'hidden', marginBottom: '16px',
                }}>
                  {/* Table header */}
                  {!isMobile && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '60px 1fr 90px 160px 120px 110px 1fr',
                      padding: '10px 14px', background: 'var(--bg-secondary)',
                      borderBottom: '1px solid var(--border)', gap: '8px',
                    }}>
                      {['Score', 'Nom', 'Type', 'Email', 'Telephone', 'SIRET', 'Raisons'].map((h) => (
                        <span key={h} style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{h}</span>
                      ))}
                    </div>
                  )}

                  {/* Table rows */}
                  {filteredResults.map((result, idx) => {
                    const scoreColor = result.priorityScore >= 60 ? 'var(--danger, #ef4444)'
                      : result.priorityScore >= 30 ? 'var(--warning, #f59e0b)'
                      : 'var(--info, #3b82f6)';
                    const scoreBg = result.priorityScore >= 60 ? 'rgba(239,68,68,0.1)'
                      : result.priorityScore >= 30 ? 'rgba(245,158,11,0.1)'
                      : 'rgba(59,130,246,0.1)';
                    const breakdownItems = Array.isArray(result.breakdown) ? result.breakdown.slice(0, 3) : [];
                    const siret = result.sireneData?.siret ?? null;

                    if (isMobile) {
                      // Mobile card layout
                      return (
                        <div key={result.id} style={{
                          padding: '12px 14px',
                          borderBottom: idx < filteredResults.length - 1 ? '1px solid var(--border-light, var(--border))' : 'none',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                            <span style={{
                              padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                              color: scoreColor, background: scoreBg,
                            }}>
                              {result.priorityScore}
                            </span>
                            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', flex: 1 }}>
                              {result.name}
                            </span>
                            <span style={{
                              fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
                              background: result.category === 'creation' ? 'rgba(34,197,94,0.1)' : 'rgba(99,139,255,0.1)',
                              color: result.category === 'creation' ? 'var(--success, #22c55e)' : 'var(--accent)',
                            }}>
                              {result.category === 'creation' ? 'Creation' : 'Refonte'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            {result.email && (
                              <a href={`mailto:${result.email}`} style={{ fontSize: '11px', color: 'var(--accent)', textDecoration: 'none' }}>
                                {result.email}
                              </a>
                            )}
                            {result.phone && (
                              <a href={`tel:${result.phone}`} style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                                {result.phone}
                              </a>
                            )}
                            {breakdownItems.length > 0 && (
                              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                                {breakdownItems.map((b) => b.label).join(' | ')}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }

                    // Desktop row
                    return (
                      <div key={result.id} style={{
                        display: 'grid',
                        gridTemplateColumns: '60px 1fr 90px 160px 120px 110px 1fr',
                        padding: '10px 14px', gap: '8px', alignItems: 'center',
                        borderBottom: idx < filteredResults.length - 1 ? '1px solid var(--border-light, var(--border))' : 'none',
                        transition: 'background 0.1s',
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-hover)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        {/* Score */}
                        <span style={{
                          padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600,
                          color: scoreColor, background: scoreBg, textAlign: 'center', display: 'inline-block',
                        }}>
                          {result.priorityScore}
                        </span>

                        {/* Nom */}
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {result.name}
                          </div>
                          {result.url && (
                            <a href={result.url} target="_blank" rel="noopener noreferrer" style={{
                              fontSize: '10px', color: 'var(--text-tertiary)', textDecoration: 'none',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block',
                            }}>
                              {result.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                            </a>
                          )}
                        </div>

                        {/* Category */}
                        <span style={{
                          fontSize: '10px', padding: '2px 6px', borderRadius: '4px',
                          background: result.category === 'creation' ? 'rgba(34,197,94,0.1)' : 'rgba(99,139,255,0.1)',
                          color: result.category === 'creation' ? 'var(--success, #22c55e)' : 'var(--accent)',
                          fontWeight: 500, textAlign: 'center',
                        }}>
                          {result.category === 'creation' ? 'Creation' : 'Refonte'}
                        </span>

                        {/* Email */}
                        <div style={{ minWidth: 0 }}>
                          {result.email ? (
                            <a href={`mailto:${result.email}`} style={{
                              fontSize: '11px', color: 'var(--accent)', textDecoration: 'none',
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block',
                            }}>
                              {result.email}
                            </a>
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>-</span>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          {result.phone ? (
                            <a href={`tel:${result.phone}`} style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'none' }}>
                              {result.phone}
                            </a>
                          ) : (
                            <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>-</span>
                          )}
                        </div>

                        {/* SIRET */}
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
                          {siret || '-'}
                        </span>

                        {/* Breakdown */}
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', minWidth: 0 }}>
                          {breakdownItems.map((b, i) => (
                            <span key={i} style={{
                              fontSize: '9px', padding: '1px 5px', borderRadius: '3px',
                              background: 'var(--bg-secondary)', color: 'var(--text-tertiary)',
                              whiteSpace: 'nowrap',
                            }}>
                              {b.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : currentStatus === 'COMPLETED' ? (
                <div style={{
                  textAlign: 'center', padding: '40px 20px', background: 'var(--bg-card)',
                  borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '16px',
                }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    {filterStatus || filterCategory ? 'Aucun resultat avec ces filtres' : 'Aucun resultat pour cette campagne'}
                  </p>
                </div>
              ) : null}

              {/* Action buttons */}
              {currentStatus === 'COMPLETED' && results.length > 0 && (
                <div style={{
                  display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center',
                  background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)', padding: '14px 16px', marginBottom: '16px',
                }}>
                  <button
                    onClick={handleInject}
                    disabled={injecting}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                      background: 'var(--success, #22c55e)', color: 'white', border: 'none', cursor: 'pointer',
                      fontSize: '12px', fontWeight: 500, opacity: injecting ? 0.5 : 1,
                    }}
                  >
                    <Download size={14} /> {injecting ? 'Injection...' : 'Injecter dans le CRM'}
                  </button>

                  {injectResult && (
                    <span style={{ fontSize: '12px', color: 'var(--success, #22c55e)', fontWeight: 500 }}>
                      {injectResult.injected} contact{injectResult.injected !== 1 ? 's' : ''} injecte{injectResult.injected !== 1 ? 's' : ''}
                    </span>
                  )}

                  <div style={{ flex: 1 }} />

                  {!confirmDelete ? (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                        background: 'var(--bg-secondary)', color: 'var(--danger)', border: 'none', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 500,
                      }}
                    >
                      <Trash2 size={14} /> Supprimer
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: 500 }}>Confirmer ?</span>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        style={{
                          padding: '6px 12px', borderRadius: '6px', background: 'var(--danger)', color: 'white',
                          border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 500,
                          opacity: deleting ? 0.5 : 1,
                        }}
                      >
                        {deleting ? '...' : 'Oui'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        style={{
                          padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                          border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 500,
                        }}
                      >
                        Non
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Delete only for failed/pending */}
              {(currentStatus === 'FAILED' || (currentStatus === 'PENDING' && results.length === 0)) && (
                <div style={{
                  display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center',
                  background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)', padding: '14px 16px', marginBottom: '16px',
                }}>
                  {(currentStatus === 'RUNNING' || currentStatus === 'PENDING') && (
                    <button
                      onClick={async () => {
                        await fetch(`/api/portal/prospection/campaigns/${selectedCampaign.id}`, {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ status: 'FAILED', error: 'Arrêtée manuellement' }),
                        });
                        setSelectedCampaign({ ...selectedCampaign, status: 'FAILED' });
                      }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                        background: 'rgba(239,68,68,0.1)', color: 'var(--danger)', border: '1px solid var(--danger)',
                        cursor: 'pointer', fontSize: '12px', fontWeight: 600, marginBottom: '8px',
                      }}
                    >
                      ■ Arrêter la campagne
                    </button>
                  )}
                  {!confirmDelete ? (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px',
                        background: 'var(--bg-secondary)', color: 'var(--danger)', border: 'none', cursor: 'pointer',
                        fontSize: '12px', fontWeight: 500,
                      }}
                    >
                      <Trash2 size={14} /> Supprimer la campagne
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--danger)', fontWeight: 500 }}>Confirmer la suppression ?</span>
                      <button
                        onClick={handleDelete}
                        disabled={deleting}
                        style={{
                          padding: '6px 12px', borderRadius: '6px', background: 'var(--danger)', color: 'white',
                          border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 500,
                          opacity: deleting ? 0.5 : 1,
                        }}
                      >
                        {deleting ? '...' : 'Oui, supprimer'}
                      </button>
                      <button
                        onClick={() => setConfirmDelete(false)}
                        style={{
                          padding: '6px 12px', borderRadius: '6px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
                          border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 500,
                        }}
                      >
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* ─── CSS animations ─── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
