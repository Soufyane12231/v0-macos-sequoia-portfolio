'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore, type WindowId } from '@/lib/desktop-store'
import { site, t } from '@/lib/portfolio-data'
import { useLanguage } from '@/components/portfolio/language-provider'

interface Line {
  delay: number
  type: 'cmd' | 'system' | 'info' | 'text' | 'label' | 'nav' | 'blank' | 'cursor'
  text: string
  windowId?: WindowId
}

function buildContent(lang: 'fr' | 'en'): { lines: Line[]; hint: string } {
  if (lang === 'en') {
    return {
      hint: '🇫🇷 FR',
      lines: [
        { delay: 0, type: 'cmd', text: './welcome.sh' },
        { delay: 420, type: 'system', text: 'Booting SoufyaneOS 2.1... OK' },
        { delay: 800, type: 'system', text: 'Loading portfolio data...    OK' },
        { delay: 1100, type: 'blank', text: '' },
        { delay: 1250, type: 'info', text: "Hi — I'm Soufyane Elaouni 👋" },
        { delay: 1700, type: 'text', text: 'Final-year Mechatronics student @ ENSA Tétouan' },
        { delay: 2100, type: 'text', text: 'Industrial automation · Embedded systems' },
        { delay: 2500, type: 'blank', text: '' },
        { delay: 2650, type: 'label', text: 'NOW      →  Renault Technology Morocco, Tangier (since Jun 2026)' },
        { delay: 3050, type: 'label', text: 'STACK    →  TIA Portal · WinCC · CAN/CAN FD · UDS · ESP32 · STM32' },
        { delay: 3450, type: 'label', text: 'RESULT   →  Full-vehicle diagnostic: ~10 min → 19 s (9 ECUs)' },
        { delay: 3850, type: 'label', text: 'PROJECTS →  ECU diagnostics · ACC (AUTOSAR) · Ball & Beam' },
        { delay: 4250, type: 'blank', text: '' },
        { delay: 4400, type: 'nav', text: '── Open a window ─────────────────────────' },
        { delay: 4650, type: 'nav', text: '👤  whoami          About & education', windowId: 'about' },
        { delay: 4950, type: 'nav', text: '💼  experience.log  Renault & Holcim', windowId: 'experience' },
        { delay: 5250, type: 'nav', text: '📁  ~/projects      Engineering projects', windowId: 'projects' },
        { delay: 5550, type: 'nav', text: '⚡  skills.json     Technical skills', windowId: 'skills' },
        { delay: 5850, type: 'nav', text: '📬  contact.sh      Email · LinkedIn · GitHub', windowId: 'contact' },
        { delay: 6200, type: 'blank', text: '' },
        { delay: 6300, type: 'text', text: `Full CV + download: ${site.url}` },
        { delay: 6650, type: 'system', text: 'Tip: press Ctrl/⌘ + K to search' },
      ],
    }
  }

  return {
    hint: '🇬🇧 EN',
    lines: [
      { delay: 0, type: 'cmd', text: './welcome.sh' },
      { delay: 420, type: 'system', text: 'Démarrage de SoufyaneOS 2.1... OK' },
      { delay: 800, type: 'system', text: 'Chargement des données...       OK' },
      { delay: 1100, type: 'blank', text: '' },
      { delay: 1250, type: 'info', text: 'Bonjour — je suis Soufyane Elaouni 👋' },
      { delay: 1700, type: 'text', text: 'Élève ingénieur en dernière année · ENSA Tétouan' },
      { delay: 2100, type: 'text', text: 'Automatisme industriel · Systèmes embarqués' },
      { delay: 2500, type: 'blank', text: '' },
      { delay: 2650, type: 'label', text: 'EN COURS  →  Renault Technology Morocco, Tanger (depuis juin 2026)' },
      { delay: 3050, type: 'label', text: 'STACK     →  TIA Portal · WinCC · CAN/CAN FD · UDS · ESP32 · STM32' },
      { delay: 3450, type: 'label', text: 'RÉSULTAT  →  Diagnostic véhicule : ~10 min → 19 s (9 ECU)' },
      { delay: 3850, type: 'label', text: 'PROJETS   →  Diagnostic ECU · ACC (AUTOSAR) · Balle et Poutre' },
      { delay: 4250, type: 'blank', text: '' },
      { delay: 4400, type: 'nav', text: '── Ouvrir une fenêtre ───────────────────' },
      { delay: 4650, type: 'nav', text: '👤  whoami          À propos & formation', windowId: 'about' },
      { delay: 4950, type: 'nav', text: '💼  experience.log  Renault & Holcim', windowId: 'experience' },
      { delay: 5250, type: 'nav', text: '📁  ~/projects      Projets d’ingénierie', windowId: 'projects' },
      { delay: 5550, type: 'nav', text: '⚡  skills.json     Compétences techniques', windowId: 'skills' },
      { delay: 5850, type: 'nav', text: '📬  contact.sh      Email · LinkedIn · GitHub', windowId: 'contact' },
      { delay: 6200, type: 'blank', text: '' },
      { delay: 6300, type: 'text', text: `CV complet + téléchargement : ${site.url}` },
      { delay: 6650, type: 'system', text: 'Astuce : Ctrl/⌘ + K pour rechercher' },
    ],
  }
}

