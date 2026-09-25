'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'
import { profile, site, spokenLanguages, t } from '@/lib/portfolio-data'

export function AboutWindow() {
  const { lang } = useLanguage()

  const chips = [
    { icon: '📍', label: t(site.location, lang) },
    { icon: '🎓', label: site.school },
    { icon: '📅', label: lang === 'fr' ? 'Dernière année' : 'Final year' },
    { icon: '🚗', label: t(profile.status, lang) },
  ]

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1">
        {/* Left Panel */}
      <div className="w-[60%] overflow-y-auto p-6 border-r border-[rgba(0,240,255,0.08)]">
        <div className="font-mono text-[#00ff88] text-sm mb-4">soufyane@ENSA-Tetouan:~$ whoami</div>

        <h2 className="text-2xl font-[var(--font-space)] text-[#00f0ff] mb-2">{t(site.role, lang)}</h2>
        <p className="text-[#8888aa] text-sm mb-6">{t(site.specialty, lang)}</p>

        <p className="text-[#e8e8f0] text-sm leading-relaxed mb-6">{t(profile.summary, lang)}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {chips.map((chip, i) => (
            <motion.div
              key={chip.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="px-3 py-1.5 bg-[rgba(0,240,255,0.1)] border border-[rgba(0,240,255,0.2)] rounded-full text-xs text-[#e8e8f0] flex items-center gap-2"
            >
              <span aria-hidden="true">{chip.icon}</span>
              <span>{chip.label}</span>
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="text-[#8888aa] text-xs uppercase tracking-wider mb-3">
            {lang === 'fr' ? 'Langues' : 'Languages'}
          </h3>
          <ul className="space-y-2">
            {spokenLanguages.map((item) => (
              <li key={item.name.en} className="flex items-center gap-3 text-sm">
                <span aria-hidden="true">{item.flag}</span>
                <span className="text-[#e8e8f0] flex-1">{t(item.name, lang)}</span>
                <span className="text-[#8888aa] text-xs">{t(item.level, lang)}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-xs text-[#9aa0b5] leading-relaxed">{t(profile.availability, lang)}</p>
      </div>

      {/* Right Panel — chip illustration */}
      <div className="w-[40%] flex flex-col items-center justify-center p-6">
        <motion.div
          className="relative w-48 h-48"
          animate={{ rotateY: [0, 10, 0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ perspective: 1000 }}
          aria-hidden="true"
        >
          <div className="absolute inset-8 bg-[#1a1a2e] rounded-lg border border-[#00f0ff] shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <div className="absolute inset-4 bg-[#0d0d1a] rounded flex items-center justify-center">
              <span className="text-[#00f0ff] font-mono text-xs">STM32</span>
            </div>
          </div>

          {[...Array(6)].map((_, i) => (
            <div
              key={`top-${i}`}
              className="absolute w-1 h-6 bg-[#555] rounded-sm"
              style={{ left: `${32 + i * 20}px`, top: '8px' }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <div
              key={`bottom-${i}`}
              className="absolute w-1 h-6 bg-[#555] rounded-sm"
              style={{ left: `${32 + i * 20}px`, bottom: '8px' }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={`left-${i}`}
              className="absolute h-1 w-6 bg-[#555] rounded-sm"
              style={{ top: `${48 + i * 24}px`, left: '8px' }}
            />
          ))}
          {[...Array(4)].map((_, i) => (
            <div
              key={`right-${i}`}
              className="absolute h-1 w-6 bg-[#555] rounded-sm"
              style={{ top: `${48 + i * 24}px`, right: '8px' }}
            />
          ))}

          <span className="absolute text-[8px] text-[#8b91a3] -top-1 left-8">VCC</span>
          <span className="absolute text-[8px] text-[#8b91a3] -top-1 right-8">GND</span>
          <span className="absolute text-[8px] text-[#8b91a3] -bottom-1 left-8">TX</span>
          <span className="absolute text-[8px] text-[#8b91a3] -bottom-1 right-8">RX</span>
        </motion.div>

        <div className="mt-6 w-full rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(0,240,255,0.05)] p-3 font-mono text-[11px] leading-relaxed text-[#9aa0b5]">
          <p className="text-[#00ff88]">$ cat stack.txt</p>
          <p className="mt-1 text-[#c8ccdb]">TIA Portal · WinCC · CAN FD · UDS</p>
          <p>ESP32 · STM32 · MATLAB/Simulink · FPGA</p>
        </div>
      </div>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.3)] px-4 py-2">
        <span className="font-mono text-xs text-[#8b91a3]">ENSA Tétouan · 2026 · soufyaneos</span>
      </div>
    </div>
  )
}
