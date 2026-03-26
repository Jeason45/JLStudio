'use client'

import { useState } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { cn } from '@/lib/utils'
import type { LibraryElementItem, LibraryElementDef, LibraryIconItem, LibrarySectionItem } from '@/types/library'

interface LibraryItemCardProps {
  item: LibraryElementItem | LibraryIconItem | LibrarySectionItem
  index: number
  onAdd: () => void
}

// ─── Mini element renderer (recursive) ───

function MiniElement({ def, depth = 0 }: { def: LibraryElementDef; depth?: number }) {
  const s = def.defaultStyle
  const maxDepth = 2

  if (def.type === 'custom-button') {
    return (
      <div
        className="px-1.5 py-0.5 text-[6px] font-semibold truncate max-w-full leading-tight"
        style={{
          backgroundColor: (s.backgroundColor as string) || '#6366f1',
          color: (s.color as string) || '#fff',
          borderRadius: scaled(s.borderRadius as string, 0.4) || '2px',
          border: s.borderWidth ? `1px solid ${s.borderColor || '#000'}` : undefined,
          boxShadow: s.boxShadow ? scaleShadow(s.boxShadow as string, 0.3) : undefined,
          backdropFilter: s.backdropFilter as string,
          textAlign: 'center',
        }}
      >
        {(def.defaultContent.label as string) || 'Button'}
      </div>
    )
  }

  if (def.type === 'custom-text' || def.type === 'custom-heading') {
    const text = (def.defaultContent.text as string) || (def.defaultContent.label as string) || ''
    const fontSize = parseFloat((s.fontSize as string) || '1') * 0.35
    return (
      <div
        className="truncate max-w-full leading-tight"
        style={{
          fontSize: `${Math.max(5, Math.min(fontSize * 16, 10))}px`,
          fontWeight: (s.fontWeight as number) || 400,
          color: (s.color as string) || '#a1a1aa',
          letterSpacing: s.letterSpacing as string,
          textTransform: s.textTransform as string,
          fontStyle: s.fontStyle as string,
          textAlign: (s.textAlign as string) as 'left' | 'center' | 'right',
        }}
      >
        {text.slice(0, 30)}
      </div>
    )
  }

  if (def.type === 'custom-image') {
    return (
      <div className="w-full rounded-sm bg-zinc-600/40 flex items-center justify-center" style={{ height: '20px' }}>
        <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    )
  }

  if (def.type === 'custom-divider') {
    return <div className="w-full h-px bg-zinc-600/60" style={{ opacity: (s.opacity as number) ?? 0.5 }} />
  }

  if (def.type === 'custom-spacer') {
    return (
      <div className="w-full flex items-center justify-center" style={{ height: '8px' }}>
        <div className="w-6 border-t border-dashed border-zinc-600/40" />
      </div>
    )
  }

  if (def.type === 'custom-embed') {
    const html = def.defaultContent.html as string
    if (html?.includes('<svg')) {
      return (
        <div
          className="w-full h-full flex items-center justify-center text-zinc-400 [&_svg]:w-full [&_svg]:h-full [&_svg]:max-w-[80%] [&_svg]:max-h-[80%]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="px-1.5 py-0.5 rounded bg-zinc-700/60 text-[6px] text-zinc-400 font-mono">{'</>'}</div>
      </div>
    )
  }

  if (def.type === 'custom-container' && def.children?.length && depth < maxDepth) {
    const isRow = s.flexDirection === 'row' || s.flexDirection === 'row-reverse'
    return (
      <div
        className="w-full flex overflow-hidden"
        style={{
          flexDirection: isRow ? 'row' : 'column',
          gap: '2px', padding: '3px',
          backgroundColor: (s.backgroundColor as string) || undefined,
          borderRadius: scaled(s.borderRadius as string, 0.4) || '3px',
          border: s.borderWidth ? `1px solid ${s.borderColor || 'rgba(255,255,255,0.1)'}` : undefined,
          backdropFilter: s.backdropFilter as string,
          boxShadow: s.boxShadow ? scaleShadow(s.boxShadow as string, 0.25) : undefined,
          alignItems: isRow ? 'center' : undefined,
        }}
      >
        {def.children.slice(0, 5).map((child, i) => (
          <MiniElement key={i} def={child} depth={depth + 1} />
        ))}
      </div>
    )
  }

  if (def.type === 'custom-container') {
    return (
      <div
        className="w-full rounded-sm"
        style={{
          height: '16px',
          backgroundColor: (s.backgroundColor as string) || 'rgba(255,255,255,0.04)',
          borderRadius: scaled(s.borderRadius as string, 0.4) || '2px',
          border: s.borderWidth ? `1px solid ${s.borderColor || 'rgba(255,255,255,0.08)'}` : '1px dashed rgba(255,255,255,0.08)',
        }}
      />
    )
  }

  return <div className="w-3 h-3 rounded-sm bg-zinc-700/50" />
}

// ─── Helpers ───

function scaled(val: string | undefined, factor: number): string | undefined {
  if (!val) return undefined
  const num = parseFloat(val)
  if (isNaN(num)) return val
  const unit = val.replace(String(num), '')
  return `${(num * factor).toFixed(2)}${unit || 'rem'}`
}

function scaleShadow(shadow: string, factor: number): string {
  return shadow.replace(/(\d+\.?\d*)(px|rem|em)/g, (_, num, unit) => {
    return `${(parseFloat(num) * factor).toFixed(1)}${unit}`
  })
}

// ─── Animation preview: static by default, plays on hover ───

function AnimationPreview({ item, isHovered }: { item: LibraryElementItem; isHovered: boolean }) {
  const html = item.elementDef.defaultContent?.html as string
  if (!html) return null

  // Paused version: freeze all CSS animations at first frame + strip mouse handlers
  const pausedHtml = html
    .replace(/animation\s*:/g, 'animation-play-state:paused;animation:')
    .replace(/onmouseover="[^"]*"/g, '')
    .replace(/onmouseout="[^"]*"/g, '')

  return (
    <div className="w-full h-full relative">
      {/* Play indicator overlay when not hovered */}
      {!isHovered && (
        <div className="absolute bottom-0.5 right-0.5 z-10">
          <div className="w-4 h-4 rounded-full bg-zinc-700/90 flex items-center justify-center">
            <svg className="w-2 h-2 text-zinc-400" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          </div>
        </div>
      )}
      {/* Always visible preview — paused when idle, playing on hover */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <div
          className="scale-[0.35] origin-center"
          style={{ minWidth: '220px', minHeight: '80px' }}
          key={isHovered ? 'playing' : 'paused'}
          dangerouslySetInnerHTML={{ __html: isHovered ? html : pausedHtml }}
        />
      </div>
    </div>
  )
}

// ─── Subcategory-aware preview logic ───

function getSubcategoryPreview(item: LibraryElementItem, isHovered: boolean) {
  const def = item.elementDef
  const s = def.defaultStyle

  // Badges
  if (item.subcategory === 'badges') {
    return (
      <div
        className={cn('px-2 py-0.5 text-[7px] font-semibold truncate transition-transform duration-300', isHovered && 'scale-125')}
        style={{
          backgroundColor: (s.backgroundColor as string) || '#6366f1',
          color: (s.color as string) || '#fff',
          borderRadius: (s.borderRadius as string) || '9999px',
          border: s.borderWidth ? `1px solid ${s.borderColor || 'transparent'}` : undefined,
          boxShadow: s.boxShadow as string,
          backdropFilter: s.backdropFilter as string,
          display: s.display as string,
          gap: s.gap as string,
          alignItems: s.alignItems as string,
        }}
      >
        {(def.defaultContent.text as string) || 'Badge'}
      </div>
    )
  }

  // Animations — play on hover
  if (item.subcategory === 'animations') {
    return <AnimationPreview item={item} isHovered={isHovered} />
  }

  // Navbars
  if (item.subcategory === 'navbars') {
    return (
      <div
        className={cn('w-[95%] flex items-center justify-between px-2 py-1.5 rounded transition-all duration-300', isHovered && 'scale-105')}
        style={{
          backgroundColor: (s.backgroundColor as string) || 'rgba(20,12,8,0.6)',
          backdropFilter: s.backdropFilter as string,
          borderBottom: s.borderBottomWidth ? `1px solid ${s.borderBottomColor || 'rgba(255,255,255,0.08)'}` : undefined,
        }}
      >
        <div className="text-[7px] font-bold" style={{ color: '#f6efe5' }}>LOGO</div>
        <div className="flex gap-2">
          {['Home', 'About', 'Contact'].map((l, i) => (
            <div key={i} className={cn('text-[5px] transition-colors duration-200', isHovered ? 'text-zinc-200' : 'text-zinc-500')}>{isHovered ? l : ''}</div>
          ))}
          {!isHovered && <>
            <div className="w-4 h-0.5 rounded bg-zinc-500/50" />
            <div className="w-4 h-0.5 rounded bg-zinc-500/50" />
            <div className="w-4 h-0.5 rounded bg-zinc-500/50" />
          </>}
        </div>
        <div className="px-1.5 py-0.5 rounded-full text-[5px]" style={{ backgroundColor: 'rgba(128,117,117,0.5)', color: '#f6efe5' }}>CTA</div>
      </div>
    )
  }

  // Footers
  if (item.subcategory === 'footers') {
    const bgColor = (s.backgroundColor as string) || '#f6efe5'
    const isDark = bgColor.startsWith('#1') || bgColor.startsWith('#0') || bgColor.startsWith('rgba(2')
    const textColor = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)'
    const headColor = isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)'
    return (
      <div className={cn('w-[95%] flex gap-3 px-2 py-2 rounded transition-all duration-300', isHovered && 'scale-105')} style={{ backgroundColor: bgColor }}>
        <div className="flex flex-col gap-1 flex-1">
          <div className="text-[6px] font-bold" style={{ color: headColor }}>BRAND</div>
          {isHovered
            ? <div className="text-[5px]" style={{ color: textColor }}>Creating digital experiences since 2020.</div>
            : <>
                <div className="w-full h-0.5 rounded" style={{ backgroundColor: textColor, opacity: 0.3 }} />
                <div className="w-3/4 h-0.5 rounded" style={{ backgroundColor: textColor, opacity: 0.3 }} />
              </>
          }
        </div>
        <div className="flex flex-col gap-0.5">
          <div className={cn('h-0.5 rounded', isHovered ? 'text-[5px] h-auto font-semibold' : 'w-5')} style={isHovered ? { color: headColor } : { backgroundColor: headColor, opacity: 0.6 }}>{isHovered ? 'Navigation' : ''}</div>
          {isHovered
            ? ['Home', 'About', 'Services'].map((l, i) => <div key={i} className="text-[5px]" style={{ color: textColor }}>{l}</div>)
            : [4, 4, 4].map((w, i) => <div key={i} className="h-0.5 rounded" style={{ width: `${w * 4}px`, backgroundColor: textColor, opacity: 0.3 }} />)
          }
        </div>
        <div className="flex flex-col gap-0.5">
          <div className={cn('h-0.5 rounded', isHovered ? 'text-[5px] h-auto font-semibold' : 'w-5')} style={isHovered ? { color: headColor } : { backgroundColor: headColor, opacity: 0.6 }}>{isHovered ? 'Legal' : ''}</div>
          {isHovered
            ? ['Privacy', 'Terms'].map((l, i) => <div key={i} className="text-[5px]" style={{ color: textColor }}>{l}</div>)
            : [3, 4].map((w, i) => <div key={i} className="h-0.5 rounded" style={{ width: `${w * 4}px`, backgroundColor: textColor, opacity: 0.3 }} />)
          }
        </div>
      </div>
    )
  }

  // CTA blocks
  if (item.subcategory === 'cta') {
    const bgColor = (s.backgroundColor as string) || '#140c08'
    return (
      <div className={cn('w-[95%] flex items-center justify-between px-2.5 py-2 rounded transition-all duration-300', isHovered && 'scale-105')} style={{ backgroundColor: bgColor }}>
        <div className="flex flex-col gap-0.5 flex-1">
          {isHovered
            ? <>
                <div className="text-[7px] font-semibold text-white/80">Ready to start?</div>
                <div className="text-[5px] text-white/40">Join thousands of professionals.</div>
              </>
            : <>
                <div className="w-3/4 h-1 rounded bg-white/60" />
                <div className="w-1/2 h-0.5 rounded bg-white/20" />
              </>
          }
        </div>
        <div className={cn('px-1.5 py-0.5 rounded text-[5px] font-semibold transition-all duration-300', isHovered && 'scale-110')} style={{ backgroundColor: '#4a2711', color: '#f6efe5' }}>CTA →</div>
      </div>
    )
  }

  return null
}

