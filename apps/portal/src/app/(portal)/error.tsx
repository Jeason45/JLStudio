'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: '16px',
        padding: '24px',
        background: 'var(--bg-page)',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)' }}>
        Une erreur est survenue
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        {error.message || 'Veuillez réessayer ou recharger la page.'}
      </p>
      <button
        onClick={reset}
        style={{
          padding: '8px 20px',
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
        }}
      >
        Réessayer
      </button>
    </div>
  );
}
