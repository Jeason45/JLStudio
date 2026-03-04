'use client';

import { useState, useEffect, useRef, useCallback, use } from 'react';

interface SignatureRequestData {
  id: string;
  recipientName: string;
  recipientEmail: string;
  expiresAt: string;
  document: {
    id: string;
    fileName: string;
    documentNumber: string;
  };
}

type PageState = 'loading' | 'error' | 'form' | 'submitting' | 'success';

export default function SignPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [state, setState] = useState<PageState>('loading');
  const [error, setError] = useState('');
  const [data, setData] = useState<SignatureRequestData | null>(null);

  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [bonPourAccord, setBonPourAccord] = useState(false);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  // Validate token on mount
  useEffect(() => {
    async function validate() {
      try {
        const res = await fetch(`/api/sign/validate?token=${token}`);
        const json = await res.json();

        if (!res.ok) {
          setError(json.error || 'Lien invalide');
          setState('error');
          return;
        }

        setData(json.signatureRequest);
        setSignerName(json.signatureRequest.recipientName || '');
        setSignerEmail(json.signatureRequest.recipientEmail || '');
        setState('form');
      } catch {
        setError('Erreur de connexion');
        setState('error');
      }
    }
    validate();
  }, [token]);

  // Canvas setup
  useEffect(() => {
    if (state !== 'form') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [state]);

  const getCanvasCoords = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  }, [getCanvasCoords]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCanvasCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  }, [isDrawing, getCanvasCoords]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  const clearSignature = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setHasSignature(false);
  }, []);

  const handleSubmit = async () => {
    if (!signerName.trim() || !signerEmail.trim() || !hasSignature || !bonPourAccord) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const signatureImageData = canvas.toDataURL('image/png');

    setState('submitting');

    try {
      const res = await fetch('/api/sign/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          signerName: signerName.trim(),
          signerEmail: signerEmail.trim(),
          signatureImage: signatureImageData,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || 'Erreur lors de la signature');
        setState('form');
        return;
      }

      setState('success');
    } catch {
      setError('Erreur de connexion');
      setState('form');
    }
  };

  const canSubmit = signerName.trim() && signerEmail.trim() && hasSignature && bonPourAccord;
  const pdfUrl = `/api/storage/documents/${encodeURIComponent(data?.document.fileName || '')}`;

  // LOADING
  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ colorScheme: 'light' }}>
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#638BFF] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement du document...</p>
        </div>
      </div>
    );
  }

  // ERROR
  if (state === 'error') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" style={{ colorScheme: 'light' }}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Lien invalide</h1>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  // SUCCESS
  if (state === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4" style={{ colorScheme: 'light' }}>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document signé !</h1>
          <p className="text-gray-500 mb-1">
            Votre signature a été enregistrée avec succès.
          </p>
          <p className="text-gray-500 mb-6">
            Un e-mail de confirmation avec le document signé vous sera envoyé.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            Signature conforme eIDAS
          </div>
          <p className="text-xs text-gray-400 mt-5">
            Vous pouvez fermer cette page.
          </p>
        </div>
      </div>
    );
  }

  // FORM (2 colonnes desktop)
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col" style={{ colorScheme: 'light' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0a1628] flex items-center justify-center">
              <span className="text-[#638BFF] font-bold text-xs">JL</span>
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">JL Studio</h1>
              <p className="text-xs text-gray-400">Signature électronique</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-xs font-mono text-gray-400 bg-gray-100 px-2.5 py-1 rounded">
              {data?.document.documentNumber}
            </span>
            <a
              href={pdfUrl}
              download
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
              title="Télécharger le PDF"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span className="hidden sm:inline">Télécharger</span>
            </a>
          </div>
        </div>
      </header>

      {error && (
        <div className="max-w-screen-2xl mx-auto w-full px-4 pt-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        </div>
      )}

      {/* Main: 2 colonnes */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-screen-2xl mx-auto w-full">

        {/* PDF Viewer (gauche) */}
        <div className="flex-1 min-h-0 p-3 lg:p-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">
            <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{data?.document.fileName}</span>
              </div>
            </div>
            <div className="flex-1 min-h-[50vh] lg:min-h-0">
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="Document PDF"
              />
            </div>
          </div>
        </div>

        {/* Formulaire signature (droite) */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 p-3 lg:p-4 lg:pl-0">
          <div className="lg:sticky lg:top-4 space-y-4">

            {/* Titre */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#638BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-base font-bold text-gray-900">Signer le document</h2>
                  <p className="text-xs text-gray-400">Remplissez les champs puis signez</p>
                </div>
              </div>

              {/* Nom + Email */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nom complet</label>
                  <input
                    type="text"
                    value={signerName}
                    onChange={(e) => setSignerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#638BFF] focus:border-transparent"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">E-mail</label>
                  <input
                    type="email"
                    value={signerEmail}
                    onChange={(e) => setSignerEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#638BFF] focus:border-transparent"
                    placeholder="jean@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Canvas signature */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-600">Votre signature</label>
                {hasSignature && (
                  <button
                    onClick={clearSignature}
                    className="text-xs text-red-500 hover:text-red-700 font-medium"
                  >
                    Effacer
                  </button>
                )}
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-white">
                <canvas
                  ref={canvasRef}
                  className="w-full cursor-crosshair touch-none"
                  style={{ height: '160px' }}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                />
              </div>
              {!hasSignature && (
                <p className="text-[11px] text-gray-400 mt-1.5 text-center">
                  Dessinez votre signature ci-dessus
                </p>
              )}
            </div>

            {/* Bon pour accord + Submit */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 space-y-4">
              <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-blue-50/50 transition-colors">
                <input
                  type="checkbox"
                  checked={bonPourAccord}
                  onChange={(e) => setBonPourAccord(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 bg-white text-[#638BFF] focus:ring-[#638BFF] accent-[#638BFF]"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">&quot;Bon pour accord&quot;</p>
                  <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">
                    J&apos;accepte les termes de ce document et appose la mention &quot;Bon pour accord&quot;.
                  </p>
                </div>
              </label>

              <button
                onClick={handleSubmit}
                disabled={state === 'submitting' || !canSubmit}
                className="w-full py-3 bg-[#638BFF] text-white font-semibold rounded-lg hover:bg-[#4a6fd4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {state === 'submitting' ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signature en cours...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Signer le document
                  </>
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                En signant, vous acceptez que cette signature électronique a la même valeur juridique
                qu&apos;une signature manuscrite (conforme eIDAS).
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
