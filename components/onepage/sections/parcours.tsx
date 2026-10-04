'use client'

/**
 * F. Education, certifications, languages — three sober columns.
 *
 * Text only, deliberately: no badges, no progress rings, no course cards.
 * A certification stamp draws itself on entry as a small reward for reading;
 * the facts are the ISO dates next to it.
 */

import { certifications, education, spokenLanguages, t, ui } from '@/lib/portfolio-data'
import { CertStamp } from '../schematics'
import { Section } from '../section'

function Column({
  title,
  index,
  children,
}: {
  title: string
  index: string
  children: React.ReactNode
}) {
  return (
    <div data-reveal="left" className="min-w-0">
      {/* The index carries a trailing space on purpose: whitespace inside a flex
          container makes no visual box, but it stops a crawler reading the
          heading as "01Formation". */}
      <h3 className="mono flex items-center gap-3 text-[0.65rem] tracking-[0.18em] text-tan uppercase">
        <span className="index-mark">{index} </span>
        <span aria-hidden="true" className="inline-block h-px w-6 bg-current opacity-50" />
        <span>{title}</span>
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  )
}

export function Parcours({ lang }: { lang: 'fr' | 'en' }) {
  return (
    <Section
      id="parcours"
      index="05"
      eyebrow={t(ui.sections.parcours, lang)}
      heading={t(ui.sectionHeadings.parcours, lang)}
      lead={t(ui.sectionLeads.parcours, lang)}
      backdrop="bus"
    >
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
        <Column index="01" title={t(ui.sections.parcours, lang)}>
          <ol data-stagger data-stagger-step="95" className="space-y-6">
            {education.map((item) => (
              <li key={item.id} className="group border-l border-line pl-5 transition-colors duration-300 hover:border-tan">
                <p className="mono text-[0.62rem] tracking-[0.12em] text-sable">{t(item.period, lang)}</p>
                <p className="mt-1.5 font-display text-[0.95rem] leading-snug font-medium text-paper">
                  {t(item.title, lang)}
                </p>
                <p className="mt-1 text-[0.85rem] text-muted">{t(item.school, lang)}</p>
              </li>
            ))}
          </ol>
        </Column>

        <Column index="02" title={t(ui.sections.certifications, lang)}>
          <ul data-stagger data-stagger-step="110" className="space-y-5">
            {certifications.map((cert) => (
              <li key={cert.id} className="group flex items-center gap-4">
                <CertStamp year={cert.year} />
                <div className="min-w-0">
                  <p className="text-[0.95rem] leading-snug font-medium text-paper transition-colors duration-200 group-hover:text-sable">
                    {t(cert.title, lang)}
                  </p>
                  <p className="mono mt-1 text-[0.62rem] tracking-[0.12em] text-muted uppercase">
                    {cert.issuer}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Column>

        <Column index="03" title={t(ui.sections.languages, lang)}>
          <ul data-stagger data-stagger-step="80" className="space-y-4">
            {spokenLanguages.map((language) => (
              <li
                key={language.id}
                className="group flex items-center justify-between gap-4 border-b border-line-soft pb-3 transition-colors duration-300 hover:border-tan"
              >
                <span className="font-display text-[0.95rem] text-paper">{t(language.name, lang)}</span>
                <span className="mono text-[0.65rem] tracking-[0.1em] text-tan uppercase">
                  {t(language.level, lang)}
                </span>
              </li>
            ))}
          </ul>
        </Column>
      </div>
    </Section>
  )
}