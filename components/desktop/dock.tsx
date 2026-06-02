'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useDesktopStore, WindowId } from '@/lib/desktop-store'

interface DockItem {
  id: string
  label: string
  windowId?: WindowId
  externalUrl?: string
  icon: React.ReactNode
  isDivider?: boolean
}

const dockItems: DockItem[] = [
  {
    id: 'finder',
    label: 'Finder',
    windowId: 'finder',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#finderGrad)" />
        <defs>
          <linearGradient id="finderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a9bff" />
            <stop offset="100%" stopColor="#0066cc" />
          </linearGradient>
        </defs>
        <rect x="12" y="12" width="10" height="10" rx="2" fill="white" fillOpacity="0.9" />
        <rect x="26" y="12" width="10" height="10" rx="2" fill="white" fillOpacity="0.9" />
        <rect x="12" y="26" width="10" height="10" rx="2" fill="white" fillOpacity="0.9" />
        <rect x="26" y="26" width="10" height="10" rx="2" fill="white" fillOpacity="0.9" />
      </svg>
    ),
  },
  {
    id: 'about',
    label: 'About Me',
    windowId: 'about',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#aboutGrad)" />
        <defs>
          <linearGradient id="aboutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#0099cc" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="18" r="6" fill="white" />
        <path d="M14 36c0-5.5 4.5-10 10-10s10 4.5 10 10" fill="white" />
      </svg>
    ),
  },
  {
    id: 'projects',
    label: 'Projects',
    windowId: 'projects',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#projectsGrad)" />
        <defs>
          <linearGradient id="projectsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7b2fff" />
            <stop offset="100%" stopColor="#5500cc" />
          </linearGradient>
        </defs>
        <rect x="10" y="14" width="28" height="20" rx="3" fill="white" fillOpacity="0.9" />
        <path d="M10 18h28" stroke="#7b2fff" strokeWidth="2" />
        <circle cx="14" cy="16" r="1" fill="#ff5f57" />
        <circle cx="18" cy="16" r="1" fill="#febc2e" />
        <circle cx="22" cy="16" r="1" fill="#28c840" />
      </svg>
    ),
  },
  {
    id: 'skills',
    label: 'Skills',
    windowId: 'skills',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#skillsGrad)" />
        <defs>
          <linearGradient id="skillsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="100%" stopColor="#00aa55" />
          </linearGradient>
        </defs>
        <path d="M14 34V22M22 34V18M30 34V14M38 34V26" stroke="white" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    windowId: 'experience',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#expGrad)" />
        <defs>
          <linearGradient id="expGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#cc4444" />
          </linearGradient>
        </defs>
        <rect x="10" y="12" width="28" height="24" rx="2" fill="white" fillOpacity="0.9" />
        <path d="M14 18h20M14 24h16M14 30h12" stroke="#ff6b6b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'certificates',
    label: 'Certificates',
    windowId: 'certificates',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#certGrad)" />
        <defs>
          <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#cc9900" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="20" r="8" fill="white" />
        <path d="M20 28v12l4-3 4 3V28" fill="white" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'Contact',
    windowId: 'contact',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="url(#contactGrad)" />
        <defs>
          <linearGradient id="contactGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9500" />
            <stop offset="100%" stopColor="#cc7700" />
          </linearGradient>
        </defs>
        <rect x="10" y="14" width="28" height="20" rx="3" fill="white" fillOpacity="0.9" />
        <path d="M10 17l14 10 14-10" stroke="#ff9500" strokeWidth="2" fill="none" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub',
    externalUrl: 'https://github.com/Soufyane12231',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#1a1a2e" />
        <path d="M24 12c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" fill="#e8e8f0" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    externalUrl: 'https://www.linkedin.com/in/soufyane-elaouni-63507732a/',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#0077b5" />
        <path d="M14 20v14M14 14v.01M20 34v-10a4 4 0 018 0v10M28 24v10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  { id: 'divider', label: '', isDivider: true, icon: null },
  {
    id: 'trash',
    label: 'Trash',
    windowId: 'trash',
    icon: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#333" />
        <path d="M14 18h20v20a4 4 0 01-4 4H18a4 4 0 01-4-4V18z" fill="#555" />
        <path d="M12 14h24" stroke="#888" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 14v-2a2 2 0 012-2h8a2 2 0 012 2v2" stroke="#888" strokeWidth="1.5" fill="none" />
      </svg>
    ),
  },
]

function DockIcon({ item, mouseX }: { item: DockItem; mouseX: ReturnType<typeof useMotionValue<number>> }) {
  const ref = useRef<HTMLDivElement>(null)
  const { openWindow, windows, focusWindow, setNotification } = useDesktopStore()
  
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })
  
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 72, 48])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })
  
  const isOpen = item.windowId ? windows[item.windowId]?.isOpen : false
  
  const handleClick = () => {
    if (item.externalUrl) {
      window.open(item.externalUrl, '_blank')
    } else if (item.windowId) {
      if (isOpen) {
        focusWindow(item.windowId)
      } else {
        if (item.id === 'trash') {
          setNotification('Cannot delete: soufyane.exe is a critical system process')
        }
        openWindow(item.windowId)
      }
    }
  }
  
  if (item.isDivider) {
    return (
      <div className="w-px h-10 bg-[rgba(255,255,255,0.2)] mx-2" />
    )
  }
  
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square relative group"
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
    >
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-md text-xs text-[#e8e8f0] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {item.label}
      </div>
      
      {/* Icon */}
      <motion.div 
        className="w-full h-full cursor-pointer rounded-xl overflow-hidden"
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {item.icon}
      </motion.div>
      
      {/* Open indicator dot */}
      {isOpen && (
        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00f0ff]"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </motion.div>
  )
}

export function Dock() {
  const mouseX = useMotionValue(Infinity)
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="fixed bottom-2 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 20 }}
    >
      <motion.div
        className="flex items-end gap-1 px-3 py-2 bg-[rgba(13,13,26,0.7)] backdrop-blur-2xl border border-[rgba(255,255,255,0.1)] rounded-2xl"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        onMouseEnter={() => setIsHovered(true)}
        animate={{
          boxShadow: isHovered 
            ? '0 0 40px rgba(0, 240, 255, 0.2)' 
            : '0 0 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        {dockItems.map((item) => (
          <DockIcon key={item.id} item={item} mouseX={mouseX} />
        ))}
      </motion.div>
    </motion.div>
  )
}
