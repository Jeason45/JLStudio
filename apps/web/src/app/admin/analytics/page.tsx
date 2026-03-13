'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useSidebar } from '@/components/admin/SidebarContext';
import { BarChart3, Users, Eye, Timer, ArrowUpRight, Monitor, Smartphone, Tablet, Globe, RefreshCw } from 'lucide-react';

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

export default function AnalyticsPage() {
  const { sidebarWidth, isMobile } = useSidebar();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState(30);

  const fetchData = (days: number) => {
    setLoading(true);
    setError(null);
    fetch(`/api/stats/analytics?days=${days}`)
      .then(async res => {
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); } catch {
          throw new Error(`Reponse invalide (${res.status}): ${text.slice(0, 200)}`);
        }
        if (!res.ok) throw new Error(json.error || `Erreur ${res.status}`);
        return json;
      })
      .then(d => { setData(d); setLoading(false); })
      .catch(e => { setError(e.message); setLoading(false); });
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

  const cardStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '24px',
  };

  const sectionTitle: React.CSSProperties = {
    fontSize: '16px',
    fontWeight: 600,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: '16px',
  };

  if (error) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
        <AdminSidebar />
        <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', padding: isMobile ? '80px 16px 24px 16px' : '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ ...cardStyle, maxWidth: '480px', textAlign: 'center' }}>
            <BarChart3 size={48} style={{ color: '#ef4444', marginBottom: '16px' }} />
            <h2 style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>Analytics indisponible</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: '1.6' }}>{error}</p>
            <button onClick={() => fetchData(period)} style={{ marginTop: '16px', padding: '10px 20px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#10b981', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>Reessayer</button>
          </div>
        </div>
      </div>
    );
  }

  const maxPageview = data ? Math.max(...(data.pageviews.pageviews.map(p => p.y)), 1) : 1;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0e1a' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: isMobile ? '0' : `${sidebarWidth}px`, transition: 'margin-left 0.3s ease', minHeight: '100vh', padding: isMobile ? '80px 16px 24px 16px' : '40px' }}>

        {/* Header */}
        <div style={{ background: '#0a0e1a', padding: isMobile ? '0 0 32px 0' : '0 0 32px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'linear-gradient(135deg, #638BFF 0%, #4a6fd4 100%)', boxShadow: '0 0 12px rgba(99,139,255,0.4)' }} />
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(99,139,255,0.3) 0%, transparent 100%)' }} />
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Analytics</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {data && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{data.active.x} en ligne</span>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                {PERIODS.map(p => (
                  <button
                    key={p.days}
                    onClick={() => setPeriod(p.days)}
                    style={{
                      padding: '8px 16px', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                      background: period === p.days ? 'rgba(16,185,129,0.2)' : 'transparent',
                      color: period === p.days ? '#10b981' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <button onClick={() => fetchData(period)} title="Rafraichir" style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }}>
                <RefreshCw size={16} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              </button>
            </div>
          </div>
        </div>

        {loading && !data ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <div style={{ textAlign: 'center' }}>
              <RefreshCw size={32} style={{ color: '#10b981', animation: 'spin 1s linear infinite', marginBottom: '16px' }} />
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>Chargement des analytics...</p>
            </div>
          </div>
        ) : data && (
          <>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
              {[
                { label: 'Visiteurs', value: data.stats.visitors.value.toLocaleString('fr-FR'), icon: <Users size={20} />, color: '#818cf8' },
                { label: 'Pages vues', value: data.stats.pageviews.value.toLocaleString('fr-FR'), icon: <Eye size={20} />, color: '#10b981' },
                { label: 'Taux de rebond', value: bounceRate(data.stats.bounces.value, data.stats.visitors.value), icon: <ArrowUpRight size={20} />, color: '#f59e0b' },
                { label: 'Duree moyenne', value: formatDuration(data.stats.totaltime.value, data.stats.visitors.value), icon: <Timer size={20} />, color: '#60a5fa' },
              ].map((kpi) => (
                <div key={kpi.label} style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{kpi.label}</span>
                    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${kpi.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: kpi.color }}>{kpi.icon}</div>
                  </div>
                  <div style={{ fontSize: '28px', fontWeight: 700, color: 'rgba(255,255,255,0.95)' }}>{kpi.value}</div>
                </div>
              ))}
            </div>

            {/* Pageviews Chart */}
            <div style={{ ...cardStyle, marginBottom: '32px' }}>
              <h3 style={sectionTitle}>Pages vues par jour</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? '2px' : '4px', height: '200px', paddingTop: '8px' }}>
                {data.pageviews.pageviews.map((point, i) => {
                  const height = maxPageview > 0 ? (point.y / maxPageview) * 180 : 0;
                  const date = new Date(point.x);
                  const dayLabel = `${date.getDate()}/${date.getMonth() + 1}`;
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }} title={`${dayLabel}: ${point.y} pages vues`}>
                      <div style={{ width: '100%', maxWidth: '24px', height: `${Math.max(height, 2)}px`, background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)', borderRadius: '4px 4px 0 0', transition: 'height 0.3s ease', minHeight: '2px' }} />
                      {!isMobile && data.pageviews.pageviews.length <= 31 && i % (period <= 7 ? 1 : period <= 30 ? 5 : 10) === 0 && (
                        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: '4px', whiteSpace: 'nowrap' }}>{dayLabel}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Pages & Referrers */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {/* Top Pages */}
              <div style={cardStyle}>
                <h3 style={sectionTitle}>Pages les plus visitees</h3>
                {data.topPages.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Aucune donnee</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.topPages.map((page, i) => {
                      const maxVal = data.topPages[0]?.y || 1;
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{page.x}</span>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, flexShrink: 0 }}>{page.y}</span>
                          </div>
                          <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ height: '100%', borderRadius: '2px', background: '#10b981', width: `${(page.y / maxVal) * 100}%`, transition: 'width 0.3s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Top Referrers */}
              <div style={cardStyle}>
                <h3 style={sectionTitle}>Sources de trafic</h3>
                {data.topReferrers.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Aucune donnee (trafic direct)</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.topReferrers.map((ref, i) => {
                      const maxVal = data.topReferrers[0]?.y || 1;
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%' }}>{ref.x || '(direct)'}</span>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600, flexShrink: 0 }}>{ref.y}</span>
                          </div>
                          <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ height: '100%', borderRadius: '2px', background: '#818cf8', width: `${(ref.y / maxVal) * 100}%`, transition: 'width 0.3s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Devices */}
            <div style={{ ...cardStyle, marginBottom: '32px' }}>
              <h3 style={sectionTitle}>Appareils</h3>
              {data.devices.length === 0 ? (
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Aucune donnee</p>
              ) : (() => {
                const totalDevices = data.devices.reduce((s, d) => s + d.y, 0) || 1;
                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {data.devices.map((device, i) => {
                      const pct = Math.round((device.y / totalDevices) * 100);
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)' }}>
                            {DEVICE_ICONS[device.x.toLowerCase()] || <Globe size={16} />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)', textTransform: 'capitalize' }}>{device.x}</span>
                              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{pct}% ({device.y})</span>
                            </div>
                            <div style={{ height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.05)' }}>
                              <div style={{ height: '100%', borderRadius: '3px', background: i === 0 ? '#10b981' : i === 1 ? '#818cf8' : '#f59e0b', width: `${pct}%`, transition: 'width 0.3s ease' }} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            {/* Countries & Browsers */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
              {/* Countries */}
              <div style={cardStyle}>
                <h3 style={sectionTitle}>Pays</h3>
                {data.countries.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Aucune donnee</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.countries.map((country, i) => {
                      const maxVal = data.countries[0]?.y || 1;
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
                              {COUNTRY_FLAGS[country.x] || '\u{1F30D}'} {country.x}
                            </span>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{country.y}</span>
                          </div>
                          <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ height: '100%', borderRadius: '2px', background: '#60a5fa', width: `${(country.y / maxVal) * 100}%`, transition: 'width 0.3s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Browsers */}
              <div style={cardStyle}>
                <h3 style={sectionTitle}>Navigateurs</h3>
                {data.browsers.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>Aucune donnee</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {data.browsers.map((browser, i) => {
                      const maxVal = data.browsers[0]?.y || 1;
                      return (
                        <div key={i}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>{browser.x}</span>
                            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{browser.y}</span>
                          </div>
                          <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.05)' }}>
                            <div style={{ height: '100%', borderRadius: '2px', background: '#f472b6', width: `${(browser.y / maxVal) * 100}%`, transition: 'width 0.3s ease' }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* CSS Animations */}
        <style>{`
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
}
