'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Users, Eye, Timer, ArrowUpRight, Monitor, Smartphone, Tablet, Globe, RefreshCw } from 'lucide-react';
import { useAgencySidebar } from '@/components/admin/SidebarContext';

interface AnalyticsData {
  active: { x: number };
  stats: {
    pageviews: { value: number };
    visitors: { value: number };
    bounces: { value: number };
    totaltime: { value: number };
  };
  pageviews: {
    pageviews: { x: string; y: number }[];
    sessions: { x: string; y: number }[];
  };
  topPages: { x: string; y: number }[];
  topReferrers: { x: string; y: number }[];
  devices: { x: string; y: number }[];
  countries: { x: string; y: number }[];
  browsers: { x: string; y: number }[];
}

const PERIODS = [
  { label: '7j', days: 7 },
  { label: '30j', days: 30 },
  { label: '90j', days: 90 },
];

const DEVICE_ICONS: Record<string, React.ReactNode> = {
  desktop: <Monitor size={16} />,
  mobile: <Smartphone size={16} />,
  tablet: <Tablet size={16} />,
};

const COUNTRY_FLAGS: Record<string, string> = {
  FR: '\u{1F1EB}\u{1F1F7}', US: '\u{1F1FA}\u{1F1F8}', GB: '\u{1F1EC}\u{1F1E7}', DE: '\u{1F1E9}\u{1F1EA}',
  ES: '\u{1F1EA}\u{1F1F8}', IT: '\u{1F1EE}\u{1F1F9}', BE: '\u{1F1E7}\u{1F1EA}', CH: '\u{1F1E8}\u{1F1ED}',
  CA: '\u{1F1E8}\u{1F1E6}', NL: '\u{1F1F3}\u{1F1F1}', PT: '\u{1F1F5}\u{1F1F9}', BR: '\u{1F1E7}\u{1F1F7}',
  MA: '\u{1F1F2}\u{1F1E6}', DZ: '\u{1F1E9}\u{1F1FF}', TN: '\u{1F1F9}\u{1F1F3}', SN: '\u{1F1F8}\u{1F1F3}',
  JP: '\u{1F1EF}\u{1F1F5}', CN: '\u{1F1E8}\u{1F1F3}', IN: '\u{1F1EE}\u{1F1F3}', AU: '\u{1F1E6}\u{1F1FA}',
};

const cardStyle: React.CSSProperties = {
  background: 'var(--agency-surface-1)',
  border: '1px solid var(--agency-border)',
  borderRadius: 12,
  padding: 22,
};

const sectionTitle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--agency-ink-1)',
  marginBottom: 16,
  margin: 0,
};

