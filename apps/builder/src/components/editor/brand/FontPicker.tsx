'use client'

interface FontPickerProps {
  label: string
  value: string
  onChange: (font: string) => void
}

const FONT_OPTIONS = [
  // Sans-serif modernes
  { value: 'Inter', label: 'Inter', category: 'Sans-serif' },
  { value: 'DM Sans', label: 'DM Sans', category: 'Sans-serif' },
  { value: 'Geist', label: 'Geist', category: 'Sans-serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
  { value: 'Outfit', label: 'Outfit', category: 'Sans-serif' },
  { value: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', category: 'Sans-serif' },
  { value: 'Sora', label: 'Sora', category: 'Sans-serif' },
  { value: 'Nunito', label: 'Nunito', category: 'Sans-serif' },
  { value: 'Raleway', label: 'Raleway', category: 'Sans-serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans-serif' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
  // Serif
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
  { value: 'Libre Baskerville', label: 'Libre Baskerville', category: 'Serif' },
]

const grouped = FONT_OPTIONS.reduce((acc, font) => {
  if (!acc[font.category]) acc[font.category] = []
  acc[font.category].push(font)
  return acc
}, {} as Record<string, typeof FONT_OPTIONS>)

export function FontPicker({ label, value, onChange }: FontPickerProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-zinc-400">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-8 bg-zinc-800 border border-zinc-700 text-white text-xs rounded-md px-2 focus:outline-none focus:ring-1 focus:ring-wf-blue"
        style={{ fontFamily: value }}
      >
        {Object.entries(grouped).map(([category, fonts]) => (
          <optgroup key={category} label={category}>
            {fonts.map(font => (
              <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                {font.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {/* Preview */}
      <p className="text-xs text-zinc-500 px-1" style={{ fontFamily: value }}>
        The quick brown fox jumps over the lazy dog
      </p>
    </div>
  )
}
