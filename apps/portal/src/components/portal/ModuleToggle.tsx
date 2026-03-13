'use client';

interface ModuleToggleProps {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  color: string;
}

export default function ModuleToggle({ label, description, enabled, onChange, color }: ModuleToggleProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px', borderRadius: '12px',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      boxShadow: 'var(--shadow-card)',
      transition: 'all 0.15s',
    }}>
      <div>
        <div style={{ fontSize: '13px', fontWeight: 500, color: enabled ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
          {label}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
          {description}
        </div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        style={{
          width: '40px', height: '22px', borderRadius: '11px',
          background: enabled ? color : 'var(--border-input)',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background 0.15s', flexShrink: 0, marginLeft: '12px',
        }}
      >
        <div style={{
          width: '16px', height: '16px', borderRadius: '50%',
          background: 'white', position: 'absolute', top: '3px',
          left: enabled ? '21px' : '3px', transition: 'left 0.15s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }} />
      </button>
    </div>
  );
}
