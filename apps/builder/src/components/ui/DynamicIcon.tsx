'use client'
import { useState, useEffect } from 'react'
import { icons, type LucideProps } from 'lucide-react'

// ── Iconify SVG cache (persists across renders) ──
const iconifySvgCache = new Map<string, string>()

function useIconifySvg(prefix: string, name: string) {
  const key = `${prefix}:${name}`
  const [svg, setSvg] = useState<string | null>(iconifySvgCache.get(key) ?? null)

  useEffect(() => {
    if (iconifySvgCache.has(key)) {
      setSvg(iconifySvgCache.get(key)!)
      return
    }

    let cancelled = false
    fetch(`/api/icons?prefix=${prefix}&query=${name}&limit=1`)
      .then(r => r.json())
      .then((data: { icons?: { name: string; prefix: string; svg: string }[] }) => {
        if (cancelled) return
        const match = data.icons?.find(i => i.name === name && i.prefix === prefix)
        if (match) {
          iconifySvgCache.set(key, match.svg)
          setSvg(match.svg)
        }
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [prefix, name, key])

  return svg
}

// Mapping emoji → Lucide icon name for backward compatibility
const EMOJI_TO_ICON: Record<string, string> = {
  '⚡': 'zap',
  '🔒': 'lock',
  '🔄': 'refresh-cw',
  '📊': 'bar-chart-3',
  '🌍': 'globe',
  '🤖': 'bot',
  '✨': 'sparkles',
  '🚀': 'rocket',
  '💡': 'lightbulb',
  '🎯': 'target',
  '💰': 'coins',
  '📈': 'trending-up',
  '🔧': 'wrench',
  '📱': 'smartphone',
  '🎨': 'palette',
  '🏆': 'trophy',
  '❤️': 'heart',
  '⭐': 'star',
  '🔔': 'bell',
  '📧': 'mail',
  '🔍': 'search',
  '📝': 'pencil',
  '📂': 'folder',
  '🛡️': 'shield',
  '⏱️': 'timer',
  '📌': 'pin',
  '🎵': 'music',
  '📷': 'camera',
  '🖥️': 'monitor',
  '☁️': 'cloud',
  '🔗': 'link',
  '👥': 'users',
  '💬': 'message-circle',
  '🏠': 'home',
  '⚙️': 'settings',
  '📦': 'package',
  '🎁': 'gift',
  '🔥': 'flame',
  '💎': 'diamond',
  '🛒': 'shopping-cart',
  '✅': 'check-circle',
  '❌': 'x-circle',
  '📅': 'calendar',
  '🕐': 'clock',
  '🗺️': 'map',
  '✈️': 'plane',
  '🚗': 'car',
  '🏢': 'building',
  '🎓': 'graduation-cap',
  '💻': 'laptop',
}

function kebabToPascal(str: string): string {
  return str
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function isEmoji(str: string): boolean {
  // Check if the string looks like an emoji (non-ASCII, short)
  return str.length <= 4 && /[^\x00-\x7F]/.test(str)
}

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string
  fallbackClassName?: string
}

export function DynamicIcon({ name, fallbackClassName, ...props }: DynamicIconProps) {
  if (!name) return null

  // Handle Iconify icons: "iconify:{prefix}:{name}"
  if (name.startsWith('iconify:')) {
    const parts = name.split(':')
    const prefix = parts[1] || ''
    const iconName = parts.slice(2).join(':')
    return <IconifyRenderer prefix={prefix} iconName={iconName} className={props.className} />
  }

  // If it's an emoji, try to map it to a Lucide icon
  let iconName = name
  if (isEmoji(name)) {
    const mapped = EMOJI_TO_ICON[name]
    if (mapped) {
      iconName = mapped
    } else {
      // Render as emoji text
      return <span className={fallbackClassName}>{name}</span>
    }
  }

  // Convert kebab-case to PascalCase for lookup in icons object
  const pascalName = kebabToPascal(iconName)
  const IconComponent = icons[pascalName as keyof typeof icons]

  if (IconComponent) {
    return <IconComponent {...props} />
  }

  // Fallback: render as text (might be an emoji or unknown icon)
  return <span className={fallbackClassName}>{name}</span>
}

function IconifyRenderer({ prefix, iconName, className }: { prefix: string; iconName: string; className?: string }) {
  const svg = useIconifySvg(prefix, iconName)
  if (!svg) return <span className={className} />
  return (
    <span
      className={`inline-flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current ${className || ''}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

export { EMOJI_TO_ICON }
