'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore, WindowId } from '@/lib/desktop-store'

interface DesktopIcon {
  id: string
  label: string
  windowId?: WindowId
  externalUrl?: string
  icon: React.ReactNode
}


export function DesktopIcons() {
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const { openWindow, setNotification } = useDesktopStore()
  
  const handleDoubleClick = (icon: DesktopIcon) => {
    if (icon.externalUrl) {
      window.open(icon.externalUrl, '_blank')
    } else if (icon.windowId) {
      if (icon.id === 'trash') {
        setNotification('Cannot delete: soufyane.exe is a critical system process')
      }
      openWindow(icon.windowId)
    }
  }
  
  return (
    <div className="fixed top-10 right-4 grid grid-cols-1 gap-2 p-2">
      {desktopIcons.map((icon) => (
        <motion.button
          key={icon.id}
          className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
            selectedIcon === icon.id 
              ? 'bg-[rgba(0,240,255,0.15)]' 
              : 'hover:bg-[rgba(255,255,255,0.05)]'
          }`}
          onClick={() => setSelectedIcon(icon.id)}
          onDoubleClick={() => handleDoubleClick(icon)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {icon.icon}
          <span className={`mt-1 text-xs text-center max-w-[80px] truncate ${
            selectedIcon === icon.id ? 'text-[#00f0ff]' : 'text-[#e8e8f0]'
          }`}>
            {icon.label}
          </span>
        </motion.button>
      ))}
    </div>
  )
}
