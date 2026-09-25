'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { useDesktopStore, WindowState } from '@/lib/desktop-store'

interface WindowFrameProps {
  window: WindowState
  children: React.ReactNode
}

/** Menu bar at the top, dock at the bottom: the space a window may use. */
const MENUBAR_HEIGHT = 28
const DOCK_RESERVE = 70
/** Breathing room kept between a window and the edge it was dragged to. */
const WINDOW_GAP = 8

/**
 * The `window` prop shadows the global inside this component, so the viewport
 * is read through a module-level helper instead of the shadowed name.
 */
const viewport = () => ({
  width: globalThis.innerWidth,
  height: globalThis.innerHeight,
})

/** Keeps a value inside [min, max]; a window too big to fit keeps its min edge. */
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, Math.max(min, max)))

export function WindowFrame({ window, children }: WindowFrameProps) {
  const {
    activeWindowId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktopStore()
  
  const id = window.id
  const isActive = activeWindowId === id
  const dragControls = useDragControls()
  const windowRef = useRef<HTMLDivElement>(null)
  const grabOffset = useRef({ x: 0, y: 0 })
  
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const resizeStartPos = useRef({ x: 0, y: 0, posX: 0, posY: 0, width: 0, height: 0 })
  
  const handleResizeStart = useCallback((e: React.PointerEvent, direction: string) => {
    e.preventDefault()
    // The title bar starts the window drag on pointerdown, which fires *before*
    // mousedown — stopping propagation here is what keeps a north or west resize
    // from dragging the window across the desktop at the same time.
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      posX: window.position.x,
      posY: window.position.y,
      width: window.size.width,
      height: window.size.height,
    }
    focusWindow(id)
  }, [window.position, window.size, id, focusWindow])
  
  useEffect(() => {
    if (!isResizing) return
    
    // Pointer events, not mouse events: cancelling pointerdown (needed to stop
    // text selection) suppresses the compatibility mousemove/mouseup pair.
    const handlePointerMove = (e: PointerEvent) => {
      const start = resizeStartPos.current
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y

      // The desktop is locked to the viewport: never grow past it, and never
      // shrink a window below what its own content needs.
      const { width: viewportWidth, height: viewportHeight } = viewport()
      const maxWidth = Math.max(240, viewportWidth - 16)
      const maxHeight = Math.max(200, viewportHeight - MENUBAR_HEIGHT - DOCK_RESERVE)
      const minWidth = Math.min(400, maxWidth)
      const minHeight = Math.min(300, maxHeight)

      // A west or north drag keeps the opposite edge still, so the room left to
      // grow in is the space between that fixed edge and the viewport.
      const growWidth = Math.min(maxWidth, viewportWidth - WINDOW_GAP - start.posX)
      const growHeight = Math.min(maxHeight, viewportHeight - MENUBAR_HEIGHT - DOCK_RESERVE - start.posY)

      let newWidth = start.width
      let newHeight = start.height
      let newX = start.posX
      let newY = start.posY

      if (resizeDirection?.includes('e')) {
        newWidth = Math.min(maxWidth, start.width + dx)
      }
      if (resizeDirection?.includes('w')) {
        // Dragging the west edge moves the left border, so x has to follow it.
        newWidth = Math.max(minWidth, Math.min(growWidth, start.width - dx))
        newX = Math.max(WINDOW_GAP, start.posX + (start.width - newWidth))
      }
      if (resizeDirection?.includes('s')) {
        newHeight = Math.min(maxHeight, start.height + dy)
      }
      if (resizeDirection?.includes('n')) {
        // Same for the north edge and the top border.
        newHeight = Math.max(minHeight, Math.min(growHeight, start.height - dy))
        newY = Math.max(MENUBAR_HEIGHT, start.posY + (start.height - newHeight))
      }

      updateWindowSize(id, { width: newWidth, height: newHeight })
      if (newX !== start.posX || newY !== start.posY) {
        updateWindowPosition(id, { x: newX, y: newY })
      }
    }
    
    const handlePointerUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }
    
    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerup', handlePointerUp)
    document.addEventListener('pointercancel', handlePointerUp)
    
    return () => {
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerup', handlePointerUp)
      document.removeEventListener('pointercancel', handlePointerUp)
    }
  }, [isResizing, resizeDirection, id, updateWindowSize, updateWindowPosition])
  
  if (!window.isOpen || window.isMinimized) return null
  
  return (
    <>
      <AnimatePresence>
        <motion.div
          ref={windowRef}
          className={`fixed ${isActive ? '' : 'window-inactive'}`}
          style={{
            zIndex: window.zIndex,
            // Position comes from the store as a transform, not left/top: framer
            // owns the transform while dragging, so this is the one value that
            // both the drag and the store agree on. Mixing left/top with drag
            // makes every move count twice.
            x: window.isMaximized ? 0 : window.position.x,
            y: window.isMaximized ? MENUBAR_HEIGHT : window.position.y,
            width: window.isMaximized ? '100%' : window.size.width,
            height: window.isMaximized ? `calc(100vh - ${MENUBAR_HEIGHT + DOCK_RESERVE}px)` : window.size.height,
          }}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={() => focusWindow(id)}
          drag={!window.isMaximized}
          dragControls={dragControls}
          dragMomentum={false}
          dragListener={false}
          onDragStart={(_, info) => {
            // Where inside the frame the pointer grabbed it, so the window keeps
            // that offset instead of jumping its top-left corner to the cursor.
            // info.point is the pointer in page space; the desktop never scrolls.
            grabOffset.current = {
              x: info.point.x - window.position.x,
              y: info.point.y - window.position.y,
            }
          }}
          onDragEnd={(_, info) => {
            // Clamped here rather than by framer constraints: the desktop is
            // locked to the viewport, and this keeps the store as the only
            // place a position ever comes from.
            const { width: viewportWidth, height: viewportHeight } = viewport()
            const x = info.point.x - grabOffset.current.x
            const y = info.point.y - grabOffset.current.y
            updateWindowPosition(id, {
              x: Math.round(clamp(x, WINDOW_GAP, viewportWidth - window.size.width - WINDOW_GAP)),
              y: Math.round(clamp(y, MENUBAR_HEIGHT, viewportHeight - DOCK_RESERVE - window.size.height - WINDOW_GAP)),
            })
          }}
        >
          {/* Window container */}
          <div
            role="dialog"
            aria-label={window.title}
            className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-[rgba(0,240,255,0.15)]"
            style={{
              background: 'rgba(12, 12, 20, 0.92)',
              backdropFilter: 'blur(24px)',
              boxShadow: isActive 
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 240, 255, 0.1)' 
                : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Title bar */}
            <div 
              className="h-10 flex items-center px-3 gap-2 bg-[rgba(13,13,26,0.8)] border-b border-[rgba(0,240,255,0.08)] cursor-move shrink-0"
              onPointerDown={(e) => {
                if (!window.isMaximized) {
                  dragControls.start(e)
                }
              }}
            >
              {/* Traffic lights — 12px dots with a 24px hit area each */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label={`Fermer la fenêtre ${window.title}`}
                  className="traffic-light traffic-red group relative"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeWindow(id)
                  }}
                >
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="#4a0000" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={`Réduire la fenêtre ${window.title}`}
                  className="traffic-light traffic-yellow group relative"
                  onClick={(e) => {
                    e.stopPropagation()
                    minimizeWindow(id)
                  }}
                >
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6h8" stroke="#995700" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={`Agrandir la fenêtre ${window.title}`}
                  aria-pressed={window.isMaximized}
                  className="traffic-light traffic-green group relative"
                  onClick={(e) => {
                    e.stopPropagation()
                    maximizeWindow(id)
                  }}
                >
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 4l4-2 4 2M2 8l4 2 4-2" stroke="#006500" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              
              {/* Title */}
              <div className="flex-1 text-center">
                <span className="text-[#e8e8f0] text-sm font-medium">
                  {window.title}
                </span>
              </div>
              
              {/* Spacer for symmetry */}
              <div className="w-14" />
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-auto">
              {children}
            </div>
          </div>
          
          {/* Resize handles — z-10 keeps them clickable above the window content */}
          {!window.isMaximized && (
            <>
              {/* Corners */}
              <div
                className="absolute left-0 top-0 z-10 h-4 w-4 cursor-nw-resize"
                onPointerDown={(e) => handleResizeStart(e, 'nw')}
              />
              <div
                className="absolute right-0 top-0 z-10 h-4 w-4 cursor-ne-resize"
                onPointerDown={(e) => handleResizeStart(e, 'ne')}
              />
              <div
                className="absolute bottom-0 left-0 z-10 h-4 w-4 cursor-sw-resize"
                onPointerDown={(e) => handleResizeStart(e, 'sw')}
              />
              <div
                className="absolute bottom-0 right-0 z-10 h-4 w-4 cursor-se-resize"
                onPointerDown={(e) => handleResizeStart(e, 'se')}
              />
              
              {/* Edges */}
              <div
                className="absolute left-4 right-0 top-0 z-10 h-2 cursor-n-resize"
                onPointerDown={(e) => handleResizeStart(e, 'n')}
              />
              <div
                className="absolute bottom-0 left-4 right-0 z-10 h-2 cursor-s-resize"
                onPointerDown={(e) => handleResizeStart(e, 's')}
              />
              <div
                className="absolute bottom-4 left-0 top-4 z-10 w-2 cursor-w-resize"
                onPointerDown={(e) => handleResizeStart(e, 'w')}
              />
              <div
                className="absolute bottom-4 right-0 top-4 z-10 w-2 cursor-e-resize"
                onPointerDown={(e) => handleResizeStart(e, 'e')}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
