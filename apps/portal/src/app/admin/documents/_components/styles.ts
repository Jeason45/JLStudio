import type { CSSProperties } from 'react';

export const inputStyle = (): CSSProperties => ({
  width: '100%',
  padding: '8px 12px',
  border: '1px solid var(--agency-border)',
  borderRadius: 8,
  fontSize: 13,
  outline: 'none',
  background: 'var(--agency-surface-2)',
  color: 'var(--agency-ink-1)',
  fontFamily: 'inherit',
});

export const labelStyle = (): CSSProperties => ({
  display: 'block',
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--agency-ink-3)',
  marginBottom: 4,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
});

export const sectionStyle = (): CSSProperties => ({
  background: 'var(--agency-surface-1)',
  border: '1px solid var(--agency-border)',
  borderRadius: 12,
  padding: 20,
});

export const sectionTitleStyle = (): CSSProperties => ({
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--agency-ink-3)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 16,
});

export const primaryBtnStyle = (disabled = false): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 20px',
  borderRadius: 10,
  fontSize: 13,
  fontWeight: 600,
  cursor: disabled ? 'not-allowed' : 'pointer',
  background: 'var(--agency-accent)',
  color: 'white',
  border: 'none',
  opacity: disabled ? 0.4 : 1,
  transition: 'all 0.15s',
});

export const secondaryBtnStyle = (): CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '7px 14px',
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 500,
  cursor: 'pointer',
  background: 'var(--agency-accent-soft)',
  color: 'var(--agency-accent)',
  border: 'none',
});

export const iconBtnStyle = (color = 'var(--agency-ink-3)'): CSSProperties => ({
  width: 28,
  height: 28,
  borderRadius: 6,
  border: 'none',
  background: 'transparent',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color,
  transition: 'all 0.15s',
});
