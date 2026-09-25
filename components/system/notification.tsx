'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { NotificationData } from '@/lib/desktop-store'

interface NotificationProps {
  notification: NotificationData
  onClose: () => void
  /** Auto-dismiss delay in ms; 0 keeps the notification until dismissed. */
  timeout?: number
}

export function Notification({ notification, onClose, timeout = 6000 }: NotificationProps) {
  useEffect(() => {
    if (!timeout) return
    const timer = window.setTimeout(onClose, timeout)
    return () => window.clearTimeout(timer)
  }, [onClose, timeout])

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 60 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="max-w-sm"
    >
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] p-4 shadow-xl backdrop-blur-xl"
      >
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#00f0ff] to-[#7b2fff] text-lg"
          aria-hidden="true"
        >
          ⚡
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#e8e8f0]">{notification.title}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-[#9aa0b5]">{notification.message}</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fermer la notification"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#8b91a3] transition-colors hover:text-[#e8e8f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}
