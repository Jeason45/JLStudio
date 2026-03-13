'use client'
import { cn } from '@/lib/utils'
import { elementProps } from '@/lib/elementHelpers'
import { Image as ImageIcon, Type, Tag } from 'lucide-react'
import type { ElementType } from '@/types/elements'

interface EditablePlaceholderProps {
  sectionId: string
  contentPath: string
  type: ElementType
  label?: string
  className?: string
}

const ICONS: Partial<Record<ElementType, typeof ImageIcon>> = {
  image: ImageIcon,
  badge: Tag,
  text: Type,
  heading: Type,
  button: Type,
}

/**
 * Placeholder shown in editing mode when a content slot (image, badge, etc.) is empty.
 * Renders a dashed-border box with an icon that is selectable via ElementSelectionOverlay.
 */
export function EditablePlaceholder({ sectionId, contentPath, type, label, className }: EditablePlaceholderProps) {
  const Icon = ICONS[type] ?? Type
  const displayLabel = label ?? (type === 'image' ? 'Ajouter une image' : type === 'badge' ? 'Ajouter un badge' : 'Ajouter du contenu')

  return (
    <div
      {...elementProps(sectionId, contentPath, type)}
      className={cn(
        'flex items-center justify-center gap-1.5 border-2 border-dashed border-zinc-300/50 rounded-lg text-zinc-400/60 cursor-pointer transition-colors hover:border-zinc-400 hover:text-zinc-500',
        type === 'image' ? 'aspect-video min-h-[80px]' : 'px-3 py-1.5',
        className,
      )}
    >
      <Icon className="w-4 h-4 shrink-0" />
      <span className="text-[10px] font-medium">{displayLabel}</span>
    </div>
  )
}
