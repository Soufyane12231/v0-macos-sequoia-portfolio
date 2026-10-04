'use client'

/**
 * G. Contact — the only section that carries LinkedIn, GitHub, the email
 * address, the phone number and the site link.
 *
 * The "Télécharger le CV" button that used to close this section is gone: it
 * lives in the sticky header and nowhere else. The CV filename went with it,
 * because a filename printed under a button is the same information twice.
 *
 * The form does not submit anywhere: it composes a `mailto:` with a prefilled
 * subject and body, and the copy says so explicitly. No third-party service,
 * no endpoint, no tracking.
 */

import { useState } from 'react'
import { contact, site, t, ui } from '@/lib/portfolio-data'
import { Section } from '../section'

type Copied = 'email' | 'phone' | null

export function Contact({ lang }: { lang: 'fr' | 'en' }) {
  const [copied, setCopied] = useState<Copied>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const copy = async (kind: Exclude<Copied, null>, value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(kind)
      setToast(t(contact.copied, lang))
    } catch {
      setToast(t(contact.copyFailed, lang))
    }
    window.setTimeout(() => {
      setCopied(null)
      setToast(null)
    }, 1800)
  }

  return (
    <Section
      id="contact"
      index="06"
      eyebrow={t(ui.sections.contact, lang)}
      heading={t(ui.sectionHeadings.contact, lang)}
      lead={t(ui.sectionLeads.contact, lang)}
      backdrop="wave"
    >
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        {/* ---------------- links ---------------- */}
        <div>
          <p className="body-copy text-[1.02rem] text-sable">{t(contact.kicker, lang)}</p>

          <dl
            data-stagger
            data-stagger-step="70"
            className="mt-8 divide-y divide-line-soft border-y border-line-soft"
          >
            <ContactRow label={t(contact.links.email, lang)}>
              <a href={`mailto:${site.email}`} className="link-underline break-all">
                {site.email}
              </a>
              <CopyButton
                copied={copied === 'email'}
                onClick={() => copy('email', site.email)}
                label={t(contact.links.email, lang)}
                lang={lang}
              />
            </ContactRow>

            <ContactRow label={t(contact.links.phone, lang)}>
              <a href={site.phoneHref} className="link-underline">
                {site.phone}
              </a>
              <CopyButton
                copied={copied === 'phone'}
                onClick={() => copy('phone', site.phone)}
                label={t(contact.links.phone, lang)}
                lang={lang}
              />
            </ContactRow>

            <ContactRow label={t(contact.links.linkedin, lang)}>
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline break-all"
              >
                linkedin.com/in/soufyane-elaouni
              </a>
            </ContactRow>

            <ContactRow label={t(contact.links.github, lang)}>
              <a
                href={site.links.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline break-all"
              >
                github.com/Soufyane12231
              </a>
            </ContactRow>

            <ContactRow label={t(contact.links.site, lang)}>
              <a href={site.url} className="link-underline break-all">
                elaounisoufyane.space
              </a>
            </ContactRow>
          </dl>
        </div>

        {/* ---------------- mailto composer ---------------- */}
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            const data = new FormData(event.currentTarget)
            const name = String(data.get('name') ?? '').trim()
            const company = String(data.get('company') ?? '').trim()
            const subject = String(data.get('subject') ?? '').trim()
            const message = String(data.get('message') ?? '').trim()

            if (!name || !subject || !message) {
              setError(t(contact.form.invalid, lang))
              return
            }
            setError(null)

            const body = [
              `${t(contact.mailBody, lang)}${subject}`,
              '',
              message,
              '',
              `${name}${company ? ` — ${company}` : ''}`,
              t(contact.mailBodyTail, lang),
            ].join('\n')

            window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
              `${t(contact.mailSubject, lang)} — ${name}`,
            )}&body=${encodeURIComponent(body)}`
          }}
          className="card spot h-fit p-6 sm:p-8"
          data-spot
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="c-name" label={t(contact.form.name, lang)} required>
              <input
                id="c-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="input-line"
                placeholder={t(contact.form.required, lang)}
              />
            </Field>
            <Field id="c-company" label={t(contact.form.company, lang)}>
              <input
                id="c-company"
                name="company"
                type="text"
                autoComplete="organization"
                className="input-line"
                placeholder={t(contact.form.optional, lang)}
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="c-subject" label={t(contact.form.subject, lang)} required>
              <input
                id="c-subject"
                name="subject"
                type="text"
                required
                className="input-line"
                placeholder={
                  lang === 'fr'
                    ? 'Poste d’automatisme / systèmes embarqués'
                    : 'Automation / embedded systems role'
                }
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field id="c-message" label={t(contact.form.message, lang)} required>
              <textarea id="c-message" name="message" rows={5} required className="input-line resize-y" />
            </Field>
          </div>

          <button
            type="submit"
            className="brass mt-6 inline-flex w-full items-center justify-center gap-2.5 px-5 py-3.5 font-mono text-[0.72rem] tracking-[0.12em] text-brin uppercase transition-[filter] duration-200 hover:brightness-105 sm:w-auto"
          >
            {t(contact.form.send, lang)}
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M2 4h12v8H2z M2 4l6 5 6-5" />
            </svg>
          </button>

          <p className="mt-4 text-[0.8rem] leading-relaxed text-muted">{t(contact.form.hint, lang)}</p>
          <p aria-live="polite" className="mono mt-2 min-h-4 text-[0.65rem] tracking-[0.1em] text-signal uppercase">
            {error}
          </p>
        </form>
      </div>

      {/* Copy confirmation. Two of them on purpose: the live region below is
          what a screen reader announces, and the toast is what everyone else
          sees. The toast is aria-hidden, so nothing is announced twice. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed right-4 bottom-4 z-[70] border border-tan/60 bg-surface px-4 py-2.5 font-mono text-[0.68rem] tracking-[0.12em] text-sable uppercase shadow-lg shadow-brin-deep/60 ${
          toast ? 'toast-in opacity-100' : 'opacity-0'
        }`}
      >
        {toast}
      </div>
      <div aria-live="polite" role="status" className="sr-only">
        {toast}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function ContactRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="group flex flex-wrap items-center gap-x-4 gap-y-1 py-4">
      <dt className="mono flex w-full items-center gap-2 text-[0.6rem] tracking-[0.16em] text-muted uppercase transition-colors duration-200 group-hover:text-sable sm:w-24">
        {/* A tick that draws in from nothing: the row's hover cue. Empty and
            aria-hidden, so it adds nothing to the accessible name. */}
        <span aria-hidden="true" className="h-px w-0 shrink-0 bg-sable transition-[width] duration-300 group-hover:w-3" />
        {label}
      </dt>
      <dd className="flex min-w-0 flex-1 flex-wrap items-center gap-3 text-[0.95rem] text-menthe">{children}</dd>
    </div>
  )
}

function CopyButton({
  copied,
  onClick,
  label,
  lang,
}: {
  copied: boolean
  onClick: () => void
  label: string
  lang: 'fr' | 'en'
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mono shrink-0 border border-line px-2 py-1 text-[0.6rem] tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:border-tan hover:text-sable"
    >
      {copied ? t(contact.copied, lang) : t(contact.copy, lang)}
      <span className="sr-only">{label}</span>
    </button>
  )
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mono block text-[0.6rem] tracking-[0.16em] text-muted uppercase">
        {label}
        {required ? <span aria-hidden="true" className="ml-1 text-sable">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  )
}