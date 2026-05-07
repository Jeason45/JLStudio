'use client';

/**
 * Bandeau top-of-page style Flamme : point coloré + filet horizontal dégradé +
 * label uppercase à droite. Cohérent avec la palette JL Studio (or laiton par
 * défaut, mais accepte une color custom pour différencier les pages si besoin).
 *
 * Usage :
 *   <PageHeaderRibbon label="Documents" />
 *   <PageHeaderRibbon label="Paramètres" color="#64748b" />
 */

export function PageHeaderRibbon({
  label,
  color = '#b89868', // or laiton JL Studio
}: {
  label: string;
  color?: string;
}) {
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
          background: color,
          boxShadow: `0 0 12px ${color}66`,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          flex: 1,
          height: 1,
          background: `linear-gradient(90deg, ${color}4D 0%, transparent 100%)`,
        }}
      />
      <span
        style={{
          fontSize: 10,
          color,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          opacity: 0.85,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
    </div>
  );
}
