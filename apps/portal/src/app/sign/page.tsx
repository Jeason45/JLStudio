'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, useCallback, Suspense } from 'react';

interface DocumentInfo {
  id: string;
  title: string;
  documentNumber: string | null;
  type: string;
  totalAmount: number | null;
  contact: { firstName: string | null; lastName: string | null; email: string; company: string | null } | null;
}

interface ValidateResponse {
  success: boolean;
  signatureRequest: { id: string; email: string; expiresAt: string };
  document: DocumentInfo;
  siteName: string;
}

function SignPageContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [state, setState] = useState<'loading' | 'ready' | 'signing' | 'success' | 'error'>('loading');
  const [error, setError] = useState('');
  const [data, setData] = useState<ValidateResponse | null>(null);
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const hasDrawn = useRef(false);

  useEffect(() => {
    if (!token) { setError('Token manquant'); setState('error'); return; }

    fetch(`/api/sign/validate?token=${token}`)
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) { setError(json.error); setState('error'); return; }
        setData(json);
        setSignerEmail(json.signatureRequest.email);
        const contact = json.document.contact;
        if (contact) {
          setSignerName([contact.firstName, contact.lastName].filter(Boolean).join(' '));
        }
        setState('ready');
      })
      .catch(() => { setError('Erreur de connexion'); setState('error'); });
  }, [token]);

  // Canvas drawing handlers
  const startDraw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    isDrawing.current = true;
    hasDrawn.current = true;
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in e ? e.touches[0] : e;
    const x = (point.clientX - rect.left) * (canvas.width / rect.width);
    const y = (point.clientY - rect.top) * (canvas.height / rect.height);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const point = 'touches' in e ? e.touches[0] : e;
    const x = (point.clientX - rect.left) * (canvas.width / rect.width);
    const y = (point.clientY - rect.top) * (canvas.height / rect.height);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#0F1729';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  }, []);

  const endDraw = useCallback(() => { isDrawing.current = false; }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  };

  const handleSubmit = async () => {
    if (!hasDrawn.current) { setError('Veuillez dessiner votre signature'); return; }
    if (!signerName.trim()) { setError('Veuillez saisir votre nom'); return; }
    if (!signerEmail.trim()) { setError('Veuillez saisir votre email'); return; }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const signatureImage = canvas.toDataURL('image/png');

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/sign/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, signerName: signerName.trim(), signerEmail: signerEmail.trim(), signatureImage }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error); setSubmitting(false); return; }
      setState('success');
    } catch {
      setError('Erreur reseau');
      setSubmitting(false);
    }
  };

  const formatCurrency = (n: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
  const typeLabel = (t: string) => t === 'DEVIS' ? 'Devis' : t === 'FACTURE' ? 'Facture' : 'Contrat';

  // ─── Error state ─────────────────
  if (state === 'error') {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>&#10060;</div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>Impossible de signer</h1>
            <p style={{ fontSize: '14px', color: '#64748b' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Loading state ───────────────
  if (state === 'loading' || !data) {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>Chargement...</p>
        </div>
      </div>
    );
  }

  // ─── Success state ───────────────
  if (state === 'success') {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '28px' }}>&#10003;</div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', marginBottom: '8px' }}>Document signe</h1>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
              Votre signature a ete enregistree avec succes.
            </p>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>
              Un email de confirmation avec le document signe vous sera envoye.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── Ready / Signing state ──────
  const doc = data.document;

  return (
    <div style={pageStyle}>
      <div style={{ ...cardStyle, maxWidth: '560px' }}>
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #638BFF, #4a6fd4)', padding: '24px 28px', borderRadius: '16px 16px 0 0', color: '#fff' }}>
          <p style={{ fontSize: '13px', opacity: 0.8, margin: '0 0 4px' }}>{data.siteName}</p>
          <h1 style={{ fontSize: '18px', fontWeight: 600, margin: 0 }}>Signature electronique</h1>
        </div>

        <div style={{ padding: '28px' }}>
          {/* Document info */}
          <div style={{ background: '#f8fafc', borderLeft: '4px solid #638BFF', padding: '16px 20px', borderRadius: '0 8px 8px 0', marginBottom: '24px' }}>
            <p style={{ margin: '0 0 4px', fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
              {typeLabel(doc.type)} {doc.documentNumber || ''}
            </p>
            <p style={{ margin: '0 0 2px', fontSize: '13px', color: '#475569' }}>{doc.title}</p>
            {doc.totalAmount != null && (
              <p style={{ margin: '4px 0 0', fontSize: '15px', fontWeight: 600, color: '#638BFF' }}>{formatCurrency(doc.totalAmount)}</p>
            )}
          </div>

          {/* Signer info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <div>
              <label style={labelStyle}>Votre nom complet</label>
              <input type="text" value={signerName} onChange={(e) => setSignerName(e.target.value)} placeholder="Jean Dupont" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Votre email</label>
              <input type="email" value={signerEmail} onChange={(e) => setSignerEmail(e.target.value)} placeholder="jean@email.com" style={inputStyle} />
            </div>
          </div>

          {/* Signature canvas */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={labelStyle}>Votre signature</label>
              <button onClick={clearCanvas} style={{ fontSize: '12px', color: '#638BFF', background: 'none', border: 'none', cursor: 'pointer' }}>
                Effacer
              </button>
            </div>
            <div style={{ border: '2px dashed #d1d5db', borderRadius: '12px', overflow: 'hidden', background: '#fff', touchAction: 'none' }}>
              <canvas
                ref={canvasRef}
                width={500}
                height={180}
                style={{ width: '100%', height: '180px', cursor: 'crosshair', display: 'block' }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
              Dessinez votre signature avec la souris ou le doigt
            </p>
          </div>

          {/* Error */}
          {error && (
            <p style={{ fontSize: '13px', color: '#ef4444', marginBottom: '16px' }}>{error}</p>
          )}

          {/* Legal */}
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.5 }}>
            En signant ce document, vous confirmez avoir lu et accepte son contenu.
            Cette signature electronique a valeur juridique conformement au reglement eIDAS.
          </p>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{
              width: '100%', padding: '14px', borderRadius: '10px', fontSize: '15px', fontWeight: 600,
              background: submitting ? '#94a3b8' : '#638BFF', color: '#fff', border: 'none', cursor: submitting ? 'default' : 'pointer',
            }}
          >
            {submitting ? 'Signature en cours...' : 'Signer le document'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SignPage() {
  return (
    <Suspense fallback={
      <div style={pageStyle}>
        <div style={cardStyle}>
          <p style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>Chargement...</p>
        </div>
      </div>
    }>
      <SignPageContent />
    </Suspense>
  );
}

// ─── Styles ──────────────────────
const pageStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '480px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  overflow: 'hidden',
};

const labelStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 500,
  color: '#475569',
  marginBottom: '4px',
  display: 'block',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  fontSize: '14px',
  border: '1px solid #d1d5db',
  color: '#1e293b',
  outline: 'none',
  boxSizing: 'border-box',
};
