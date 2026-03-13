'use client';

import { useState } from 'react';

interface BrandingSettingsProps {
  logoUrl: string | null;
  primaryColor: string;
  onSave: (data: { logoUrl?: string | null; primaryColor?: string }) => void;
  saving: boolean;
}

const PRESET_COLORS = [
  '#638BFF', '#6366f1', '#8b5cf6', '#a855f7',
  '#ec4899', '#ef4444', '#f97316', '#eab308',
  '#22c55e', '#10b981', '#06b6d4', '#3b82f6',
];

export default function BrandingSettings({ primaryColor, onSave, saving }: BrandingSettingsProps) {
  const [color, setColor] = useState(primaryColor);

  return (
    <div style={{
      background: 'var(--bg-card)', borderRadius: '12px',
      border: '1px solid var(--border)', padding: '24px',
      boxShadow: 'var(--shadow-card)',
    }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '16px' }}>
        Branding
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, display: 'block', marginBottom: '10px' }}>
          Couleur principale
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
          {PRESET_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: '28px', height: '28px', borderRadius: '6px',
                background: c, border: color === c ? '2px solid var(--text-primary)' : '2px solid transparent',
                cursor: 'pointer', transition: 'border 0.15s',
                boxShadow: color === c ? '0 0 0 2px var(--bg-card)' : 'none',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '32px', height: '32px', border: 'none', borderRadius: '6px', cursor: 'pointer', background: 'transparent' }}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: '100px', padding: '6px 10px', borderRadius: '8px',
              background: 'var(--bg-input)', border: '1px solid var(--border-input)',
              color: 'var(--text-primary)', fontSize: '13px', fontFamily: 'monospace',
            }}
          />
        </div>
      </div>

      <button
        onClick={() => onSave({ primaryColor: color })}
        disabled={saving}
        style={{
          padding: '8px 20px', borderRadius: '8px',
          background: color, color: 'white',
          border: 'none', cursor: 'pointer', fontWeight: 500, fontSize: '13px',
          opacity: saving ? 0.5 : 1, transition: 'opacity 0.15s',
        }}
      >
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </div>
  );
}
