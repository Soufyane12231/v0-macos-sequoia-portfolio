'use client'

/**
 * D. Projects — three cards, filterable by category, each opening a dialog
 * with the schematic and an optional gallery.
 *
 * Visual policy: a card carries its own schematic in a technical frame. As
 * soon as a project has real media (`project.images`), that frame becomes a
 * swipeable slider and the dialog shows the full gallery — same box, same
 * aspect ratio, no layout change.
 */

import { useRef, useState } from 'react'
import { projectCategories, projects, t, ui } from '@/lib/portfolio-data'
import type { Project } from '@/lib/portfolio-data'
import { Modal } from '../modal'
import { usePrefersReducedMotion } from '../motion'
import { ProjectSchematic } from '../schematics'
import { Section } from '../section'

type Filter = 'all' | Project['category']

const FILTERS: Filter[] = ['all', 'diagnostic', 'modeling', 'control']

const galleryLabels = {
  prev: { fr: 'Image précédente', en: 'Previous image' },
  next: { fr: 'Image suivante', en: 'Next image' },
}

/* ------------------------------------------------------------------ */
/* 3D tilt                                                             */
/* ------------------------------------------------------------------ */

function Tilt({ children }: { children: React.ReactNode }) {
  const wrap = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(pointer: fine)').matches) return
    const box = el.getBoundingClientRect()
    const px = (event.clientX - box.left) / box.width - 0.5
    const py = (event.clientY - box.top) / box.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${px * 4}deg) rotateX(${-py * 4}deg)`
  }
  const rest = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.transform = ''
  }

  return (
    <div
      onPointerMove={wrap}
      onPointerLeave={rest}
      className="h-full transition-transform duration-200 ease-out"
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Slider — real media: swipe, arrow keys, arrows, dots or thumbnails  */
/* ------------------------------------------------------------------ */

type Slide = { src: string; alt: string }

function Slider({
  slides,
  lang,
  label,
  compact = false,
}: {
  slides: Slide[]
  lang: 'fr' | 'en'
  label: string
  compact?: boolean
}) {
  const count = slides.length
  const [index, setIndex] = useState(0)
  const [drag, setDrag] = useState(0)
  const [dragging, setDragging] = useState(false)
  const calm = usePrefersReducedMotion()
  const start = useRef<{ x: number; y: number } | null>(null)
  const axis = useRef<'x' | 'y' | null>(null)

  const go = (delta: number) => setIndex((i) => (i + delta + count) % count)

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      go(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      go(1)
    }
  }

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    start.current = { x: event.clientX, y: event.clientY }
    axis.current = null
    // Capture keeps the drag alive once the pointer leaves the box; a
    // synthetic event carries no real pointer id, so guard the call.
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      /* no active pointer */
    }
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!start.current) return
    const dx = event.clientX - start.current.x
    const dy = event.clientY - start.current.y
    if (axis.current === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
      axis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (axis.current === 'x') setDragging(true)
    }
    if (axis.current !== 'x') return
    const width = event.currentTarget.clientWidth || 1
    setDrag(Math.max(-width, Math.min(width, dx)))
  }

  const settle = (event: React.PointerEvent<HTMLDivElement>) => {
    if (start.current && axis.current === 'x') {
      const width = event.currentTarget.clientWidth || 1
      const threshold = Math.min(90, width * 0.18)
      if (drag > threshold) go(-1)
      else if (drag < -threshold) go(1)
    }
    start.current = null
    axis.current = null
    setDragging(false)
    setDrag(0)
  }

  const arrow =
    'absolute top-1/2 z-10 grid -translate-y-1/2 place-items-center border border-line bg-scrim/85 text-on-scrim backdrop-blur-sm transition-colors duration-200 hover:border-accent hover:text-accent'
  const arrowSize = compact ? 'h-7 w-7' : 'h-9 w-9'

  return (
    <div className={compact ? 'h-full' : 'mt-4'}>
      <div className={compact ? 'relative h-full' : 'relative'}>
        <div
          data-slider=""
          role="group"
          aria-roledescription={lang === 'fr' ? 'carrousel' : 'carousel'}
          aria-label={label}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={settle}
          onPointerCancel={settle}
          style={{ touchAction: 'pan-y' }}
          className={`relative overflow-hidden bg-bg-alt select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal ${
            compact ? 'h-full w-full cursor-grab' : 'aspect-[16/10] border border-line-soft cursor-grab'
          } ${dragging ? 'cursor-grabbing' : ''}`}
        >
          <div
            className="flex h-full"
            style={{
              transform: `translate3d(calc(${-index * 100}% + ${drag}px), 0, 0)`,
              transition:
                dragging || calm ? 'none' : 'transform 480ms cubic-bezier(0.22, 0.61, 0.36, 1)',
            }}
          >
            {slides.map((slide, i) => (
              <img
                key={slide.src}
                data-slide-index={i}
                src={slide.src}
                alt={slide.alt}
                loading={compact && i > 0 ? 'lazy' : 'eager'}
                draggable={false}
                className={`h-full w-full shrink-0 ${compact ? 'object-cover' : 'object-contain'}`}
              />
            ))}
          </div>
        </div>

        {count > 1 ? (
          <>
            <button type="button" data-slider-prev="" onClick={() => go(-1)} className={`${arrow} ${arrowSize} left-2`}>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M10 3 5 8l5 5" />
              </svg>
              <span className="sr-only">{t(galleryLabels.prev, lang)}</span>
            </button>
            <button type="button" data-slider-next="" onClick={() => go(1)} className={`${arrow} ${arrowSize} right-2`}>
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                aria-hidden="true"
              >
                <path d="M6 3l5 5-5 5" />
              </svg>
              <span className="sr-only">{t(galleryLabels.next, lang)}</span>
            </button>
          </>
        ) : null}

        {compact && count > 1 ? (
          <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-scrim/85 px-2 py-1 backdrop-blur-sm">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                data-slider-dot=""
                onClick={() => setIndex(i)}
                aria-label={`${label} — ${i + 1}/${count}`}
                aria-current={i === index ? 'true' : undefined}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
                  i === index ? 'bg-accent' : 'bg-on-scrim/60 hover:bg-on-scrim'
                }`}
              />
            ))}
          </div>
        ) : null}
      </div>

      {compact ? null : (
        <>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p
              className="mono text-[0.65rem] tracking-[0.12em] text-muted uppercase"
              aria-live="polite"
            >
              {t(ui.gallery, lang)} — {index + 1}/{count}
            </p>
            <p className="mono hidden text-[0.6rem] tracking-[0.12em] text-muted uppercase sm:block">
              {t(ui.gallerySwipe, lang)}
            </p>
          </div>
          {count > 1 ? (
            <div role="group" aria-label={label} className="mt-3 flex flex-wrap gap-2">
              {slides.map((slide, i) => (
                <button
                  key={slide.src}
                  type="button"
                  data-slider-thumb=""
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? 'true' : undefined}
                  aria-label={`${t(ui.gallery, lang)} ${i + 1}/${count}`}
                  className={`h-12 w-16 shrink-0 overflow-hidden border transition-colors duration-200 ${
                    i === index ? 'border-sable' : 'border-line hover:border-tan'
                  }`}
                >
                  <img src={slide.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

function Gallery({ project, lang }: { project: Project; lang: 'fr' | 'en' }) {
  if (project.images.length === 0) {
    return (
      <p className="mt-5 border border-line-soft p-4 text-[0.85rem] leading-relaxed text-muted">
        {t(ui.galleryEmpty, lang)}
      </p>
    )
  }
  const title = t(project.title, lang)
  return (
    <Slider
      lang={lang}
      label={`${t(ui.gallery, lang)} — ${title}`}
      slides={project.images.map((src, i) => ({
        src,
        alt: `${title} — ${i + 1}/${project.images.length}`,
      }))}
    />
  )
}

/* ------------------------------------------------------------------ */

export function Projects({ lang }: { lang: 'fr' | 'en' }) {
  const [filter, setFilter] = useState<Filter>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const open = projects.find((p) => p.id === openId)
  const visible = filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section
      id="projects"
      index="03"
      eyebrow={t(ui.sections.projects, lang)}
      heading={t(ui.sectionHeadings.projects, lang)}
      lead={t(ui.sectionLeads.projects, lang)}
      backdrop="wave"
    >
      <div role="group" aria-label={t(ui.sections.projects, lang)} className="flex flex-wrap gap-2">
        {FILTERS.map((key) => {
          const selected = filter === key
          return (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              aria-pressed={selected}
              className={`mono border px-3 py-1.5 text-[0.65rem] tracking-[0.12em] uppercase transition-all duration-200 ${
                selected
                  ? 'border-sable bg-sable text-brin'
                  : 'border-line text-muted hover:border-tan hover:text-sable'
              }`}
            >
              {t(projectCategories[key], lang)}
            </button>
          )
        })}
      </div>

      <ul key={filter} data-stagger data-stagger-step="80" className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((project) => (
          <li key={project.id} className="h-full">
            <Tilt>
              <article className="card group spot flex h-full flex-col" data-spot>
                {/* Technical plate: real media where it exists, the schematic
                    as the stand-in otherwise. Same box, same aspect ratio. */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line-soft bg-bg-alt">
                  {project.images.length > 0 ? (
                    <Slider
                      lang={lang}
                      compact
                      label={`${t(ui.gallery, lang)} — ${t(project.title, lang)}`}
                      slides={project.images.map((src, i) => ({
                        src,
                        alt: `${t(project.title, lang)} — ${i + 1}/${project.images.length}`,
                      }))}
                    />
                  ) : (
                    <div className="h-full w-full px-4 py-3">
                      <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                        <ProjectSchematic kind={project.schematic} />
                      </div>
                    </div>
                  )}
                  <span
                    className={`mono pointer-events-none absolute top-2 left-3 z-20 text-[0.55rem] tracking-[0.16em] uppercase ${
                      project.images.length > 0
                        ? 'border border-line-soft bg-scrim/85 px-1.5 py-0.5 text-on-scrim backdrop-blur-sm'
                        : 'text-muted'
                    }`}
                  >
                    {project.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="mono text-[0.6rem] tracking-[0.14em] text-accent-2-ink uppercase">
                      {t(projectCategories[project.category], lang)}
                    </p>
                    <p className="mono text-[0.6rem] tracking-[0.1em] text-muted uppercase">
                      {t(project.contextLabel, lang)}
                    </p>
                  </div>

                  <h3 className="mt-3 font-display text-lg leading-snug font-medium text-paper">
                    {t(project.title, lang)}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.9rem] leading-relaxed text-menthe/80">
                    {t(project.description, lang)}
                  </p>

                  {/* py rather than pt: the extra bottom padding grows the hit area
                      past the 24px WCAG 2.5.8 minimum without moving the visible text. */}
                  <button
                    type="button"
                    onClick={() => setOpenId(project.id)}
                    aria-haspopup="dialog"
                    className="mono mt-5 inline-flex items-center gap-2 self-start border-t border-transparent py-1.5 text-[0.65rem] tracking-[0.14em] text-muted uppercase transition-colors duration-200 group-hover:text-sable focus-visible:text-sable"
                  >
                    {t(ui.details, lang)}
                    <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M2 8h11M9 4l4 4-4 4" />
                    </svg>
                  </button>
                </div>
              </article>
            </Tilt>
          </li>
        ))}
      </ul>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpenId(null)}
        title={open ? t(open.title, lang) : ''}
        eyebrow={open ? `${t(projectCategories[open.category], lang)} · ${t(open.contextLabel, lang)}` : undefined}
        size="lg"
        closeLabel={t(ui.close, lang)}
      >
        {open ? (
          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div
                className="aspect-[16/10] border border-line-soft bg-bg-alt px-4 py-3"
                data-reveal="scale"
                style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
              >
                {/* Live: the drawing runs while the reader has the dialog open,
                    which is the one moment they are looking straight at it. */}
                <ProjectSchematic kind={open.schematic} live />
              </div>
              <Gallery project={open} lang={lang} />
            </div>

            <div>
              <p
                className="body-copy text-[0.975rem]"
                data-reveal="left"
                style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
              >
                {t(open.description, lang)}
              </p>
              <ul
                data-stagger
                data-stagger-step="70"
                className="mt-6 space-y-4 border-t border-line-soft pt-6"
              >
                {open.highlightsList.map((item) => (
                  <li key={item.en} className="flex gap-3.5">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-sable" />
                    <span className="body-copy text-[0.925rem] text-menthe/90">{t(item, lang)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}