import type { CSSProperties, ReactNode } from 'react';

type Tone = 'neutral' | 'accent' | 'success' | 'danger' | 'warning';

const TONE_STYLES: Record<Tone, { bg: string; color: string }> = {
  neutral: { bg: 'var(--bg-badge)', color: 'var(--text-tertiary)' },
  accent: { bg: 'var(--accent-light)', color: 'var(--accent)' },
  success: { bg: 'var(--success-light)', color: 'var(--success)' },
  danger: { bg: 'var(--danger-light)', color: 'var(--danger)' },
  warning: { bg: 'rgba(217,119,6,0.12)', color: 'var(--warning)' },
};

export function Badge({
  children,
  tone = 'neutral',
  style,
}: {
  children: ReactNode;
  tone?: Tone;
  style?: CSSProperties;
}) {
  const t = TONE_STYLES[tone];
  return (
    <span
      style={{
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '11px',
        fontWeight: 500,
        background: t.bg,
        color: t.color,
        display: 'inline-block',
        width: 'fit-content',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
