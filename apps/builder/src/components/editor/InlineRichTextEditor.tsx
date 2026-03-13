'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { RichTextToolbar } from './RichTextToolbar'

interface InlineRichTextEditorProps {
  /** Initial HTML or plain text */
  initialContent: string
  /** Target DOM element to overlay on */
  targetElement: HTMLElement
  /** Called with final HTML on commit */
  onCommit: (html: string) => void
  /** Called when editing is cancelled */
  onCancel: () => void
  /** Element type for context (heading can have H1-H6) */
  elementType: 'heading' | 'text' | 'badge'
}

export function InlineRichTextEditor({
  initialContent,
  targetElement,
  onCommit,
  onCancel,
  elementType,
}: InlineRichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const committedRef = useRef(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: elementType === 'heading' ? { levels: [1, 2, 3, 4, 5, 6] } : false,
      }),
      Link.configure({ openOnClick: false }),
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: initialContent.includes('<') ? initialContent : `<p>${initialContent}</p>`,
    editorProps: {
      attributes: {
        class: 'outline-none min-h-[1em]',
      },
    },
    autofocus: 'end',
    immediatelyRender: false,
  })

  const commit = useCallback(() => {
    if (committedRef.current || !editor) return
    committedRef.current = true
    const html = editor.getHTML()
    // If content is simple single paragraph, extract just the text
    const simplified = simplifyHTML(html)
    onCommit(simplified)
  }, [editor, onCommit])

  // Handle Escape → cancel, Enter on heading/badge → commit
  useEffect(() => {
    if (!editor) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCancel()
        return
      }
      // For headings/badges, Enter without shift commits
      if (e.key === 'Enter' && !e.shiftKey && elementType !== 'text') {
        e.preventDefault()
        commit()
      }
    }
    const editorEl = containerRef.current
    editorEl?.addEventListener('keydown', handleKeyDown)
    return () => editorEl?.removeEventListener('keydown', handleKeyDown)
  }, [editor, elementType, commit, onCancel])

  // Click outside → commit
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        commit()
      }
    }
    // Delay to avoid the double-click that opened us
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [commit])

  // Position overlay on target element
  const rect = targetElement.getBoundingClientRect()
  const canvas = document.getElementById('site-canvas')
  const canvasRect = canvas?.getBoundingClientRect()
  if (!canvasRect) return null

  const computedStyle = getComputedStyle(targetElement)

  return (
    <div
      ref={containerRef}
      className="absolute"
      style={{
        top: rect.top - canvasRect.top,
        left: rect.left - canvasRect.left,
        width: rect.width,
        minHeight: rect.height,
        zIndex: 50,
      }}
    >
      {/* Toolbar */}
      {editor && (
        <RichTextToolbar
          editor={editor}
          elementType={elementType}
          style={{
            position: 'absolute',
            bottom: '100%',
            left: 0,
            marginBottom: 6,
          }}
        />
      )}

      {/* Editor area — inherit styles from target element */}
      <div
        style={{
          fontFamily: computedStyle.fontFamily,
          fontSize: computedStyle.fontSize,
          fontWeight: computedStyle.fontWeight,
          color: computedStyle.color,
          lineHeight: computedStyle.lineHeight,
          letterSpacing: computedStyle.letterSpacing,
          textAlign: computedStyle.textAlign as React.CSSProperties['textAlign'],
          textTransform: computedStyle.textTransform as React.CSSProperties['textTransform'],
          boxShadow: 'inset 0 0 0 1px rgba(20, 110, 245, 0.5)',
          borderRadius: 2,
          caretColor: '#146EF5',
          background: 'rgba(20, 110, 245, 0.03)',
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

/** Simplify tiptap HTML: if only a single <p> tag, return inner text. Preserve rich content. */
function simplifyHTML(html: string): string {
  // If it's a single paragraph with no inner HTML formatting, return plain text
  const match = html.match(/^<p>(.*?)<\/p>$/)
  if (match) {
    const inner = match[1]
    // Check if inner has any HTML tags
    if (!/<[^>]+>/.test(inner)) {
      return inner
    }
  }
  return html
}
