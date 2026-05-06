'use client';

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

const baseStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: '8px',
  fontSize: '13px',
  background: 'var(--bg-input)',
  border: '1px solid var(--border-input)',
  color: 'var(--text-primary)',
  outline: 'none',
  fontFamily: 'inherit',
};

const labelStyle = {
  fontSize: '12px',
  fontWeight: 500,
  color: 'var(--text-secondary)',
  marginBottom: '4px',
  display: 'block',
};

export function Field({ label, error, children }: { label?: ReactNode; error?: string; children: ReactNode }) {
  return (
    <div>
      {label && <label style={labelStyle}>{label}</label>}
      {children}
      {error && (
        <p style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '4px' }}>{error}</p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { style, ...rest },
  ref,
) {
  return <input ref={ref} style={{ ...baseStyle, ...style }} {...rest} />;
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea(
  { style, ...rest },
  ref,
) {
  return <textarea ref={ref} style={{ ...baseStyle, resize: 'vertical', ...style }} {...rest} />;
});
