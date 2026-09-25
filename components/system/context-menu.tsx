'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useLayoutEffect, useRef, useState } from 'react'
import { useDesktopStore, type AccentColor } from '@/lib/desktop-store'
import { useLanguage } from '@/components/portfolio/language-provider'
import { site } from '@/lib/portfolio-data'

/** Keeps the panel this far away from every viewport edge. */
const MENU_MARGIN = 8
/** Roughly the widest submenu, used to decide which side it opens on. */
const SUBMENU_WIDTH = 130

export function ContextMenu() {
  const { lang } = useLanguage()
  const { contextMenu, setContextMenu, accentColor, setAccentColor, openWindow, addNotification } = useDesktopStore()

  const panelRef = useRef<HTMLDivElement>(null)
  const [placement, setPlacement] = useState<{ left: number; top: number; submenuLeft: boolean } | null>(null)

  // A right click near the right or bottom edge would otherwise open the menu
  // half off-screen. The real panel is measured once rendered — hard-coded
  // dimensions drift as soon as a label wraps or the accent list grows.
  useLayoutEffect(() => {
    const panel = panelRef.current
    if (!contextMenu || !panel) {
      setPlacement(null)
      return
    }
    // offsetWidth/Height, not getBoundingClientRect: the panel is mounted with
    // a scale(0.95) enter animation, and a transformed rect measures 5% small.
    const width = panel.offsetWidth
    const height = panel.offsetHeight
    const left = Math.max(MENU_MARGIN, Math.min(contextMenu.x, window.innerWidth - width - MENU_MARGIN))
    const top = Math.max(MENU_MARGIN, Math.min(contextMenu.y, window.innerHeight - height - MENU_MARGIN))
    setPlacement({ left, top, submenuLeft: left + width + SUBMENU_WIDTH > window.innerWidth })
  }, [contextMenu, lang, accentColor])

  if (!contextMenu) return null

  const fr = lang === 'fr'
  const colors: AccentColor[] = ['cyan', 'purple', 'green']

  const menuItems: (
    | { label: string; action: () => void }
    | { type: 'separator' }
    | {
        label: string
        submenu: { label: string; action: () => void; active: boolean }[]
      }
  )[] = [
    {
      label: fr ? 'Nouveau terminal' : 'New Terminal Window',
      action: () => openWindow('terminal'),
    },
    { type: 'separator' },
    {
      label: fr ? "Changer la couleur d'accent" : 'Change Accent Color',
      submenu: colors.map((color) => ({
        label: color.charAt(0).toUpperCase() + color.slice(1),
        action: () => setAccentColor(color),
        active: accentColor === color,
      })),
    },
    { type: 'separator' },
    { label: fr ? 'À propos de SoufyaneOS' : 'About SoufyaneOS', action: () => openWindow('settings') },
    {
      label: fr ? 'Version CV (page d’accueil)' : 'Printable CV (home page)',
      action: () => {
        window.location.href = '/'
      },
    },
    {
      label: fr ? 'Voir le code source' : 'View Source Code',
      action: () => window.open(site.links.githubRepo, '_blank', 'noopener,noreferrer'),
    },
    {
      label: fr ? 'Me contacter' : 'Contact Me',
      action: () => {
        addNotification({
          title: 'Contact',
          message: `${site.email} · ${site.phone}`,
        })
        openWindow('contact')
      },
    },
  ]

  return (
    <AnimatePresence>
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed z-[200] min-w-[220px] rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] py-1 shadow-xl backdrop-blur-xl"
        // Held back until the measured placement is known, so the menu never
        // appears at the raw click position and then jumps.
        style={{
          left: placement?.left ?? contextMenu.x,
          top: placement?.top ?? contextMenu.y,
          visibility: placement ? 'visible' : 'hidden',
        }}
        onClick={() => setContextMenu(null)}
        role="menu"
        aria-label={lang === 'fr' ? 'Menu contextuel du bureau' : 'Desktop context menu'}
      >
        {menuItems.map((item, index) => {
          if ('type' in item && item.type === 'separator') {
            return <div key={index} className="my-1 h-px bg-[rgba(0,240,255,0.1)]" role="separator" />
          }

          if ('submenu' in item && item.submenu) {
            return (
              <div key={index} className="group relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  className="flex w-full cursor-pointer items-center justify-between px-3 py-1.5 text-left text-sm text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)]"
                >
                  {item.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#555]" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                <div
                  role="menu"
                  aria-label={item.label}
                  className={`invisible absolute top-0 min-w-[120px] rounded-lg border border-[rgba(0,240,255,0.15)] bg-[rgba(13,13,26,0.95)] py-1 opacity-0 shadow-xl backdrop-blur-xl transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
                    placement?.submenuLeft ? 'right-full mr-1' : 'left-full ml-1'
                  }`}
                >
                  {item.submenu.map((sub, subIndex) => (
                    <button
                      key={subIndex}
                      type="button"
                      role="menuitemradio"
                      aria-checked={sub.active}
                      onClick={(event) => {
                        event.stopPropagation()
                        sub.action()
                        setContextMenu(null)
                      }}
                      className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-sm hover:bg-[rgba(0,240,255,0.1)]"
                    >
                      {sub.active ? <span className="text-[#00f0ff]">✓</span> : null}
                      <span className={sub.active ? 'text-[#00f0ff]' : 'text-[#e8e8f0]'}>{sub.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )
          }

          if ('action' in item && item.action) {
            return (
              <button
                key={index}
                type="button"
                role="menuitem"
                onClick={(event) => {
                  event.stopPropagation()
                  item.action()
                  setContextMenu(null)
                }}
                className="w-full px-3 py-1.5 text-left text-sm text-[#e8e8f0] hover:bg-[rgba(0,240,255,0.1)]"
              >
                {item.label}
              </button>
            )
          }

          return null
        })}
      </motion.div>
    </AnimatePresence>
  )
}

export function DesktopContextMenu({ children }: { children: React.ReactNode }) {
  const { setContextMenu } = useDesktopStore()

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setContextMenu({ x: event.clientX, y: event.clientY })
  }

  const handleClick = () => {
    setContextMenu(null)
  }

  return (
    <div onContextMenu={handleContextMenu} onClick={handleClick} className="contents">
      {children}
      <ContextMenu />
    </div>
  )
}
