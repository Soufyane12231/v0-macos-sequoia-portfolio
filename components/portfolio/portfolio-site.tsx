'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  Check,
  Copy,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Languages as LanguagesIcon,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Terminal,
  X,
} from 'lucide-react'
import {
  actionLabels,
  certifications,
  education,
  experiences,
  highlights,
  navLabels,
  profile,
  projects,
  sectionTitles,
  site,
  skillGroups,
  spokenLanguages,
  t,
} from '@/lib/portfolio-data'
import { useLanguage } from './language-provider'

function SectionHeading({
  id,
  eyebrow,
  title,
  subtitle,
}: {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
}) {
  return (
    <header className="mb-10 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#00f0ff]">{eyebrow}</p>
      <h2 id={id} className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-[#9aa0b5]">{subtitle}</p> : null}
    </header>
  )
}

function Chip({ children, tone = 'cyan' }: { children: React.ReactNode; tone?: 'cyan' | 'green' | 'violet' }) {
  const tones = {
    cyan: 'border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.08)] text-[#7ef0ff]',
    green: 'border-[rgba(0,255,136,0.25)] bg-[rgba(0,255,136,0.08)] text-[#6effbb]',
    violet: 'border-[rgba(123,47,255,0.35)] bg-[rgba(123,47,255,0.12)] text-[#c3a6ff]',
  } as const
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px] ${tones[tone]}`}>
      {children}
    </span>
  )
}

function ActionButton({
  href,
  children,
  variant = 'primary',
  download,
  external,
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  download?: boolean
  external?: boolean
}) {
  const base =
    'inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]'
  const variants = {
    primary: 'bg-[#00f0ff] text-[#04121a] hover:bg-[#5ff6ff] shadow-[0_0_24px_rgba(0,240,255,0.25)]',
    secondary:
      'border border-white/15 bg-white/[0.03] text-[#e8e8f0] hover:border-[rgba(0,240,255,0.4)] hover:bg-[rgba(0,240,255,0.07)]',
    ghost: 'text-[#9aa0b5] hover:text-[#00f0ff]',
  } as const
  const isExternal = external || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')

  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]}`}
      {...(download ? { download: true } : {})}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </Link>
  )
}

