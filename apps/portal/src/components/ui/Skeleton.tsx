import type { CSSProperties } from 'react';

export function Skeleton({
  width = '100%',
  height = 16,
  rounded = 6,
  style,
}: {
  width?: string | number;
  height?: string | number;
  rounded?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width,
        height,
        borderRadius: rounded,
        background:
          'linear-gradient(90deg, var(--bg-secondary) 0%, var(--bg-hover) 50%, var(--bg-secondary) 100%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.4s ease-in-out infinite',
        ...style,
      }}
    />
  );
}

export function SkeletonRows({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: `1fr ${'140px '.repeat(columns - 2)}140px`,
            gap: '12px',
            padding: '14px 16px',
            borderBottom: i < rows - 1 ? '1px solid var(--border-light)' : 'none',
          }}
        >
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} height={14} width={j === 0 ? '60%' : '70%'} />
          ))}
        </div>
      ))}
    </div>
  );
}
