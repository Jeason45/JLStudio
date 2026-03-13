'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Pipette } from 'lucide-react'

// ─── HSB ↔ RGB ↔ HEX helpers ───

function hsbToRgb(h: number, s: number, b: number): [number, number, number] {
  h = ((h % 360) + 360) % 360
  s = Math.max(0, Math.min(1, s / 100))
  b = Math.max(0, Math.min(1, b / 100))
  const c = b * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = b - c
  let r = 0, g = 0, bl = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; bl = x }
  else if (h < 240) { g = x; bl = c }
  else if (h < 300) { r = x; bl = c }
  else { r = c; bl = x }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((bl + m) * 255)]
}

function rgbToHsb(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = 60 * (((g - b) / d) % 6)
    else if (max === g) h = 60 * ((b - r) / d + 2)
    else h = 60 * ((r - g) / d + 4)
  }
  if (h < 0) h += 360
  const s = max === 0 ? 0 : (d / max) * 100
  const v = max * 100
  return [Math.round(h), Math.round(s), Math.round(v)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('')
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) {
    const s = hex.replace('#', '').match(/^([0-9a-f])([0-9a-f])([0-9a-f])$/i)
    if (!s) return null
    return [parseInt(s[1] + s[1], 16), parseInt(s[2] + s[2], 16), parseInt(s[3] + s[3], 16)]
  }
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function anyColorToRgb(color: string): [number, number, number] | null {
  if (!color) return null
  const rgb = hexToRgb(color)
  if (rgb) return rgb
  try {
    const ctx = document.createElement('canvas').getContext('2d')
    if (!ctx) return null
    ctx.fillStyle = color
    const hex = ctx.fillStyle
    return hexToRgb(hex)
  } catch { return null }
}

// ─── Component ───

interface ColorPickerPopoverProps {
  color: string
  alpha?: number
  onChange: (color: string) => void
  onAlphaChange?: (alpha: number) => void
  onClose?: () => void
}

