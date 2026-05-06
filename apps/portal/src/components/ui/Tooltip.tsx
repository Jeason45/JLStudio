'use client';

import { useState, ReactNode, CSSProperties } from 'react';

type Side = 'top' | 'right' | 'bottom' | 'left';

const sidePosition: Record<Side, CSSProperties> = {
  top: { bottom: '100%', left: '50%', transform: 'translateX(-50%) translateY(-6px)' },
  bottom: { top: '100%', left: '50%', transform: 'translateX(-50%) translateY(6px)' },
  left: { right: '100%', top: '50%', transform: 'translateY(-50%) translateX(-6px)' },
  right: { left: '100%', top: '50%', transform: 'translateY(-50%) translateX(6px)' },
};

export function Tooltip({
  content,
  side = 'top',
  children,
  delayMs = 250,
}: {
  content: ReactNode;
  side?: Side;
  children: ReactNode;
  delayMs?: number;
}) {
  const [open, setOpen] = useState(false);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timer) clearTimeout(timer);
    setTimer(setTimeout(() => setOpen(true), delayMs));
  };
  const handleLeave = () => {
    if (timer) clearTimeout(timer);
    setOpen(false);
  };

  return (
    <span
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          style={{
            position: 'absolute',
            ...sidePosition[side],
            background: 'var(--text-primary)',
            color: 'var(--bg-card)',
            fontSize: '11px',
            fontWeight: 500,
            padding: '4px 8px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            zIndex: 100,
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
}
