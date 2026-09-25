'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'

/**
 * Boot lines are factual: they describe the real stack of the portfolio owner
 * (no invented hardware specs, no fake utilisation figures).
 */
const bootLines = [
  'SoufyaneOS 2.1 — interactive portfolio',
  '',
  'Loading profile data .................. OK',
  'Mounting industrial automation ........ OK   (TIA Portal / WinCC)',
  'Loading embedded stack ................ OK   (ESP32 / STM32 / Raspberry Pi)',
  'Attaching CAN bus ..................... OK   (CAN FD / UDS / ISO-TP)',
  'Loading control models ................. OK   (MATLAB / Simulink / FPGA)',
  'Mounting projects ..................... OK   (3 engineering projects)',
  '',
  'Starting desktop environment...',
]

const LINE_INTERVAL = 130

export function BiosBoot({ onComplete }: { onComplete: () => void }) {
  const { lang } = useLanguage()
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

  const finish = () => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      setDisplayedLines(bootLines)
      setProgress(100)
      finish()
      return
    }

    let lineIndex = 0
    const interval = window.setInterval(() => {
      if (lineIndex < bootLines.length) {
        setDisplayedLines((prev) => [...prev, bootLines[lineIndex]])
        setProgress((lineIndex / bootLines.length) * 100)
        lineIndex += 1
      } else {
        window.clearInterval(interval)
        setProgress(100)
        window.setTimeout(finish, 350)
      }
    }, LINE_INTERVAL)

    return () => window.clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-black p-6 font-mono sm:p-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="status"
      aria-live="polite"
      aria-label={lang === 'fr' ? 'Démarrage de SoufyaneOS' : 'Starting SoufyaneOS'}
    >
      <div className="flex-1 overflow-hidden text-sm leading-relaxed">
        {displayedLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.08 }}
            className={line.startsWith('SoufyaneOS') ? 'font-bold text-[#00f0ff]' : 'text-[#e8e8f0]'}
          >
            {line ? (
              line.includes('OK') ? (
                <>
                  <span className="text-[#8888aa]">{line.replace(/\.\.*\s*OK.*$/, '')}</span>
                  <span className="text-[#8888aa]">{' '.repeat(Math.max(1, 4))}</span>
                  <span className="text-[#00ff88]">OK</span>
                  {line.includes('(') ? <span className="text-[#8b91a3]"> {line.slice(line.indexOf('('))}</span> : null}
                </>
              ) : (
                line
              )
            ) : (
              ' '
            )}
          </motion.div>
        ))}
        <motion.span
          className="ml-1 inline-block h-4 w-2 bg-[#00ff88]"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity }}
        />
      </div>

      <div className="mt-auto">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-xs text-[#8888aa]">
            {lang === 'fr' ? 'Chargement de SoufyaneOS' : 'Loading SoufyaneOS'}
          </span>
          <span className="text-xs text-[#00f0ff]">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-[#1a1a2e]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00f0ff] to-[#7b2fff]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <button
          type="button"
          onClick={finish}
          className="mt-4 rounded-md border border-[rgba(0,240,255,0.25)] px-3 py-1.5 text-xs text-[#00f0ff] transition-colors hover:bg-[rgba(0,240,255,0.1)]"
        >
          Skip / Passer
        </button>
      </div>
    </motion.div>
  )
}
