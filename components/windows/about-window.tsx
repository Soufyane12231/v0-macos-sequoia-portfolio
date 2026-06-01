'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function AboutWindow() {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Elève Ingénieur Mécatronique'
  
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="flex h-full">
      {/* Left Panel - 60% */}
      <div className="w-[60%] p-6 border-r border-[rgba(0,240,255,0.08)]">
        {/* Terminal header */}
        <div className="font-mono text-[#00ff88] text-sm mb-4">
          soufyane@ENSA-Tetouan:~$ whoami
        </div>
        
        {/* Typewriter title */}
        <h1 className="text-2xl font-[var(--font-space)] text-[#00f0ff] mb-2">
          {typedText}
          <span className="cursor-blink">|</span>
        </h1>
        <p className="text-[#8888aa] text-sm mb-6">
          Embedded Systems · Industrial AI · Control Theory
        </p>
        
        {/* Bio */}
        <p className="text-[#e8e8f0] leading-relaxed mb-6">
          4th-year engineering student at ENSA Tétouan with a passion for 
          building intelligent embedded systems. I bridge the gap between 
          hardware and software — from bare-metal C++ on STM32 to Extended 
          Kalman Filters in Python. Currently building the future of 
          industrial automation, one ECU at a time.
        </p>
        
        {/* Stat chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { icon: '📍', label: 'Tétouan, Maroc' },
            { icon: '🎓', label: 'ENSA Tétouan' },
            { icon: '📅', label: '4ème Année' },
            { icon: '⚡', label: 'Available for internship' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="px-3 py-1.5 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] rounded-full text-sm text-[#e8e8f0] flex items-center gap-2"
            >
              <span>{stat.icon}</span>
              <span>{stat.label}</span>
            </motion.div>
          ))}
        </div>
        
        {/* Languages */}
        <div className="space-y-3">
          <h3 className="text-[#8888aa] text-xs uppercase tracking-wider mb-2">Languages</h3>
          {[
            { flag: '🇲🇦', lang: 'Arabic', level: 100, label: 'Native' },
            { flag: '🇫🇷', lang: 'French', level: 85, label: 'Fluent' },
            { flag: '🇬🇧', lang: 'English', level: 85, label: 'Fluent' },
          ].map((lang, i) => (
            <div key={i} className="flex items-center gap-3">
              <span>{lang.flag}</span>
              <span className="text-[#e8e8f0] w-16">{lang.lang}</span>
              <div className="flex-1 h-2 bg-[rgba(0,240,255,0.1)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2fff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${lang.level}%` }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
                />
              </div>
              <span className="text-[#8888aa] text-xs w-12">{lang.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Right Panel - 40% */}
      <div className="w-[40%] p-6 flex flex-col items-center justify-center">
        {/* 3D Microcontroller illustration */}
        <motion.div
          className="relative w-48 h-48"
          animate={{ rotateY: [0, 10, 0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ perspective: 1000 }}
        >
          {/* Chip body */}
          <div className="absolute inset-8 bg-[#1a1a2e] rounded-lg border border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            {/* Center die */}
            <div className="absolute inset-4 bg-[#0d0d1a] rounded flex items-center justify-center">
              <span className="text-[#00f0ff] font-mono text-xs">STM32</span>
            </div>
          </div>
          
          {/* Pins - top */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`top-${i}`}
              className="absolute w-1 h-6 bg-[#555] rounded-sm"
              style={{ left: `${32 + i * 20}px`, top: '8px' }}
            >
              <motion.div
                className="w-full h-1 bg-[#00f0ff] rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              />
            </div>
          ))}
          
          {/* Pins - bottom */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="absolute w-1 h-6 bg-[#555] rounded-sm"
              style={{ left: `${32 + i * 20}px`, bottom: '8px' }}
            />
          ))}
          
          {/* Pins - left */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute h-1 w-6 bg-[#555] rounded-sm"
              style={{ top: `${48 + i * 24}px`, left: '8px' }}
            />
          ))}
          
          {/* Pins - right */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute h-1 w-6 bg-[#555] rounded-sm"
              style={{ top: `${48 + i * 24}px`, right: '8px' }}
            />
          ))}
          
          {/* Pin labels */}
          <span className="absolute text-[8px] text-[#555] -top-1 left-8">VCC</span>
          <span className="absolute text-[8px] text-[#555] -top-1 right-8">GND</span>
          <span className="absolute text-[8px] text-[#555] -bottom-1 left-8">TX</span>
          <span className="absolute text-[8px] text-[#555] -bottom-1 right-8">RX</span>
        </motion.div>
        
        {/* Glow effect */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-[#00f0ff] opacity-10 blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-[rgba(0,0,0,0.3)] border-t border-[rgba(0,240,255,0.08)]">
        <span className="text-[#555] text-xs font-mono">
          Last login: Mon Jun 2025 — Session: Portfolio v2.0
        </span>
      </div>
    </div>
  )
}
