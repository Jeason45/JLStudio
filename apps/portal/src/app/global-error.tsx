'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body style={{ margin: 0, fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            gap: '16px',
            padding: '24px',
            background: '#eaecf1',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>Erreur critique</h2>
          <p
            style={{
              fontSize: '14px',
              color: '#4b5563',
              maxWidth: '480px',
              textAlign: 'center',
            }}
          >
            {error.message || "L'application a rencontré un problème inattendu."}
          </p>
          <button
            onClick={reset}
            style={{
              padding: '8px 20px',
              background: '#4668e5',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Recharger
          </button>
        </div>
      </body>
    </html>
  );
}
