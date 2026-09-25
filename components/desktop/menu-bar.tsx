'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDesktopStore, type WindowId } from '@/lib/desktop-store'
import { useLanguage } from '@/components/portfolio/language-provider'
import { profile, site } from '@/lib/portfolio-data'

interface MenuEntry {
  label: string
  shortcut?: string
  action?: () => void
  separator?: boolean
  href?: string
  danger?: boolean
}

export function MenuBar() {
  const { lang } = useLanguage()
  const fr = lang === 'fr'
  const [time, setTime] = useState(new Date())
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { activeWindowId, windowsMap, openWindow, closeWindow, setShowSpotlight, addNotification } = useDesktopStore()

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })

  const activeWindowTitle = activeWindowId ? windowsMap[activeWindowId]?.title : null

  const open = (id: WindowId) => () => {
    setActiveMenu(null)
    openWindow(id)
  }

  const menus: Record<string, MenuEntry[]> = {
    profile: [
      { label: fr ? 'whoami — À propos' : 'whoami — About', action: open('about') },
      {
        label: fr ? 'experience.log — Expérience' : 'experience.log — Experience',
        action: open('experience'),
      },
      { label: fr ? 'skills.json — Compétences' : 'skills.json — Skills', action: open('skills') },
      { separator: true, label: 'sep' },
      { label: fr ? 'Fermer la fenêtre active' : 'Close active window', shortcut: '⌘W', action: () => {
        setActiveMenu(null)
        if (activeWindowId) closeWindow(activeWindowId)
      } },
    ],
    projects: [
      { label: fr ? '~/projects — Projets' : '~/projects — Projects', action: open('projects') },
      {
        label: fr ? 'certificates/ — Certifications' : 'certificates/ — Certificates',
        action: open('certificates'),
      },
      { label: fr ? 'contact.sh — Contact' : 'contact.sh — Contact', action: open('contact') },
    ],
    view: [
      { label: fr ? 'Recherche (Spotlight)' : 'Search (Spotlight)', shortcut: '⌘K', action: () => { setActiveMenu(null); setShowSpotlight(true) } },
      { separator: true, label: 'sep' },
      { label: fr ? 'Version CV (page complète)' : 'Printable CV (home page)', action: () => { setActiveMenu(null); window.location.href = '/' } },
    ],
    help: [
      { label: fr ? 'Code source du portfolio' : 'Portfolio source code', href: site.links.githubRepo },
      { label: 'GitHub', href: site.links.github },
      { label: 'LinkedIn', href: site.links.linkedin },
      { label: fr ? 'Envoyer un email' : 'Send an email', href: `mailto:${site.email}` },
    ],
  }

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[110] flex h-7 items-center justify-between border-b border-[rgba(0,240,255,0.08)] bg-[rgba(13,13,26,0.85)] px-4 text-sm backdrop-blur-xl"
      onClick={() => {
        setActiveMenu(null)
        setShowUserMenu(false)
      }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={fr ? 'Menu SoufyaneOS' : 'SoufyaneOS menu'}
          className="flex h-6 min-w-6 items-center justify-center rounded px-1 transition-colors hover:bg-white/10"
          onClick={(event) => {
            event.stopPropagation()
            setActiveMenu(activeMenu === 'logo' ? null : 'logo')
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#00f0ff]" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="4" fill="currentColor" />
          </svg>
        </button>

        <AnimatePresence>
          {activeMenu === 'logo' ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="absolute left-2 top-7 min-w-[240px] rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] py-2 shadow-xl backdrop-blur-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="px-3 py-1 text-xs text-[#8888aa]">SoufyaneOS v2.1</div>
              <div className="px-3 py-1 text-xs text-[#8b91a3]">Next.js 16 · React 19 · Tailwind CSS 4</div>
              <div className="px-3 py-1 text-xs text-[#8b91a3]">
                {fr ? 'Version interactive — la version CV est sur /' : 'Interactive version — the CV version is at /'}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <span className="font-semibold text-[#e8e8f0]">SoufyaneOS</span>
        {activeWindowTitle ? <span className="text-[#8888aa]">{activeWindowTitle}</span> : null}

        <div className="ml-2 hidden items-center gap-1 sm:flex">
          {Object.entries(menus).map(([key, items]) => (
            <div key={key} className="relative">
              <button
                type="button"
                className={`rounded px-2 py-0.5 capitalize transition-colors hover:bg-white/10 ${
                  activeMenu === key ? 'bg-white/10 text-white' : 'text-[#e8e8f0]'
                }`}
                onClick={(event) => {
                  event.stopPropagation()
                  setActiveMenu(activeMenu === key ? null : key)
                }}
              >
                {key}
              </button>

              <AnimatePresence>
                {activeMenu === key ? (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 top-full mt-1 min-w-[240px] rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] py-1 shadow-xl backdrop-blur-xl"
                    onClick={(event) => event.stopPropagation()}
                  >
                    {items.map((item, index) =>
                      item.separator ? (
                        <div key={index} className="my-1 h-px bg-[rgba(0,240,255,0.1)]" />
                      ) : item.href ? (
                        <a
                          key={index}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex w-full items-center justify-between px-3 py-1.5 text-left text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)]"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          key={index}
                          type="button"
                          onClick={item.action}
                          className={`flex w-full items-center justify-between px-3 py-1.5 text-left hover:bg-[rgba(0,240,255,0.1)] ${
                            item.danger ? 'text-[#ff5f57]' : 'text-[#e8e8f0]'
                          }`}
                        >
                          <span>{item.label}</span>
                          {item.shortcut ? <span className="ml-4 text-xs text-[#8b91a3]">{item.shortcut}</span> : null}
                        </button>
                      ),
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            addNotification({
              title: fr ? 'Statut' : 'Status',
              message: profile.status[lang],
            })
          }}
          className="hidden h-6 items-center gap-1.5 rounded px-1.5 text-xs text-[#00ff88] transition-colors hover:bg-white/10 lg:flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00ff88]" aria-hidden="true" />
          Renault Technology Morocco
        </button>

        <span className="text-xs text-[#e8e8f0]">{formatDate(time)}</span>
        <span className="font-mono text-xs text-[#e8e8f0]">{formatTime(time)}</span>

        <div className="relative">
          <button
            type="button"
            aria-label={fr ? 'Menu utilisateur' : 'User menu'}
            onClick={(event) => {
              event.stopPropagation()
              setShowUserMenu(!showUserMenu)
            }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-[#00f0ff] to-[#7b2fff] text-[9px] font-bold text-[#07070f] transition-all hover:ring-2 hover:ring-[#00f0ff]"
          >
            SE
          </button>

          <AnimatePresence>
            {showUserMenu ? (
              <motion.div
                initial={{ opacity: 0, y: -5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 min-w-[230px] rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] py-2 shadow-xl backdrop-blur-xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="border-b border-[rgba(0,240,255,0.1)] px-3 py-2">
                  <div className="text-[#e8e8f0]">{site.name}</div>
                  <div className="text-xs text-[#8888aa]">{site.email}</div>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowUserMenu(false); openWindow('settings') }}
                  className="w-full px-3 py-2 text-left text-sm text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)]"
                >
                  {fr ? 'À propos de SoufyaneOS' : 'About SoufyaneOS'}
                </button>
                <a
                  href="/"
                  className="block w-full px-3 py-2 text-left text-sm text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)]"
                >
                  {fr ? 'Version CV (page complète)' : 'Printable CV (home page)'}
                </a>
                <div className="my-1 h-px bg-[rgba(0,240,255,0.1)]" />
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="w-full px-3 py-2 text-left text-sm text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)]"
                >
                  {fr ? 'Recharger' : 'Reload'}
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
