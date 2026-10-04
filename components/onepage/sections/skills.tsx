'use client'

/**
 * E. Skills — six modules presented as a tab set, with cascade-in chips.
 *
 * This is the only place skill tags exist on the site. There are no levels,
 * percentages, stars or gauges: the CV does not state them, so they are not
 * here. Each group carries at most five tags.
 *
 * Keyboard: Left / Right move between modules, matching the WAI-ARIA tabs
 * pattern with automatic activation.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { skillGroups, t, ui } from '@/lib/portfolio-data'
import { useInView } from '../motion'
import { Section } from '../section'

/**
 * A sand rule that slides from one module to the next under the tab list.
 *
 * Measured rather than guessed: the tab list wraps to a column on wide
 * viewports and a row on narrow ones, so no hard-coded offset would be right
 * in both. `useLayoutEffect` measures before paint, which is what stops the
 * rule from being visible in the wrong place for a frame.
 */
function useTabMarker(
  listRef: React.RefObject<HTMLDivElement | null>,
  active: number,
) {
  const [marker, setMarker] = useState({ top: 0, left: 0, width: 0, height: 0, ready: false })

  const measure = useCallback(() => {
    const list = listRef.current
    const node = list?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[active]
    if (!list || !node) return
    setMarker({
      top: node.offsetTop,
      left: node.offsetLeft,
      width: node.offsetWidth,
      height: node.offsetHeight,
      ready: true,
    })
  }, [active, listRef])

  useLayoutEffect(measure, [measure])

  useEffect(() => {
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  return marker
}

export function Skills({ lang }: { lang: 'fr' | 'en' }) {
  const [active, setActive] = useState(0)
  const { ref } = useInView<HTMLDivElement>(0.15)
  const tabsRef = useRef<HTMLDivElement>(null)
  const marker = useTabMarker(tabsRef, active)

  const onKeyDown = (event: React.KeyboardEvent) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (delta === 0) return
    event.preventDefault()
    const next = (active + delta + skillGroups.length) % skillGroups.length
    setActive(next)
    const node = tabsRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]
    node?.focus()
  }

  return (
    <Section
      id="skills"
      index="04"
      eyebrow={t(ui.sections.skills, lang)}
      heading={t(ui.sectionHeadings.skills, lang)}
      lead={t(ui.sectionLeads.skills, lang)}
      backdrop="grid"
    >
      <div ref={ref} className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-10">
        <div className="relative">
          {/* The sliding rule. aria-hidden and pointer-events-none: it reports
              nothing the aria-selected state does not. It sits outside the
              tablist on purpose — as a child of [data-stagger] it would
              inherit that group's hidden-until-revealed transform and land
              14px off. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bg-sable/10"
            style={{
              top: marker.top,
              left: marker.left,
              width: marker.width,
              height: marker.height,
              opacity: marker.ready ? 1 : 0,
              transition:
                'transform 380ms var(--ease-out-soft), width 380ms var(--ease-out-soft), height 380ms var(--ease-out-soft), opacity 200ms linear',
            }}
          />
          <div
            ref={tabsRef}
            role="tablist"
            aria-label={t(ui.sections.skills, lang)}
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            data-stagger
            data-stagger-step="45"
            className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0 lg:border-l lg:border-line-soft"
          >
            {skillGroups.map((group, index) => {
              const selected = index === active
              return (
                <button
                  key={group.id}
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${group.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={`group flex items-center gap-3 px-3 py-3 text-left transition-colors duration-200 lg:w-full lg:py-3.5 ${
                    selected ? 'bg-surface text-paper' : 'text-muted hover:bg-surface/60 hover:text-menthe'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mono text-[0.6rem] tracking-[0.14em] transition-colors duration-200 ${
                      selected ? 'text-sable' : 'text-muted'
                    }`}
                  >
                    {group.index}{' '}
                  </span>
                  <span className="font-display text-[0.95rem] leading-snug font-medium">{t(group.title, lang)}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-auto hidden h-px w-4 origin-right transition-transform duration-300 lg:block ${
                      selected ? 'scale-x-100 bg-sable' : 'scale-x-0 bg-line group-hover:scale-x-100'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>

        {skillGroups.map((group, index) => (
          <div
            key={group.id}
            role="tabpanel"
            id={`panel-${group.id}`}
            aria-labelledby={`tab-${group.id}`}
            hidden={index !== active}
            tabIndex={0}
            className="card spot p-6 sm:p-8"
            data-spot
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-medium text-paper">{t(group.title, lang)}</h3>
              <span className="mono text-[0.6rem] tracking-[0.14em] text-muted uppercase">{group.index}</span>
            </div>
            <ul className="cascade mt-7 flex flex-wrap gap-2">
              {group.items.map((item, chipIndex) => (
                <li
                  key={item}
                  style={{ '--i': chipIndex } as React.CSSProperties}
                  className="border border-line bg-raised/40 px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.06em] text-menthe/90 transition-colors duration-200 hover:border-tan hover:text-sable"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}