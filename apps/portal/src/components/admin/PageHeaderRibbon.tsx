'use client';

import { usePathname } from 'next/navigation';
import { getSectionColor } from './sectionColors';

/**
 * Bandeau top-of-page style Flamme : point coloré + filet horizontal dégradé +
 * label uppercase à droite.
 *
 * La couleur est auto-déterminée par la route active (cohérence avec la
 * couleur de section dans la sidebar). Override possible via `color` prop.
 *
 * Usage :
 *   <PageHeaderRibbon label="Documents" />               // auto-couleur (rose)
 *   <PageHeaderRibbon label="Custom"   color="#b89868" /> // override
 */

export function PageHeaderRibbon({
  label,
  color,
}: {
  label: string;
  color?: string;
}) {
  const pathname = usePathname();
  const finalColor = color ?? getSectionColor(pathname);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: finalColor,
          boxShadow: `0 0 12px ${finalColor}66`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${finalColor}4D 0%, transparent 100%)`,
        }}
      />
      <span
        style={{
          fontSize: 10,
          color: finalColor,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.9,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}
