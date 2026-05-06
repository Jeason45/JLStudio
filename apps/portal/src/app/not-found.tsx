import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '16px',
        padding: '24px',
        background: 'var(--bg-page)',
      }}
    >
      <h2 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)' }}>
        Page introuvable
      </h2>
      <p
        style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          maxWidth: '480px',
          textAlign: 'center',
        }}
      >
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        href="/dashboard"
        style={{
          padding: '8px 20px',
          background: 'var(--accent)',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        Retour au tableau de bord
      </Link>
    </div>
  );
}
