'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Editor } from '@tiptap/react'
import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight,
  List, ListOrdered, Quote, Code, Link, RemoveFormatting,
  ChevronDown, ExternalLink, Trash2, Palette,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface RichTextToolbarProps {
  editor: Editor
  elementType: 'heading' | 'text' | 'badge'
  style?: React.CSSProperties
}

const HEADING_LEVELS = [
  { level: 1, label: 'H1' },
  { level: 2, label: 'H2' },
  { level: 3, label: 'H3' },
  { level: 4, label: 'H4' },
  { level: 5, label: 'H5' },
  { level: 6, label: 'H6' },
] as const

const COLOR_SWATCHES = [
  '#000000', '#FFFFFF', '#EF4444', '#F97316',
  '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6',
  '#EC4899', '#6B7280', '#0EA5E9', '#14B8A6',
]

const FONT_SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72]

function isValidUrl(str: string): boolean {
  if (!str.trim()) return false
  // Allow relative paths, anchors, mailto:, tel:, and absolute URLs
  if (/^(\/|#|mailto:|tel:)/.test(str)) return true
  try {
    // Add protocol if missing for validation
    const withProtocol = /^https?:\/\//i.test(str) ? str : `https://${str}`
    new URL(withProtocol)
    return true
  } catch {
    return false
  }
}

export function RichTextToolbar({ editor, elementType, style }: RichTextToolbarProps) {
  const [headingOpen, setHeadingOpen] = useState(false)
  const [linkPopoverOpen, setLinkPopoverOpen] = useState(false)
  const [colorPopoverOpen, setColorPopoverOpen] = useState(false)
  const [fontSizeOpen, setFontSizeOpen] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkNewTab, setLinkNewTab] = useState(false)
  const [hexInput, setHexInput] = useState('')
  const linkInputRef = useRef<HTMLInputElement>(null)

  const isEditingLink = editor.isActive('link')

  // Get current text color from selection
  const currentColor = editor.getAttributes('textStyle')?.color ?? ''

  // Get current font size from selection
  const currentFontSize = (() => {
    const style = editor.getAttributes('textStyle')
    if (style?.fontSize) {
      const num = parseInt(style.fontSize, 10)
      return isNaN(num) ? '' : String(num)
    }
    return ''
  })()

  const openLinkPopover = useCallback(() => {
    if (isEditingLink) {
      // Pre-fill with existing link attributes
      const attrs = editor.getAttributes('link')
      setLinkUrl(attrs.href || '')
      setLinkNewTab(attrs.target === '_blank')
    } else {
      setLinkUrl('')
      setLinkNewTab(false)
    }
    setLinkPopoverOpen(true)
  }, [editor, isEditingLink])

  const closeLinkPopover = useCallback(() => {
    setLinkPopoverOpen(false)
    setLinkUrl('')
    setLinkNewTab(false)
    editor.chain().focus().run()
  }, [editor])

  const applyLink = useCallback(() => {
    if (!linkUrl.trim() || !isValidUrl(linkUrl)) return
    // Add https:// if no protocol and not a special prefix
    let href = linkUrl.trim()
    if (!/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(href)) {
      href = `https://${href}`
    }
    editor
      .chain()
      .focus()
      .setLink({
        href,
        target: linkNewTab ? '_blank' : null,
        rel: linkNewTab ? 'noopener noreferrer' : null,
      })
      .run()
    setLinkPopoverOpen(false)
    setLinkUrl('')
    setLinkNewTab(false)
  }, [editor, linkUrl, linkNewTab])

  const removeLink = useCallback(() => {
    editor.chain().focus().unsetLink().run()
    setLinkPopoverOpen(false)
    setLinkUrl('')
    setLinkNewTab(false)
  }, [editor])

  const applyColor = useCallback((color: string) => {
    editor.chain().focus().setColor(color).run()
    setColorPopoverOpen(false)
  }, [editor])

  const removeColor = useCallback(() => {
    editor.chain().focus().unsetColor().run()
    setColorPopoverOpen(false)
  }, [editor])

  const applyFontSize = useCallback((size: number) => {
    editor.chain().focus().setMark('textStyle', { fontSize: `${size}px` }).run()
    setFontSizeOpen(false)
  }, [editor])

  // Auto-focus input when popover opens
  useEffect(() => {
    if (linkPopoverOpen) {
      requestAnimationFrame(() => {
        linkInputRef.current?.focus()
      })
    }
  }, [linkPopoverOpen])

  // Sync hex input with current color when color popover opens
  useEffect(() => {
    if (colorPopoverOpen) {
      setHexInput(currentColor.replace('#', ''))
    }
  }, [colorPopoverOpen, currentColor])

  return (
    <div
      className="flex items-center gap-0.5 bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 px-1.5 py-1 pointer-events-auto"
      style={style}
      onMouseDown={e => e.preventDefault()} // prevent blur
    >
      {/* Heading dropdown */}
      {elementType === 'heading' && (
        <div className="relative">
          <ToolBtn
            active={editor.isActive('heading')}
            onClick={() => setHeadingOpen(!headingOpen)}
            title="Heading level"
          >
            <span className="text-[10px] font-bold">H</span>
            <ChevronDown className="w-2.5 h-2.5" />
          </ToolBtn>
          {headingOpen && (
            <div className="absolute top-full left-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl z-10 py-0.5">
              <button
                onClick={() => { editor.chain().focus().setParagraph().run(); setHeadingOpen(false) }}
                className="w-full px-3 py-1 text-[10px] text-left text-zinc-300 hover:bg-zinc-700"
              >
                Paragraph
              </button>
              {HEADING_LEVELS.map(({ level, label }) => (
                <button
                  key={level}
                  onClick={() => { editor.chain().focus().toggleHeading({ level }).run(); setHeadingOpen(false) }}
                  className={cn(
                    'w-full px-3 py-1 text-[10px] text-left hover:bg-zinc-700',
                    editor.isActive('heading', { level }) ? 'text-wf-blue' : 'text-zinc-300'
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Separator />

      {/* Font size selector */}
      <div className="relative">
        <button
          onClick={() => setFontSizeOpen(!fontSizeOpen)}
          title="Font size"
          className="flex items-center gap-0.5 h-7 px-1.5 rounded text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
        >
          <span className="text-[10px] font-medium min-w-[18px] text-center">
            {currentFontSize || 'px'}
          </span>
          <ChevronDown className="w-2.5 h-2.5" />
        </button>
        {fontSizeOpen && (
          <div className="absolute top-full left-0 mt-1 bg-zinc-800 border border-zinc-700 rounded-md shadow-xl z-10 py-0.5 max-h-48 overflow-y-auto w-16">
            {FONT_SIZES.map(size => (
              <button
                key={size}
                onClick={() => applyFontSize(size)}
                className={cn(
                  'w-full px-3 py-1 text-[10px] text-left hover:bg-zinc-700',
                  currentFontSize === String(size) ? 'text-wf-blue' : 'text-zinc-300'
                )}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Format buttons */}
      <ToolBtn active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold">
        <Bold className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic">
        <Italic className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline">
        <Underline className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
        <Strikethrough className="w-3.5 h-3.5" />
      </ToolBtn>

      <Separator />

      {/* Text color picker */}
      <div className="relative">
        <button
          onClick={() => setColorPopoverOpen(!colorPopoverOpen)}
          title="Text color"
          className={cn(
            'flex items-center justify-center w-7 h-7 rounded transition-colors',
            currentColor ? 'text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
          )}
        >
          <div className="flex flex-col items-center gap-0">
            <Palette className="w-3.5 h-3.5" />
            <div
              className="w-3.5 h-0.5 rounded-full mt-0"
              style={{ backgroundColor: currentColor || '#a1a1aa' }}
            />
          </div>
        </button>
        {colorPopoverOpen && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 p-2.5 w-48"
            onMouseDown={e => e.stopPropagation()}
          >
            {/* Swatches */}
            <div className="grid grid-cols-6 gap-1.5 mb-2">
              {COLOR_SWATCHES.map(color => (
                <button
                  key={color}
                  onClick={() => applyColor(color)}
                  title={color}
                  className={cn(
                    'w-5 h-5 rounded-sm border transition-transform hover:scale-110',
                    currentColor === color ? 'border-wf-blue ring-1 ring-wf-blue' : 'border-zinc-600'
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            {/* Hex input */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-[10px] text-zinc-500">#</span>
              <input
                type="text"
                value={hexInput}
                onChange={e => setHexInput(e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6))}
                onKeyDown={e => {
                  if (e.key === 'Enter' && hexInput.length >= 3) {
                    applyColor(`#${hexInput}`)
                  }
                }}
                placeholder="000000"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-[10px] text-zinc-300 placeholder-zinc-600 outline-none focus:border-wf-blue transition-colors font-mono"
              />
              {currentColor && (
                <button
                  onClick={removeColor}
                  title="Remove color"
                  className="p-0.5 text-zinc-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lists — only for text elements */}
      {elementType === 'text' && (
        <>
          <Separator />
          <ToolBtn active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">
            <List className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Ordered list">
            <ListOrdered className="w-3.5 h-3.5" />
          </ToolBtn>
          <ToolBtn active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Blockquote">
            <Quote className="w-3.5 h-3.5" />
          </ToolBtn>
        </>
      )}

      <Separator />

      {/* Link & Code */}
      <div className="relative">
        <ToolBtn active={editor.isActive('link')} onClick={openLinkPopover} title="Link">
          <Link className="w-3.5 h-3.5" />
        </ToolBtn>
        {linkPopoverOpen && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl z-50 p-2.5 w-64"
            onMouseDown={e => e.stopPropagation()}
            onKeyDown={e => {
              if (e.key === 'Escape') { closeLinkPopover(); e.stopPropagation() }
              if (e.key === 'Enter') { applyLink(); e.stopPropagation() }
            }}
          >
            {/* URL input */}
            <label className="block text-[10px] text-zinc-500 mb-1 font-medium">URL</label>
            <input
              ref={linkInputRef}
              type="text"
              value={linkUrl}
              onChange={e => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-zinc-800 border border-zinc-700 rounded px-2 py-1.5 text-[11px] text-zinc-300 placeholder-zinc-600 outline-none focus:border-wf-blue transition-colors"
            />

            {/* Open in new tab */}
            <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={linkNewTab}
                onChange={e => setLinkNewTab(e.target.checked)}
                className="w-3 h-3 rounded border-zinc-600 bg-zinc-800 accent-wf-blue"
              />
              <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                Open in new tab
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center gap-1.5 mt-2.5">
              <button
                onClick={applyLink}
                disabled={!linkUrl.trim() || !isValidUrl(linkUrl)}
                className="flex-1 px-2 py-1 text-[11px] font-medium bg-wf-blue text-white rounded hover:bg-wf-blue/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Apply
              </button>
              <button
                onClick={closeLinkPopover}
                className="flex-1 px-2 py-1 text-[11px] text-zinc-400 bg-zinc-800 border border-zinc-700 rounded hover:text-zinc-200 hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
              {isEditingLink && (
                <button
                  onClick={removeLink}
                  title="Remove link"
                  className="p-1 text-zinc-500 hover:text-red-400 rounded hover:bg-zinc-800 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <ToolBtn active={editor.isActive('code')} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline code">
        <Code className="w-3.5 h-3.5" />
      </ToolBtn>

      <Separator />

      {/* Alignment */}
      <ToolBtn active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align left">
        <AlignLeft className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align center">
        <AlignCenter className="w-3.5 h-3.5" />
      </ToolBtn>
      <ToolBtn active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align right">
        <AlignRight className="w-3.5 h-3.5" />
      </ToolBtn>

      <Separator />

      {/* Clear formatting */}
      <ToolBtn active={false} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear formatting">
        <RemoveFormatting className="w-3.5 h-3.5" />
      </ToolBtn>
    </div>
  )
}

function ToolBtn({ active, onClick, title, children }: { active: boolean; onClick: () => void; title: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={cn(
        'flex items-center justify-center w-7 h-7 rounded transition-colors',
        active ? 'bg-wf-blue/30 text-wf-blue' : 'text-zinc-400 hover:text-white hover:bg-zinc-700'
      )}
    >
      {children}
    </button>
  )
}

function Separator() {
  return <div className="w-px h-4 bg-zinc-700 mx-0.5" />
}
