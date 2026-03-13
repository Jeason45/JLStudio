'use client';

import { useState, useEffect } from 'react';

export default function Setup2faPage() {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch('/api/auth/setup-2fa')
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          if (data.error === '2FA déjà activé') {
            window.location.href = '/';
            return;
          }
          setError(data.error || 'Erreur');
          return;
        }
        const data = await res.json();
        setQrCode(data.qrCode);
        setSecret(data.secret);
      })
      .catch(() => setError('Erreur de chargement'))
      .finally(() => setFetching(false));
  }, []);

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/setup-2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Code invalide');
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError('Erreur serveur');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-white/40">Chargement...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="rounded-2xl p-8" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div className="text-4xl mb-4">&#x2705;</div>
            <h1 className="text-lg font-semibold text-white mb-2">2FA activé</h1>
            <p className="text-white/40 text-sm mb-6">
              Votre compte est maintenant protégé par l&apos;authentification à deux facteurs.
            </p>
            <button
              onClick={() => { window.location.href = '/'; }}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors"
            >
              Accéder au Builder
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <div className="text-center">
            <h2 className="text-white text-xl font-bold tracking-tight">JL Studio</h2>
            <p className="text-white/40 text-sm mt-1">Configuration 2FA</p>
          </div>
        </div>

        <div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <p className="text-white/60 text-sm text-center mb-6">
            Scannez ce QR code avec Google Authenticator ou Authy
          </p>

          {qrCode && (
            <div className="flex justify-center mb-6">
              <div className="bg-white p-3 rounded-xl">
                <img src={qrCode} alt="QR Code 2FA" width={200} height={200} />
              </div>
            </div>
          )}

          <div className="mb-6">
            <p className="text-white/40 text-xs text-center mb-2">Ou entrez cette clé manuellement :</p>
            <div className="bg-white/[0.06] border border-white/10 rounded-lg px-3 py-2 text-center">
              <code className="text-white/80 text-xs font-mono break-all select-all">{secret}</code>
            </div>
          </div>

          <form onSubmit={handleConfirm} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1.5">Code de vérification</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                required
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/10 text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-white/30 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-colors"
                placeholder="000000"
              />
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium text-sm transition-colors"
            >
              {loading ? 'Vérification...' : 'Activer le 2FA'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
