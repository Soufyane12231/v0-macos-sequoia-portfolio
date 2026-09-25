'use client'

import { motion } from 'framer-motion'
import { useDesktopStore, type WindowId } from '@/lib/desktop-store'
import { useLanguage } from '@/components/portfolio/language-provider'
import { certifications, experiences, projects, site } from '@/lib/portfolio-data'

export function TrashWindow() {
  const { lang } = useLanguage()
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 text-6xl" aria-hidden="true">
        🗑️
      </div>
      <h2 className="mb-2 text-xl font-semibold text-[#e8e8f0]">
        {lang === 'fr' ? 'Corbeille vide' : 'Trash is empty'}
      </h2>
      <p className="mb-6 text-sm text-[#8888aa]">
        {lang === 'fr'
          ? 'Les données de ce portfolio sont en lecture seule.'
          : 'The data in this portfolio is read-only.'}
      </p>
      <div className="font-mono text-xs text-[#8b91a3]">[ERROR 0x80070005: Access Denied]</div>
    </div>
  )
}

const finderFolders: { name: string; icon: string; count: number; windowId: WindowId }[] = [
  { name: 'Applications', icon: '📁', count: 6, windowId: 'finder' },
  { name: 'Projects', icon: '💻', count: projects.length, windowId: 'projects' },
  { name: 'Experience', icon: '💼', count: experiences.length, windowId: 'experience' },
  { name: 'Certificates', icon: '🏆', count: certifications.length, windowId: 'certificates' },
]

