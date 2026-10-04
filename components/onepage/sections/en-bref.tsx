'use client'

/**
 * B. "En bref" — the single high-contrast panel on the page, and the only
 * place the four figures (19 s, 9 ECU, 80+, 2) appear.
 *
 * Each figure owns a micro-schematic instead of a bare number:
 *   19 s -> the duel against the previous ~10 min
 *   9    -> an impulse walking nine nodes on a CAN line
 *   80+  -> a dot matrix filling up
 *   2    -> two milestones, drawn as a ladder
 *
 * Every figure is a real element in the HTML; the animation only decorates it.
 */

import { useEffect, useRef, useState } from 'react'
import { briefLabels, figures, t, ui } from '@/lib/portfolio-data'
import { useCountUp, useInView } from '../motion'
import { DuelChart, DotGrid, EcuBus, SectionBackdrop } from '../schematics'
import { Section } from '../section'

/* ------------------------------------------------------------------ */
/* 19 s vs 10 min                                                      */
/* ------------------------------------------------------------------ */

function Duel({ lang }: { lang: 'fr' | 'en' }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.4)
  const [playId, setPlayId] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Play once when the panel arrives, then let the reader replay it.
  useEffect(() => {
    if (!seen || playId !== 0) return
    setPlaying(true)
    timer.current = setTimeout(() => setPlaying(false), 1500)
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [seen, playId])

  const replay = () => {
    setPlaying(false)
    // Force the bar transition to restart from zero.
    setPlayId((n) => n + 1)
    requestAnimationFrame(() => setPlaying(true))
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setPlaying(false), 1500)
  }

  return (
    <div ref={ref}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-base font-medium text-brin">{t(briefLabels.duelTitle, lang)}</h3>
        <button
          type="button"
          onClick={replay}
          className="focus-sand mono shrink-0 border border-brin/25 px-2 py-1 text-[0.6rem] tracking-[0.14em] text-brin/70 uppercase transition-colors duration-200 hover:border-brin hover:text-brin"
        >
          {playing ? t(briefLabels.duelReplaying, lang) : t(briefLabels.duelReplay, lang)}
        </button>
      </div>

      <div className="mt-5">
        <DuelChart
          before={t(briefLabels.duelBefore, lang)}
          after={`${t(briefLabels.duelAfter, lang)} — ${t(briefLabels.duelAfterValue, lang)}`}
          playing={playing}
          playId={playId}
        />
      </div>

      <p className="mono mt-4 text-[0.62rem] tracking-[0.1em] text-brin/75 uppercase">
        {t(briefLabels.duelBefore, lang)} — {t(briefLabels.duelBeforeValue, lang)}
      </p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* A figure tile                                                        */
/* ------------------------------------------------------------------ */

function Figure({
  value,
  unit,
  label,
  children,
  delay = 0,
  id,
}: {
  value: number
  unit: string
  label: string
  children?: React.ReactNode
  delay?: number
  id: string
}) {
  const { ref, value: counted } = useCountUp(value)
  return (
    <article
      id={`figure-${id}`}
      data-reveal="scale"
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      data-spot
      className="card spot flex flex-col p-5 sm:p-6"
    >
      <p className="font-display text-[2.6rem] leading-none font-medium tracking-[-0.02em] text-brin">
        <span ref={ref}>{counted}</span>
        <span className="ml-1 text-[1.15rem] tracking-normal text-brin/70">{unit}</span>
      </p>
      <p className="mt-3 text-[0.9rem] leading-relaxed text-brin/80">{label}</p>
      {children ? <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(8,39,40,0.18)' }}>{children}</div> : null}
    </article>
  )
}

/* ------------------------------------------------------------------ */

export function EnBref({ lang }: { lang: 'fr' | 'en' }) {
  const { ref, seen } = useInView<HTMLDivElement>(0.1)
  const [mounted, setMounted] = useState(false)

  // The bus/dot animations start from their first frame rather than mid-way
  // through, which would look like a flash for a reader landing mid-page.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(frame)
  }, [])

  const running = seen && mounted
  const byId = Object.fromEntries(figures.map((f) => [f.id, f]))

  return (
    <Section
      id="en-bref"
      index="01"
      eyebrow={t(ui.sections.bref, lang)}
      heading={t(ui.sectionHeadings.bref, lang)}
      lead={t(ui.sectionLeads.bref, lang)}
      tone="sand"
    >
      <div ref={ref} className="grid gap-5 lg:grid-cols-2">
        <Figure
          id={byId.duration.id}
          value={byId.duration.value}
          unit={t(byId.duration.unit, lang)}
          label={t(byId.duration.label, lang)}
          delay={0}
        >
          <Duel lang={lang} />
        </Figure>

        <Figure
          id={byId.ecus.id}
          value={byId.ecus.value}
          unit={t(byId.ecus.unit, lang)}
          label={t(byId.ecus.label, lang)}
          delay={90}
        >
          <h3 className="font-display text-sm font-medium text-brin">{t(briefLabels.busTitle, lang)}</h3>
          <div className="mt-3">
            <EcuBus running={running} />
          </div>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-brin/65">{t(briefLabels.busCaption, lang)}</p>
        </Figure>

        <Figure
          id={byId.students.id}
          value={byId.students.value}
          unit={t(byId.students.unit, lang)}
          label={t(byId.students.label, lang)}
          delay={180}
        >
          <h3 className="font-display text-sm font-medium text-brin">{t(briefLabels.gridTitle, lang)}</h3>
          <div className="mt-3">
            <DotGrid running={running} />
          </div>
          <p className="mt-2 text-[0.8rem] leading-relaxed text-brin/65">{t(briefLabels.gridCaption, lang)}</p>
        </Figure>

        <Figure
          id={byId.stages.id}
          value={byId.stages.value}
          unit={t(byId.stages.unit, lang)}
          label={t(byId.stages.label, lang)}
          delay={270}
        >
          <h3 className="font-display text-sm font-medium text-brin">{t(briefLabels.milestonesTitle, lang)}</h3>
          <ol className="mt-4 space-y-3">
            {briefLabels.milestones.map((m, index) => (
              <li key={m.id} className="flex items-baseline gap-3" data-reveal="left" style={{ '--reveal-delay': `${340 + index * 110}ms` } as React.CSSProperties}>
                <span className="mono text-[0.6rem] tracking-[0.14em] text-brin/75">
                  {String(index + 1).padStart(2, '0')}{' '}
                </span>
                <span className="text-[0.9rem] text-brin/85">{t(m.label, lang)}</span>
                <span aria-hidden="true" className="h-px flex-1 translate-y-[-3px] bg-brin/15" />
                <span className="mono text-[0.65rem] tracking-[0.08em] whitespace-nowrap text-brin/75">{t(m.period, lang)}</span>
              </li>
            ))}
          </ol>
        </Figure>
      </div>
    </Section>
  )
}