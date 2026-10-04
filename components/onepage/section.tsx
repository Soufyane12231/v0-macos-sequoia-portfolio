'use client'

/**
 * Section shell. Every section gets the same substrate: an index in mono, a
 * sand eyebrow, a real <h2>, a lead sentence, and a decorative technical
 * backdrop that never sits behind body text at readable contrast.
 */

import { SectionBackdrop } from './schematics'

export function Section({
  id,
  index,
  eyebrow,
  heading,
  lead,
  backdrop = 'grid',
  tone = 'dark',
  children,
  className,
}: {
  id: string
  /** Two-digit engineering index, e.g. "02". */
  index: string
  eyebrow: string
  heading: string
  lead?: string
  backdrop?: 'bus' | 'wave' | 'grid'
  /** "sand" renders the single high-contrast panel of the page. */
  tone?: 'dark' | 'sand'
  children: React.ReactNode
  className?: string
}) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative scroll-mt-24 border-t border-line-soft ${tone === 'sand' ? 'on-sand' : ''} ${className ?? ''}`}
    >
      {tone === 'dark' ? (
        <SectionBackdrop variant={backdrop} seed={Number(index) || 1} />
      ) : null}
      {tone === 'sand' ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(8,39,40,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,39,40,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      ) : null}

      <div className="shell relative py-20 sm:py-28">
        {/* Three different entrances for the three header lines, so a
            seven-section page does not repeat one gesture everywhere. All of
            them are decoration on text that is already in the markup: under
            reduced motion none of the hiding rules apply and the header is
            simply there. */}
        {/* The three header lines reveal as one stack driven by a single observed
            element. The heading's clip is deliberately not on this element:
            Chrome folds an element's own clip-path into its
            IntersectionObserver intersection rect, so a clipped target measures
            zero intersection and would never be revealed at all. */}
        <header className="max-w-3xl" data-reveal="stack">
          <p className="eyebrow flex items-center gap-3">
            {/* The trailing space is load-bearing: whitespace-only text inside
                a flex container produces no box, so it costs nothing visually,
                but it keeps a crawler that reads raw text from seeing
                "01En bref" instead of "01 En bref". */}
            <span className="index-mark">{index} </span>
            <span aria-hidden="true" className="inline-block h-px w-8 bg-current opacity-50" />
            <span>{eyebrow}</span>
          </p>
          <h2 id={headingId} className="h-section mt-5 text-paper">
            {heading}
          </h2>
          {lead ? <p className="lead mt-5">{lead}</p> : null}
        </header>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  )
}