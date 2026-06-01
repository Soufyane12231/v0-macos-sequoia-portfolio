'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const experienceLog = `[SoufyaneOS] Loading career data... Done.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[2025] ► INDUSTRIAL AUTOMATION INTERN
        LafargeHolcim · Oujda, Morocco
        ┌─────────────────────────────────────────
        │ > Replaced obsolete Pulse Jet Filter 
        │   sequencer with TIA Portal PLC
        │ > Implemented Auto/Manual control modes
        │   triggered by differential pressure (ΔP)  
        │ > Prepared HMI WinCC integration for
        │   real-time production data acquisition
        └─────────────────────────────────────────
        STATUS: [✓ COMPLETED] · Duration: Summer 2025

[2025–Now] ► HEAD OF TRAINING
            Mechatronics Club · ENSA Tétouan
        ┌─────────────────────────────────────────
        │ > Designed and delivered 5+ technical 
        │   workshops: Arduino, ESP32, Embedded
        │   Systems, Industrial Digitalization,
        │   Functional Safety (ISO 26262)
        │ > Trained 100+ engineering students
        │ > Organized intensive bootcamps
        └─────────────────────────────────────────
        STATUS: [● ACTIVE] · Impact: 100+ students

[2024–2025] ► CO-ORGANIZER · NATIONAL ROBOTICS COMPETITION
             ENSA Tétouan (2 Editions)
        ┌─────────────────────────────────────────
        │ > Managed 40+ national competing teams
        │ > Led full technical & logistics pipeline
        │ > 2 consecutive successful editions
        └─────────────────────────────────────────
        STATUS: [✓ COMPLETED] · Scale: National

[EOF]`

export function ExperienceWindow() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  
  useEffect(() => {
    const lines = experienceLog.split('\n')
    let index = 0
    
    const interval = setInterval(() => {
      if (index < lines.length) {
        setDisplayedLines(prev => [...prev, lines[index]])
        index++
      } else {
        setIsComplete(true)
        clearInterval(interval)
      }
    }, 40)
    
    return () => clearInterval(interval)
  }, [])
  
  const renderLine = (line: string, index: number) => {
    // Styling based on content
    if (line.includes('[SoufyaneOS]') || line.includes('Loading')) {
      return <span className="text-[#00f0ff]">{line}</span>
    }
    if (line.startsWith('[20') && line.includes('►')) {
      return <span className="text-[#00ff88] font-bold">{line}</span>
    }
    if (line.includes('LafargeHolcim') || line.includes('Mechatronics Club') || line.includes('ENSA')) {
      return <span className="text-[#7b2fff]">{line}</span>
    }
    if (line.includes('STATUS:')) {
      const parts = line.split('STATUS:')
      return (
        <>
          {parts[0]}
          <span className="text-[#8888aa]">STATUS:</span>
          {parts[1].includes('COMPLETED') ? (
            <span className="text-[#00ff88]">{parts[1]}</span>
          ) : (
            <span className="text-[#ffd700]">{parts[1]}</span>
          )}
        </>
      )
    }
    if (line.includes('│ >')) {
      return (
        <>
          <span className="text-[#555]">│ </span>
          <span className="text-[#00f0ff]">&gt;</span>
          <span className="text-[#e8e8f0]">{line.slice(4)}</span>
        </>
      )
    }
    if (line.includes('┌') || line.includes('└') || line.includes('│')) {
      return <span className="text-[#555]">{line}</span>
    }
    if (line.includes('━')) {
      return <span className="text-[#333]">{line}</span>
    }
    if (line === '[EOF]') {
      return <span className="text-[#555]">{line}</span>
    }
    return <span className="text-[#e8e8f0]">{line}</span>
  }
  
  return (
    <div className="h-full flex flex-col bg-[#0a0a12]">
      {/* Terminal header */}
      <div className="px-4 py-2 border-b border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.3)]">
        <div className="font-mono text-[#00ff88] text-sm">
          soufyane@SoufyaneOS:~$ cat experience.log
        </div>
      </div>
      
      {/* Terminal content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm leading-relaxed">
        {displayedLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.05 }}
          >
            {renderLine(line, index)}
          </motion.div>
        ))}
        
        {/* Cursor */}
        <div className="mt-2 flex items-center">
          <span className="text-[#00ff88]">soufyane@SoufyaneOS:~$ </span>
          <motion.span 
            className="w-2 h-4 bg-[#00ff88] ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  )
}
