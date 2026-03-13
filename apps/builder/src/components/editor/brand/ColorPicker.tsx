'use client'
import { useRef } from 'react'

interface ColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-zinc-400">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500 font-mono">{value.toUpperCase()}</span>
        <button
          onClick={() => inputRef.current?.click()}
          className="w-7 h-7 rounded-lg border-2 border-zinc-700 shadow-inner transition-transform hover:scale-110"
          style={{ backgroundColor: value }}
          title={`Changer ${label}`}
        />
        <input
          ref={inputRef}
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="sr-only"
        />
      </div>
    </div>
  )
}
