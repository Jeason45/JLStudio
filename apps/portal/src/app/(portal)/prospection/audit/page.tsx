'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Globe, Shield, Zap, Eye, CheckCircle, XCircle, AlertTriangle, Leaf } from 'lucide-react';

interface AuditResult {
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
  ssl: { isValid: boolean; protocol: string | null; daysUntilExpiry: number | null; isExpiringSoon: boolean } | null;
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
  emails: string[];
  sirene: { siret: string | null; dateCreation: string | null; effectif: string | null; libelleNAF: string | null } | null;
}

function ScoreCircle({ score, label, size = 80 }: { score: number | null; label: string; size?: number }) {
  const color = score === null ? 'var(--text-tertiary)' : score >= 90 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const bg = score === null ? 'var(--bg-secondary)' : score >= 90 ? 'rgba(34,197,94,0.1)' : score >= 50 ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)';
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        width: size, height: size, borderRadius: '50%', background: bg,
        border: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 8px',
      }}>
        <span style={{ fontSize: size * 0.35, fontWeight: 700, color }}>{score ?? '—'}</span>
      </div>
      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function Check({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 0', fontSize: '13px' }}>
      {ok ? <CheckCircle size={16} color="#22c55e" /> : <XCircle size={16} color="#ef4444" />}
      <span style={{ color: 'var(--text-primary)' }}>{label}</span>
    </div>
  );
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

export default function AuditPage() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audit, setAudit] = useState<AuditResult | null>(null);
  const [autoStarted, setAutoStarted] = useState(false);

  // Auto-fill from query params (from search page "Auditer" button)
  useEffect(() => {
    const paramUrl = searchParams.get('url');
    const paramName = searchParams.get('name');
    if (paramUrl && !autoStarted) {
      setUrl(paramUrl);
      if (paramName) setCompanyName(paramName);
      setAutoStarted(true);
    }
  }, [searchParams, autoStarted]);

  const runAudit = async () => {
    if (!url) return;
    setLoading(true);
    setError('');
    setAudit(null);

    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http')) fullUrl = `https://${fullUrl}`;

    try {
      const res = await fetch('/api/portal/prospection/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: fullUrl, companyName: companyName || undefined }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setAudit(data);
    } catch (err) {
      setError('Erreur de connexion');
    }
    setLoading(false);
  };

  const cardStyle: React.CSSProperties = {
    background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border)',
    padding: '20px', boxShadow: 'var(--shadow-card)',
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Search size={20} color="var(--accent)" />
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Audit de site web</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>Analyse complete d'un site pour la prospection</p>
        </div>
      </div>

      {/* Input */}
      <div style={{ ...cardStyle, marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="URL du site (ex: restaurant-bordeaux.fr)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && runAudit()}
            style={{
              flex: '1 1 300px', padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
              background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Nom entreprise (optionnel)"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            style={{
              flex: '0 1 200px', padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
              background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)',
              outline: 'none',
            }}
          />
          <button
            onClick={runAudit}
            disabled={loading || !url}
            style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: loading ? 'wait' : 'pointer',
              background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: '14px',
              opacity: loading || !url ? 0.5 : 1,
            }}
          >
            {loading ? 'Analyse en cours...' : 'Lancer l\'audit'}
          </button>
        </div>
        {loading && (
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
            L'audit complet prend environ 30-60 secondes (PageSpeed, W3C, SSL, Carbon...)
          </div>
        )}
        {error && (
          <div style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '12px' }}>
            {error}
          </div>
        )}
      </div>

      {/* Results */}
      {audit && (
        <>
          {/* Scores */}
          <div style={{ ...cardStyle, marginBottom: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
              <Globe size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {audit.url}
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '16px' }}>
              <ScoreCircle score={audit.mobileScore} label="Performance" />
              <ScoreCircle score={audit.mobileAccessibility} label="Accessibilite" />
              <ScoreCircle score={audit.mobileSEO} label="SEO" />
              <ScoreCircle score={audit.mobileBestPractices} label="Bonnes pratiques" />
              <ScoreCircle score={audit.desktopScore} label="Desktop" size={60} />
            </div>
          </div>

          {/* Core Web Vitals */}
          <div style={{ ...cardStyle, marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
              <Zap size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              Core Web Vitals (Mobile)
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
              {[
                { label: 'FCP', value: formatMs(audit.mobileFCP), good: (audit.mobileFCP ?? 9999) < 1800 },
                { label: 'LCP', value: formatMs(audit.mobileLCP), good: (audit.mobileLCP ?? 9999) < 2500 },
                { label: 'TBT', value: formatMs(audit.mobileTBT), good: (audit.mobileTBT ?? 9999) < 200 },
                { label: 'CLS', value: audit.mobileCLS?.toFixed(3) ?? '—', good: (audit.mobileCLS ?? 1) < 0.1 },
                { label: 'SI', value: formatMs(audit.mobileSI), good: (audit.mobileSI ?? 9999) < 3400 },
              ].map(v => (
                <div key={v.label} style={{ textAlign: 'center', padding: '10px', borderRadius: '8px', background: v.good ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: v.good ? '#22c55e' : '#ef4444' }}>{v.value}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{v.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Screenshot + Tech */}
          <div style={{ display: 'grid', gridTemplateColumns: audit.mobileScreenshot ? '200px 1fr' : '1fr', gap: '16px', marginBottom: '16px' }}>
            {audit.mobileScreenshot && (
              <div style={cardStyle}>
                <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  <Eye size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                  Apercu mobile
                </h3>
                <img src={audit.mobileScreenshot} alt="Screenshot mobile" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--border)' }} />
              </div>
            )}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>Technique</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 16px' }}>
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
              {audit.cmsDetected && <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>CMS: {audit.cmsDetected}</div>}
              {audit.loadTimeMs && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Temps de chargement: {formatMs(audit.loadTimeMs)}</div>}
              {audit.totalByteWeight && <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Poids total: {formatBytes(audit.totalByteWeight)} ({audit.totalRequestCount ?? '?'} requetes)</div>}
            </div>
          </div>

          {/* Security */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div style={cardStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                <Shield size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Securite
              </h3>
              {audit.ssl && (
                <div style={{ marginBottom: '8px', fontSize: '12px' }}>
                  <Check ok={audit.ssl.isValid} label={`SSL ${audit.ssl.protocol || ''}`} />
                  {audit.ssl.daysUntilExpiry !== null && (
                    <div style={{ color: audit.ssl.isExpiringSoon ? '#ef4444' : 'var(--text-secondary)', fontSize: '11px', marginLeft: '24px' }}>
                      Expire dans {audit.ssl.daysUntilExpiry} jours
                    </div>
                  )}
                </div>
              )}
              {audit.securityHeaders && (
                <>
                  <div style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)', margin: '8px 0 4px' }}>
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
                <div style={{ marginTop: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Mozilla Observatory: <strong style={{ color: ['A', 'A+', 'B'].includes(audit.observatoryGrade) ? '#22c55e' : '#ef4444' }}>{audit.observatoryGrade}</strong>
                </div>
              )}
            </div>

            <div style={cardStyle}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                <Leaf size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                Environnement & Qualite
              </h3>
              {audit.carbon && (
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    Carbone: <strong style={{ color: ['A', 'B'].includes(audit.carbon.rating || '') ? '#22c55e' : '#ef4444' }}>{audit.carbon.rating || '—'}</strong>
                    {audit.carbon.co2PerView !== null && ` (${audit.carbon.co2PerView.toFixed(2)}g CO2/vue)`}
                  </div>
                  {audit.carbon.cleanerThan !== null && (
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Plus propre que {audit.carbon.cleanerThan}% des sites</div>
                  )}
                  <Check ok={audit.carbon.isGreen} label="Hebergement vert" />
                </div>
              )}
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                W3C: <strong style={{ color: audit.w3cErrors > 20 ? '#ef4444' : 'var(--text-primary)' }}>{audit.w3cErrors} erreurs</strong>, {audit.w3cWarnings} warnings
              </div>
              {audit.yellowLabScore !== null && (
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Yellow Lab: <strong style={{ color: audit.yellowLabScore >= 60 ? '#22c55e' : '#ef4444' }}>{audit.yellowLabScore}/100</strong>
                </div>
              )}
              {audit.yellowLabTopIssues.length > 0 && (
                <div style={{ marginTop: '6px' }}>
                  {audit.yellowLabTopIssues.slice(0, 3).map((issue, i) => (
                    <div key={i} style={{ fontSize: '11px', color: 'var(--text-tertiary)', padding: '2px 0' }}>• {issue}</div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Heaviest Resources */}
          {audit.heaviestResources && audit.heaviestResources.length > 0 && (
            <div style={{ ...cardStyle, marginBottom: '16px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
                <AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '6px', color: '#f59e0b' }} />
                Ressources les plus lourdes
              </h3>
              {audit.heaviestResources.map((r, i) => {
                const sizeStr = r.size < 1024 ? `${r.size}B` : r.size < 1024 * 1024 ? `${(r.size / 1024).toFixed(0)}KB` : `${(r.size / (1024 * 1024)).toFixed(1)}MB`;
                const barWidth = Math.min(100, (r.size / (audit.heaviestResources[0]?.size || 1)) * 100);
                const filename = r.url.split('/').pop()?.split('?')[0] || r.url;
                return (
                  <div key={i} style={{ padding: '6px 0', borderBottom: i < audit.heaviestResources.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-primary)', maxWidth: '70%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={r.url}>
                        {filename}
                      </span>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: r.size > 500000 ? '#ef4444' : r.size > 100000 ? '#f59e0b' : 'var(--text-secondary)' }}>
                        {sizeStr}
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '4px', borderRadius: '2px', background: 'var(--bg-secondary)' }}>
                      <div style={{ width: `${barWidth}%`, height: '100%', borderRadius: '2px', background: r.size > 500000 ? '#ef4444' : r.size > 100000 ? '#f59e0b' : 'var(--accent)' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Audits détaillés */}
          {[
            { title: 'Problemes de performance', audits: audit.mobilePerformanceAudits, color: '#ef4444' },
            { title: 'Problemes d\'accessibilite', audits: audit.mobileAccessibilityAudits, color: '#8b5cf6' },
            { title: 'Problemes SEO', audits: audit.mobileSEOAudits, color: '#3b82f6' },
            { title: 'Problemes de bonnes pratiques', audits: audit.mobileBestPracticesAudits, color: '#f59e0b' },
          ].filter(s => s.audits.length > 0).map(section => (
            <div key={section.title} style={{ ...cardStyle, marginBottom: '16px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '12px' }}>
                <AlertTriangle size={14} style={{ verticalAlign: 'middle', marginRight: '6px', color: section.color }} />
                {section.title}
                <span style={{ fontSize: '11px', fontWeight: 400, color: 'var(--text-tertiary)', marginLeft: '8px' }}>
                  {section.audits.length} probleme{section.audits.length > 1 ? 's' : ''}
                </span>
              </h3>
              {section.audits.map((a, i) => {
                const scoreColor = a.score === null ? 'var(--text-tertiary)' : a.score === 0 ? '#ef4444' : '#f59e0b';
                return (
                  <div key={a.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '8px 10px', marginBottom: '4px', borderRadius: '6px',
                    background: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <div style={{
                        width: '6px', height: '6px', borderRadius: '50%', flexShrink: 0,
                        background: scoreColor,
                      }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-primary)' }}>{a.title}</span>
                    </div>
                    {a.displayValue && (
                      <span style={{
                        fontSize: '11px', fontWeight: 600, color: scoreColor,
                        padding: '2px 8px', borderRadius: '4px',
                        background: a.score === 0 ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                        whiteSpace: 'nowrap', marginLeft: '8px',
                      }}>
                        {a.displayValue}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Social + Email + SIRENE */}
          <div style={{ ...cardStyle, marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>Presence en ligne</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '12px' }}>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Reseaux sociaux ({audit.socialPresence.count})</div>
                {Object.entries(audit.socialPresence.links).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} style={{ color: 'var(--accent)', fontSize: '11px' }}>{k}</div>
                ))}
                {audit.socialPresence.count === 0 && <div style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Aucun detecte</div>}
              </div>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>Email</div>
                {audit.primaryEmail ? (
                  <a href={`mailto:${audit.primaryEmail}`} style={{ color: 'var(--accent)', fontSize: '11px', textDecoration: 'none' }}>{audit.primaryEmail}</a>
                ) : (
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>Non trouve</div>
                )}
              </div>
              <div>
                <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>SIRENE</div>
                {audit.sirene ? (
                  <>
                    {audit.sirene.siret && <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>SIRET: {audit.sirene.siret}</div>}
                    {audit.sirene.dateCreation && <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Cree: {audit.sirene.dateCreation}</div>}
                    {audit.sirene.libelleNAF && <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{audit.sirene.libelleNAF}</div>}
                  </>
                ) : (
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '11px' }}>—</div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
