'use client'
import { useEditorStore } from '@/store/editorStore'

const GRID_COLOR = 'rgba(74, 144, 226, 0.08)'
const COLUMN_COLOR = 'rgba(74, 144, 226, 0.06)'
const COLUMN_BORDER_COLOR = 'rgba(74, 144, 226, 0.12)'
const GUTTER = 20

export function CanvasGridOverlay() {
  const { showGrid, gridSize, showColumns, columnCount } = useEditorStore()

  if (!showGrid && !showColumns) return null

  return (
    <div className="absolute inset-0 pointer-events-none z-[25]">
      {/* Grid */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, ${GRID_COLOR} 0px, ${GRID_COLOR} 1px, transparent 1px, transparent ${gridSize}px),
              repeating-linear-gradient(90deg, ${GRID_COLOR} 0px, ${GRID_COLOR} 1px, transparent 1px, transparent ${gridSize}px)
            `,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}

      {/* Columns */}
      {showColumns && (
        <div
          className="absolute inset-0 flex"
          style={{ padding: `0 ${GUTTER}px`, gap: `${GUTTER}px` }}
        >
          {Array.from({ length: columnCount }, (_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{
                backgroundColor: COLUMN_COLOR,
                borderLeft: `1px solid ${COLUMN_BORDER_COLOR}`,
                borderRight: `1px solid ${COLUMN_BORDER_COLOR}`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
