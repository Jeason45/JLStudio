'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { Lock, Check, AlertCircle } from 'lucide-react';

function InviteForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [redirectInfo, setRedirectInfo] = useState<{ siteSlug: string; email: string } | null>(null);

  useEffect(() => {
    if (success && redirectInfo) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, redirectInfo, router]);

  if (!token) {
    return (
      <div style={{ textAlign: 'center' }}>
        <AlertCircle size={40} style={{ color: 'var(--danger)', margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Lien invalide
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
          Ce lien d&apos;invitation est invalide ou incomplet.
        </p>
      </div>
    );
  }

  if (success && redirectInfo) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%', background: 'var(--success-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px',
        }}>
          <Check size={24} style={{ color: 'var(--success)' }} />
        </div>
        <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
          Compte active
        </h2>
        <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
          Votre mot de passe a ete defini. Redirection vers la connexion...
        </p>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
          Email : <strong style={{ color: 'var(--text-secondary)' }}>{redirectInfo.email}</strong>
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caracteres');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur lors de l\'activation');
        setLoading(false);
        return;
      }

      setRedirectInfo({ siteSlug: data.siteSlug, email: data.email });
      setSuccess(true);
    } catch {
      setError('Erreur de connexion au serveur');
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px', borderRadius: '8px',
    background: 'var(--bg-input)', border: '1px solid var(--border-input)',
    color: 'var(--text-primary)', fontSize: '14px', outline: 'none',
  };

  return (
    <div>
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px', background: 'var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
      }}>
        <Lock size={20} style={{ color: 'white' }} />
      </div>
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', marginBottom: '4px' }}>
        Definissez votre mot de passe
      </h2>
      <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center', marginBottom: '24px' }}>
        Pour acceder a votre espace client
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 caracteres"
            style={inputStyle}
            autoFocus
          />
        </div>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Retapez le mot de passe"
            style={inputStyle}
          />
        </div>

        {error && (
          <p style={{ fontSize: '13px', color: 'var(--danger)', textAlign: 'center' }}>{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '10px', borderRadius: '8px',
            background: 'var(--accent)', color: 'white', border: 'none',
            fontSize: '14px', fontWeight: 500, cursor: 'pointer',
            opacity: loading ? 0.6 : 1, marginTop: '4px',
          }}
        >
          {loading ? 'Activation...' : 'Activer mon compte'}
        </button>
      </form>
    </div>
  );
}

export default function InvitePage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-page)', padding: '20px',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px', background: 'var(--bg-card)',
        borderRadius: '16px', padding: '32px',
        border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
      }}>
        <Suspense fallback={<p style={{ textAlign: 'center', color: 'var(--text-tertiary)' }}>Chargement...</p>}>
          <InviteForm />
        </Suspense>
      </div>
    </div>
  );
}