export function ColorPickerPopover({ color, alpha = 100, onChange, onAlphaChange }: ColorPickerPopoverProps) {
  const rgb = anyColorToRgb(color) ?? [0, 0, 0]
  const [h, s, b] = rgbToHsb(...rgb)

  const [hue, setHue] = useState(h)
  const [sat, setSat] = useState(s)
  const [bri, setBri] = useState(b)
  const [alphaVal, setAlphaVal] = useState(alpha)
  const [hexInput, setHexInput] = useState(rgbToHex(...rgb).replace('#', ''))

  const spectrumRef = useRef<HTMLDivElement>(null)
  const hueRef = useRef<HTMLDivElement>(null)
  const alphaRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef<'spectrum' | 'hue' | 'alpha' | null>(null)

  // Sync from external color prop
  useEffect(() => {
    const rgb2 = anyColorToRgb(color)
    if (!rgb2) return
    const [h2, s2, b2] = rgbToHsb(...rgb2)
    setHue(h2)
    setSat(s2)
    setBri(b2)
    setHexInput(rgbToHex(...rgb2).replace('#', ''))
  }, [color])

  useEffect(() => {
    setAlphaVal(alpha)
  }, [alpha])

  const emitColor = useCallback((h: number, s: number, b: number) => {
    const [r, g, bl] = hsbToRgb(h, s, b)
    const hex = rgbToHex(r, g, bl)
    setHexInput(hex.replace('#', ''))
    onChange(hex)
  }, [onChange])

  // Outside click is handled by parent FieldColor

  // ─── Spectrum drag (saturation X, brightness Y) ───
  const handleSpectrumMove = useCallback((clientX: number, clientY: number) => {
    const rect = spectrumRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
    const newS = Math.round(x * 100)
    const newB = Math.round((1 - y) * 100)
    setSat(newS)
    setBri(newB)
    emitColor(hue, newS, newB)
  }, [hue, emitColor])

  // ─── Hue drag ───
  const handleHueMove = useCallback((clientX: number) => {
    const rect = hueRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newH = Math.round(x * 360)
    setHue(newH)
    emitColor(newH, sat, bri)
  }, [sat, bri, emitColor])

  // ─── Alpha drag ───
  const handleAlphaMove = useCallback((clientX: number) => {
    const rect = alphaRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const newA = Math.round(x * 100)
    setAlphaVal(newA)
    onAlphaChange?.(newA)
  }, [onAlphaChange])

  // Global mouse move/up
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (dragging.current === 'spectrum') handleSpectrumMove(e.clientX, e.clientY)
      else if (dragging.current === 'hue') handleHueMove(e.clientX)
      else if (dragging.current === 'alpha') handleAlphaMove(e.clientX)
    }
    const handleUp = () => { dragging.current = null }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleUp)
    }
  }, [handleSpectrumMove, handleHueMove, handleAlphaMove])

  const handleHexSubmit = () => {
    const cleaned = hexInput.replace('#', '')
    const rgb2 = hexToRgb(cleaned)
    if (rgb2) {
      const [h2, s2, b2] = rgbToHsb(...rgb2)
      setHue(h2); setSat(s2); setBri(b2)
      onChange(rgbToHex(...rgb2))
    }
  }

  const handleEyedropper = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await (window as any).EyeDropper?.prototype ? new (window as any).EyeDropper().open() : null
      if (result?.sRGBHex) {
        onChange(result.sRGBHex)
      }
    } catch { /* user cancelled */ }
  }

  const currentRgb = hsbToRgb(hue, sat, bri)
  const currentHex = rgbToHex(...currentRgb)
  const hueColor = rgbToHex(...hsbToRgb(hue, 100, 100))

  return (
    <div className="bg-[#1e1e1e] border border-[#444] rounded-lg shadow-2xl overflow-hidden">
      {/* Spectrum — saturation (x) × brightness (y) */}
      <div
        ref={spectrumRef}
        className="relative w-full h-[140px] cursor-crosshair"
        style={{ backgroundColor: hueColor }}
        onMouseDown={e => { dragging.current = 'spectrum'; handleSpectrumMove(e.clientX, e.clientY) }}
      >
        {/* White gradient left→right */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #fff, transparent)' }} />
        {/* Black gradient top→bottom */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent, #000)' }} />
        {/* Cursor */}
        <div
          className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md pointer-events-none"
          style={{ left: `${sat}%`, top: `${100 - bri}%`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      <div className="px-3 py-2 space-y-2">
        {/* Hue bar */}
        <div className="flex items-center gap-2">
          {/* Eyedropper */}
          <button onClick={handleEyedropper} className="p-1 text-[#888] hover:text-white transition-colors shrink-0" title="Eyedropper">
            <Pipette className="w-3.5 h-3.5" />
          </button>
          <div
            ref={hueRef}
            className="flex-1 h-3 rounded-full cursor-pointer relative"
            style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}
            onMouseDown={e => { dragging.current = 'hue'; handleHueMove(e.clientX) }}
          >
            <div
              className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md pointer-events-none top-0"
              style={{ left: `${(hue / 360) * 100}%`, transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {/* Alpha bar */}
        <div className="flex items-center gap-2">
          <div className="w-[22px] h-[22px] rounded shrink-0 border border-[#444]" style={{ backgroundColor: currentHex }} />
          <div
            ref={alphaRef}
            className="flex-1 h-3 rounded-full cursor-pointer relative"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, ${currentHex}), repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)`,
              backgroundSize: '100% 100%, 6px 6px',
            }}
            onMouseDown={e => { dragging.current = 'alpha'; handleAlphaMove(e.clientX) }}
          >
            <div
              className="absolute w-3 h-3 rounded-full border-2 border-white shadow-md pointer-events-none top-0"
              style={{ left: `${alphaVal}%`, transform: 'translateX(-50%)' }}
            />
          </div>
        </div>

        {/* HEX / H / S / B / A inputs */}
        <div className="flex gap-1">
          <div className="flex-[2] min-w-0">
            <input
              value={hexInput}
              onChange={e => setHexInput(e.target.value)}
              onBlur={handleHexSubmit}
              onKeyDown={e => e.key === 'Enter' && handleHexSubmit()}
              className="w-full h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1.5 focus:outline-none focus:ring-1 focus:ring-wf-blue uppercase text-center"
            />
            <span className="text-[8px] text-[#666] block text-center mt-0.5">HEX</span>
          </div>
          <div className="flex-1 min-w-0">
            <input type="number" min={0} max={360} value={hue}
              onChange={e => { const v = +e.target.value; setHue(v); emitColor(v, sat, bri) }}
              className="w-full h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            <span className="text-[8px] text-[#666] block text-center mt-0.5">H</span>
          </div>
          <div className="flex-1 min-w-0">
            <input type="number" min={0} max={100} value={sat}
              onChange={e => { const v = +e.target.value; setSat(v); emitColor(hue, v, bri) }}
              className="w-full h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            <span className="text-[8px] text-[#666] block text-center mt-0.5">S</span>
          </div>
          <div className="flex-1 min-w-0">
            <input type="number" min={0} max={100} value={bri}
              onChange={e => { const v = +e.target.value; setBri(v); emitColor(hue, sat, v) }}
              className="w-full h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            <span className="text-[8px] text-[#666] block text-center mt-0.5">B</span>
          </div>
          <div className="flex-1 min-w-0">
            <input type="number" min={0} max={100} value={alphaVal}
              onChange={e => { const v = +e.target.value; setAlphaVal(v); onAlphaChange?.(v) }}
              className="w-full h-6 bg-[#111] border border-[#333] text-[#e0e0e0] text-[10px] rounded px-1 focus:outline-none focus:ring-1 focus:ring-wf-blue text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            <span className="text-[8px] text-[#666] block text-center mt-0.5">A</span>
          </div>
        </div>
      </div>
    </div>
  )
}
