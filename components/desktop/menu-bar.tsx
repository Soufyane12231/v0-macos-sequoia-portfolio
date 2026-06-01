'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore } from '@/lib/desktop-store'

export function MenuBar() {
  const [time, setTime] = useState(new Date())
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { activeWindowId, windows } = useDesktopStore()
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    })
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    })
  }
  
  const activeWindowTitle = activeWindowId ? windows[activeWindowId]?.title : null
  
  const menus = {
    file: [
      { label: 'compile_portfolio.cpp', shortcut: '⌘B' },
      { label: 'flash_firmware()', shortcut: '⌘F' },
      { label: 'separator' },
      { label: 'Export to PDF', shortcut: '⌘E' },
      { label: 'separator' },
      { label: 'Close Window', shortcut: '⌘W' },
    ],
    edit: [
      { label: 'Undo', shortcut: '⌘Z' },
      { label: 'Redo', shortcut: '⇧⌘Z' },
      { label: 'separator' },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' },
    ],
    view: [
      { label: 'Show Toolbar', shortcut: '⌘T' },
      { label: 'Show Sidebar', shortcut: '⌘S' },
      { label: 'separator' },
      { label: 'Enter Full Screen', shortcut: '⌃⌘F' },
    ],
    window: [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom', shortcut: '' },
      { label: 'separator' },
      { label: 'Bring All to Front', shortcut: '' },
    ],
    help: [
      { label: 'SoufyaneOS Help', shortcut: '' },
      { label: 'separator' },
      { label: 'View on GitHub', shortcut: '' },
      { label: 'Contact Developer', shortcut: '' },
    ],
  }
  
  return (
    <div 
      className="fixed top-0 left-0 right-0 h-7 bg-[rgba(13,13,26,0.85)] backdrop-blur-xl border-b border-[rgba(0,240,255,0.08)] z-50 flex items-center justify-between px-4 text-sm"
      onClick={() => {
        setActiveMenu(null)
        setShowUserMenu(false)
      }}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <button 
          className="flex items-center gap-1 hover:bg-[rgba(255,255,255,0.1)] px-2 py-0.5 rounded transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            setActiveMenu(activeMenu === 'logo' ? null : 'logo')
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#00f0ff]">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
        
        <AnimatePresence>
          {activeMenu === 'logo' && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute top-7 left-2 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg py-2 min-w-[200px] shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1 text-[#8888aa] text-xs">
                SoufyaneOS v2.0
              </div>
              <div className="px-3 py-1 text-[#555] text-xs">
                Built with C++, Python & passion
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* App name */}
        <span className="font-semibold text-[#e8e8f0]">SoufyaneOS</span>
        
        {/* Active window name */}
        {activeWindowTitle && (
          <span className="text-[#8888aa]">{activeWindowTitle}</span>
        )}
        
        {/* Menus */}
        <div className="flex items-center gap-1 ml-2">
          {Object.entries(menus).map(([key, items]) => (
            <div key={key} className="relative">
              <button
                className={`px-2 py-0.5 rounded text-[#e8e8f0] hover:bg-[rgba(255,255,255,0.1)] transition-colors capitalize ${activeMenu === key ? 'bg-[rgba(255,255,255,0.1)]' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveMenu(activeMenu === key ? null : key)
                }}
              >
                {key}
              </button>
              
              <AnimatePresence>
                {activeMenu === key && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute top-full left-0 mt-1 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg py-1 min-w-[200px] shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {items.map((item, i) => 
                      item.label === 'separator' ? (
                        <div key={i} className="h-px bg-[rgba(0,240,255,0.1)] my-1" />
                      ) : (
                        <button
                          key={i}
                          className="w-full px-3 py-1.5 text-left text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)] flex justify-between items-center"
                        >
                          <span>{item.label}</span>
                          {item.shortcut && (
                            <span className="text-[#555] text-xs ml-4">{item.shortcut}</span>
                          )}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* WiFi */}
        <div className="group relative">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#e8e8f0] cursor-pointer">
            <path d="M5 12.55C7.38 10.14 10.55 8.5 14.12 8.5C17.69 8.5 20.86 10.14 23.24 12.55" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M1.42 9C5.07 5.38 10.23 3 16 3C21.77 3 26.93 5.38 30.58 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M8.53 16.11C10.16 14.48 12.44 13.5 14.99 13.5C17.54 13.5 19.82 14.48 21.45 16.11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="15" cy="20" r="1.5" fill="currentColor" />
          </svg>
          <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg text-xs text-[#8888aa] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Connected to: ENSA_Network
          </div>
        </div>
        
        {/* Battery */}
        <div className="group relative">
          <svg width="20" height="16" viewBox="0 0 24 16" fill="none" className="text-[#e8e8f0] cursor-pointer">
            <rect x="1" y="3" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="3" y="5" width="12" height="6" rx="1" fill="#00ff88" />
            <path d="M21 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg text-xs text-[#8888aa] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Battery: 87% — Optimized for performance
          </div>
        </div>
        
        {/* Date */}
        <span className="text-[#e8e8f0] text-xs">{formatDate(time)}</span>
        
        {/* Time */}
        <span className="text-[#e8e8f0] text-xs font-mono">{formatTime(time)}</span>
        
        {/* User avatar */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowUserMenu(!showUserMenu)
            }}
            className="w-5 h-5 rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7b2fff] flex items-center justify-center text-[8px] font-bold text-[#07070f] hover:ring-2 hover:ring-[#00f0ff] transition-all"
          >
            SE
          </button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-lg py-2 min-w-[220px] shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3 py-2 border-b border-[rgba(0,240,255,0.1)]">
                  <div className="text-[#e8e8f0] font-medium">Soufyane Elaouni</div>
                  <div className="text-[#8888aa] text-xs">soufyane.el3aouni@gmail.com</div>
                </div>
                <button className="w-full px-3 py-2 text-left text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)] text-sm">
                  System Preferences...
                </button>
                <div className="h-px bg-[rgba(0,240,255,0.1)] my-1" />
                <button 
                  className="w-full px-3 py-2 text-left text-[#ff5f57] hover:bg-[rgba(255,95,87,0.1)] text-sm"
                  onClick={() => window.location.reload()}
                >
                  Log Out...
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
