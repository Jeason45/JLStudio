'use client'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { isVarRef, extractVarName } from '@/lib/variableResolver'
import { VarPicker } from './VarPicker'

const UNITS = ['px', '%', 'em', 'rem', 'vw', 'vh', 'auto'] as const
type Unit = typeof UNITS[number]

function parseSize(value: string | undefined): { num: string; unit: Unit } {
  if (!value || value === 'auto') return { num: '', unit: 'auto' }
  const match = value.match(/^(-?[\d.]+)\s*(px|%|em|rem|vw|vh)?$/)
  if (match) {
    return { num: match[1], unit: (match[2] as Unit) || 'px' }
  }
  return { num: value, unit: 'px' }
}

interface SizeInputWithUnitProps {
  label: string
  value?: string
  onChange: (v: string) => void
  placeholder?: string
}

export function SizeInputWithUnit({ label, value, onChange, placeholder = 'auto' }: SizeInputWithUnitProps) {
  const isVar = value ? isVarRef(value) : false
  const varName = isVar ? extractVarName(value!) : null

  const parsed = parseSize(isVar ? undefined : value)
  const [num, setNum] = useState(parsed.num)
  const [unit, setUnit] = useState<Unit>(parsed.unit)

  useEffect(() => {
    if (isVar) return
    const p = parseSize(value)
    setNum(p.num)
    setUnit(p.unit)
  }, [value, isVar])

  const emit = (n: string, u: Unit) => {
    if (u === 'auto') {
      onChange('auto')
    } else if (n === '') {
      onChange('')
    } else {
      onChange(`${n}${u}`)
    }
  }

  const isAuto = unit === 'auto'

  return (
    <div>
      <label className="text-[10px] text-zinc-500 leading-none">{label}</label>
      <div className="flex h-6 mt-0.5 items-center gap-0.5">
        {isVar ? (
          <span className="flex-1 text-[10px] text-purple-300 truncate px-1">--{varName}</span>
        ) : (
          <>
            <input
              type="text"
              value={isAuto ? '' : num}
              disabled={isAuto}
              onChange={e => {
                setNum(e.target.value)
                emit(e.target.value, unit)
              }}
              placeholder={isAuto ? 'auto' : placeholder}
              className={cn(
                'flex-[3] min-w-0 bg-zinc-800/80 border border-zinc-700/60 text-white text-[11px] px-2 rounded-l focus:outline-none focus:ring-1 focus:ring-wf-blue placeholder:text-zinc-600',
                isAuto && 'opacity-50 cursor-not-allowed'
              )}
            />
            <select
              value={unit}
              onChange={e => {
                const u = e.target.value as Unit
                setUnit(u)
                emit(num, u)
              }}
              className="flex-[2] min-w-0 bg-zinc-800/80 border border-zinc-700/60 border-l-0 text-zinc-400 text-[10px] rounded-r px-0.5 focus:outline-none focus:ring-1 focus:ring-wf-blue cursor-pointer"
            >
              {UNITS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </>
        )}
        <VarPicker
          types={['size', 'number', 'percentage']}
          onSelect={onChange}
          onClear={() => onChange('')}
          hasVarValue={isVar}
        />
      </div>
    </div>
  )
}
