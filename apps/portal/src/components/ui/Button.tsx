'use client';

import { forwardRef, ButtonHTMLAttributes, CSSProperties } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANT_STYLES: Record<Variant, CSSProperties> = {
  primary: { background: 'var(--accent)', color: 'white', border: 'none' },
  secondary: { background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: 'none' },
  ghost: { background: 'transparent', color: 'var(--text-tertiary)', border: 'none' },
  danger: { background: 'var(--danger-light)', color: 'var(--danger)', border: 'none' },
};

const SIZE_STYLES: Record<Size, CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: '11px', borderRadius: '6px' },
  md: { padding: '8px 16px', fontSize: '13px', borderRadius: '8px' },
  lg: { padding: '10px 20px', fontSize: '14px', borderRadius: '10px' },
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconLeft, iconRight, loading, disabled, style, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontWeight: 500,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        transition: 'all 0.15s',
        ...SIZE_STYLES[size],
        ...VARIANT_STYLES[variant],
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
});
