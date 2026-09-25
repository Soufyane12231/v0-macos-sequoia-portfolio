'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/portfolio/language-provider'
import {
  certifications,
  education,
  experiences,
  profile,
  projects,
  site,
  skillGroups,
  spokenLanguages,
  t,
} from '@/lib/portfolio-data'

type Tab = 'home' | 'experience' | 'projects' | 'skills' | 'contact'

export function MobileApp() {
  const { lang, toggleLang } = useLanguage()
  const [activeTab, setActiveTab] = useState<Tab>('home')

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'home', label: lang === 'fr' ? 'Profil' : 'Profile', icon: '👤' },
    { id: 'experience', label: lang === 'fr' ? 'Expérience' : 'Experience', icon: '💼' },
    { id: 'projects', label: lang === 'fr' ? 'Projets' : 'Projects', icon: '📁' },
    { id: 'skills', label: lang === 'fr' ? 'Compétences' : 'Skills', icon: '⚡' },
    { id: 'contact', label: lang === 'fr' ? 'Contact' : 'Contact', icon: '📬' },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#07070f] pb-20 text-[#e8e8f0]">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <span className="font-mono text-xs text-[#00f0ff]">SoufyaneOS 2.1</span>
        <button
          type="button"
          onClick={toggleLang}
          className="rounded border border-white/10 px-2 py-1 font-mono text-[10px] text-[#9aa0b5]"
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </header>

      <main className="flex-1 px-4 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
          >
            {activeTab === 'home' ? (
              <div>
                <h1 className="text-2xl font-semibold text-white">{site.name}</h1>
                <p className="mt-1 text-sm text-[#00f0ff]">{t(site.role, lang)}</p>
                <p className="text-xs text-[#9aa0b5]">{t(site.specialty, lang)}</p>

                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,255,136,0.25)] bg-[rgba(0,255,136,0.08)] px-3 py-1.5 text-[11px] text-[#6effbb]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88]" aria-hidden="true" />
                  {t(profile.status, lang)}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#c8ccdb]">{t(profile.summary, lang)}</p>

                <section className="mt-6" aria-labelledby="m-edu">
                  <h2 id="m-edu" className="mb-2 text-xs uppercase tracking-wider text-[#8b91a3]">
                    {lang === 'fr' ? 'Formation' : 'Education'}
                  </h2>
                  <ul className="space-y-2">
                    {education.map((item) => (
                      <li key={item.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                        <p className="text-sm font-medium text-white">{t(item.title, lang)}</p>
                        <p className="text-xs text-[#9aa0b5]">
                          {t(item.school, lang)} · {t(item.period, lang)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6" aria-labelledby="m-langs">
                  <h2 id="m-langs" className="mb-2 text-xs uppercase tracking-wider text-[#8b91a3]">
                    {lang === 'fr' ? 'Langues' : 'Languages'}
                  </h2>
                  <ul className="space-y-1.5">
                    {spokenLanguages.map((item) => (
                      <li key={item.name.en} className="flex justify-between text-sm">
                        <span>
                          {item.flag} {t(item.name, lang)}
                        </span>
                        <span className="text-xs text-[#9aa0b5]">{t(item.level, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <Link
                  href="/"
                  className="mt-6 block rounded-lg border border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.08)] px-4 py-3 text-center text-sm text-[#00f0ff]"
                >
                  {lang === 'fr' ? 'Version CV complète →' : 'Full printable CV →'}
                </Link>
              </div>
            ) : null}

            {activeTab === 'experience' ? (
              <ol className="space-y-3">
                {experiences.map((exp) => (
                  <li key={exp.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <p className="font-mono text-[11px]" style={{ color: exp.color }}>
                      {t(exp.period, lang)} {exp.current ? '●' : ''}
                    </p>
                    <h2 className="mt-1 text-sm font-semibold text-white">{t(exp.role, lang)}</h2>
                    <p className="text-xs" style={{ color: exp.color }}>
                      {t(exp.company, lang)}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[#8b91a3]">{t(exp.location, lang)}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#c8ccdb]">{t(exp.summary, lang)}</p>
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.map((bullet, index) => (
                        <li key={index} className="flex gap-2 text-xs leading-relaxed text-[#9aa0b5]">
                          <span className="text-[#00ff88]" aria-hidden="true">
                            ✓
                          </span>
                          <span>{t(bullet, lang)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {exp.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-[#8b91a6]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            ) : null}

            {activeTab === 'projects' ? (
              <div className="space-y-3">
                {projects.map((project) => (
                  <article key={project.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
                    <h2 className="text-sm font-semibold text-white">
                      <span className="mr-1.5" aria-hidden="true">
                        {project.icon}
                      </span>
                      {t(project.title, lang)}
                    </h2>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-[#8b91a3]">
                      {t(project.category, lang)}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#c8ccdb]">{t(project.description, lang)}</p>
                    <ul className="mt-2 space-y-1">
                      {project.highlightsList.map((item, index) => (
                        <li key={index} className="flex gap-2 text-xs text-[#9aa0b5]">
                          <span className="text-[#00f0ff]" aria-hidden="true">
                            →
                          </span>
                          <span>{t(item, lang)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-[#8b91a6]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            ) : null}

            {activeTab === 'skills' ? (
              <div className="space-y-4">
                {skillGroups.map((group) => (
                  <section key={group.id}>
                    <h2 className="mb-1.5 text-sm font-semibold text-[#00f0ff]">
                      <span className="mr-1.5" aria-hidden="true">
                        {group.icon}
                      </span>
                      {t(group.title, lang)}
                    </h2>
                    <ul className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-[#a8aec2]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}

                <section>
                  <h2 className="mb-1.5 text-sm font-semibold text-[#00f0ff]">
                    Certifications
                  </h2>
                  <ul className="space-y-1.5">
                    {certifications.map((cert) => (
                      <li key={cert.id} className="flex justify-between gap-2 text-xs text-[#c8ccdb]">
                        <span>{t(cert.title, lang)}</span>
                        <span className="shrink-0 font-mono text-[10px] text-[#8b91a3]">
                          {cert.issuer} · {cert.year}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : null}

            {activeTab === 'contact' ? (
              <div className="space-y-3">
                <p className="text-sm leading-relaxed text-[#c8ccdb]">{t(profile.availability, lang)}</p>

                <a
                  href={`mailto:${site.email}`}
                  className="block rounded-lg bg-[#00f0ff] px-4 py-3 text-center text-sm font-medium text-[#04121a]"
                >
                  {site.email}
                </a>
                <a
                  href={site.phoneHref}
                  className="block rounded-lg border border-white/10 px-4 py-3 text-center font-mono text-sm"
                >
                  {site.phone}
                </a>
                <a
                  href={site.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 px-4 py-3 text-center font-mono text-sm"
                >
                  {site.links.linkedinLabel}
                </a>
                <a
                  href={site.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg border border-white/10 px-4 py-3 text-center font-mono text-sm"
                >
                  github.com/Soufyane12231
                </a>
                <a
                  href={site.links.cv}
                  download
                  className="block rounded-lg border border-[rgba(0,240,255,0.25)] bg-[rgba(0,240,255,0.08)] px-4 py-3 text-center text-sm text-[#00f0ff]"
                >
                  {lang === 'fr' ? 'Télécharger le CV' : 'Download the CV'}
                </a>
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav
        aria-label={lang === 'fr' ? 'Navigation' : 'Navigation'}
        className="fixed bottom-0 left-0 right-0 flex border-t border-white/5 bg-[#0a0a12]/95 backdrop-blur-xl"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            aria-current={activeTab === tab.id ? 'page' : undefined}
            className={`flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] transition-colors ${
              activeTab === tab.id ? 'text-[#00f0ff]' : 'text-[#8b91a3]'
            }`}
          >
            <span className="text-base" aria-hidden="true">
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
