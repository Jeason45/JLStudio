import type { CSSProperties, ReactNode, MouseEvent } from 'react';

export function Card({
  children,
  padding = '16px',
  style,
  interactive,
  active,
  onClick,
}: {
  children: ReactNode;
  padding?: string | number;
  style?: CSSProperties;
  interactive?: boolean;
  active?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        background: active ? 'var(--accent-light)' : 'var(--bg-card)',
        borderRadius: '12px',
        border: active ? '1px solid var(--accent)' : '1px solid var(--border)',
        boxShadow: 'var(--shadow-card)',
        padding,
        cursor: interactive ? 'pointer' : undefined,
        transition: interactive ? 'all 0.15s' : undefined,
        ...style,
      }}
      onMouseEnter={interactive && !active ? (e) => {
        e.currentTarget.style.background = 'var(--bg-hover)';
        e.currentTarget.style.borderColor = 'var(--border-input)';
      } : undefined}
      onMouseLeave={interactive && !active ? (e) => {
        e.currentTarget.style.background = 'var(--bg-card)';
        e.currentTarget.style.borderColor = 'var(--border)';
      } : undefined}
    >
      {children}
    </div>
  );
}
