'use client'

/**
 * Command palette (Ctrl / Cmd + K), plus the mobile navigation menu: the same
 * dialog does both jobs, which is why there is only one popup implementation
 * on this site.
 *
 * Commands are built from the same registry the header nav uses, so a section
 * can never exist in one and not the other.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { site, t, ui } from '@/lib/portfolio-data'
import { Modal } from './modal'

type Command = {
  id: string
  label: string
  hint?: string
  kind: 'section' | 'action'
  run: () => void
}

export function CommandPalette({
  open,
  onClose,
  lang,
  onToggleLang,
}: {
  open: boolean
  onClose: () => void
  lang: 'fr' | 'en'
  onToggleLang: () => void
}) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)

  const goTo = useCallback(
    (id: string) => {
      onClose()
      // Let the dialog unlock the body before the smooth scroll starts.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    },
    [onClose],
  )

  const commands = useMemo<Command[]>(() => {
    const sectionCommands: Command[] = (
      [
        ['hero', ui.sections.hero],
        ['en-bref', ui.sections.bref],
        ['experience', ui.sections.experience],
        ['projects', ui.sections.projects],
        ['skills', ui.sections.skills],
        ['parcours', ui.sections.parcours],
        ['contact', ui.sections.contact],
      ] as const
    ).map(([id, label]) => ({
      id: `section-${id}`,
      label: t(label, lang),
      kind: 'section',
      run: () => goTo(id),
    }))

    const actionCommands: Command[] = [
      {
        id: 'action-cv',
        label: t(ui.palette.downloadCv, lang),
        hint: site.links.cvFileName,
        kind: 'action',
        run: () => {
          const link = document.createElement('a')
          link.href = site.links.cv
          link.download = site.links.cvFileName
          link.click()
        },
      },
      {
        id: 'action-lang',
        label: `${t(ui.palette.language, lang)} — ${lang === 'fr' ? 'English' : 'Français'}`,
        kind: 'action',
        run: () => {
          onToggleLang()
          onClose()
        },
      },
      {
        id: 'action-top',
        label: t(ui.palette.backToTop, lang),
        kind: 'action',
        run: () => goTo('hero'),
      },
    ]

    return [...sectionCommands, ...actionCommands]
  }, [lang, goTo, onToggleLang, onClose])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(needle) || c.id.includes(needle))
  }, [commands, query])

  // Reset when the palette is re-opened.
  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
    }
  }, [open])

  useEffect(() => setCursor(0), [query])

  // Keep the highlighted row inside the scroll viewport.
  useEffect(() => {
    const node = listRef.current?.children[cursor] as HTMLElement | undefined
    node?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((c) => (filtered.length ? (c + 1) % filtered.length : 0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((c) => (filtered.length ? (c - 1 + filtered.length) % filtered.length : 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      filtered[cursor]?.run()
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(ui.palette.title, lang)}
      size="md"
      initialFocus="input"
      closeLabel={t(ui.close, lang)}
    >
      <div onKeyDown={onKeyDown}>
        <label className="sr-only" htmlFor="palette-search">
          {t(ui.palette.hint, lang)}
        </label>
        <div className="relative">
          <svg
            viewBox="0 0 16 16"
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5 L14 14" />
          </svg>
          <input
            id="palette-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t(ui.palette.hint, lang)}
            autoComplete="off"
            spellCheck={false}
            className="w-full border border-line bg-brin-deep py-3 pr-3 pl-10 font-mono text-sm text-menthe placeholder:text-muted/70 focus:border-tan focus:outline-none"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-5 font-mono text-xs tracking-[0.1em] text-muted uppercase">{t(ui.palette.empty, lang)}</p>
        ) : (
          <ul ref={listRef} className="mt-4 max-h-[46vh] overflow-y-auto" role="listbox" aria-label={t(ui.palette.title, lang)}>
            {filtered.map((command, index) => (
              <li key={command.id} role="option" aria-selected={index === cursor}>
                <button
                  type="button"
                  onClick={command.run}
                  onPointerMove={() => setCursor(index)}
                  className={`flex w-full items-center justify-between gap-4 border-l-2 px-3 py-2.5 text-left transition-colors duration-150 ${
                    index === cursor
                      ? 'border-signal bg-raised/60 text-menthe'
                      : 'border-transparent text-muted hover:text-menthe'
                  }`}
                >
                  <span className="font-mono text-sm">{command.label}</span>
                  {command.hint ? (
                    <span className="mono truncate text-[0.65rem] tracking-[0.08em] text-muted/70 uppercase">
                      {command.hint}
                    </span>
                  ) : (
                    <span className="mono text-[0.6rem] tracking-[0.14em] text-muted/50 uppercase">
                      {command.kind === 'section' ? '#' : '·'}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="mono mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.65rem] tracking-[0.08em] text-muted/70 uppercase">
          <span className="inline-flex items-center gap-1.5">
            <kbd className="border border-line px-1.5 py-0.5">↑</kbd>
            <kbd className="border border-line px-1.5 py-0.5">↓</kbd>
            <span className="sr-only">pour naviguer</span>
            <span aria-hidden="true">naviguer</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="border border-line px-1.5 py-0.5">↵</kbd>
            <span aria-hidden="true">ouvrir</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd className="border border-line px-1.5 py-0.5">esc</kbd>
            <span aria-hidden="true">fermer</span>
          </span>
        </p>
      </div>
    </Modal>
  )
}

/** Registers Ctrl / Cmd + K. Mounted once, at the page root. */
export function usePaletteHotkey(onOpen: () => void) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        onOpen()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onOpen])
}