'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Lang = 'en' | 'fr'
type LineType = 'cmd' | 'system' | 'info' | 'text' | 'label' | 'nav' | 'blank' | 'cursor'

interface Line {
  delay: number
  type: LineType
  text: string
}

const content: Record<Lang, { lines: Line[]; hint: string }> = {
  en: {
    hint: '🇫🇷 FR',
    lines: [
      { delay: 0,     type: 'cmd',    text: './welcome.sh' },
      { delay: 500,   type: 'system', text: 'Booting SoufyaneOS v2.0... OK' },
      { delay: 1000,  type: 'system', text: 'Loading portfolio data...    OK' },
      { delay: 1500,  type: 'blank',  text: '' },
      { delay: 1700,  type: 'info',   text: "Hi — I'm Soufyane Elaouni 👋" },
      { delay: 2400,  type: 'text',   text: 'Mechatronics Engineer @ ENSA Tétouan' },
      { delay: 3000,  type: 'text',   text: 'Embedded Systems · Industrial AI · Control Theory' },
      { delay: 3600,  type: 'blank',  text: '' },
      { delay: 3800,  type: 'label',  text: 'STACK     →  STM32 · ESP32 · FPGA · CAN Bus · TIA Portal' },
      { delay: 4500,  type: 'label',  text: 'AI/CTRL   →  EKF · Sliding Mode Control · Python · PID' },
      { delay: 5200,  type: 'label',  text: 'PROJECTS  →  4 completed · HIL bench validated' },
      { delay: 5900,  type: 'label',  text: 'TRAINING  →  100+ students · 5+ workshops' },
      { delay: 6600,  type: 'label',  text: 'STATUS    →  Open to internship / full-time 🟢' },
      { delay: 7200,  type: 'blank',  text: '' },
      { delay: 7400,  type: 'nav',    text: '── Navigation ──────────────────────────' },
      { delay: 7700,  type: 'nav',    text: '👤  About Me   →  double-click whoami' },
      { delay: 8100,  type: 'nav',    text: '🚀  Projects   →  double-click ~/projects' },
      { delay: 8500,  type: 'nav',    text: '⚙️  Skills     →  double-click skills.json' },
      { delay: 8900,  type: 'nav',    text: '🏭  Experience →  double-click experience.log' },
      { delay: 9300,  type: 'nav',    text: '📬  Contact    →  double-click contact.sh' },
      { delay: 9700,  type: 'blank',  text: '' },
      { delay: 9900,  type: 'cursor', text: '' },
    ],
  },
  fr: {
    hint: '🇬🇧 EN',
    lines: [
      { delay: 0,     type: 'cmd',    text: './bienvenue.sh' },
      { delay: 500,   type: 'system', text: 'Démarrage SoufyaneOS v2.0... OK' },
      { delay: 1000,  type: 'system', text: 'Chargement du portfolio...   OK' },
      { delay: 1500,  type: 'blank',  text: '' },
      { delay: 1700,  type: 'info',   text: 'Bonjour — Je suis Soufyane Elaouni 👋' },
      { delay: 2400,  type: 'text',   text: 'Élève Ingénieur Mécatronique @ ENSA Tétouan' },
      { delay: 3000,  type: 'text',   text: 'Systèmes Embarqués · IA Industrielle · Contrôle' },
      { delay: 3600,  type: 'blank',  text: '' },
      { delay: 3800,  type: 'label',  text: 'STACK     →  STM32 · ESP32 · FPGA · CAN Bus · TIA Portal' },
      { delay: 4500,  type: 'label',  text: 'IA/CTRL   →  EKF · Sliding Mode Control · Python · PID' },
      { delay: 5200,  type: 'label',  text: 'PROJETS   →  4 réalisés · Validés sur banc HIL' },
      { delay: 5900,  type: 'label',  text: 'FORMATION →  100+ étudiants · 5+ workshops' },
      { delay: 6600,  type: 'label',  text: 'STATUT    →  Disponible pour stage / emploi 🟢' },
      { delay: 7200,  type: 'blank',  text: '' },
      { delay: 7400,  type: 'nav',    text: '── Navigation ──────────────────────────' },
      { delay: 7700,  type: 'nav',    text: '👤  À propos      →  double-clic whoami' },
      { delay: 8100,  type: 'nav',    text: '🚀  Projets       →  double-clic ~/projects' },
      { delay: 8500,  type: 'nav',    text: '⚙️  Compétences   →  double-clic skills.json' },
      { delay: 8900,  type: 'nav',    text: '🏭  Expérience    →  double-clic experience.log' },
      { delay: 9300,  type: 'nav',    text: '📬  Contact       →  double-clic contact.sh' },
      { delay: 9700,  type: 'blank',  text: '' },
      { delay: 9900,  type: 'cursor', text: '' },
    ],
  },
}

function useTypewriter(text: string, active: boolean, speed = 22) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!active) { setDisplayed(''); return }
    setDisplayed('')
    if (!text) return
    let i = 0
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(iv)
    }, speed)
    return () => clearInterval(iv)
  }, [text, active, speed])
  return displayed
}

