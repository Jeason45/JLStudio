import type { ReactNode } from 'react';
import { Card } from './Card';

export function StatCard({
  label,
  value,
  icon,
  trend,
}: {
  label: string;
  value: ReactNode;
  icon?: ReactNode;
  trend?: { value: string; positive?: boolean };
}) {
  return (
    <Card padding="14px 16px" style={{ minWidth: '140px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500 }}>{label}</span>
        {icon && <span style={{ color: 'var(--text-tertiary)' }}>{icon}</span>}
      </div>
      <div style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
        {value}
      </div>
      {trend && (
        <div
          style={{
            fontSize: '11px',
            marginTop: '4px',
            color: trend.positive ? 'var(--success)' : 'var(--danger)',
            fontWeight: 500,
          }}
        >
          {trend.positive ? '↑' : '↓'} {trend.value}
        </div>
      )}
    </Card>
  );
}
