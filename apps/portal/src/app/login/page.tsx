'use client';

import { useState } from 'react';

interface SiteOption {
  id: string;
  name: string;
  slug: string;
}

export default function LoginPage() {
  const [mode, setMode] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [siteSlug, setSiteSlug] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Admin site selection
  const [sites, setSites] = useState<SiteOption[]>([]);
  const [showSiteSelection, setShowSiteSelection] = useState(false);

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'client', email, password, siteSlug }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      window.location.href = '/dashboard';
    } catch {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'admin', email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      if (data.needsSiteSelection) {
        setSites(data.sites);
        setShowSiteSelection(true);
        setLoading(false);
        return;
      }

      window.location.href = '/dashboard';
    } catch {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  const handleSiteSelect = async (siteId: string) => {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'admin', email, password, siteId }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      window.location.href = '/dashboard';
    } catch {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '8px',
    background: 'var(--bg-input)',
    border: '1px solid var(--border-input)',
    color: 'var(--text-primary)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.15s',
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '10px',
    fontSize: '13px',
    fontWeight: 600,
    border: 'none',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'all 0.2s',
    background: active ? 'var(--accent)' : 'transparent',
    color: active ? '#ffffff' : 'var(--text-secondary)',
  });

  // ── Site selection view ──
  if (showSiteSelection) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-page)' }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              Choisir un site
            </h2>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginTop: '6px' }}>
              Selectionnez le site a administrer
            </p>
          </div>

          <div
            style={{
              borderRadius: '12px',
              padding: '24px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => handleSiteSelect(site.id)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-input)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                  opacity: loading ? 0.5 : 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.background = 'var(--accent-light)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.background = 'var(--bg-input)';
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{site.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{site.slug}</div>
              </button>
            ))}

            {error && <p style={{ color: 'var(--danger)', fontSize: '13px', textAlign: 'center', marginTop: '8px' }}>{error}</p>}

            <button
              onClick={() => { setShowSiteSelection(false); setSites([]); setError(''); }}
              style={{
                marginTop: '8px',
                padding: '8px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-tertiary)',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Login form ──
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
            Portail Client
          </h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginTop: '6px' }}>
            Connectez-vous a votre espace
          </p>
        </div>

        <div
          style={{
            borderRadius: '12px',
            padding: '32px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          {/* Tabs */}
          <div style={{
            display: 'flex',
            gap: '4px',
            marginBottom: '24px',
            padding: '4px',
            borderRadius: '10px',
            background: 'var(--bg-secondary)',
          }}>
            <button
              type="button"
              onClick={() => { setMode('client'); setError(''); }}
              style={tabStyle(mode === 'client')}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => { setMode('admin'); setError(''); }}
              style={tabStyle(mode === 'admin')}
            >
              Admin
            </button>
          </div>

          {mode === 'client' ? (
            <form onSubmit={handleClientLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} autoComplete="on">
              <div>
                <label htmlFor="siteSlug" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                  Identifiant du site
                </label>
                <input
                  id="siteSlug"
                  name="siteSlug"
                  type="text"
                  required
                  value={siteSlug}
                  onChange={(e) => setSiteSlug(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-input)'}
                  style={inputStyle}
                  placeholder="mon-site"
                />
              </div>

              <div>
                <label htmlFor="email-client" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                  Email
                </label>
                <input
                  id="email-client"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-input)'}
                  style={inputStyle}
                  placeholder="email@exemple.com"
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="password-client" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                  Mot de passe
                </label>
                <input
                  id="password-client"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-input)'}
                  style={inputStyle}
                  placeholder="Mot de passe"
                  autoComplete="current-password"
                />
              </div>

              {error && <p style={{ color: 'var(--danger)', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '10px', borderRadius: '8px',
                  background: 'var(--accent)', color: 'white', border: 'none',
                  fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                  opacity: loading ? 0.5 : 1, transition: 'opacity 0.15s',
                  marginTop: '4px',
                }}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} autoComplete="on">
              <div>
                <label htmlFor="email-admin" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                  Email administrateur
                </label>
                <input
                  id="email-admin"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-input)'}
                  style={inputStyle}
                  placeholder="admin@jlstudio.dev"
                  autoComplete="username"
                />
              </div>

              <div>
                <label htmlFor="password-admin" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                  Mot de passe
                </label>
                <input
                  id="password-admin"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-input)'}
                  style={inputStyle}
                  placeholder="Mot de passe"
                  autoComplete="current-password"
                />
              </div>

              {error && <p style={{ color: 'var(--danger)', fontSize: '13px', textAlign: 'center' }}>{error}</p>}

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '10px', borderRadius: '8px',
                  background: 'var(--accent)', color: 'white', border: 'none',
                  fontSize: '14px', fontWeight: 500, cursor: 'pointer',
                  opacity: loading ? 0.5 : 1, transition: 'opacity 0.15s',
                  marginTop: '4px',
                }}
              >
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '20px' }}>
          JL Studio Portal
        </p>
      </div>
    </div>
  );
}
