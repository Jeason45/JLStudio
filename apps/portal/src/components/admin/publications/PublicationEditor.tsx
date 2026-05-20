'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Send, Calendar as CalendarIcon, Trash2, ImagePlus, X } from 'lucide-react';

type Platform = 'LINKEDIN' | 'INSTAGRAM_FEED' | 'INSTAGRAM_STORY' | 'INSTAGRAM_REEL';
type TargetStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHING' | 'PUBLISHED' | 'FAILED' | 'CANCELLED';
type CampaignStatus = 'DRAFT' | 'SCHEDULED' | 'ACTIVE' | 'PUBLISHED' | 'ARCHIVED';

const PLATFORMS: { value: Platform; label: string; color: string; mediaRequired: boolean }[] = [
  { value: 'LINKEDIN',         label: 'LinkedIn',         color: '#0A66C2', mediaRequired: false },
  { value: 'INSTAGRAM_FEED',   label: 'Instagram Feed',   color: '#E1306C', mediaRequired: true },
  { value: 'INSTAGRAM_STORY',  label: 'Instagram Story',  color: '#F77737', mediaRequired: true },
  { value: 'INSTAGRAM_REEL',   label: 'Instagram Reel',   color: '#FE7BAC', mediaRequired: true },
];

interface MediaItem {
  id: string;
  url: string;
  thumbnailUrl: string | null;
  filename: string;
  mimeType: string;
  width: number | null;
  height: number | null;
}

interface TargetState {
  id?: string; // existant côté DB si update
  platform: Platform;
  content: Record<string, unknown>;
  scheduledAt: string | null; // ISO datetime-local
  status: TargetStatus;
  mediaIds: string[];
  publicUrl?: string | null;
  externalId?: string | null;
  errorMessage?: string | null;
  attempts?: number;
}

interface CampaignInitial {
  id?: string;
  title: string;
  description: string;
  status: CampaignStatus;
  isPinnedToCRM: boolean;
  targets: TargetState[];
}

interface Props {
  initial?: CampaignInitial;
  mode: 'create' | 'edit';
}

const DEFAULT_INITIAL: CampaignInitial = {
  title: '',
  description: '',
  status: 'DRAFT',
  isPinnedToCRM: false,
  targets: [],
};

function buildDefaultContent(platform: Platform): Record<string, unknown> {
  switch (platform) {
    case 'LINKEDIN':         return { platform, text: '', hashtags: [], firstCommentText: '' };
    case 'INSTAGRAM_FEED':   return { platform, caption: '', hashtags: [], altText: '', location: '' };
    case 'INSTAGRAM_STORY':  return { platform, link: '', stickerText: '' };
    case 'INSTAGRAM_REEL':   return { platform, caption: '', hashtags: [], audioCredit: '' };
  }
}

