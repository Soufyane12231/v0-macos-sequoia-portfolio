'use client'

/**
 * D. Projects — three cards, filterable by category, each opening a dialog
 * with the schematic and an optional gallery.
 *
 * Visual stand-in policy: a card carries its own schematic in a technical
 * frame. Dropping a real screenshot into `project.images` switches the frame
 * to a slideshow without touching layout or the dialog structure.
 */

import { useState } from 'react'
import { projectCategories, projects, t, ui } from '@/lib/portfolio-data'
import type { Project } from '@/lib/portfolio-data'
import { Modal } from '../modal'
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
/* Gallery inside the dialog                                           */
/* ------------------------------------------------------------------ */

function Gallery({ project, lang }: { project: Project; lang: 'fr' | 'en' }) {
  const [index, setIndex] = useState(0)
  if (project.images.length === 0) {
    return (
      <p className="mt-5 border border-line-soft p-4 text-[0.85rem] leading-relaxed text-muted">
        {t(ui.galleryEmpty, lang)}
      </p>
    )
  }
  const count = project.images.length
  const step = (delta: number) => setIndex((i) => (i + delta + count) % count)

  return (
    <div className="mt-6">
      <div className="relative aspect-[16/10] overflow-hidden border border-line-soft bg-brin-deep">
        <img
          src={project.images[index]}
          alt={`${project.id} — ${index + 1}/${count}`}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="mono text-[0.65rem] tracking-[0.12em] text-muted uppercase">
          {t(ui.gallery, lang)} — {index + 1}/{count}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="border border-line px-2.5 py-1 font-mono text-[0.65rem] text-muted transition-colors duration-200 hover:border-tan hover:text-sable"
          >
            <span aria-hidden="true">←</span>
            <span className="sr-only">{t(galleryLabels.prev, lang)}</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="border border-line px-2.5 py-1 font-mono text-[0.65rem] text-muted transition-colors duration-200 hover:border-tan hover:text-sable"
          >
            <span aria-hidden="true">→</span>
            <span className="sr-only">{t(galleryLabels.next, lang)}</span>
          </button>
        </div>
      </div>
    </div>
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
                {/* Technical plate: the stand-in for a project screenshot.
                    Same box, same aspect ratio, whether or not media exists. */}
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line-soft bg-brin-deep px-4 py-3">
                  <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]">
                    <ProjectSchematic kind={project.schematic} />
                  </div>
                  <span className="mono absolute top-2 left-3 text-[0.55rem] tracking-[0.16em] text-muted uppercase">
                    {project.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <p className="mono text-[0.6rem] tracking-[0.14em] text-tan uppercase">
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
                className="aspect-[16/10] border border-line-soft bg-brin-deep px-4 py-3"
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