export function WelcomeTerminal() {
  const { lang, toggleLang } = useLanguage()
  const { openWindow } = useDesktopStore()
  const [visibleCount, setVisibleCount] = useState(0)
  const [done, setDone] = useState(false)

  const content = useMemo(() => buildContent(lang), [lang])

  useEffect(() => {
    setVisibleCount(0)
    setDone(false)

    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setVisibleCount(content.lines.length)
      setDone(true)
      return
    }

    const timers = content.lines.map((line, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), line.delay),
    )
    const finish = window.setTimeout(() => setDone(true), content.lines[content.lines.length - 1].delay + 400)

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      window.clearTimeout(finish)
    }
  }, [content])

  const revealAll = () => {
    setVisibleCount(content.lines.length)
    setDone(true)
  }

  return (
    <div
      className="pointer-events-auto absolute bottom-16 left-4 z-20 hidden w-[420px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-[rgba(0,240,255,0.18)] bg-[rgba(10,10,18,0.92)] font-mono text-[11px] shadow-2xl backdrop-blur-md md:block"
      onClick={revealAll}
    >
      <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 text-[10px] text-[#8b91a3]">welcome — zsh</span>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            toggleLang()
          }}
          className="ml-auto flex min-h-6 items-center rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-[#8888aa] transition-colors hover:border-[rgba(0,240,255,0.4)] hover:text-[#00f0ff]"
        >
          {content.hint}
        </button>
      </div>

      <div className="p-3 leading-relaxed" aria-label={t({ fr: 'Terminal de bienvenue', en: 'Welcome terminal' }, lang)}>
        {content.lines.slice(0, visibleCount).map((line, index) => {
          if (line.type === 'blank') return <div key={index} className="h-2" />

          const color =
            line.type === 'cmd'
              ? 'text-[#e8e8f0]'
              : line.type === 'system'
                ? 'text-[#00ff88]'
                : line.type === 'info'
                  ? 'text-[#00f0ff]'
                  : line.type === 'label'
                    ? 'text-[#a8aec2]'
                    : line.type === 'nav'
                      ? 'text-[#c8ccdb]'
                      : 'text-[#9aa0b5]'

          const contentNode = (
            <>
              {line.type === 'cmd' ? <span className="text-[#00f0ff]">soufyane@SoufyaneOS:~$ </span> : null}
              {line.text}
            </>
          )

          return line.windowId ? (
            <button
              key={index}
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                openWindow(line.windowId as WindowId)
              }}
              className={`block min-h-6 w-full rounded px-1 py-0.5 text-left transition-colors hover:bg-white/5 ${color}`}
            >
              {contentNode}
            </button>
          ) : (
            <div key={index} className={`px-1 ${color}`}>
              {contentNode}
            </div>
          )
        })}

        {!done ? (
          <motion.span
            className="ml-1 inline-block h-3 w-1.5 bg-[#00ff88]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.53, repeat: Infinity }}
            aria-hidden="true"
          />
        ) : null}
      </div>
    </div>
  )
}