function Section({
  id,
  children,
  className = '',
}: {
  id: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-white/5 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

export function PortfolioSite() {
  const { lang, toggleLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const copy = useCallback(async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1800)
    } catch {
      /* clipboard blocked — the value stays visible and selectable */
    }
  }, [])

  useEffect(() => {
    document.title =
      lang === 'fr'
        ? 'Soufyane Elaouni — Élève ingénieur en Mécatronique | Automatisme industriel & Systèmes embarqués'
        : 'Soufyane Elaouni — Mechatronics Engineering Student | Industrial Automation & Embedded Systems'
  }, [lang])

  const navItems = [
    { href: '#profil', label: navLabels.profile[lang] },
    { href: '#experience', label: navLabels.experience[lang] },
    { href: '#projets', label: navLabels.projects[lang] },
    { href: '#competences', label: navLabels.skills[lang] },
    { href: '#contact', label: navLabels.contact[lang] },
  ]

  return (
    <div className="min-h-screen bg-[#07070f] text-[#e8e8f0]">
      <a href="#contenu" className="skip-link">
        {actionLabels.skipToContent[lang]}
      </a>

      {/* ───────────────────────── Header ───────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#07070f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00f0ff]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00f0ff]/10 font-mono text-xs font-bold text-[#00f0ff] ring-1 ring-[#00f0ff]/30">
              SE
            </span>
            <span className="font-mono text-sm tracking-tight text-white">
              {site.system}
              <span className="ml-2 hidden text-[#8b91a3] sm:inline">// portfolio</span>
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-[#9aa0b5] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
              className="rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-xs text-[#9aa0b5] transition-colors hover:border-[rgba(0,240,255,0.4)] hover:text-[#00f0ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hidden rounded-md border border-white/10 p-2 text-[#9aa0b5] transition-colors hover:border-[rgba(0,240,255,0.4)] hover:text-[#00f0ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff] sm:block"
            >
              <Github className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="hidden rounded-lg bg-[#00f0ff] px-3.5 py-2 text-sm font-medium text-[#04121a] transition-colors hover:bg-[#5ff6ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff] sm:block"
            >
              {navLabels.contact[lang]}
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={actionLabels.menu[lang]}
              className="rounded-md border border-white/10 p-2 text-[#9aa0b5] md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav id="mobile-nav" aria-label="Navigation mobile" className="border-t border-white/5 bg-[#07070f] px-5 py-3 md:hidden">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-[#c8ccdb] hover:bg-white/5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </header>

      {/* tabIndex -1 so the "skip to content" link can actually move focus here. */}
      <main id="contenu" tabIndex={-1}>
        {/* ───────────────────────── Hero ───────────────────────── */}
        <section id="profil" className="relative scroll-mt-24 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 os-grid opacity-60" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[#00f0ff]/10 blur-[120px]"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid w-full max-w-5xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,255,136,0.25)] bg-[rgba(0,255,136,0.08)] px-3 py-1.5 font-mono text-xs text-[#6effbb]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88]" aria-hidden="true" />
                {t(profile.status, lang)}
              </p>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
                {site.name}
              </h1>
              <p className="mt-3 text-lg text-[#00f0ff] sm:text-xl">{t(site.role, lang)}</p>
              <p className="mt-1 text-base text-[#9aa0b5]">{t(site.specialty, lang)}</p>

              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#c8ccdb]">{t(profile.summary, lang)}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <ActionButton href={site.links.cv} download>
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {actionLabels.downloadCv[lang]}
                </ActionButton>
                <ActionButton href="#contact" variant="secondary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {actionLabels.contactMe[lang]}
                </ActionButton>
                <ActionButton href={site.links.os} variant="secondary">
                  <Terminal className="h-4 w-4" aria-hidden="true" />
                  {actionLabels.openOs[lang]}
                </ActionButton>
              </div>
              <p className="mt-2 text-xs text-[#8b91a3]">{actionLabels.openOsHint[lang]}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#9aa0b5]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#00f0ff]" aria-hidden="true" />
                  {t(site.location, lang)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-[#00f0ff]" aria-hidden="true" />
                  {site.school}
                </span>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-6 items-center gap-1.5 transition-colors hover:text-[#00f0ff]"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-6 items-center gap-1.5 transition-colors hover:text-[#00f0ff]"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Profile card */}
            <div className="relative mx-auto w-full max-w-sm">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b16]/80 shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-1.5 border-b border-white/5 bg-white/[0.02] px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden="true" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden="true" />
                  <span className="ml-2 font-mono text-[11px] text-[#8b91a3]">whoami</span>
                </div>
                <div className="px-6 py-7 text-center">
                  <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-2 border-[#00f0ff]/60 shadow-[0_0_30px_rgba(0,240,255,0.25)]">
                    <Image
                      src="/profile.jpeg"
                      alt={`${site.name}, ${t(site.role, lang)}`}
                      width={224}
                      height={224}
                      className="h-full w-full object-cover"
                      priority
                    />
                  </div>
                  <p className="mt-5 text-lg font-semibold text-white">{site.name}</p>
                  <p className="text-sm text-[#9aa0b5]">{t(site.role, lang)}</p>
                  <p className="mt-1 text-xs text-[#8b91a3]">
                    {site.school} · {t(site.location, lang)}
                  </p>

                  <div className="mt-6 space-y-2 border-t border-white/5 pt-5 text-left font-mono text-[11px] leading-relaxed text-[#7f869c]">
                    <p className="text-[#00ff88]">
                      soufyane@SoufyaneOS:~$ <span className="text-[#e8e8f0]">cat profile.txt</span>
                    </p>
                    <p>
                      role: {t(site.role, lang)}
                      <br />
                      focus: {t(profile.headline, lang)}
                      <br />
                      stack: TIA Portal · WinCC · CAN/UDS · ESP32 · STM32
                      <br />
                      status: {t(profile.status, lang)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─────────────────────── Highlights ─────────────────────── */}
        <Section id="en-bref">
          <SectionHeading
            id="en-bref-titre"
            eyebrow="$ ls --highlights"
            title={sectionTitles.highlights[lang]}
          />
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item.value}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[rgba(0,240,255,0.3)]"
              >
                <dt className="sr-only">{t(item.label, lang)}</dt>
                <dd>
                  <span className="block font-mono text-2xl font-semibold text-[#00f0ff]">{item.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-[#9aa0b5]">{t(item.label, lang)}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-sm text-[#8b91a3]">{t(profile.availability, lang)}</p>
        </Section>

        {/* ─────────────────────── Experience ─────────────────────── */}
        <Section id="experience">
          <SectionHeading
            id="experience-titre"
            eyebrow="$ cat experience.log"
            title={sectionTitles.experience[lang]}
            subtitle={
              lang === 'fr'
                ? "Stage en cours chez Renault Technology Morocco et stage d'automatisme industriel chez Holcim Maroc."
                : 'Current internship at Renault Technology Morocco and industrial automation internship at Holcim Maroc.'
            }
          />
          <ol className="relative space-y-6 border-l border-white/10 pl-6">
            {experiences.map((exp) => (
              <li key={exp.id} className="relative">
                <span
                  className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full ring-4 ring-[#07070f]"
                  style={{ backgroundColor: exp.color }}
                  aria-hidden="true"
                />
                <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-white/20">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-semibold text-white">{t(exp.role, lang)}</h3>
                    {exp.current ? <Chip tone="green">{lang === 'fr' ? 'En cours' : 'Ongoing'}</Chip> : null}
                  </div>
                  <p className="mt-1 text-sm font-medium" style={{ color: exp.color }}>
                    {t(exp.company, lang)}
                  </p>
                  <p className="mt-1 font-mono text-xs text-[#8b91a3]">
                    {t(exp.location, lang)} · {t(exp.period, lang)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#c8ccdb]">{t(exp.summary, lang)}</p>
                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-[#9aa0b5]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00ff88]" aria-hidden="true" />
                        <span>{t(bullet, lang)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#8b91a6]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </Section>

        {/* ───────────────────────── Projects ───────────────────────── */}
        <Section id="projets">
          <SectionHeading
            id="projets-titre"
            eyebrow="$ ls ~/projects"
            title={sectionTitles.projects[lang]}
            subtitle={
              lang === 'fr'
                ? "Projets d'ingénierie menés en stage et en école, en Lean Software Engineering et Model-Based Design."
                : 'Engineering projects delivered during internships and at school, in Lean Software Engineering and Model-Based Design.'
            }
          />
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <article
                key={project.id}
                className="flex flex-col rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-[rgba(0,240,255,0.3)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold text-white">
                    <span className="mr-2" aria-hidden="true">
                      {project.icon}
                    </span>
                    {t(project.title, lang)}
                  </h3>
                  <Chip tone={project.context === 'work' ? 'violet' : 'cyan'}>
                    {project.context === 'work'
                      ? lang === 'fr'
                        ? 'Stage'
                        : 'Internship'
                      : lang === 'fr'
                        ? 'École'
                        : 'School'}
                  </Chip>
                </div>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#8b91a3]">
                  {t(project.category, lang)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#c8ccdb]">{t(project.description, lang)}</p>
                <ul className="mt-4 space-y-1.5">
                  {project.highlightsList.map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-[#9aa0b5]">
                      <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00f0ff]" aria-hidden="true" />
                      <span>{t(item, lang)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#8b91a6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* ───────────────────────── Skills ───────────────────────── */}
        <Section id="competences">
          <SectionHeading
            id="competences-titre"
            eyebrow="$ cat skills.json"
            title={sectionTitles.skills[lang]}
            subtitle={
              lang === 'fr'
                ? 'Technologies utilisées en cours, en laboratoire et en entreprise.'
                : 'Technologies used in coursework, in the lab and on industrial sites.'
            }
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span aria-hidden="true">{group.icon}</span>
                  {t(group.title, lang)}
                </h3>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#a8aec2]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* ─────────────────── Education & credentials ─────────────────── */}
        <Section id="formation">
          <SectionHeading
            id="formation-titre"
            eyebrow="$ cat education.log"
            title={sectionTitles.education[lang]}
          />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <ol className="space-y-4">
              {education.map((item) => (
                <li key={item.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white">{t(item.title, lang)}</h3>
                    <span className="font-mono text-xs text-[#00f0ff]">{t(item.period, lang)}</span>
                  </div>
                  <p className="mt-1 text-sm text-[#9aa0b5]">{t(item.school, lang)}</p>
                </li>
              ))}
            </ol>

            <div className="space-y-6">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Award className="h-4 w-4 text-[#00f0ff]" aria-hidden="true" />
                  {sectionTitles.certifications[lang].split(' & ')[0]}
                </h3>
                <ul className="mt-3 space-y-2">
                  {certifications.map((cert) => (
                    <li
                      key={cert.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5"
                    >
                      <span className="text-sm text-[#c8ccdb]">{t(cert.title, lang)}</span>
                      <span className="shrink-0 font-mono text-[11px]" style={{ color: cert.color }}>
                        {cert.issuer} · {cert.year}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <LanguagesIcon className="h-4 w-4 text-[#00f0ff]" aria-hidden="true" />
                  {sectionTitles.certifications[lang].split(' & ')[1]}
                </h3>
                <ul className="mt-3 space-y-2">
                  {spokenLanguages.map((item) => (
                    <li
                      key={item.name.en}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5 text-sm"
                    >
                      <span className="text-[#c8ccdb]">
                        <span className="mr-2" aria-hidden="true">
                          {item.flag}
                        </span>
                        {t(item.name, lang)}
                      </span>
                      <span className="text-xs text-[#8b91a3]">{t(item.level, lang)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ───────────────────────── Contact ───────────────────────── */}
        <Section id="contact">
          <SectionHeading
            id="contact-titre"
            eyebrow="$ ./contact.sh"
            title={sectionTitles.contact[lang]}
            subtitle={
              lang === 'fr'
                ? 'Ouvert aux opportunités en automatisme industriel, systèmes embarqués et diagnostic automobile.'
                : 'Open to opportunities in industrial automation, embedded systems and automotive diagnostics.'
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { key: 'email', icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
              { key: 'phone', icon: Phone, label: 'Téléphone', value: site.phone, href: site.phoneHref },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4"
              >
                <a
                  href={item.href}
                  className="flex min-w-0 items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-[#00f0ff]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider text-[#8b91a3]">{item.label}</span>
                    <span className="block truncate font-mono text-sm text-[#e8e8f0]">{item.value}</span>
                  </span>
                </a>
                <button
                  type="button"
                  onClick={() => copy(item.value, item.key)}
                  className="shrink-0 rounded-md border border-white/10 p-2 text-[#9aa0b5] transition-colors hover:border-[rgba(0,240,255,0.4)] hover:text-[#00f0ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
                  aria-label={`${actionLabels.copy[lang]} ${item.label}`}
                >
                  {copied === item.key ? (
                    <Check className="h-4 w-4 text-[#00ff88]" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            ))}

            {[
              { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', value: site.links.linkedinLabel, href: site.links.linkedin },
              { key: 'github', icon: Github, label: 'GitHub', value: 'github.com/Soufyane12231', href: site.links.github },
            ].map((item) => (
              <a
                key={item.key}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-[rgba(0,240,255,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f0ff]"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <item.icon className="h-4 w-4 shrink-0 text-[#00f0ff]" aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wider text-[#8b91a3]">{item.label}</span>
                    <span className="block truncate font-mono text-sm text-[#e8e8f0]">{item.value}</span>
                  </span>
                </span>
                <ExternalLink className="h-4 w-4 shrink-0 text-[#8b91a3]" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ActionButton href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              {site.email}
            </ActionButton>
            <ActionButton href={site.links.cv} variant="secondary" download>
              <Download className="h-4 w-4" aria-hidden="true" />
              {actionLabels.downloadCv[lang]}
            </ActionButton>
          </div>
        </Section>
      </main>

      {/* ───────────────────────── Footer ───────────────────────── */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-sm text-white">
              {site.system} <span className="text-[#8b91a3]">v2.1</span>
            </p>
            <p className="mt-1 text-sm text-[#8b91a3]">
              © {new Date().getFullYear()} {site.name} — {t(site.specialty, lang)}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={site.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center text-[#9aa0b5] hover:text-[#00f0ff]">
              GitHub
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center text-[#9aa0b5] hover:text-[#00f0ff]">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-6 items-center text-[#9aa0b5] hover:text-[#00f0ff]">
              Email
            </a>
            <Link href={site.links.os} className="inline-flex min-h-6 items-center gap-1.5 text-[#9aa0b5] hover:text-[#00f0ff]">
              <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
              {actionLabels.openOs[lang]}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
