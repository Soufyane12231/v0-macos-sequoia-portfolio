'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'
import { projects, t, type Project } from '@/lib/portfolio-data'

type Filter = 'all' | 'work' | 'school'

const filters: { id: Filter; icon: string; fr: string; en: string }[] = [
  { id: 'all', icon: '📁', fr: 'Tous les projets', en: 'All projects' },
  { id: 'work', icon: '🚗', fr: 'Projets de stage', en: 'Internship projects' },
  { id: 'school', icon: '🎓', fr: "Projets d'école", en: 'School projects' },
]

export function ProjectsWindow() {
  const { lang } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<Project | null>(null)

  const visible = filter === 'all' ? projects : projects.filter((project) => project.context === filter)

  // The project detail is a real modal inside the window: Escape closes it and
  // focus returns to the card that opened it.
  const openerRef = useRef<HTMLElement | null>(null)
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!selected) return
    openerRef.current = document.activeElement as HTMLElement | null
    detailRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        setSelected(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      openerRef.current?.focus?.()
    }
  }, [selected])

  return (
    <div className="flex h-full">
      <nav
        aria-label={lang === 'fr' ? 'Filtrer les projets' : 'Filter projects'}
        className="w-48 shrink-0 border-r border-[rgba(0,240,255,0.08)] p-3"
      >
        <div className="mb-2 px-2 text-xs uppercase tracking-wider text-[#8b91a3]">
          {lang === 'fr' ? 'Catégories' : 'Categories'}
        </div>
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            aria-current={filter === item.id}
            className={`mb-1 w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors ${
              filter === item.id
                ? 'bg-[rgba(0,240,255,0.15)] text-[#00f0ff]'
                : 'text-[#e8e8f0] hover:bg-white/5'
            }`}
          >
            <span className="mr-1" aria-hidden="true">
              {item.icon}
            </span>
            {t({ fr: item.fr, en: item.en }, lang)}
          </button>
        ))}
        <div className="mt-4 px-2 text-[11px] text-[#8b91a3]">
          {visible.length} {lang === 'fr' ? 'projets' : 'projects'}
        </div>
      </nav>

      <div className="flex-1 overflow-auto p-4">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {visible.map((project, index) => (
            <motion.button
              type="button"
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              onClick={() => setSelected(project)}
              className="rounded-lg border-l-2 border-[#00f0ff] bg-[rgba(0,0,0,0.3)] p-4 text-left transition-colors hover:bg-[rgba(0,240,255,0.05)]"
            >
              <div className="mb-2 flex items-start gap-2">
                <span className="text-xl" aria-hidden="true">
                  {project.icon}
                </span>
                <h3 className="font-mono text-sm font-semibold leading-tight text-[#e8e8f0]">
                  {t(project.title, lang)}
                </h3>
              </div>

              <div className="mb-3 flex flex-wrap gap-1">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.08)] px-2 py-0.5 text-[10px] text-[#7ef0ff]"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 ? (
                  <span className="rounded-full px-2 py-0.5 text-[10px] text-[#8b91a3]">
                    +{project.tags.length - 4}
                  </span>
                ) : null}
              </div>

              <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-[#9aa0b5]">
                {t(project.description, lang)}
              </p>

              <span className="text-xs text-[#00f0ff]">
                {lang === 'fr' ? 'Voir le détail →' : 'View details →'}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(0,0,0,0.8)] p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              ref={detailRef}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={t(selected.title, lang)}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85%] w-full max-w-lg overflow-auto rounded-xl border border-[rgba(0,240,255,0.2)] bg-[rgba(13,13,26,0.97)] p-6"
            >
              <div className="mb-4 flex items-start gap-3">
                <span className="text-3xl" aria-hidden="true">
                  {selected.icon}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[#e8e8f0]">{t(selected.title, lang)}</h3>
                  <span className="text-xs uppercase tracking-wider text-[#8b91a3]">
                    {t(selected.category, lang)}
                  </span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.08)] px-3 py-0.5 text-xs text-[#7ef0ff]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mb-4 text-sm leading-relaxed text-[#e8e8f0]">{t(selected.description, lang)}</p>

              <div className="mb-4 rounded-lg bg-[rgba(0,240,255,0.05)] p-4">
                <h4 className="mb-2 text-sm font-semibold text-[#00f0ff]">
                  {lang === 'fr' ? 'Points clés' : 'Key points'}
                </h4>
                <ul className="space-y-1.5">
                  {selected.highlightsList.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#c8ccdb]">
                      <span className="text-[#00ff88]" aria-hidden="true">
                        ✓
                      </span>
                      {t(item, lang)}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                className="w-full rounded-lg border border-[rgba(0,240,255,0.2)] bg-[rgba(0,240,255,0.1)] py-2 text-[#00f0ff] transition-colors hover:bg-[rgba(0,240,255,0.2)]"
              >
                {lang === 'fr' ? 'Fermer' : 'Close'}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
