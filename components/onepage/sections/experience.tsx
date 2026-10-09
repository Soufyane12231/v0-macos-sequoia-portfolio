'use client'

/**
 * C. Experience — four entries on a vertical timeline, each opening a dialog.
 *
 * Anti-redundancy note: no technology chips here. The tools a role used are
 * already named inside that role's own prose, and the canonical catalogue
 * lives in Compétences. Same reason there is no "en cours" badge: the
 * internship status is stated once, in the hero, and the period text already
 * ends in "présent".
 */

import { useState } from 'react'
import { experiences, t, ui } from '@/lib/portfolio-data'
import { Modal } from '../modal'
import { useInView } from '../motion'
import { LadderDiagram } from '../schematics'
import { Section } from '../section'

function PeriodTag({ text }: { text: string }) {
  return (
    <span className="mono shrink-0 border border-line px-2 py-1 text-[0.62rem] tracking-[0.1em] whitespace-nowrap text-accent-2-ink uppercase">
      {text}
    </span>
  )
}

export function Experience({ lang }: { lang: 'fr' | 'en' }) {
  const [openId, setOpenId] = useState<string | null>(null)
  const { ref, seen } = useInView<HTMLOListElement>(0.05)
  const open = experiences.find((e) => e.id === openId)

  return (
    <Section
      id="experience"
      index="02"
      eyebrow={t(ui.sections.experience, lang)}
      heading={t(ui.sectionHeadings.experience, lang)}
      lead={t(ui.sectionLeads.experience, lang)}
      backdrop="bus"
    >
      <ol
        ref={ref}
        data-stagger
        data-stagger-step="95"
        className={`relative ${seen ? 'rail-in' : ''}`}
      >
        {/* the timeline rail: drawn when the list enters the viewport */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-line"
          style={
            seen
              ? { background: 'linear-gradient(to bottom, var(--sable), var(--line) 70%, transparent)' }
              : undefined
          }
        />
        {experiences.map((item, index) => (
          <li key={item.id} className="relative pb-8 pl-10 last:pb-0">
            {/* node on the rail, with a one-shot ping as the list arrives */}
            <span
              aria-hidden="true"
              className={`ping absolute top-2 left-0 h-[15px] w-[15px] rounded-full border-2 ${seen ? '' : 'opacity-0'}`}
              style={
                {
                  '--ping': `${index * 180}ms`,
                  borderColor: seen ? 'var(--sable)' : 'var(--line)',
                  background: 'var(--brin)',
                  transition: 'border-color 420ms var(--ease-out-soft)',
                  transitionDelay: `${index * 90}ms`,
                } as React.CSSProperties
              }
            />
            <article className="card group spot" data-spot>
              <button
                type="button"
                onClick={() => setOpenId(item.id)}
                aria-haspopup="dialog"
                className="flex w-full flex-col gap-4 p-5 text-left sm:p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="font-display text-lg leading-snug font-medium text-paper sm:text-xl">
                      {t(item.role, lang)}
                    </h3>
                    <p className="mt-1.5 text-[0.95rem] text-sable">{t(item.company, lang)}</p>
                  </div>
                  <PeriodTag text={t(item.period, lang)} />
                </div>

                <p className="mono text-[0.65rem] tracking-[0.12em] text-muted uppercase">
                  {t(item.location, lang)}
                </p>

                <p className="body-copy max-w-[62ch] text-[0.925rem] text-menthe/85">{t(item.summary, lang)}</p>

                <span className="mono inline-flex items-center gap-2 self-start text-[0.65rem] tracking-[0.14em] text-muted uppercase transition-colors duration-200 group-hover:text-sable">
                  {t(ui.details, lang)}
                  <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M2 8h11M9 4l4 4-4 4" />
                  </svg>
                </span>
              </button>
            </article>
          </li>
        ))}
      </ol>

      <Modal
        open={Boolean(open)}
        onClose={() => setOpenId(null)}
        title={open ? t(open.role, lang) : ''}
        eyebrow={open ? `${t(open.company, lang)} · ${t(open.period, lang)}` : undefined}
        closeLabel={t(ui.close, lang)}
      >
        {open ? (
          <div>
            <p
              className="mono text-[0.65rem] tracking-[0.12em] text-muted uppercase"
              data-reveal="left"
              style={{ '--reveal-delay': '40ms' } as React.CSSProperties}
            >
              {t(open.location, lang)}
            </p>
            <p
              className="body-copy mt-5 text-[0.975rem]"
              data-reveal="left"
              style={{ '--reveal-delay': '110ms' } as React.CSSProperties}
            >
              {t(open.summary, lang)}
            </p>

            <ul
              data-stagger
              data-stagger-step="70"
              className="mt-6 space-y-4 border-t border-line-soft pt-6"
            >
              {open.bullets.map((bullet) => (
                <li key={bullet.en} className="flex gap-3.5">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-sable" />
                  <span className="body-copy text-[0.925rem] text-menthe/90">{t(bullet, lang)}</span>
                </li>
              ))}
            </ul>

            {open.schematic === 'ladder' ? (
              <div className="mt-8 border border-line-soft p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="mono text-[0.62rem] tracking-[0.14em] text-muted uppercase">
                    {t(ui.details, lang)}
                  </p>
                  <p className="mono text-[0.6rem] tracking-[0.1em] text-accent-2-ink uppercase">
                    TIA / PLC
                  </p>
                </div>
                {/* Static ladder diagram. The contacts animate on hover only. */}
                <div className="h-40 sm:h-48">
                  <LadderDiagram />
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </Modal>
    </Section>
  )
}