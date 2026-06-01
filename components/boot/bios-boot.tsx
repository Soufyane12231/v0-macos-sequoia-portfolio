'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const bootLines = [
  'SoufyaneOS BIOS v2.0.1',
  'Copyright (C) 2025 Soufyane Elaouni',
  '',
  'Initializing SoufyaneOS v2.0...',
  'Loading kernel modules: [STM32] [ESP32] [FPGA] [CAN Bus]...',
  'STM32F4 driver loaded successfully',
  'ESP32 WiFi module initialized',
  'FPGA fabric configured: 85% LUT utilization',
  'CAN Bus interface: 500kbps nominal',
  '',
  'Mounting embedded systems... OK',
  'Calibrating Kalman Filter... OK',
  'Initializing PID controllers... OK',
  'Loading sensor drivers... OK',
  'Connecting to Industrial Network... OK',
  '',
  'Memory check: 2048MB OK',
  'CPU: Mechatronics Core @ 3.2GHz',
  '',
  'Booting desktop environment...',
]

interface BiosBootProps {
  onComplete: () => void
}

export function BiosBoot({ onComplete }: BiosBootProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    let lineIndex = 0
    const lineInterval = setInterval(() => {
      if (lineIndex < bootLines.length) {
        setDisplayedLines(prev => [...prev, bootLines[lineIndex]])
        setProgress((lineIndex / bootLines.length) * 100)
        lineIndex++
      } else {
        clearInterval(lineInterval)
        setProgress(100)
        setTimeout(onComplete, 500)
      }
    }, 120)
    
    return () => clearInterval(lineInterval)
  }, [onComplete])
  
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex flex-col p-8 font-mono"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Boot text */}
      <div className="flex-1 overflow-hidden">
        {displayedLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className="text-[#00ff88] text-sm leading-relaxed"
          >
            {line.startsWith('SoufyaneOS BIOS') ? (
              <span className="text-[#00f0ff] font-bold">{line}</span>
            ) : line.includes('OK') ? (
              <>
                {line.replace('OK', '')}
                <span className="text-[#00ff88]">OK</span>
              </>
            ) : line.includes('...') && !line.includes('OK') ? (
              <span className="text-[#8888aa]">{line}</span>
            ) : (
              line
            )}
          </motion.div>
        ))}
        <motion.span 
          className="inline-block w-2 h-4 bg-[#00ff88] ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity }}
        />
      </div>
      
      {/* Progress bar */}
      <div className="mt-auto">
        <div className="flex items-center gap-4 mb-2">
          <span className="text-[#8888aa] text-xs">Loading SoufyaneOS</span>
          <span className="text-[#00f0ff] text-xs">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 bg-[#1a1a2e] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2fff]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
