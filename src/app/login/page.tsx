'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Erreur de connexion');
        setLoading(false);
        return;
      }

      // Small delay to let the browser detect successful login and prompt to save credentials
      setTimeout(() => {
        window.location.href = '/admin';
      }, 100);
    } catch {
      setError('Erreur de connexion au serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <img src="/images/logo-jlstudio.png" alt="JL Studio" className="h-10 w-auto mx-auto" />
            <p className="text-white/40 text-sm mt-2">CRM</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h1 className="text-xl font-semibold text-white text-center mb-6">
            Connexion
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="on">
            <div>
              <label htmlFor="email" className="block text-sm text-white/60 mb-1.5">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#638BFF]/50 focus:ring-1 focus:ring-[#638BFF]/30 transition-colors text-sm"
                placeholder="email@exemple.com"
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-white/60 mb-1.5">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#638BFF]/50 focus:ring-1 focus:ring-[#638BFF]/30 transition-colors text-sm"
                placeholder="Mot de passe"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[#638BFF] hover:bg-[#5178e6] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