export default function AnalyticsPage() {
  const { isMobile } = useAgencySidebar();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState(30);

  const fetchData = (days: number) => {
    setLoading(true);
    setError(null);
    fetch(`/api/admin/analytics?days=${days}`)
      .then(async (res) => {
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); } catch {
          throw new Error(`Réponse invalide (${res.status}): ${text.slice(0, 200)}`);
        }
        if (!res.ok) throw new Error(json.error || `Erreur ${res.status}`);
        return json;
      })
      .then((d) => { setData(d); setLoading(false); })
      .catch((e) => { setError(e.message); setLoading(false); });
  };

  useEffect(() => { fetchData(period); }, [period]);

  const formatDuration = (totalMs: number, visitors: number) => {
    if (!visitors) return '0s';
    const avg = Math.round(totalMs / visitors / 1000);
    if (avg < 60) return `${avg}s`;
    return `${Math.floor(avg / 60)}m ${avg % 60}s`;
  };

  const bounceRate = (bounces: number, visitors: number) => {
    if (!visitors) return '0%';
    return `${Math.round((bounces / visitors) * 100)}%`;
  };

  if (error) {
    return (
      <div>
        <Header period={period} setPeriod={setPeriod} loading={loading} active={null} onRefresh={() => fetchData(period)} />
        <div style={{ ...cardStyle, maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
          <BarChart3 size={40} style={{ color: 'var(--agency-danger)', marginBottom: 16 }} />
          <h2 style={{ color: 'var(--agency-ink-1)', fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
            Analytics indisponible
          </h2>
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{error}</p>
          <button
            onClick={() => fetchData(period)}
            style={{
              marginTop: 16, padding: '8px 18px', borderRadius: 8,
              border: '1px solid var(--agency-accent)',
              background: 'var(--agency-accent-soft)',
              color: 'var(--agency-accent)', cursor: 'pointer', fontSize: 13, fontWeight: 500,
            }}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const maxPageview = data ? Math.max(...(data.pageviews.pageviews.map((p) => p.y)), 1) : 1;

  return (
    <div>
      <Header
        period={period}
        setPeriod={setPeriod}
        loading={loading}
        active={data?.active.x ?? null}
        onRefresh={() => fetchData(period)}
      />

      {loading && !data ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: 60 }}>
          <RefreshCw size={28} style={{ color: 'var(--agency-accent)', animation: 'spin 1s linear infinite', marginBottom: 12 }} />
          <p style={{ color: 'var(--agency-ink-3)', fontSize: 13, margin: 0 }}>Chargement des analytics…</p>
        </div>
      ) : data && (
        <>
          {/* KPI Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: 14,
            marginBottom: 24,
          }}>
            {[
              { label: 'Visiteurs', value: data.stats.visitors.value.toLocaleString('fr-FR'), icon: <Users size={18} /> },
              { label: 'Pages vues', value: data.stats.pageviews.value.toLocaleString('fr-FR'), icon: <Eye size={18} /> },
              { label: 'Taux de rebond', value: bounceRate(data.stats.bounces.value, data.stats.visitors.value), icon: <ArrowUpRight size={18} /> },
              { label: 'Durée moyenne', value: formatDuration(data.stats.totaltime.value, data.stats.visitors.value), icon: <Timer size={18} /> },
            ].map((kpi) => (
              <div key={kpi.label} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span style={{ fontSize: 12, color: 'var(--agency-ink-3)', fontWeight: 500 }}>{kpi.label}</span>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: 'var(--agency-accent-soft)',
                    color: 'var(--agency-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {kpi.icon}
                  </div>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--agency-ink-1)', letterSpacing: '-0.02em' }}>
                  {kpi.value}
                </div>
              </div>
            ))}
          </div>

          {/* Pageviews Chart */}
          <div style={{ ...cardStyle, marginBottom: 16 }}>
            <h3 style={sectionTitle}>Pages vues par jour</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 2 : 4, height: 200, paddingTop: 8, marginTop: 16 }}>
              {data.pageviews.pageviews.map((point, i) => {
                const height = maxPageview > 0 ? (point.y / maxPageview) * 180 : 0;
                const date = new Date(point.x);
                const dayLabel = `${date.getDate()}/${date.getMonth() + 1}`;
                return (
                  <div
                    key={i}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}
                    title={`${dayLabel}: ${point.y} pages vues`}
                  >
                    <div style={{
                      width: '100%', maxWidth: 24,
                      height: Math.max(height, 2),
                      background: 'linear-gradient(180deg, var(--agency-accent) 0%, var(--agency-accent-dark) 100%)',
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 0.3s ease',
                      minHeight: 2,
                    }} />
                    {!isMobile && data.pageviews.pageviews.length <= 31 && i % (period <= 7 ? 1 : period <= 30 ? 5 : 10) === 0 && (
                      <span style={{ fontSize: 10, color: 'var(--agency-ink-4)', marginTop: 4, whiteSpace: 'nowrap' }}>
                        {dayLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Pages & Referrers */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <BarList title="Pages les plus visitées" items={data.topPages} emptyText="Aucune donnée" color="var(--agency-accent)" />
            <BarList title="Sources de trafic" items={data.topReferrers} emptyText="Aucune donnée (trafic direct)" color="#a78bfa" formatLabel={(x) => x || '(direct)'} />
          </div>

          {/* Devices */}
          <div style={{ ...cardStyle, marginBottom: 16 }}>
            <h3 style={sectionTitle}>Appareils</h3>
            <div style={{ marginTop: 16 }}>
              {data.devices.length === 0 ? (
                <p style={{ color: 'var(--agency-ink-4)', fontSize: 13, margin: 0 }}>Aucune donnée</p>
              ) : (() => {
                const totalDevices = data.devices.reduce((s, d) => s + d.y, 0) || 1;
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {data.devices.map((device, i) => {
                      const pct = Math.round((device.y / totalDevices) * 100);
                      const colors = ['var(--agency-accent)', '#a78bfa', '#f59e0b'];
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: 'var(--agency-surface-2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: 'var(--agency-ink-2)',
                          }}>
                            {DEVICE_ICONS[device.x.toLowerCase()] || <Globe size={16} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                              <span style={{ fontSize: 13, color: 'var(--agency-ink-2)', textTransform: 'capitalize' }}>{device.x}</span>
                              <span style={{ fontSize: 13, color: 'var(--agency-ink-3)' }}>{pct}% ({device.y})</span>
                            </div>
                            <div style={{ height: 6, borderRadius: 3, background: 'var(--agency-surface-2)' }}>
                              <div style={{ height: '100%', borderRadius: 3, background: colors[i % 3], width: `${pct}%`, transition: 'width 0.3s ease' }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Countries & Browsers */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
            <BarList
              title="Pays"
              items={data.countries}
              emptyText="Aucune donnée"
              color="#60a5fa"
              formatLabel={(x) => `${COUNTRY_FLAGS[x] || '\u{1F30D}'} ${x}`}
            />
            <BarList title="Navigateurs" items={data.browsers} emptyText="Aucune donnée" color="#f472b6" />
          </div>
        </>
      )}

      <style>{`
        @keyframes agency-active-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────

function Header({
  period, setPeriod, loading, active, onRefresh,
}: {
  period: number;
  setPeriod: (n: number) => void;
  loading: boolean;
  active: number | null;
  onRefresh: () => void;
}) {
  return (
    <header style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: 'var(--agency-ink-1)', margin: 0, letterSpacing: '-0.02em' }}>
            Analytics
          </h1>
          <p style={{ fontSize: 12, color: 'var(--agency-ink-3)', marginTop: 4, margin: 0 }}>
            Trafic du site jlstudio.dev — données Umami self-hosted
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {active !== null && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '5px 12px', borderRadius: 20,
              background: 'var(--agency-success-soft)',
              border: '1px solid rgba(34,197,94,0.3)',
            }}>
              <span style={{
                width: 6, height: 6, borderRadius: '50%', background: 'var(--agency-success)',
                animation: 'agency-active-pulse 2s infinite',
              }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--agency-success)' }}>
                {active} en ligne
              </span>
            </div>
          )}
          <div style={{ display: 'flex', borderRadius: 8, border: '1px solid var(--agency-border)', overflow: 'hidden' }}>
            {PERIODS.map((p) => (
              <button
                key={p.days}
                onClick={() => setPeriod(p.days)}
                style={{
                  padding: '7px 14px', border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  background: period === p.days ? 'var(--agency-accent-soft)' : 'transparent',
                  color: period === p.days ? 'var(--agency-accent)' : 'var(--agency-ink-3)',
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button
            onClick={onRefresh}
            title="Rafraîchir"
            style={{
              width: 32, height: 32, borderRadius: 8,
              border: '1px solid var(--agency-border)',
              background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--agency-ink-3)',
            }}
          >
            <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Bar list (top pages, referrers, countries, browsers) ───

function BarList({
  title, items, emptyText, color, formatLabel,
}: {
  title: string;
  items: { x: string; y: number }[];
  emptyText: string;
  color: string;
  formatLabel?: (x: string) => string;
}) {
  return (
    <div style={cardStyle}>
      <h3 style={sectionTitle}>{title}</h3>
      <div style={{ marginTop: 16 }}>
        {items.length === 0 ? (
          <p style={{ color: 'var(--agency-ink-4)', fontSize: 13, margin: 0 }}>{emptyText}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((item, i) => {
              const maxVal = items[0]?.y || 1;
              const label = formatLabel ? formatLabel(item.x) : item.x;
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--agency-ink-2)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>
                      {label}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--agency-ink-3)', fontWeight: 600, flexShrink: 0 }}>
                      {item.y}
                    </span>
                  </div>
                  <div style={{ height: 4, borderRadius: 2, background: 'var(--agency-surface-2)' }}>
                    <div style={{
                      height: '100%', borderRadius: 2, background: color,
                      width: `${(item.y / maxVal) * 100}%`,
                      transition: 'width 0.3s ease',
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
