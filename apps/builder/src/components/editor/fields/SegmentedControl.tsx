'use client'
import { cn } from '@/lib/utils'

interface SegmentedControlProps<T extends string> {
  options: readonly { value: T; label: string; icon?: string }[]
  value?: T
  onChange: (v: T | undefined) => void
  small?: boolean
  /** If true, clicking the active option deselects it (sends empty string). Default: true */
  allowDeselect?: boolean
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  small,
  allowDeselect = true,
}: SegmentedControlProps<T>) {
  return (
    <div className="flex rounded bg-[#383838] overflow-hidden border border-[#444]">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => {
            if (value === opt.value) {
              if (allowDeselect) onChange('' as T)
              // If not allowDeselect, clicking the active item does nothing
            } else {
              onChange(opt.value)
            }
          }}
          className={cn(
            'flex-1 text-center transition-colors border-l border-[#444] first:border-l-0',
            small ? 'py-[3px] text-[10px]' : 'py-[4px] text-[10px]',
            value === opt.value
              ? 'bg-[#111] text-white'
              : 'text-[#bbb] hover:text-white hover:bg-[#444]'
          )}
          title={opt.label}
        >
          {opt.icon || opt.label}
        </button>
      ))}
    </div>
  )
}
