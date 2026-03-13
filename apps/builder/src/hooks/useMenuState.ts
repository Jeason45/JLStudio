import { useState, useCallback, useRef, useEffect } from 'react'

interface UseMenuStateOptions {
  mode?: 'click' | 'hover'
  closeDelay?: number
}

export function useMenuState({ mode = 'click', closeDelay = 150 }: UseMenuStateOptions = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const open = useCallback(() => {
    if (timeoutRef.current) { clearTimeout(timeoutRef.current); timeoutRef.current = null }
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  const delayedClose = useCallback(() => {
    timeoutRef.current = setTimeout(close, closeDelay)
  }, [close, closeDelay])

  const toggle = useCallback(() => setIsOpen(prev => !prev), [])

  // Click outside
  useEffect(() => {
    if (!isOpen || mode !== 'click') return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [isOpen, mode, close])

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  const triggerProps = mode === 'hover'
    ? { onMouseEnter: open, onMouseLeave: delayedClose, onClick: toggle }
    : { onClick: toggle }

  const menuProps = mode === 'hover'
    ? { onMouseEnter: open, onMouseLeave: delayedClose }
    : {}

  return { isOpen, open, close, toggle, triggerProps, menuProps, containerRef }
}
