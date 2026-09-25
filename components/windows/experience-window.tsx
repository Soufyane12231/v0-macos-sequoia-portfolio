'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'
import { experiences, t, type Experience } from '@/lib/portfolio-data'

export function ExperienceWindow() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState<Experience>(experiences[0])

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#0a0a12]">
      <div className="shrink-0 border-b border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.3)] px-4 py-2">
        <div className="font-mono text-sm text-[#00ff88]">soufyane@SoufyaneOS:~$ cat experience.log</div>
      </div>

      <div className="flex min-h-0 flex-1">
        <nav
          aria-label={lang === 'fr' ? 'Expériences' : 'Experiences'}
          className="w-56 shrink-0 overflow-y-auto border-r border-[rgba(0,240,255,0.08)] bg-[rgba(0,0,0,0.2)] p-3"
        >
          <div className="mb-3 font-mono text-xs uppercase tracking-widest text-[#8b91a3]">// career_log</div>
          {experiences.map((exp) => (
            <button
              key={exp.id}
              type="button"
              onClick={() => setSelected(exp)}
              aria-current={selected.id === exp.id}
              className={`mb-2 w-full rounded-lg border p-3 text-left transition-all ${
                selected.id === exp.id
                  ? 'border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.06)]'
                  : 'border-transparent hover:border-white/10 hover:bg-white/[0.03]'
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                <span aria-hidden="true">{exp.icon}</span>
                <span className="font-mono text-xs font-bold" style={{ color: exp.color }}>
                  {t(exp.period, lang)}
                </span>
              </div>
              <div className="text-xs font-semibold leading-tight text-[#e8e8f0]">{t(exp.role, lang)}</div>
              <div className="mt-0.5 truncate text-xs text-[#8888aa]">{t(exp.company, lang)}</div>
              <span
                className={`mt-2 inline-block rounded-full px-2 py-0.5 font-mono text-[10px] ${
                  exp.current
                    ? 'bg-[rgba(0,255,136,0.1)] text-[#00ff88]'
                    : 'bg-[rgba(0,240,255,0.1)] text-[#00f0ff]'
                }`}
              >
                {exp.current
                  ? lang === 'fr'
                    ? '● EN COURS'
                    : '● ONGOING'
                  : lang === 'fr'
                    ? '✓ TERMINÉ'
                    : '✓ DONE'}
              </span>
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.article
            key={selected.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="min-w-0 flex-1 overflow-y-auto p-5"
          >
            <span className="font-mono text-xs font-bold" style={{ color: selected.color }}>
              {t(selected.period, lang)}
            </span>
            <h2 className="mt-0.5 text-base font-bold leading-tight text-[#e8e8f0]">{t(selected.role, lang)}</h2>
            <p className="mt-0.5 text-sm font-semibold" style={{ color: selected.color }}>
              {t(selected.company, lang)}
            </p>
            <p className="mt-1 font-mono text-xs text-[#8888aa]">📍 {t(selected.location, lang)}</p>

            <p className="mt-4 text-sm leading-relaxed text-[#e8e8f0]">{t(selected.summary, lang)}</p>

            <h3 className="mt-5 text-xs uppercase tracking-wider text-[#00f0ff]">
              {lang === 'fr' ? 'Missions' : 'Responsibilities'}
            </h3>
            <ul className="mt-2 space-y-2">
              {selected.bullets.map((bullet, index) => (
                <li key={index} className="flex gap-2.5 text-sm leading-relaxed text-[#c8ccdb]">
                  <span className="mt-0.5 text-[#00ff88]" aria-hidden="true">
                    ✓
                  </span>
                  <span>{t(bullet, lang)}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-5 text-xs uppercase tracking-wider text-[#00f0ff]">
              {lang === 'fr' ? 'Technologies' : 'Stack'}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {selected.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#a8aec2]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  )
}
