'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDesktopStore } from '@/lib/desktop-store'

export function Notification() {
  const { showNotification, notificationMessage, clearNotification } = useDesktopStore()
  
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(clearNotification, 4000)
      return () => clearTimeout(timer)
    }
  }, [showNotification, clearNotification])
  
  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-10 right-4 z-[100] max-w-sm"
        >
          <div className="bg-[rgba(13,13,26,0.95)] backdrop-blur-xl border border-[rgba(0,240,255,0.15)] rounded-xl p-4 shadow-xl flex items-start gap-3">
            {/* Icon */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#7b2fff] flex items-center justify-center text-lg shrink-0">
              ⚡
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="text-[#e8e8f0] font-semibold text-sm">SoufyaneOS</div>
              <div className="text-[#8888aa] text-xs mt-0.5 leading-relaxed">
                {notificationMessage}
              </div>
            </div>
            
            {/* Close button */}
            <button 
              onClick={clearNotification}
              className="text-[#555] hover:text-[#e8e8f0] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