function TerminalLine({
  line,
  isTyping,
}: {
  line: Line
  isTyping: boolean
}) {
  const shouldType = ['cmd', 'info', 'text', 'label', 'nav'].includes(line.type)
  const typed = useTypewriter(line.text, shouldType, line.type === 'cmd' ? 38 : 20)
  const isStillTyping = shouldType && typed.length < line.text.length

  const colors: Record<LineType, string> = {
    cmd:    '#00f0ff',
    system: '#00ff88',
    info:   '#ffffff',
    text:   '#ccccdd',
    label:  '#aaaacc',
    nav:    '#7777aa',
    blank:  'transparent',
    cursor: '#00ff88',
  }

  if (line.type === 'blank') return <div style={{ height: 6 }} />

  if (line.type === 'cursor') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, fontFamily: 'monospace', fontSize: 11 }}>
        <span style={{ color: '#00ff88' }}>soufyane@SoufyaneOS:~$&nbsp;</span>
        <motion.span
          style={{ display: 'inline-block', width: 7, height: 14, background: '#00ff88', marginLeft: 1 }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.53, repeat: Infinity }}
        />
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 4, lineHeight: 1.6, fontFamily: 'monospace', fontSize: 11 }}>
      {line.type === 'cmd' ? (
        <span style={{ color: '#00ff88', flexShrink: 0 }}>soufyane@SoufyaneOS:~$&nbsp;</span>
      ) : (
        <span style={{ color: colors[line.type], flexShrink: 0 }}>
          {line.type === 'system' ? '>&nbsp;&nbsp;' : '&nbsp;&nbsp;&nbsp;'}
        </span>
      )}
      <span style={{ color: colors[line.type] }}>
        {shouldType ? typed : line.text}
        {isStillTyping && isTyping && (
          <motion.span
            style={{ display: 'inline-block', width: 6, height: 11, background: colors[line.type], marginLeft: 1, verticalAlign: 'middle' }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity }}
          />
        )}
      </span>
    </div>
  )
}

export function WelcomeTerminal() {
  const [lang, setLang] = useState<Lang>('en')
  const [visibleCount, setVisibleCount] = useState(0)
  const [minimized, setMinimized] = useState(false)
  const [closed, setClosed] = useState(false)
  const [replayKey, setReplayKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lines = content[lang].lines

  useEffect(() => {
    setVisibleCount(0)
    const timers: ReturnType<typeof setTimeout>[] = []
    lines.forEach((line, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), line.delay)
      timers.push(t)
    })
    return () => timers.forEach(clearTimeout)
  }, [replayKey, lang])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleCount])

  if (closed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ delay: 1.2, duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: 96,
        left: 20,
        zIndex: 30,
        width: minimized ? 210 : 370,
        transition: 'width 0.2s ease',
      }}
    >
      <div style={{
        background: 'rgba(6, 6, 16, 0.94)',
        border: '1px solid rgba(0,240,255,0.18)',
        borderRadius: 12,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 12px 40px rgba(0,0,0,0.7), 0 0 0 0.5px rgba(0,240,255,0.06)',
      }}>

        {/* ── Title bar ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '7px 12px',
          background: 'rgba(0,0,0,0.45)',
          borderBottom: '0.5px solid rgba(0,240,255,0.08)',
        }}>
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => setClosed(true)}
              style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer' }}
              title="Close"
            />
            <button
              onClick={() => setMinimized(m => !m)}
              style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', border: 'none', cursor: 'pointer' }}
              title={minimized ? 'Expand' : 'Minimize'}
            />
            <button
              onClick={() => { setReplayKey(k => k + 1) }}
              style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', border: 'none', cursor: 'pointer' }}
              title="Replay"
            />
          </div>

          {/* Window title */}
          <span style={{ fontFamily: 'monospace', fontSize: 11, color: '#444' }}>
            welcome.sh
          </span>

          {/* Language switcher */}
          <button
            onClick={() => {
              setLang(l => l === 'en' ? 'fr' : 'en')
              setReplayKey(k => k + 1)
            }}
            style={{
              fontFamily: 'monospace',
              fontSize: 10,
              color: '#00f0ff',
              background: 'rgba(0,240,255,0.08)',
              border: '0.5px solid rgba(0,240,255,0.25)',
              borderRadius: 6,
              padding: '2px 8px',
              cursor: 'pointer',
            }}
          >
            {content[lang].hint}
          </button>
        </div>

        {/* ── Terminal body ── */}
        <AnimatePresence>
          {!minimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                ref={scrollRef}
                style={{
                  padding: '10px 14px',
                  maxHeight: 272,
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                }}
              >
                <AnimatePresence>
                  {lines.slice(0, visibleCount).map((line, i) => (
                    <motion.div
                      key={`${replayKey}-${lang}-${i}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                    >
                      <TerminalLine
                        line={line}
                        isTyping={i === visibleCount - 1}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '5px 14px',
                borderTop: '0.5px solid rgba(0,240,255,0.06)',
                background: 'rgba(0,0,0,0.3)',
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#333' }}>
                  SoufyaneOS v2.0 · 2025
                </span>
                <button
                  onClick={() => setReplayKey(k => k + 1)}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: 10,
                    color: '#444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00f0ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#444')}
                >
                  ↺ replay
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
