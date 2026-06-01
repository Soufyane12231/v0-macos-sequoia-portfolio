'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore, AccentColor } from '@/lib/desktop-store'

export function ContextMenu() {
  const { contextMenu, setContextMenu, accentColor, setAccentColor } = useDesktopStore()
  
  if (!contextMenu) return null
  
  const colors: AccentColor[] = ['cyan', 'purple', 'green']
  
  const menuItems = [
    { label: 'New Terminal Window', action: () => {} },
    { type: 'separator' },
    { 
      label: 'Change Wallpaper Theme', 
      submenu: colors.map(c => ({
        label: c.charAt(0).toUpperCase() + c.slice(1),
        action: () => setAccentColor(c),
        active: accentColor === c,
      }))
    },
    { type: 'separator' },
    { label: 'About SoufyaneOS', action: () => {} },
    { 
      label: 'View Source Code', 
      action: () => window.open('https://github.com/soufyane-elaouni', '_blank') 
    },
  ]
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed z-[200] bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg py-1 min-w-[200px] shadow-xl"
        style={{ left: contextMenu.x, top: contextMenu.y }}
        onClick={() => setContextMenu(null)}
      >
        {menuItems.map((item, i) => {
          if (item.type === 'separator') {
            return <div key={i} className="h-px bg-[rgba(0,240,255,0.1)] my-1" />
          }
          
          if ('submenu' in item && item.submenu) {
            return (
              <div key={i} className="relative group">
                <div className="px-3 py-1.5 text-[#e8e8f0] text-sm flex justify-between items-center hover:bg-[rgba(0,240,255,0.1)] cursor-pointer">
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#555]">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                {/* Submenu */}
                <div className="absolute left-full top-0 ml-1 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg py-1 min-w-[120px] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {item.submenu.map((sub, j) => (
                    <button
                      key={j}
                      onClick={(e) => {
                        e.stopPropagation()
                        sub.action()
                        setContextMenu(null)
                      }}
                      className="w-full px-3 py-1.5 text-left text-sm hover:bg-[rgba(0,240,255,0.1)] flex items-center gap-2"
                    >
                      {'active' in sub && sub.active && (
                        <span className="text-[#00f0ff]">✓</span>
                      )}
                      <span className={sub.active ? 'text-[#00f0ff]' : 'text-[#e8e8f0]'}>
                        {sub.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )
          }
          
          return (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation()
                item.action?.()
                setContextMenu(null)
              }}
              className="w-full px-3 py-1.5 text-left text-[#e8e8f0] text-sm hover:bg-[rgba(0,240,255,0.1)]"
            >
              {item.label}
            </button>
          )
        })}
      </motion.div>
    </AnimatePresence>
  )
}

export function DesktopContextMenu({ children }: { children: React.ReactNode }) {
  const { setContextMenu } = useDesktopStore()
  
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }
  
  const handleClick = () => {
    setContextMenu(null)
  }
  
  return (
    <div onContextMenu={handleContextMenu} onClick={handleClick} className="contents">
      {children}
      <ContextMenu />
    </div>
  )
}