export function FinderWindow() {
  const { openWindow } = useDesktopStore()

  return (
    <div className="flex h-full">
      <div className="w-48 shrink-0 border-r border-[rgba(0,240,255,0.08)] p-3">
        <div className="mb-2 px-2 text-xs uppercase tracking-wider text-[#8b91a3]">Favorites</div>
        {[
          { label: 'whoami', windowId: 'about' as WindowId },
          { label: '~/projects', windowId: 'projects' as WindowId },
          { label: 'experience.log', windowId: 'experience' as WindowId },
          { label: 'contact.sh', windowId: 'contact' as WindowId },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => openWindow(item.windowId)}
            className="w-full rounded-md px-3 py-1.5 text-left font-mono text-sm text-[#e8e8f0] transition-colors hover:bg-white/5"
          >
            {item.label}
          </button>
        ))}

        <div className="mb-2 mt-4 px-2 text-xs uppercase tracking-wider text-[#8b91a3]">Tags</div>
        {[
          { name: 'Automobile', color: '#ffcc00' },
          { name: 'Automation', color: '#00f0ff' },
          { name: 'Embedded', color: '#00ff88' },
        ].map((tag) => (
          <div key={tag.name} className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#e8e8f0]">
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: tag.color }} aria-hidden="true" />
            {tag.name}
          </div>
        ))}
      </div>

      <div className="flex-1 p-4">
        <div className="grid grid-cols-2 gap-4">
          {finderFolders.map((folder) => (
            <button
              key={folder.name}
              type="button"
              onClick={() => openWindow(folder.windowId)}
              className="flex flex-col items-center gap-2 rounded-lg p-4 transition-colors hover:bg-white/5"
            >
              <span className="text-4xl" aria-hidden="true">
                {folder.icon}
              </span>
              <span className="text-sm text-[#e8e8f0]">{folder.name}</span>
              <span className="text-xs text-[#8b91a3]">
                {folder.count} {folder.windowId === 'projects' ? 'items' : 'entries'}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] p-3 text-xs leading-relaxed text-[#9aa0b5]">
          Version interactive de{' '}
          <a href="/" className="text-[#00f0ff] underline underline-offset-2">
            elaounisoufyane.space
          </a>{' '}
          — la version CV reste la page d’accueil, sans mot de passe.
        </p>
      </div>
    </div>
  )
}

export function SettingsWindow() {
  const { lang } = useLanguage()
  const { accentColor, setAccentColor } = useDesktopStore()

  const accents = [
    { id: 'cyan', label: 'Cyan', color: '#00f0ff' },
    { id: 'purple', label: 'Purple', color: '#7b2fff' },
    { id: 'green', label: 'Green', color: '#00ff88' },
  ] as const

  const rows =
    lang === 'fr'
      ? [
          { term: 'Auteur', value: site.name },
          { term: 'Formation', value: 'Cycle d’Ingénieur d’État en Mécatronique — ENSA Tétouan' },
          { term: 'Spécialité', value: 'Automatisme industriel & systèmes embarqués' },
          { term: 'Stage en cours', value: 'Renault Technology Morocco (RTMA) — Tanger' },
          { term: 'Contact', value: site.email },
          { term: 'Code source', value: 'github.com/Soufyane12231' },
        ]
      : [
          { term: 'Author', value: site.name },
          { term: 'Education', value: 'State Engineering Programme in Mechatronics — ENSA Tétouan' },
          { term: 'Speciality', value: 'Industrial automation & embedded systems' },
          { term: 'Current internship', value: 'Renault Technology Morocco (RTMA) — Tangier' },
          { term: 'Contact', value: site.email },
          { term: 'Source code', value: 'github.com/Soufyane12231' },
        ]

  return (
    <div className="h-full overflow-auto p-6">
      <h2 className="mb-4 text-sm uppercase tracking-wider text-[#8888aa]">
        {lang === 'fr' ? 'À propos de SoufyaneOS' : 'About SoufyaneOS'}
      </h2>

      <dl className="space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.term} className="flex flex-col gap-0.5 border-b border-white/5 pb-2 sm:flex-row sm:gap-4">
            <dt className="w-40 shrink-0 font-mono text-xs uppercase tracking-wider text-[#8b91a3]">{row.term}</dt>
            <dd className="text-[#e8e8f0]">{row.value}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mb-3 mt-6 text-sm uppercase tracking-wider text-[#8888aa]">
        {lang === 'fr' ? "Thème d'accent" : 'Accent theme'}
      </h2>
      <div className="flex gap-3">
        {accents.map((accent) => (
          <button
            key={accent.id}
            type="button"
            onClick={() => setAccentColor(accent.id)}
            aria-pressed={accentColor === accent.id}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
              accentColor === accent.id ? 'border-[#00f0ff] text-white' : 'border-white/10 text-[#9aa0b5]'
            }`}
          >
            <span className="h-3 w-3 rounded-full" style={{ backgroundColor: accent.color }} aria-hidden="true" />
            {accent.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const terminalLines: { prompt: string; fr: string; en: string }[] = [
  {
    prompt: 'whoami',
    fr: 'Soufyane Elaouni — élève ingénieur en Mécatronique (ENSA Tétouan)',
    en: 'Soufyane Elaouni — mechatronics engineering student (ENSA Tétouan)',
  },
  {
    prompt: 'cat stack.txt',
    fr: 'TIA Portal · WinCC · CAN FD · UDS · ISO-TP · ESP32 · STM32 · MATLAB/Simulink · FPGA',
    en: 'TIA Portal · WinCC · CAN FD · UDS · ISO-TP · ESP32 · STM32 · MATLAB/Simulink · FPGA',
  },
  {
    prompt: 'ls projects/',
    fr: 'ecu-diagnostics/   acc-adaptive-cruise/   ball-beam/',
    en: 'ecu-diagnostics/   acc-adaptive-cruise/   ball-beam/',
  },
  {
    prompt: 'cat result.txt',
    fr: 'Diagnostic véhicule complet : ~10 min → 19 s (9 ECU validés, Renault Technology Morocco)',
    en: 'Full-vehicle diagnostic: ~10 min → 19 s (9 ECUs validated, Renault Technology Morocco)',
  },
  {
    prompt: 'open https://elaounisoufyane.space',
    fr: 'Version CV + interactive — CV PDF téléchargeable',
    en: 'Printable CV + interactive version — downloadable CV PDF',
  },
]

export function TerminalWindow() {
  const { lang } = useLanguage()
  return (
    <div className="h-full overflow-y-auto bg-[rgba(0,0,0,0.6)] p-4 font-mono text-sm">
      <div className="mb-4 text-[#00ff00]">
        {lang === 'fr' ? 'Terminal SoufyaneOS — lecture seule' : 'SoufyaneOS terminal — read-only'}
      </div>
      {terminalLines.map((line, index) => (
        <div key={line.prompt} className="mb-3">
          <div className="flex gap-2">
            <span className="text-[#00f0ff]">soufyane@SoufyaneOS</span>
            <span className="text-[#7b2fff]">~</span>
            <span className="text-[#e8e8f0]">$ {line.prompt}</span>
          </div>
          <div className="mt-1 text-[#8888aa]">{lang === 'fr' ? line.fr : line.en}</div>
          {index === terminalLines.length - 1 ? (
            <motion.span
              className="mt-1 inline-block h-4 w-2 bg-[#00f0ff]"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.53, repeat: Infinity }}
            />
          ) : null}
        </div>
      ))}
    </div>
  )
}
