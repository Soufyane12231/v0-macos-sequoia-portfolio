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

const desktopIcons: DesktopIcon[] = [
  {
    id: 'projects',
    label: 'projects/',
    windowId: 'projects',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="4" y="8" width="40" height="32" rx="4" fill="#1a1a2e" stroke="#00f0ff" strokeWidth="1.5" />
        <rect x="4" y="8" width="40" height="8" rx="4" fill="#00f0ff" fillOpacity="0.3" />
        <path d="M12 24h24M12 32h16" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
        <circle cx="36" cy="32" r="2" fill="#00f0ff" />
      </svg>
    ),
  },
  {
    id: 'robotics',
    label: 'robotics_lab.app',
    windowId: 'projects',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="8" y="20" width="32" height="20" rx="4" fill="#1a1a2e" stroke="#7b2fff" strokeWidth="1.5" />
        <rect x="16" y="8" width="16" height="12" rx="2" fill="#1a1a2e" stroke="#7b2fff" strokeWidth="1.5" />
        <circle cx="20" cy="14" r="2" fill="#00f0ff" />
        <circle cx="28" cy="14" r="2" fill="#00f0ff" />
        <path d="M4 28h4M40 28h4M16 40v4M32 40v4" stroke="#7b2fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'embedded',
    label: 'embedded_sys.app',
    windowId: 'skills',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="8" y="8" width="32" height="32" rx="4" fill="#1a1a2e" stroke="#00f0ff" strokeWidth="1.5" />
        <rect x="14" y="14" width="20" height="20" rx="2" fill="#0d0d1a" stroke="#00f0ff" strokeWidth="1" />
        <circle cx="24" cy="24" r="4" fill="#00f0ff" fillOpacity="0.5" />
        <path d="M4 20h4M4 28h4M40 20h4M40 28h4M20 4v4M28 4v4M20 40v4M28 40v4" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bms',
    label: 'BMS_demo.app',
    windowId: 'projects',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="8" y="12" width="32" height="24" rx="4" fill="#1a1a2e" stroke="#00ff88" strokeWidth="1.5" />
        <rect x="4" y="20" width="4" height="8" rx="1" fill="#00ff88" />
        <rect x="12" y="16" width="24" height="16" rx="2" fill="#0d0d1a" />
        <path d="M16 24h4l2-4 4 8 2-4h4" stroke="#00ff88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'control',
    label: 'control_sys.app',
    windowId: 'skills',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="4" y="8" width="40" height="32" rx="4" fill="#1a1a2e" stroke="#7b2fff" strokeWidth="1.5" />
        <path d="M8 32 Q16 12 24 24 Q32 36 40 16" stroke="#00f0ff" strokeWidth="2" fill="none" />
        <path d="M8 24h32" stroke="#7b2fff" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: 'techstack',
    label: 'tech_stack.json',
    windowId: 'skills',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="8" y="4" width="32" height="40" rx="4" fill="#1a1a2e" stroke="#00f0ff" strokeWidth="1.5" />
        <path d="M14 12h20M14 20h12M14 28h16M14 36h8" stroke="#00f0ff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <circle cx="36" cy="12" r="2" fill="#00ff88" />
        <circle cx="30" cy="20" r="2" fill="#7b2fff" />
      </svg>
    ),
  },
  {
    id: 'cv',
    label: 'CV_Soufyane.pdf',
    windowId: 'about',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path d="M12 4h18l10 10v30a4 4 0 01-4 4H12a4 4 0 01-4-4V8a4 4 0 014-4z" fill="#1a1a2e" stroke="#ff5f57" strokeWidth="1.5" />
        <path d="M30 4v10h10" stroke="#ff5f57" strokeWidth="1.5" fill="none" />
        <path d="M14 24h20M14 32h16M14 40h12" stroke="#ff5f57" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
      </svg>
    ),
  },
  {
    id: 'achievements',
    label: 'achievements.app',
    windowId: 'certificates',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path d="M24 4l4 12h12l-10 8 4 12-10-8-10 8 4-12-10-8h12z" fill="#ffd700" fillOpacity="0.3" stroke="#ffd700" strokeWidth="1.5" />
        <circle cx="24" cy="20" r="6" fill="#1a1a2e" stroke="#ffd700" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'contact',
    label: 'contact.sh',
    windowId: 'contact',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="4" y="8" width="40" height="32" rx="4" fill="#1a1a2e" stroke="#00ff88" strokeWidth="1.5" />
        <text x="12" y="28" fill="#00ff88" fontSize="10" fontFamily="monospace">$ @</text>
        <rect x="28" y="20" width="12" height="2" fill="#00ff88" fillOpacity="0.5" />
        <rect x="28" y="26" width="8" height="2" fill="#00ff88" fillOpacity="0.3" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn.url',
    externalUrl: 'https://linkedin.com/in/soufyane-elaouni',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#0077b5" />
        <path d="M14 20v14M14 14v.01M20 34v-10a4 4 0 018 0v10M28 24v10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'github',
    label: 'GitHub.url',
    externalUrl: 'https://github.com/soufyane-elaouni',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <rect x="4" y="4" width="40" height="40" rx="8" fill="#1a1a2e" stroke="#e8e8f0" strokeWidth="1.5" />
        <path d="M24 12c-6.6 0-12 5.4-12 12 0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4 0-6.6-5.4-12-12-12z" fill="#e8e8f0" />
      </svg>
    ),
  },
  {
    id: 'trash',
    label: 'Trash',
    windowId: 'trash',
    icon: (
      <svg viewBox="0 0 48 48" className="w-12 h-12">
        <path d="M12 16h24v24a4 4 0 01-4 4H16a4 4 0 01-4-4V16z" fill="#1a1a2e" stroke="#8888aa" strokeWidth="1.5" />
        <path d="M8 12h32" stroke="#8888aa" strokeWidth="2" strokeLinecap="round" />
        <path d="M18 12V8a2 2 0 012-2h8a2 2 0 012 2v4" stroke="#8888aa" strokeWidth="1.5" />
        <path d="M20 22v12M24 22v12M28 22v12" stroke="#8888aa" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      </svg>
    ),
  },
]

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
