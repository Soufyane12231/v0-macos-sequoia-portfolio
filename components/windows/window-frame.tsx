'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { useDesktopStore, WindowId } from '@/lib/desktop-store'

interface WindowFrameProps {
  id: WindowId
  children: React.ReactNode
}

export function WindowFrame({ id, children }: WindowFrameProps) {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useDesktopStore()
  
  const window = windows[id]
  const isActive = activeWindowId === id
  const dragControls = useDragControls()
  const constraintsRef = useRef<HTMLDivElement>(null)
  const windowRef = useRef<HTMLDivElement>(null)
  
  const [isResizing, setIsResizing] = useState(false)
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const resizeStartPos = useRef({ x: 0, y: 0, width: 0, height: 0 })
  
  const handleResizeStart = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    e.stopPropagation()
    setIsResizing(true)
    setResizeDirection(direction)
    resizeStartPos.current = {
      x: e.clientX,
      y: e.clientY,
      width: window.size.width,
      height: window.size.height,
    }
    focusWindow(id)
  }, [window.size, id, focusWindow])
  
  useEffect(() => {
    if (!isResizing) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - resizeStartPos.current.x
      const dy = e.clientY - resizeStartPos.current.y
      
      let newWidth = resizeStartPos.current.width
      let newHeight = resizeStartPos.current.height
      
      if (resizeDirection?.includes('e')) {
        newWidth = Math.max(400, resizeStartPos.current.width + dx)
      }
      if (resizeDirection?.includes('w')) {
        newWidth = Math.max(400, resizeStartPos.current.width - dx)
      }
      if (resizeDirection?.includes('s')) {
        newHeight = Math.max(300, resizeStartPos.current.height + dy)
      }
      if (resizeDirection?.includes('n')) {
        newHeight = Math.max(300, resizeStartPos.current.height - dy)
      }
      
      updateWindowSize(id, { width: newWidth, height: newHeight })
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      setResizeDirection(null)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, resizeDirection, id, updateWindowSize])
  
  if (!window.isOpen || window.isMinimized) return null
  
  return (
    <>
      {/* Constraints container */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none" style={{ top: 28, bottom: 70 }} />
      
      <AnimatePresence>
        <motion.div
          ref={windowRef}
          className={`fixed ${isActive ? '' : 'window-inactive'}`}
          style={{
            zIndex: window.zIndex,
            left: window.isMaximized ? 0 : window.position.x,
            top: window.isMaximized ? 28 : window.position.y,
            width: window.isMaximized ? '100%' : window.size.width,
            height: window.isMaximized ? 'calc(100vh - 98px)' : window.size.height,
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
          dragConstraints={constraintsRef}
          onDragEnd={(_, info) => {
            updateWindowPosition(id, {
              x: window.position.x + info.offset.x,
              y: window.position.y + info.offset.y,
            })
          }}
        >
          {/* Window container */}
          <div 
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
              {/* Traffic lights */}
              <div className="flex items-center gap-2">
                <button
                  className="traffic-light traffic-red group relative"
                  onClick={(e) => {
                    e.stopPropagation()
                    closeWindow(id)
                  }}
                >
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12">
                    <path d="M3 3l6 6M9 3l-6 6" stroke="#4a0000" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  className="traffic-light traffic-yellow group relative"
                  onClick={(e) => {
                    e.stopPropagation()
                    minimizeWindow(id)
                  }}
                >
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12">
                    <path d="M2 6h8" stroke="#995700" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  className="traffic-light traffic-green group relative"
                  onClick={(e) => {
                    e.stopPropagation()
                    maximizeWindow(id)
                  }}
                >
                  <svg className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 12 12">
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
          
          {/* Resize handles */}
          {!window.isMaximized && (
            <>
              {/* Corners */}
              <div
                className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize"
                onMouseDown={(e) => handleResizeStart(e, 'nw')}
              />
              <div
                className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize"
                onMouseDown={(e) => handleResizeStart(e, 'ne')}
              />
              <div
                className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize"
                onMouseDown={(e) => handleResizeStart(e, 'sw')}
              />
              <div
                className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                onMouseDown={(e) => handleResizeStart(e, 'se')}
              />
              
              {/* Edges */}
              <div
                className="absolute top-0 left-4 right-4 h-2 cursor-n-resize"
                onMouseDown={(e) => handleResizeStart(e, 'n')}
              />
              <div
                className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize"
                onMouseDown={(e) => handleResizeStart(e, 's')}
              />
              <div
                className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize"
                onMouseDown={(e) => handleResizeStart(e, 'w')}
              />
              <div
                className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize"
                onMouseDown={(e) => handleResizeStart(e, 'e')}
              />
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  )
}
