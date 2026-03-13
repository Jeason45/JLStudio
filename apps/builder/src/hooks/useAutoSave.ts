'use client'
import { useEffect, useRef, useCallback } from 'react'
import { useEditorStore } from '@/store/editorStore'

export function useAutoSave() {
  const { siteConfig, isDirty, setIsSaving, markClean } = useEditorStore()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const save = useCallback(async () => {
    if (!siteConfig || !isDirty) return

    setIsSaving(true)
    try {
      await fetch(`/api/sites/${siteConfig.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteConfig),
      })
      markClean()
    } catch (error) {
      console.error('[AutoSave] Erreur:', error)
    } finally {
      setIsSaving(false)
    }
  }, [siteConfig, isDirty, setIsSaving, markClean])

  useEffect(() => {
    if (!isDirty) return

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(save, 800)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isDirty, siteConfig, save])

  return { save }
}
