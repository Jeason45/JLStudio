'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [tempToken, setTempToken] = useState('');
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      if (data.requires2fa) {
        setTempToken(data.tempToken);
        setStep('2fa');
        setLoading(false);
        return;
      }

      // Logged in — redirect
      if (data.needsSetup2fa) {
        window.location.href = '/setup-2fa';
      } else {
        window.location.href = '/';
      }
    } catch {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  const handleVerify2fa = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: totpCode, tempToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Code invalide');
        setLoading(false);
        return;
      }

      window.location.href = '/';
    } catch {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <h2 className="text-white text-xl font-bold tracking-tight">JL Studio</h2>
            <p className="text-white/40 text-sm mt-1">Builder</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {step === 'credentials' ? (
            <>
              <h1 className="text-lg font-semibold text-white text-center mb-6">Connexion</h1>
              <form onSubmit={handleLogin} className="space-y-4" autoComplete="on">
                <div>
                  <label htmlFor="email" className="block text-sm text-white/60 mb-1.5">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors text-sm"
                    placeholder="email@exemple.com"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-white/60 mb-1.5">Mot de passe</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors text-sm"
                    placeholder="Mot de passe"
                    autoComplete="current-password"
                  />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold text-white text-center mb-2">Vérification 2FA</h1>
              <p className="text-white/40 text-sm text-center mb-6">
                Entrez le code de votre application d&apos;authentification
              </p>
              <form onSubmit={handleVerify2fa} className="space-y-4">
                <div>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    required
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/10 text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                    placeholder="000000"
                    autoFocus
                  />
                </div>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                <button
                  type="submit"
                  disabled={loading || totpCode.length !== 6}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
                >
                  {loading ? 'Vérification...' : 'Vérifier'}
                </button>
                <button
                  type="button"
                  onClick={() => { setStep('credentials'); setError(''); setTotpCode(''); }}
                  className="w-full py-2 text-white/40 hover:text-white/60 text-sm transition-colors"
                >
                  Retour
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
