'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [siteSlug, setSiteSlug] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, siteSlug }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-page)' }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Portail Client</h2>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', marginTop: '6px' }}>Connectez-vous a votre espace</p>
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} autoComplete="on">
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
              <label htmlFor="email" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                Email
              </label>
              <input
                id="email"
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
              <label htmlFor="password" style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: 500 }}>
                Mot de passe
              </label>
              <input
                id="password"
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
        </div>
      </div>
    </div>
  );
}
