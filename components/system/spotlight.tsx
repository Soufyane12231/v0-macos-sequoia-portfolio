'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useDesktopStore, type WindowId } from '@/lib/desktop-store'
import { site, t } from '@/lib/portfolio-data'
import { useLanguage } from '@/components/portfolio/language-provider'

type SpotlightResult =
  | { kind: 'window'; id: WindowId; title: string; subtitle: string; icon: string; keywords: string }
  | { kind: 'link'; id: string; title: string; subtitle: string; icon: string; keywords: string; href: string }

export function Spotlight() {
  const { setShowSpotlight, openWindow } = useDesktopStore()
  const { lang } = useLanguage()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo<SpotlightResult[]>(() => {
    const windows: SpotlightResult[] = [
      {
        kind: 'window',
        id: 'about',
        title: lang === 'fr' ? 'À propos — whoami' : 'About — whoami',
        subtitle: 'profil, formation, langues',
        icon: '👤',
        keywords: 'about whoami profil profile bio',
      },
      {
        kind: 'window',
        id: 'projects',
        title: lang === 'fr' ? 'Projets — ~/projects' : 'Projects — ~/projects',
        subtitle: 'ecu diagnostics acc ball beam',
        icon: '📁',
        keywords: 'projects projets ecu can uds acc ball beam matlab fpga',
      },
      {
        kind: 'window',
        id: 'experience',
        title: lang === 'fr' ? 'Expérience — experience.log' : 'Experience — experience.log',
        subtitle: 'renault holcim club robotique',
        icon: '💼',
        keywords: 'experience expérience renault holcim stage internship tia wincc',
      },
      {
        kind: 'window',
        id: 'skills',
        title: lang === 'fr' ? 'Compétences — skills.json' : 'Skills — skills.json',
        icon: '⚡',
        subtitle: 'automatisme, embarqué, can/uds, simulation',
        keywords: 'skills compétences tia portal wincc can uds esp32 stm32 matlab',
      },
      {
        kind: 'window',
        id: 'certificates',
        title: lang === 'fr' ? 'Certifications — certificates/' : 'Certificates — certificates/',
        subtitle: 'abb robotics, ge aerospace, datacamp',
        icon: '🏆',
        keywords: 'certificates certifications abb ge aerospace datacamp udemy',
      },
      {
        kind: 'window',
        id: 'contact',
        title: lang === 'fr' ? 'Contact — contact.sh' : 'Contact — contact.sh',
        subtitle: 'email, téléphone, linkedin, github',
        icon: '📬',
        keywords: 'contact email téléphone phone linkedin github cv',
      },
    ]

    const links: SpotlightResult[] = [
      {
        kind: 'link',
        id: 'cv',
        title: lang === 'fr' ? 'Télécharger le CV (PDF)' : 'Download the CV (PDF)',
        subtitle: site.links.cv,
        icon: '📄',
        keywords: 'cv resume pdf download télécharger',
        href: site.links.cv,
      },
      {
        kind: 'link',
        id: 'resume-page',
        title: lang === 'fr' ? 'Version CV de la page d’accueil' : 'Printable CV page',
        subtitle: '/',
        icon: '🏠',
        keywords: 'home accueil cv version printable',
        href: '/',
      },
      {
        kind: 'link',
        id: 'github',
        title: 'GitHub',
        subtitle: 'github.com/Soufyane12231',
        icon: '🐙',
        keywords: 'github code repository',
        href: site.links.github,
      },
      {
        kind: 'link',
        id: 'linkedin',
        title: 'LinkedIn',
        subtitle: site.links.linkedinLabel,
        icon: '💼',
        keywords: 'linkedin profile',
        href: site.links.linkedin,
      },
    ]

    const all = [...windows, ...links]
    const needle = query.trim().toLowerCase()
    if (!needle) return windows.slice(0, 4)
    return all.filter((item) => `${item.title} ${item.subtitle} ${item.keywords}`.toLowerCase().includes(needle))
  }, [query, lang])

  const close = () => {
    setShowSpotlight(false)
    setQuery('')
  }

  const activate = (result: SpotlightResult | undefined) => {
    if (!result) return
    if (result.kind === 'window') {
      openWindow(result.id)
    } else if (result.id === 'cv') {
      // A CV action has to download the file: opening a PDF in a new tab
      // strands the visitor on a document with no way back to the portfolio.
      const anchor = document.createElement('a')
      anchor.href = result.href
      anchor.download = site.links.cvFileName
      anchor.rel = 'noopener'
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    } else {
      window.open(result.href, '_blank', 'noopener,noreferrer')
    }
    close()
  }

  // Remember where focus came from so Escape/selection returns the visitor to
  // the window they were working in, not to the top of the document.
  const previouslyFocused = useRef<HTMLElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => previouslyFocused.current?.focus?.()
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }
      if (event.key === 'Tab') {
        // The overlay is modal, so focus has to stay inside it.
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'input, button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable || focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        const active = document.activeElement
        if (event.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && active === last) {
          event.preventDefault()
          first.focus()
        }
        return
      }
      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setSelectedIndex((index) => Math.min(index + 1, results.length - 1))
        return
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault()
        setSelectedIndex((index) => Math.max(index - 1, 0))
        return
      }
      if (event.key === 'Enter') {
        event.preventDefault()
        activate(results[selectedIndex])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [results, selectedIndex])

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-[rgba(0,0,0,0.5)]"
        onClick={close}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="fixed left-1/2 top-[20%] z-[301] w-[600px] max-w-[90vw] -translate-x-1/2"
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight — recherche dans SoufyaneOS"
      >
        <div className="overflow-hidden rounded-2xl border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-[rgba(0,240,255,0.08)] px-4 py-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#8888aa]" aria-hidden="true">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="spotlight-results"
              aria-autocomplete="list"
              aria-activedescendant={
                results.length > 0 ? `spotlight-option-${selectedIndex}` : undefined
              }
              aria-label={lang === 'fr' ? 'Rechercher' : 'Search'}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={lang === 'fr' ? 'Rechercher dans SoufyaneOS…' : 'Search SoufyaneOS…'}
              className="flex-1 bg-transparent text-lg text-[#e8e8f0] placeholder-[#8b91a3] focus:outline-none"
            />
            <kbd className="rounded bg-[rgba(255,255,255,0.1)] px-2 py-0.5 text-xs text-[#8b91a3]">esc</kbd>
          </div>

          <div id="spotlight-results" role="listbox" className="max-h-[400px] overflow-auto py-2">
            {results.length > 0 ? (
              results.map((result, index) => (
                <button
                  key={`${result.kind}-${result.id}`}
                  id={`spotlight-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === selectedIndex}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => activate(result)}
                  className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                    index === selectedIndex ? 'bg-[rgba(0,240,255,0.1)]' : 'hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(0,240,255,0.1)] text-xl"
                    aria-hidden="true"
                  >
                    {result.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-[#e8e8f0]">{result.title}</span>
                    <span className="block text-xs text-[#8b91a3]">{result.subtitle}</span>
                  </span>
                  {index === selectedIndex ? (
                    <kbd className="rounded bg-[rgba(0,240,255,0.1)] px-2 py-0.5 text-xs text-[#00f0ff]">↵</kbd>
                  ) : null}
                </button>
              ))
            ) : (
              <p className="px-4 py-8 text-center text-[#8b91a3]">
                {lang === 'fr' ? 'Aucun résultat pour' : 'No results for'} &quot;{query}&quot;
              </p>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-[rgba(0,240,255,0.08)] px-4 py-2 text-xs text-[#8b91a3]">
            <span>
              {lang === 'fr'
                ? 'Recherche — fenêtres, CV, GitHub, LinkedIn'
                : 'Search — windows, CV, GitHub, LinkedIn'}
            </span>
            <div className="flex items-center gap-2">
              <kbd className="rounded bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5">↑</kbd>
              <kbd className="rounded bg-[rgba(255,255,255,0.1)] px-1.5 py-0.5">↓</kbd>
              <span>{t({ fr: 'pour naviguer', en: 'to navigate' }, lang)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
