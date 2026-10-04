'use client'

/**
 * The one-page site.
 *
 * Structure: a client shell (needed for the language toggle and the palette)
 * wrapping server-quality, fully-static HTML. Everything a recruiter or an ATS
 * reads is real markup in the first response — the effects below only decorate
 * content that already exists without JavaScript.
 */

import { useCallback, useEffect, useState } from 'react'
import { t, ui } from '@/lib/portfolio-data'
import { useLanguage } from '@/components/portfolio/language-provider'
import { Cursor, DataBus, Footer, Header } from './chrome'
import { CommandPalette, usePaletteHotkey } from './command-palette'
import { RevealObserver } from './motion'
import { Contact } from './sections/contact'
import { EnBref } from './sections/en-bref'
import { Experience } from './sections/experience'
import { Hero } from './sections/hero'
import { Parcours } from './sections/parcours'
import { Projects } from './sections/projects'
import { Skills } from './sections/skills'

const TRACKED = ['en-bref', 'experience', 'projects', 'skills', 'parcours', 'contact'] as const

export function OnePage() {
  const { lang, toggleLang } = useLanguage()
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState('hero')
  const [paletteOpen, setPaletteOpen] = useState(false)

  usePaletteHotkey(useCallback(() => setPaletteOpen(true), []))

  /* Scroll progress for the data bus, plus the section currently in view.
     One rAF-throttled listener rather than one observer per section. */
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0)

      // The active section is the last one whose top has passed 38% of the
      // viewport, which matches where a reader's attention sits.
      const line = window.innerHeight * 0.38
      let current = 'hero'
      for (const id of ['hero', ...TRACKED]) {
        const el = document.getElementById(id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= line) current = id
      }
      // At the very bottom the last section can be shorter than the line.
      if (scrollable > 0 && window.scrollY >= scrollable - 2) current = 'contact'
      setActiveId(current)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    const observer = new ResizeObserver(schedule)
    TRACKED.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [lang])

  return (
    <>
      <RevealObserver />
      <Cursor />
      <DataBus progress={progress} activeId={activeId} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} lang={lang} onToggleLang={toggleLang} />

      <a href="#main" className="skip-link">
        {t(ui.skipToContent, lang)}
      </a>

      <Header
        lang={lang}
        onToggleLang={toggleLang}
        activeId={activeId}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main id="main">
        <Hero lang={lang} />
        <EnBref lang={lang} />
        <Experience lang={lang} />
        <Projects lang={lang} />
        <Skills lang={lang} />
        <Parcours lang={lang} />
        <Contact lang={lang} />
      </main>

      <Footer lang={lang} />
    </>
  )
}