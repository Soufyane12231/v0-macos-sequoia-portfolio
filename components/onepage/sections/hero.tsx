'use client'

/**
 * A. Hero.
 *
 * The only place on the site where the internship status appears.
 *
 * The "Télécharger le CV" button used to sit here as well as in the header and
 * again at the foot of Contact. Three copies of one action is a repetition,
 * not a call to action, so the header keeps the only visible one and this
 * section offers contact plus the keyboard route into the whole page.
 *
 * Portrait handling: the frame is sized and drawn like a technical plate, so
 * `photo.jpg` can land later as a pure asset swap. With no portrait present
 * the frame shows a monogram instead of an <img>, and the alt text lives in
 * the caption either way.
 */

import { useState } from 'react'
import { hero, site, t } from '@/lib/portfolio-data'
import { Magnetic } from '../motion'
import { PortraitFrame, SectionBackdrop } from '../schematics'

/** Letters of the name, each in its own mask. Total run stays under 1s. */
function RevealedName({ name }: { name: string }) {
  const letters = [...name]
  return (
    // The accessible name lives on the element and the per-letter spans are
    // hidden, so the heading is announced once and read once. A non-breaking
    // space keeps the word gap from collapsing between two inline-block masks.
    <h1
      aria-label={name}
      className="font-display text-[clamp(2.6rem,8.5vw,5.1rem)] leading-[0.98] font-medium tracking-[-0.03em] text-paper"
    >
      <span aria-hidden="true">
        {letters.map((char, index) => (
          <span className="ltr" key={`${char}-${index}`}>
            <span style={{ '--d': `${index * 40}ms` } as React.CSSProperties}>
              {char === ' ' ? ' ' : char}
            </span>
          </span>
        ))}
      </span>
    </h1>
  )
}

export function Hero({ lang, onOpenPalette }: { lang: 'fr' | 'en'; onOpenPalette: () => void }) {
  // No portrait has been dropped into /public yet; set this to
  // '/photo-soufyane.jpg' once the file exists and nothing else changes.
  const [photoSrc] = useState<string | undefined>(undefined)
  const photoAlt = t(hero.photoAlt, lang)

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative overflow-hidden">
      <SectionBackdrop variant="bus" seed={3} />
      {/* a single soft light source, top right, to give the petrol some depth */}
      <div
        aria-hidden="true"
        className="glow-orb pointer-events-none absolute -top-40 -right-32 h-[34rem] w-[34rem] rounded-full opacity-[0.5]"
        style={{ background: 'radial-gradient(circle, #0f4a4b 0%, transparent 68%)' }}
      />

      <div className="shell relative grid items-center gap-14 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-28">
        <div>
          {/* Plain scroll-reveal, not a "veil": the veil keyframes ended at
            visibility:hidden for forwards fill, which is correct for a curtain
            drawn over something beneath it but simply deletes its host when
            there is nothing beneath. This line is the only statement of the
            internship status on the site, so it has to stay visible. */}
          <p
            className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1"
            data-reveal="left"
            style={{ '--reveal-delay': '180ms' } as React.CSSProperties}
          >
            <span>{t(hero.eyebrow, lang)}</span>
            <span aria-hidden="true" className="opacity-50">
              —
            </span>
            <span className="text-tan">{t(hero.eyebrowPeriod, lang)}</span>
          </p>

          <div className="mt-7">
            <RevealedName name={site.name} />
          </div>

          <p className="mt-6 font-display text-lg leading-snug text-sable sm:text-xl">
            {t(site.role, lang)}
            <span aria-hidden="true" className="mx-2 opacity-40">
              ·
            </span>
            <span className="text-menthe">{t(site.specialty, lang)}</span>
          </p>
          <p className="mono mt-2 text-[0.7rem] tracking-[0.14em] text-muted uppercase">{site.school}</p>

          <p className="body-copy mt-7 max-w-[52ch] text-[0.975rem] sm:text-base" data-reveal="left" style={{ '--reveal-delay': '520ms' } as React.CSSProperties}>
            {t(hero.intro, lang)}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3" data-reveal="left" style={{ '--reveal-delay': '640ms' } as React.CSSProperties}>
            <Magnetic strength={6}>
              <a
                href="#contact"
                className="brass inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[0.72rem] tracking-[0.12em] text-brin uppercase transition-[filter] duration-200 hover:brightness-105"
              >
                {t(hero.ctaSecondary, lang)}
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </a>
            </Magnetic>
            <Magnetic strength={4}>
              <button
                type="button"
                onClick={onOpenPalette}
                className="inline-flex items-center gap-2.5 border border-line px-5 py-3 font-mono text-[0.72rem] tracking-[0.12em] text-menthe uppercase transition-colors duration-200 hover:border-tan hover:text-sable"
              >
                {t(hero.ctaNav, lang)}
                <kbd className="border border-line px-1.5 py-0.5 text-[0.62rem] tracking-[0.06em] text-tan">Ctrl K</kbd>
              </button>
            </Magnetic>
          </div>
        </div>

        <div data-reveal="scale" style={{ '--reveal-delay': '240ms' } as React.CSSProperties}>
          <PortraitFrame
            src={photoSrc}
            alt={photoAlt}
            badge={
              <p className="mono text-[0.6rem] leading-relaxed tracking-[0.12em] text-sable uppercase">
                {t(hero.badge, lang)}
              </p>
            }
          />
        </div>
      </div>

      {/* Scroll affordance. A hairline with one dot travelling down it, a few
          passes then it stops; it carries no information, so it is hidden from
          assistive technology and reduced-motion readers get a plain line. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-2">
        <span className="mono text-[0.58rem] tracking-[0.22em] text-muted uppercase">{t(hero.scrollHint, lang)}</span>
        <span className="relative h-8 w-px overflow-hidden bg-line">
          <span className="scroll-hint__dot absolute top-0 left-0 h-2 w-px bg-sable" />
        </span>
      </div>
    </section>
  )
}