// ─── Main preview function ───

function ItemPreview({ item, isHovered }: { item: LibraryElementItem | LibraryIconItem | LibrarySectionItem; isHovered: boolean }) {
  // Icons
  if (item.dropType === 'icon') {
    return (
      <div
        className={cn('w-8 h-8 text-zinc-300 [&_svg]:w-full [&_svg]:h-full transition-all duration-200', isHovered && 'scale-125 text-zinc-100')}
        dangerouslySetInnerHTML={{ __html: (item as LibraryIconItem).svg }}
      />
    )
  }

  if (item.dropType !== 'element') {
    return <span className="text-lg font-bold text-zinc-500">{item.label[0]?.toUpperCase()}</span>
  }

  const elItem = item as LibraryElementItem
  const subcatPreview = getSubcategoryPreview(elItem, isHovered)
  if (subcatPreview) return subcatPreview

  const def = elItem.elementDef
  const s = def.defaultStyle

  // Buttons — hover shows pressed/hover state
  if (def.type === 'custom-button') {
    return (
      <div
        className={cn('px-2 py-1 text-[7px] font-semibold truncate max-w-full transition-all duration-300', isHovered && 'scale-110')}
        style={{
          backgroundColor: (s.backgroundColor as string) || '#6366f1',
          color: (s.color as string) || '#fff',
          borderRadius: scaled(s.borderRadius as string, 0.6) || '3px',
          border: s.borderWidth ? `1px solid ${s.borderColor || '#000'}` : undefined,
          boxShadow: isHovered
            ? `${s.boxShadow ? scaleShadow(s.boxShadow as string, 0.5) : ''}, 0 4px 12px rgba(0,0,0,0.3)`
            : s.boxShadow ? scaleShadow(s.boxShadow as string, 0.4) : undefined,
          backdropFilter: s.backdropFilter as string,
          textAlign: 'center',
          filter: isHovered ? 'brightness(1.15)' : undefined,
        }}
      >
        {(def.defaultContent.label as string) || 'Button'}
      </div>
    )
  }

  // Headings
  if (def.type === 'custom-heading') {
    const fSize = parseFloat((s.fontSize as string) || '1.5')
    return (
      <div
        className={cn('truncate max-w-[90%] leading-tight transition-all duration-300', isHovered && 'scale-105')}
        style={{
          fontSize: `${Math.max(7, Math.min(fSize * 4, 14))}px`,
          fontWeight: (s.fontWeight as number) || 600,
          color: (s.color as string) || '#e1e1e1',
          letterSpacing: s.letterSpacing as string,
        }}
      >
        {((def.defaultContent.text as string) || 'Heading').split('\n')[0]}
      </div>
    )
  }

  // Text
  if (def.type === 'custom-text') {
    const fSize = parseFloat((s.fontSize as string) || '1')
    return (
      <div
        className="truncate max-w-[90%] leading-tight"
        style={{
          fontSize: `${Math.max(6, Math.min(fSize * 4, 10))}px`,
          fontWeight: (s.fontWeight as number) || 400,
          color: (s.color as string) || '#a1a1aa',
          letterSpacing: s.letterSpacing as string,
          textTransform: s.textTransform as 'uppercase' | 'lowercase' | 'capitalize' | undefined,
          fontStyle: s.fontStyle as string,
        }}
      >
        {((def.defaultContent.text as string) || 'Text').slice(0, 40)}
      </div>
    )
  }

  // Embeds
  if (def.type === 'custom-embed') {
    const html = def.defaultContent.html as string
    if (html?.includes('<svg')) {
      return (
        <div
          className={cn('w-full h-full flex items-center justify-center text-zinc-400 [&_svg]:max-w-[80%] [&_svg]:max-h-[80%] transition-all duration-300', isHovered && 'scale-110')}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }
    if (html?.includes('background:linear-gradient') || html?.includes('background:')) {
      return (
        <div
          className={cn('w-[85%] h-[70%] rounded overflow-hidden transition-all duration-300', isHovered && 'scale-105 shadow-lg')}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
    }
    return <div className="px-1.5 py-0.5 rounded bg-zinc-700/50 text-[6px] text-zinc-500 font-mono">{'</>'}</div>
  }

  // Dividers
  if (def.type === 'custom-divider') {
    return <div className={cn('w-[70%] h-px bg-zinc-500/50 transition-all duration-300', isHovered && 'w-[85%]')} />
  }

  // Spacers
  if (def.type === 'custom-spacer') {
    return (
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-6 border-t border-dashed border-zinc-600/40" />
        <span className="text-[6px] text-zinc-600">{String(s.height ?? '')}</span>
        <div className="w-6 border-t border-dashed border-zinc-600/40" />
      </div>
    )
  }

  // Containers with children — hover shows slight lift
  if (def.type === 'custom-container' && def.children?.length) {
    return (
      <div className={cn('w-[92%] h-[85%] flex items-center justify-center overflow-hidden transition-transform duration-300', isHovered && 'scale-105')}>
        <MiniElement def={def} depth={0} />
      </div>
    )
  }

  // Empty containers
  if (def.type === 'custom-container') {
    return (
      <div
        className={cn('w-[80%] h-[60%] rounded transition-all duration-300', isHovered && 'scale-105')}
        style={{
          backgroundColor: (s.backgroundColor as string) || 'rgba(255,255,255,0.04)',
          borderRadius: scaled(s.borderRadius as string, 0.5) || '4px',
          border: s.borderWidth ? `1px solid ${s.borderColor || 'rgba(255,255,255,0.1)'}` : '1px dashed rgba(255,255,255,0.1)',
          backdropFilter: s.backdropFilter as string,
          boxShadow: isHovered
            ? (s.boxShadow ? scaleShadow(s.boxShadow as string, 0.3) : '0 2px 8px rgba(0,0,0,0.2)')
            : s.boxShadow ? scaleShadow(s.boxShadow as string, 0.3) : undefined,
        }}
      />
    )
  }

  // Image
  if (def.type === 'custom-image') {
    return (
      <div className={cn('w-[70%] h-[50%] rounded bg-zinc-700/40 flex items-center justify-center transition-all duration-300', isHovered && 'scale-105')}>
        <svg className="w-4 h-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    )
  }

  return <span className="text-lg font-bold text-zinc-500">{item.label[0]?.toUpperCase()}</span>
}

// ─── Main component ───

export function LibraryItemCard({ item, index, onAdd }: LibraryItemCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Build drag data based on item type
  const dragData = (() => {
    if (item.dropType === 'section') {
      return {
        type: 'new-section' as const,
        sectionType: (item as LibrarySectionItem).sectionType,
        label: item.label,
        defaultContent: (item as LibrarySectionItem).content,
        defaultVariant: (item as LibrarySectionItem).variant,
      }
    }
    if (item.dropType === 'icon') {
      return {
        type: 'new-element' as const,
        elementDef: {
          type: 'custom-embed' as const,
          label: (item as LibraryIconItem).iconName,
          defaultStyle: { width: '24px', height: '24px' },
          defaultContent: { html: (item as LibraryIconItem).svg },
        },
        label: item.label,
      }
    }
    // element (components, elements, animations, illustrations)
    return {
      type: 'new-element' as const,
      elementDef: (item as LibraryElementItem).elementDef,
      label: item.label,
    }
  })()

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `library-${item.id}-${index}`,
    data: dragData,
  })

  return (
    <button
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onClick={onAdd}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'flex flex-col items-center gap-1 p-1 rounded-md transition-colors text-zinc-300',
        'hover:bg-zinc-700/50 hover:text-white cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-40'
      )}
    >
      <div className={cn(
        'w-full aspect-square rounded-lg bg-zinc-800/80 border border-zinc-700/40 flex items-center justify-center overflow-hidden transition-all duration-200',
        isHovered && 'border-zinc-600/60 bg-zinc-750/90'
      )}>
        <ItemPreview item={item} isHovered={isHovered} />
      </div>
      <span className="text-[10px] truncate w-full text-center leading-tight">{item.label}</span>
    </button>
  )
}
