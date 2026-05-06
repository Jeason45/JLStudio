'use client';

import type { ReactNode } from 'react';

export interface TabItem {
  value: string;
  label: ReactNode;
  count?: number;
}

export function Tabs({
  items,
  value,
  onChange,
  size = 'md',
}: {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}) {
  const padding = size === 'sm' ? '5px 12px' : '7px 14px';
  const fontSize = size === 'sm' ? '12px' : '13px';
  return (
    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding,
              fontSize,
              fontWeight: 500,
              borderRadius: '6px',
              background: active ? 'var(--text-primary)' : 'var(--bg-secondary)',
              color: active ? 'var(--bg-card)' : 'var(--text-secondary)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            <span>{item.label}</span>
            {typeof item.count === 'number' && (
              <span
                style={{
                  fontSize: '10px',
                  padding: '1px 6px',
                  borderRadius: '8px',
                  background: active ? 'rgba(255,255,255,0.2)' : 'var(--bg-card)',
                  color: 'inherit',
                  fontWeight: 600,
                }}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
