'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CircuitBackground } from './circuit-background'

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [password, setPassword] = useState('')
  const [time, setTime] = useState(new Date())
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])
  
  const handleLogin = () => {
    if (password.length > 0) {
      setIsLoggingIn(true)
      setTimeout(onLogin, 800)
    }
  }
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    })
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric' 
    })
  }
  
  return (
    <motion.div
      className="fixed inset-0 bg-[#050508] z-40 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <CircuitBackground />
      
      {/* Time display - top right */}
      <div className="absolute top-8 right-8 text-right z-10">
        <div className="text-[#e8e8f0] text-5xl font-light tracking-wide font-[var(--font-space)]">
          {formatTime(time)}
        </div>
        <div className="text-[#8888aa] text-lg mt-1">
          {formatDate(time)}
        </div>
      </div>
      
      {/* Login card */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Frosted glass card */}
        <div className="bg-[rgba(13,13,26,0.85)] backdrop-blur-xl rounded-3xl p-10 border border-[rgba(0,240,255,0.12)] shadow-2xl">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0d0d1a] to-[#1a1a2e] flex items-center justify-center border-2 border-[#00f0ff]"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0, 240, 255, 0.3)',
                    '0 0 40px rgba(0, 240, 255, 0.5)',
                    '0 0 20px rgba(0, 240, 255, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <img src="/profile.jpeg" alt="Soufyane Elaouni" style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover' }} />
              </motion.div>
              {/* Online indicator */}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#00ff88] rounded-full border-2 border-[#0d0d1a]" />
            </div>
            
            <h1 className="text-[#e8e8f0] text-xl font-semibold mt-4 font-[var(--font-space)]">
              Soufyane Elaouni
            </h1>
            <p className="text-[#8888aa] text-sm mt-1">
              Ingénieur Mécatronique · ENSA Tétouan
            </p>
          </div>
          
          {/* Password input */}
          <div className="relative mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter password"
              autoFocus
              className="w-64 px-4 py-3 bg-[rgba(0,0,0,0.3)] border border-[rgba(0,240,255,0.2)] rounded-xl text-[#e8e8f0] placeholder-[#555] focus:outline-none focus:border-[#00f0ff] focus:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all duration-300 text-center"
            />
          </div>
          
          {/* Hint */}
          <p className="text-[#555] text-xs text-center mb-4">
            Hint: Think embedded
          </p>
          
          {/* Login button */}
          <motion.button
            onClick={handleLogin}
            disabled={password.length === 0 || isLoggingIn}
            className="w-full py-3 bg-gradient-to-r from-[#00f0ff] to-[#7b2fff] rounded-xl text-[#07070f] font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoggingIn ? (
              <span className="flex items-center justify-center gap-2">
                <motion.span
                  className="w-4 h-4 border-2 border-[#07070f] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Logging in...
              </span>
            ) : (
              'Log In'
            )}
          </motion.button>
        </div>
        
        {/* Bottom text */}
        <p className="text-[#555] text-xs mt-6 text-center">
          Press Enter or click Log In to continue
        </p>
      </motion.div>
      
      {/* Login animation overlay */}
      {isLoggingIn && (
        <motion.div
          className="absolute inset-0 bg-[#07070f] z-50"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom' }}
        />
      )}
    </motion.div>
  )
}
