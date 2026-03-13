'use client'
import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  language?: 'html' | 'css' | 'javascript'
  readOnly?: boolean
  rows?: number
  placeholder?: string
  className?: string
}

export function CodeEditor({ value, onChange, language = 'html', readOnly, rows = 8, placeholder, className }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lines = (value || '').split('\n')
  const lineCount = Math.max(lines.length, rows)

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.currentTarget
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newVal = value.substring(0, start) + '  ' + value.substring(end)
      onChange?.(newVal)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2
      })
    }
  }, [value, onChange])

  const LANG_LABELS: Record<string, string> = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
  }

  return (
    <div className={cn('rounded border border-zinc-700 overflow-hidden', className)}>
      <div className="flex items-center justify-between px-2 py-1 bg-zinc-800/80 border-b border-zinc-700/50">
        <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-wider">{LANG_LABELS[language]}</span>
        {readOnly && <span className="text-[9px] text-zinc-600">Read only</span>}
      </div>
      <div className="flex bg-zinc-900">
        {/* Line numbers */}
        <div className="select-none text-right pr-2 pl-2 py-2 border-r border-zinc-800 shrink-0" style={{ minWidth: '2.5rem' }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="text-[10px] leading-[1.6] text-zinc-700 font-mono">{i + 1}</div>
          ))}
        </div>
        {/* Code area */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          rows={lineCount}
          placeholder={placeholder}
          spellCheck={false}
          className={cn(
            'flex-1 bg-transparent text-[11px] leading-[1.6] font-mono text-zinc-200 p-2 resize-none focus:outline-none placeholder:text-zinc-700',
            readOnly && 'cursor-default text-zinc-400'
          )}
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  )
}