export default function PublicationEditor({ initial, mode }: Props) {
  const router = useRouter();
  const [campaign, setCampaign] = useState<CampaignInitial>(initial || DEFAULT_INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);
  const [mediaPickerTargetIdx, setMediaPickerTargetIdx] = useState<number | null>(null);

  // Fetch media library une fois
  useEffect(() => {
    fetch('/api/admin/media', { headers: { 'x-portal-super-admin': 'true' } })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setMediaLibrary(Array.isArray(data) ? data : []))
      .catch(() => setMediaLibrary([]));
  }, []);

  const togglePlatform = (platform: Platform) => {
    setCampaign((prev) => {
      const existing = prev.targets.find((t) => t.platform === platform);
      if (existing) {
        return { ...prev, targets: prev.targets.filter((t) => t.platform !== platform) };
      }
      return {
        ...prev,
        targets: [...prev.targets, {
          platform,
          content: buildDefaultContent(platform),
          scheduledAt: null,
          status: 'DRAFT' as TargetStatus,
          mediaIds: [],
        }],
      };
    });
  };

  const updateTarget = (idx: number, patch: Partial<TargetState>) => {
    setCampaign((prev) => ({
      ...prev,
      targets: prev.targets.map((t, i) => (i === idx ? { ...t, ...patch } : t)),
    }));
  };

  const updateTargetContent = (idx: number, key: string, value: unknown) => {
    setCampaign((prev) => ({
      ...prev,
      targets: prev.targets.map((t, i) =>
        i === idx ? { ...t, content: { ...t.content, [key]: value } } : t,
      ),
    }));
  };

  const handleHashtagsChange = (idx: number, raw: string) => {
    const hashtags = raw
      .split(/[\s,]+/)
      .map((h) => h.replace(/^#/, '').trim())
      .filter((h) => h.length > 0)
      .slice(0, 30);
    updateTargetContent(idx, 'hashtags', hashtags);
  };

  // ─── Save : 3 niveaux ───────────────────────────────
  // saveAs('draft')      → status DRAFT (campaign + targets)
  // saveAs('scheduled')  → status SCHEDULED (campaign + targets dont scheduledAt non null)
  // saveAs('now')        → status SCHEDULED, scheduledAt = now (n8n publiera < 5min)
  const save = useCallback(async (mode: 'draft' | 'scheduled' | 'now') => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    if (!campaign.title.trim()) {
      setError('Titre requis');
      setLoading(false);
      return;
    }
    if (campaign.targets.length === 0) {
      setError('Sélectionne au moins une plateforme');
      setLoading(false);
      return;
    }

    // Validation média obligatoire pour stories/reels
    for (const t of campaign.targets) {
      const cfg = PLATFORMS.find((p) => p.value === t.platform);
      if (cfg?.mediaRequired && t.mediaIds.length === 0 && (mode !== 'draft')) {
        setError(`${cfg.label} exige au moins 1 média`);
        setLoading(false);
        return;
      }
    }

    const headers = { 'Content-Type': 'application/json', 'x-portal-super-admin': 'true' };

    try {
      // Étape 1 : create or update campaign
      const campaignBody = {
        title: campaign.title.trim(),
        description: campaign.description.trim() || undefined,
        isPinnedToCRM: campaign.isPinnedToCRM,
        status: mode === 'draft' ? 'DRAFT' : 'SCHEDULED',
      };

      const url = campaign.id ? `/api/admin/publications/${campaign.id}` : '/api/admin/publications';
      const method = campaign.id ? 'PATCH' : 'POST';
      const cRes = await fetch(url, { method, headers, body: JSON.stringify(campaignBody) });
      if (!cRes.ok) {
        const j = await cRes.json().catch(() => ({}));
        throw new Error(j.error || `Erreur ${cRes.status}`);
      }
      const savedCampaign = await cRes.json();
      const campaignId = savedCampaign.id as string;

      // Étape 2 : sync targets (create new ones, update existing, delete removed)
      // Pour simplicité MVP : on supprime tous les targets existants et on recrée
      // (le user éditera ses brouillons → workflow acceptable)
      if (campaign.id && savedCampaign.targets) {
        for (const existingTarget of savedCampaign.targets) {
          await fetch(`/api/admin/publications/${campaignId}/targets/${existingTarget.id}`, {
            method: 'DELETE',
            headers,
          }).catch(() => {});
        }
      }

      for (const t of campaign.targets) {
        const scheduledAt = mode === 'now'
          ? new Date().toISOString()
          : t.scheduledAt
            ? new Date(t.scheduledAt).toISOString()
            : null;

        const targetStatus: TargetStatus =
          mode === 'draft' ? 'DRAFT'
          : mode === 'now' ? 'SCHEDULED'
          : scheduledAt ? 'SCHEDULED' : 'DRAFT';

        const targetBody = {
          platform: t.platform,
          content: t.content,
          scheduledAt,
          status: targetStatus,
          mediaIds: t.mediaIds,
        };
        const tRes = await fetch(`/api/admin/publications/${campaignId}/targets`, {
          method: 'POST',
          headers,
          body: JSON.stringify(targetBody),
        });
        if (!tRes.ok) {
          const j = await tRes.json().catch(() => ({}));
          throw new Error(j.error || `Erreur target ${t.platform}`);
        }
      }

      const successLabel =
        mode === 'draft'     ? 'Brouillon enregistré ✓'
        : mode === 'scheduled' ? 'Publication planifiée ✓'
        : 'Publication envoyée (sera publiée dans < 5 min) ✓';
      setSuccessMsg(successLabel);

      // En mode create on redirige vers la page d'édition (qui rechargera
      // les bonnes data + scheduledAt converti en local). En mode edit on reste
      // sur la page actuelle et on refresh, le toast restera visible 3s.
      if (!campaign.id) {
        router.push(`/admin/publications/${campaignId}`);
        router.refresh();
      } else {
        router.refresh();
        setTimeout(() => setSuccessMsg(null), 3500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  }, [campaign, router]);

  // ─── Render ─────────────────────────────────────────
  const selectedPlatforms = new Set(campaign.targets.map((t) => t.platform));

  return (
    <div style={{ width: '100%' }}>
      {/* Métadonnées campagne */}
      <section style={{ marginBottom: 24 }}>
        <label style={labelStyle()}>Titre interne</label>
        <input
          type="text"
          value={campaign.title}
          onChange={(e) => setCampaign({ ...campaign, title: e.target.value })}
          placeholder="ex. Annonce launch v3"
          style={inputStyle()}
        />
        <label style={{ ...labelStyle(), marginTop: 12 }}>Notes internes (non publiées)</label>
        <textarea
          value={campaign.description}
          onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
          placeholder="Contexte, brief, idée de visuel…"
          rows={2}
          style={{ ...inputStyle(), resize: 'vertical', minHeight: 60 }}
        />
      </section>

      {/* Sélection plateformes */}
      <section style={{ marginBottom: 20 }}>
        <h2 style={sectionTitle()}>Réseaux cibles</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PLATFORMS.map((p) => {
            const active = selectedPlatforms.has(p.value);
            return (
              <button
                key={p.value}
                type="button"
                onClick={() => togglePlatform(p.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 10,
                  border: `1px solid ${active ? p.color : 'var(--agency-border)'}`,
                  background: active ? `${p.color}15` : 'var(--agency-surface-2)',
                  color: active ? p.color : 'var(--agency-ink-2)',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  transition: 'all 0.15s',
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                {p.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Panels par plateforme */}
      {campaign.targets.map((target, idx) => {
        const cfg = PLATFORMS.find((p) => p.value === target.platform)!;
        return (
          <section key={target.platform} style={{
            background: 'var(--agency-surface-1)',
            border: `1px solid ${cfg.color}30`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
          }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: cfg.color }} />
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--agency-ink-1)' }}>
                  {cfg.label}
                </h3>
                <StatusBadge status={target.status} />
              </div>
              <button
                type="button"
                onClick={() => togglePlatform(target.platform)}
                style={{ background: 'transparent', border: 'none', color: 'var(--agency-ink-3)', cursor: 'pointer', padding: 4 }}
                title="Retirer cette plateforme"
              >
                <Trash2 size={14} />
              </button>
            </header>

            {/* Champs spécifiques plateforme */}
            <PlatformFields target={target} idx={idx} onUpdate={updateTargetContent} onHashtags={handleHashtagsChange} />

            {/* Médias */}
            <div style={{ marginTop: 12 }}>
              <label style={labelStyle()}>
                Médias {cfg.mediaRequired ? <span style={{ color: cfg.color }}>*</span> : <span style={{ color: 'var(--agency-ink-4)', fontWeight: 400 }}>(optionnel)</span>}
              </label>
              <MediaPickerInline
                targetIdx={idx}
                target={target}
                library={mediaLibrary}
                onUpdate={(mediaIds) => updateTarget(idx, { mediaIds })}
                onOpenPicker={() => setMediaPickerTargetIdx(idx)}
              />
            </div>

            {/* ScheduledAt */}
            <div style={{ marginTop: 12 }}>
              <label style={labelStyle()}>
                <CalendarIcon size={11} style={{ display: 'inline', marginRight: 4 }} />
                Date/heure de publication (vide = brouillon)
              </label>
              <input
                type="datetime-local"
                value={target.scheduledAt || ''}
                onChange={(e) => updateTarget(idx, { scheduledAt: e.target.value || null })}
                style={inputStyle()}
              />
            </div>

            {/* Si publié, infos en lecture seule */}
            {target.publicUrl && (
              <div style={{ marginTop: 12, padding: 10, background: 'var(--agency-surface-2)', borderRadius: 8 }}>
                <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', margin: 0, marginBottom: 4 }}>Lien live :</p>
                <a href={target.publicUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: cfg.color, wordBreak: 'break-all' }}>
                  {target.publicUrl}
                </a>
              </div>
            )}
            {target.errorMessage && (
              <div style={{ marginTop: 12, padding: 10, background: '#7f1d1d22', border: '1px solid #ef444444', borderRadius: 8 }}>
                <p style={{ fontSize: 12, color: '#fca5a5', margin: 0 }}>
                  ❌ {target.errorMessage} {target.attempts ? `(${target.attempts} tentative${target.attempts > 1 ? 's' : ''})` : ''}
                </p>
              </div>
            )}
          </section>
        );
      })}

      {/* Modal Media Picker */}
      {mediaPickerTargetIdx !== null && (
        <MediaPickerModal
          library={mediaLibrary}
          selectedIds={campaign.targets[mediaPickerTargetIdx]?.mediaIds || []}
          onClose={() => setMediaPickerTargetIdx(null)}
          onSelect={(ids) => {
            updateTarget(mediaPickerTargetIdx, { mediaIds: ids });
            setMediaPickerTargetIdx(null);
          }}
        />
      )}

      {/* Erreur globale */}
      {error && (
        <div style={{ padding: 12, background: '#7f1d1d33', border: '1px solid #ef444466', borderRadius: 8, marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: '#fca5a5', margin: 0 }}>{error}</p>
        </div>
      )}

      {/* Succès — toast persistant en haut, non-bloquant */}
      {successMsg && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1100,
            padding: '10px 14px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: 8,
            color: '#86efac',
            fontSize: 13,
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {successMsg}
        </div>
      )}

      {/* Footer actions */}
      <footer style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', flexWrap: 'wrap', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--agency-border)' }}>
        <button type="button" onClick={() => save('draft')} disabled={loading} style={secondaryBtn()}>
          <Save size={13} /> Enregistrer brouillon
        </button>
        <button type="button" onClick={() => save('scheduled')} disabled={loading} style={secondaryBtn()}>
          <CalendarIcon size={13} /> Valider & planifier
        </button>
        <button type="button" onClick={() => save('now')} disabled={loading} style={primaryBtn()}>
          <Send size={13} /> Publier maintenant
        </button>
      </footer>
    </div>
  );
}

// ─── PlatformFields ──────────────────────────────────────────────────
function PlatformFields({ target, idx, onUpdate, onHashtags }: {
  target: TargetState;
  idx: number;
  onUpdate: (idx: number, key: string, value: unknown) => void;
  onHashtags: (idx: number, raw: string) => void;
}) {
  const c = target.content as Record<string, unknown>;
  const hashtagsString = Array.isArray(c.hashtags) ? (c.hashtags as string[]).map((h) => `#${h}`).join(' ') : '';

  switch (target.platform) {
    case 'LINKEDIN':
      return (
        <>
          <label style={labelStyle()}>Texte du post <span style={{ color: 'var(--agency-ink-4)' }}>({(c.text as string)?.length || 0}/3000)</span></label>
          <textarea
            value={(c.text as string) || ''}
            onChange={(e) => onUpdate(idx, 'text', e.target.value)}
            rows={4}
            placeholder="Votre publication LinkedIn…"
            style={{ ...inputStyle(), resize: 'vertical', minHeight: 100 }}
          />
          <label style={{ ...labelStyle(), marginTop: 10 }}>Hashtags <span style={{ color: 'var(--agency-ink-4)' }}>(séparés par espace ou virgule)</span></label>
          <input
            type="text"
            defaultValue={hashtagsString}
            onBlur={(e) => onHashtags(idx, e.target.value)}
            placeholder="#freelance #webdesign"
            style={inputStyle()}
          />
          <label style={{ ...labelStyle(), marginTop: 10 }}>Premier commentaire <span style={{ color: 'var(--agency-ink-4)' }}>(optionnel)</span></label>
          <textarea
            value={(c.firstCommentText as string) || ''}
            onChange={(e) => onUpdate(idx, 'firstCommentText', e.target.value)}
            rows={2}
            placeholder="Posté automatiquement en 1er commentaire"
            style={{ ...inputStyle(), resize: 'vertical', minHeight: 50 }}
          />
        </>
      );

    case 'INSTAGRAM_FEED':
    case 'INSTAGRAM_REEL':
      return (
        <>
          <label style={labelStyle()}>Caption <span style={{ color: 'var(--agency-ink-4)' }}>({(c.caption as string)?.length || 0}/2200)</span></label>
          <textarea
            value={(c.caption as string) || ''}
            onChange={(e) => onUpdate(idx, 'caption', e.target.value)}
            rows={3}
            style={{ ...inputStyle(), resize: 'vertical', minHeight: 80 }}
          />
          <label style={{ ...labelStyle(), marginTop: 10 }}>Hashtags (max 30)</label>
          <input
            type="text"
            defaultValue={hashtagsString}
            onBlur={(e) => onHashtags(idx, e.target.value)}
            placeholder="#freelance #webdesign #bordeaux"
            style={inputStyle()}
          />
          {target.platform === 'INSTAGRAM_FEED' && (
            <>
              <label style={{ ...labelStyle(), marginTop: 10 }}>Alt text (accessibilité)</label>
              <input
                type="text"
                value={(c.altText as string) || ''}
                onChange={(e) => onUpdate(idx, 'altText', e.target.value)}
                style={inputStyle()}
              />
            </>
          )}
          {target.platform === 'INSTAGRAM_REEL' && (
            <>
              <label style={{ ...labelStyle(), marginTop: 10 }}>Crédit audio</label>
              <input
                type="text"
                value={(c.audioCredit as string) || ''}
                onChange={(e) => onUpdate(idx, 'audioCredit', e.target.value)}
                style={inputStyle()}
              />
            </>
          )}
        </>
      );

    case 'INSTAGRAM_STORY':
      return (
        <>
          <label style={labelStyle()}>Lien (sticker swipe up) <span style={{ color: 'var(--agency-ink-4)' }}>(optionnel)</span></label>
          <input
            type="url"
            value={(c.link as string) || ''}
            onChange={(e) => onUpdate(idx, 'link', e.target.value)}
            placeholder="https://jlstudio.dev/carte"
            style={inputStyle()}
          />
          <label style={{ ...labelStyle(), marginTop: 10 }}>Texte sticker <span style={{ color: 'var(--agency-ink-4)' }}>(optionnel)</span></label>
          <input
            type="text"
            value={(c.stickerText as string) || ''}
            onChange={(e) => onUpdate(idx, 'stickerText', e.target.value)}
            placeholder="Ex. SWIPE UP"
            style={inputStyle()}
          />
          <p style={{ fontSize: 11, color: 'var(--agency-ink-3)', marginTop: 8, margin: 0 }}>
            📏 Format requis : 9:16 (1080×1920px) — vérifie tes médias
          </p>
        </>
      );
  }
}

// ─── Media picker inline (preview + bouton "Choisir") ────────────────
function MediaPickerInline({ target, library, onUpdate, onOpenPicker }: {
  targetIdx: number;
  target: TargetState;
  library: MediaItem[];
  onUpdate: (mediaIds: string[]) => void;
  onOpenPicker: () => void;
}) {
  const selected = target.mediaIds
    .map((id) => library.find((m) => m.id === id))
    .filter(Boolean) as MediaItem[];

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {selected.map((m) => (
          <div key={m.id} style={{ position: 'relative', width: 72, height: 72, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--agency-border)' }}>
            {m.mimeType.startsWith('image') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.thumbnailUrl || m.url} alt={m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ width: '100%', height: '100%', background: 'var(--agency-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                Vidéo
              </div>
            )}
            <button
              type="button"
              onClick={() => onUpdate(target.mediaIds.filter((id) => id !== m.id))}
              style={{ position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Retirer"
            >
              <X size={10} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={onOpenPicker}
          style={{
            width: 72, height: 72, borderRadius: 8,
            border: '1px dashed var(--agency-border-strong)',
            background: 'transparent', color: 'var(--agency-ink-3)',
            cursor: 'pointer', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 2,
          }}
        >
          <ImagePlus size={16} />
          <span style={{ fontSize: 9 }}>Ajouter</span>
        </button>
      </div>
    </div>
  );
}

// ─── Modal media picker ──────────────────────────────────────────────
function MediaPickerModal({ library, selectedIds, onClose, onSelect }: {
  library: MediaItem[];
  selectedIds: string[];
  onClose: () => void;
  onSelect: (ids: string[]) => void;
}) {
  const [current, setCurrent] = useState<string[]>(selectedIds);
  const toggle = (id: string) => {
    setCurrent((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--agency-surface-1)', border: '1px solid var(--agency-border)', borderRadius: 12, maxWidth: 800, width: '100%', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <header style={{ padding: 16, borderBottom: '1px solid var(--agency-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: 15 }}>Choisir des médias</h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--agency-ink-2)', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </header>
        <div style={{ padding: 16, overflow: 'auto', flex: 1 }}>
          {library.length === 0 ? (
            <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, textAlign: 'center', padding: 40 }}>
              Aucun média dans la bibliothèque. Upload-en via /admin/media (à venir).
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 8 }}>
              {library.map((m) => {
                const sel = current.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggle(m.id)}
                    style={{
                      position: 'relative',
                      aspectRatio: '1',
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: sel ? '2px solid var(--agency-accent)' : '1px solid var(--agency-border)',
                      background: 'var(--agency-surface-2)',
                      cursor: 'pointer',
                      padding: 0,
                    }}
                  >
                    {m.mimeType.startsWith('image') ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.thumbnailUrl || m.url} alt={m.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--agency-ink-2)' }}>
                        Vidéo
                      </div>
                    )}
                    {sel && <div style={{ position: 'absolute', top: 4, right: 4, width: 18, height: 18, borderRadius: '50%', background: 'var(--agency-accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✓</div>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        <footer style={{ padding: 12, borderTop: '1px solid var(--agency-border)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={secondaryBtn()}>Annuler</button>
          <button onClick={() => onSelect(current)} style={primaryBtn()}>Valider ({current.length})</button>
        </footer>
      </div>
    </div>
  );
}

// ─── StatusBadge ─────────────────────────────────────────────────────
function StatusBadge({ status }: { status: TargetStatus }) {
  const cfg: Record<TargetStatus, { label: string; color: string; bg: string }> = {
    DRAFT:      { label: 'Brouillon',   color: '#94a3b8', bg: '#94a3b822' },
    SCHEDULED:  { label: 'Planifié',    color: '#3b82f6', bg: '#3b82f622' },
    PUBLISHING: { label: 'En cours…',   color: '#f59e0b', bg: '#f59e0b22' },
    PUBLISHED:  { label: 'Publié',      color: '#22c55e', bg: '#22c55e22' },
    FAILED:     { label: 'Échec',       color: '#ef4444', bg: '#ef444422' },
    CANCELLED:  { label: 'Annulé',      color: '#71717a', bg: '#71717a22' },
  };
  const c = cfg[status];
  return (
    <span style={{ fontSize: 10, fontWeight: 600, color: c.color, background: c.bg, padding: '2px 8px', borderRadius: 10, letterSpacing: 0.2 }}>
      {c.label}
    </span>
  );
}

// ─── Styles helpers ──────────────────────────────────────────────────
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
function labelStyle(): React.CSSProperties {
  return {
    display: 'block', fontSize: 11, fontWeight: 600,
    color: 'var(--agency-ink-2)', marginBottom: 6,
    letterSpacing: 0.2, textTransform: 'uppercase' as const,
  };
}
function sectionTitle(): React.CSSProperties {
  return { fontSize: 13, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, marginBottom: 10 };
}
function primaryBtn(): React.CSSProperties {
  return {
    padding: '8px 14px', borderRadius: 8, border: 'none',
    background: 'var(--agency-accent)', color: 'white',
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  };
}
function secondaryBtn(): React.CSSProperties {
  return {
    padding: '8px 14px', borderRadius: 8,
    border: '1px solid var(--agency-border)',
    background: 'var(--agency-surface-2)',
    color: 'var(--agency-ink-1)',
    fontSize: 13, fontWeight: 500, cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6,
  };
}
