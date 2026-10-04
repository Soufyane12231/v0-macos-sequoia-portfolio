'use client'

/**
 * Page chrome: header, footer, the scroll-traced data bus and the custom
 * cursor. All of it is decorative or navigational — none of it carries the
 * only copy of a fact.
 */

import { useEffect, useRef, useState } from 'react'
import { site, t, ui } from '@/lib/portfolio-data'
import { Magnetic } from './motion'

/**
 * Header destinations, as [section id, label key] pairs.
 *
 * The id and the label key are deliberately separate: the "En bref" section
 * lives at #en-bref while its label key is `bref`. Keying the nav off the
 * label alone silently produced #bref, an anchor that matches nothing.
 */
const NAV = [
  ['en-bref', 'bref'],
  ['experience', 'experience'],
  ['projects', 'projects'],
  ['skills', 'skills'],
  ['parcours', 'parcours'],
  ['contact', 'contact'],
] as const

export function Header({
  lang,
  onToggleLang,
  activeId,
  onOpenPalette,
  onOpenShortcuts,
  progress,
  scrolled,
}: {
  lang: 'fr' | 'en'
  onToggleLang: () => void
  activeId: string
  onOpenPalette: () => void
  onOpenShortcuts: () => void
  /** 0..1 page scroll, drawn as the sand rule along the header's bottom edge. */
  progress: number
  /** True once the page has left the top, so the bar can gain its own ground. */
  scrolled: boolean
}) {
  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'border-line bg-brin/92' : 'border-line-soft bg-brin/80'
      }`}
      style={{ height: 'var(--header-h)' }}
    >
      <div className="shell flex h-full items-center gap-4">
        <a href="#hero" className="group flex shrink-0 items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center border border-line font-display text-xs font-medium text-sable transition-colors duration-200 group-hover:border-tan">
            {site.initials}
          </span>
          <span className="hidden font-display text-sm font-medium text-paper sm:block">{site.name}</span>
        </a>

        <nav aria-label={t(ui.palette.trigger, lang)} className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map(([id, key]) => {
              const active = activeId === id
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active ? 'true' : undefined}
                    className={`relative block px-2.5 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors duration-200 ${
                      active ? 'text-sable' : 'text-muted hover:text-menthe'
                    }`}
                  >
                    {t(ui.sections[key], lang)}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-2.5 bottom-0.5 h-px origin-left bg-sable transition-transform duration-300 ${
                        active ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <div
            role="group"
            aria-label={t(ui.palette.language, lang)}
            className="flex items-center border border-line text-[0.7rem]"
          >
            {(['fr', 'en'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => code !== lang && onToggleLang()}
                aria-pressed={code === lang}
                className={`px-2 py-1.5 font-mono tracking-[0.1em] uppercase transition-colors duration-200 ${
                  code === lang ? 'bg-sable text-brin' : 'text-muted hover:text-menthe'
                }`}
              >
                <span className="sr-only">{code === 'fr' ? 'Français' : 'English'}</span>
                <span aria-hidden="true">{code}</span>
              </button>
            ))}
          </div>

          {/* The one and only "Télécharger le CV" control on the page. It lives
              in the sticky header so it is reachable from anywhere without
              repeating itself in the hero and again at the foot of Contact. */}
          <Magnetic strength={4}>
            <a
              href={site.links.cv}
              download={site.links.cvFileName}
              className="hidden border border-tan/60 px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] text-sable uppercase transition-colors duration-200 hover:bg-sable hover:text-brin sm:block"
            >
              {t(ui.palette.downloadCv, lang)}
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={onOpenShortcuts}
            className="mono hidden border border-line px-2 py-1.5 text-[0.7rem] tracking-[0.1em] text-muted uppercase transition-colors duration-200 hover:border-tan hover:text-sable lg:block"
          >
            <span aria-hidden="true">?</span>
            <span className="sr-only">{t(ui.shortcuts.trigger, lang)}</span>
          </button>

          <button
            type="button"
            onClick={onOpenPalette}
            className="border border-line p-1.5 text-muted transition-colors duration-200 hover:border-tan hover:text-sable lg:hidden"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M1 4h14M1 8h14M1 12h14" />
            </svg>
            <span className="sr-only">{t(ui.menu, lang)}</span>
          </button>
        </div>
      </div>

      {/* Scroll progress. Reads as the sand edge of the header filling up; it
          carries no information that is not also in the document, so it stays
          decorative and is hidden from assistive technology. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-sable"
        style={{ transform: `scaleX(${Math.max(0, Math.min(1, progress))})` }}
      />
    </header>
  )
}

export function Footer({ lang }: { lang: 'fr' | 'en' }) {
  const [year, setYear] = useState<string>('')
  useEffect(() => setYear(String(new Date().getFullYear())), [])
  return (
    <footer className="border-t border-line-soft py-9">
      <div className="shell flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-sm font-medium text-paper">{site.name}</p>
          <p className="mt-1 font-mono text-[0.7rem] tracking-[0.08em] text-muted uppercase">
            {year} — {t(site.specialty, lang)}
          </p>
        </div>
        <a
          href="#hero"
          className="group inline-flex items-center gap-2 font-mono text-[0.7rem] tracking-[0.1em] text-muted uppercase transition-colors duration-200 hover:text-sable"
        >
          <span
            aria-hidden="true"
            className="grid h-6 w-6 place-items-center border border-line transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-tan"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 10V2M6 2L2.5 5.5M6 2l3.5 3.5" />
            </svg>
          </span>
          {t(ui.backToTop, lang)}
        </a>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------ */
/* Data bus — the signature motif                                       */
/* ------------------------------------------------------------------ */

/**
 * A fixed column on the left edge carrying a CAN-like line that fills as the
 * page scrolls, with one node per section. Positions are measured from the
 * real section boxes so a node always lands beside its section.
 *
 * `aria-hidden`: the navigation it echoes is already in the header.
 */
export function DataBus({ progress, activeId }: { progress: number; activeId: string }) {
  const [nodes, setNodes] = useState<{ id: string; y: number }[]>([])

  useEffect(() => {
    const IDS = ['hero', 'en-bref', 'experience', 'projects', 'skills', 'parcours', 'contact']
    let frame = 0

    const measure = () => {
      frame = 0
      const docHeight = document.documentElement.scrollHeight
      if (docHeight === 0) return
      setNodes(
        IDS.map((id) => {
          const el = document.getElementById(id)
          if (!el) return { id, y: 0 }
          const box = el.getBoundingClientRect()
          const centerInDoc = box.top + window.scrollY + box.height / 2
          return { id, y: (centerInDoc / docHeight) * window.innerHeight }
        }),
      )
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // Sections change height when the language flips.
    const observer = new ResizeObserver(schedule)
    IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    // Fonts and images land after hydration.
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
    fonts?.ready.then(schedule).catch(() => {})

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden w-8 lg:block xl:w-9">
      <svg className="h-full w-full" viewBox="0 0 36 1000" preserveAspectRatio="none">
        {/* the carriage: a dark channel running the full height */}
        <line x1="14" y1="0" x2="14" y2="1000" stroke="var(--line-soft)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {/* the signature: how far the bus has been carried */}
        <line
          x1="14"
          y1="0"
          x2="14"
          y2={Math.max(0, Math.min(1, progress)) * 1000}
          stroke="var(--sable)"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          style={{ transition: 'none' }}
        />
        {/* return wire */}
        <line
          x1="18"
          y1="0"
          x2="18"
          y2={Math.max(0, Math.min(1, progress) * 1000 - 8)}
          stroke="var(--tan)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          opacity="0.5"
        />
        {/* the head of the trace, with its own halo */}
        <circle
          cx="14"
          cy={Math.max(0, Math.min(1, progress)) * 1000}
          r="3"
          fill="var(--signal)"
          vectorEffect="non-scaling-stroke"
        />
        {nodes.map((n) => {
          const lit = n.id === activeId
          const y = (n.y / 1000) * 1000
          return (
            <g key={n.id} transform={`translate(0 ${y})`}>
              <line x1="14" y1="0" x2="26" y2="0" stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <line x1="20" y1="0" x2="20" y2="4" stroke={lit ? 'var(--tan)' : 'var(--line)'} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              {/* Only the node for the section in view gets a ring, so at any
                  moment there is exactly one pulse on the rail. */}
              {lit ? (
                <circle
                  className="rail-ping"
                  cx="14"
                  cy="0"
                  r="4.5"
                  fill="none"
                  stroke="var(--sable)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ) : null}
              <circle
                cx="14"
                cy="0"
                r={lit ? 4.5 : 2.4}
                fill={lit ? 'var(--sable)' : 'var(--brin)'}
                stroke={lit ? 'var(--sable)' : 'var(--line)'}
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Custom cursor                                                        */
/* ------------------------------------------------------------------ */

/** Dots in the cursor's wake. Fewer and slower would read as lag, not motion. */
const TRAIL = 7

/**
 * A small sand dot with an orange signal core that grows over interactive
 * targets, followed by a short wake of shrinking dots. Only mounted for fine
 * pointers without reduced motion; the class on <html> hides the native cursor
 * only in that case, so touch devices and reduced-motion users keep their
 * normal pointer.
 *
 * The wake is written straight to the DOM from inside the same rAF that
 * updates the head. Routing seven more points through React state would mean
 * eight renders per frame for something nobody reads.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)
  const [pressed, setPressed] = useState(false)
  const wake = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(fine.matches && !calm.matches)
    sync()
    fine.addEventListener('change', sync)
    calm.addEventListener('change', sync)
    return () => {
      fine.removeEventListener('change', sync)
      calm.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor')

    const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, summary, [tabindex]:not([tabindex="-1"])'
    let raf = 0
    let x = -100
    let y = -100
    const points = Array.from({ length: TRAIL }, () => ({ x: -100, y: -100 }))

    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      points[0].x = x
      points[0].y = y
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0
          setPos({ x, y })
          // Each dot chases the one ahead of it, so the wake stretches on a
          // fast move and closes up again when the pointer stops.
          for (let i = 1; i < points.length; i += 1) {
            const lead = points[i - 1]
            const dot = points[i]
            dot.x += (lead.x - dot.x) * 0.34
            dot.y += (lead.y - dot.y) * 0.34
            const node = wake.current[i]
            if (node) node.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`
          }
        })
      }
      const target = event.target as Element | null
      setActive(Boolean(target?.closest?.(INTERACTIVE)))
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => {
      setPos({ x: -100, y: -100 })
      points.forEach((dot) => {
        dot.x = -100
        dot.y = -100
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    document.addEventListener('pointerleave', onLeave)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      document.documentElement.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] hidden md:block"
      style={{ opacity: pos.x < 0 ? 0 : 1, transition: 'opacity 160ms linear' }}
    >
      {/* The wake sits under the head, and shrinks along its length. */}
      {Array.from({ length: TRAIL - 1 }, (_, k) => {
        const index = k + 1
        const size = 9 - index
        return (
          <div
            key={index}
            ref={(node) => {
              wake.current[index] = node
            }}
            className="absolute rounded-full"
            style={{
              left: 0,
              top: 0,
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              background: 'var(--tan)',
              opacity: 0.4 - index * 0.045,
            }}
          />
        )
      })}
      <div
        className="absolute rounded-full border"
        style={{
          left: pos.x,
          top: pos.y,
          width: active ? 34 : 16,
          height: active ? 34 : 16,
          marginLeft: active ? -17 : -8,
          marginTop: active ? -17 : -8,
          borderColor: active ? 'var(--signal)' : 'var(--tan)',
          background: active ? 'color-mix(in srgb, var(--signal) 12%, transparent)' : 'transparent',
          transform: `scale(${pressed ? 0.82 : 1})`,
          transition:
            'width 200ms var(--ease-out-soft), height 200ms var(--ease-out-soft), margin 200ms var(--ease-out-soft), transform 140ms var(--ease-out-soft), border-color 200ms linear, background 200ms linear',
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: pos.x,
          top: pos.y,
          width: 3,
          height: 3,
          marginLeft: -1.5,
          marginTop: -1.5,
          background: 'var(--signal)',
        }}
      />
    </div>
  )
}