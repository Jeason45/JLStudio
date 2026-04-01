'use client';

import { useState } from 'react';
import { Search, Building2, Globe, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

interface BusinessResult {
  name: string;
  siret: string;
  siren: string;
  address: string;
  city: string;
  postalCode: string;
  dateCreation: string | null;
  effectif: string | null;
  nafCode: string | null;
  nafLabel: string | null;
  website: string | null;
  isActive: boolean;
}

export default function SmartSearchPage() {
  const [metier, setMetier] = useState('');
  const [ville, setVille] = useState('');
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BusinessResult[]>([]);
  const [stats, setStats] = useState<{ total: number; withWebsite: number; withoutWebsite: number } | null>(null);
  const [error, setError] = useState('');

  const search = async () => {
    if (!metier || !ville) return;
    setLoading(true);
    setError('');
    setResults([]);
    setStats(null);

    try {
      const res = await fetch('/api/portal/prospection/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metier, ville, limit }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data.results);
      setStats({ total: data.total, withWebsite: data.withWebsite, withoutWebsite: data.withoutWebsite });
    } catch {
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
          <Building2 size={20} color="var(--accent)" />
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Recherche d'entreprises</h1>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: 0 }}>Trouvez des entreprises par metier et ville via le registre INSEE</p>
        </div>
      </div>

      {/* Search form */}
      <div style={{ ...cardStyle, marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Metier (ex: plombier, restaurant, coiffeur...)"
            value={metier}
            onChange={(e) => setMetier(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            style={{
              flex: '1 1 200px', padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
              background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)', outline: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Ville (ex: bordeaux)"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            style={{
              flex: '0 1 180px', padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
              background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)', outline: 'none',
            }}
          />
          <input
            type="number"
            placeholder="Limite"
            value={limit}
            onChange={(e) => setLimit(Math.min(50, Math.max(1, parseInt(e.target.value) || 20)))}
            style={{
              width: '80px', padding: '10px 14px', borderRadius: '8px', fontSize: '14px',
              background: 'var(--bg-input)', border: '1px solid var(--border-input)', color: 'var(--text-primary)', outline: 'none',
            }}
          />
          <button
            onClick={search}
            disabled={loading || !metier || !ville}
            style={{
              padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: loading ? 'wait' : 'pointer',
              background: 'var(--accent)', color: 'white', fontWeight: 600, fontSize: '14px',
              opacity: loading || !metier || !ville ? 0.5 : 1,
            }}
          >
            {loading ? 'Recherche...' : 'Rechercher'}
          </button>
        </div>
        {loading && (
          <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
            Recherche dans le registre INSEE + detection des sites web... (10-30s)
          </div>
        )}
        {error && (
          <div style={{ marginTop: '10px', padding: '8px 12px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', fontSize: '12px' }}>
            {error}
          </div>
        )}
      </div>

      {/* Stats */}
      {stats && (
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
          <div style={{ ...cardStyle, flex: 1, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.total}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Entreprises trouvees</div>
          </div>
          <div style={{ ...cardStyle, flex: 1, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>{stats.withWebsite}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Avec site web</div>
          </div>
          <div style={{ ...cardStyle, flex: 1, padding: '14px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#f59e0b' }}>{stats.withoutWebsite}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>Sans site web</div>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>Resultats</h3>
          </div>

          {results.map((r, i) => (
            <div key={r.siret || i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0',
              borderBottom: i < results.length - 1 ? '1px solid var(--border-light)' : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</span>
                  {!r.website && (
                    <span style={{
                      fontSize: '9px', fontWeight: 600, padding: '2px 6px', borderRadius: '4px',
                      background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                    }}>PAS DE SITE</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  <span><MapPin size={10} style={{ verticalAlign: 'middle', marginRight: '3px' }} />{r.address} {r.postalCode} {r.city}</span>
                  {r.nafLabel && <span>{r.nafLabel}</span>}
                  {r.siret && <span>SIRET: {r.siret}</span>}
                  {r.dateCreation && <span>Cree: {r.dateCreation.slice(0, 4)}</span>}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {r.website ? (
                  <>
                    <a href={r.website} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '11px', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Globe size={12} /> Site
                    </a>
                    <a href={`/prospection/audit?url=${encodeURIComponent(r.website)}&name=${encodeURIComponent(r.name)}`}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px',
                        background: 'var(--accent)', color: 'white', fontSize: '11px', fontWeight: 500, textDecoration: 'none',
                      }}>
                      Auditer <ArrowRight size={10} />
                    </a>
                  </>
                ) : (
                  <span style={{
                    padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                    background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                  }}>
                    Prospect creation
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
