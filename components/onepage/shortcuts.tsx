'use client'

/**
 * Keyboard shortcuts dialog.
 *
 * One of the site's popups, and the only one whose content is about the site
 * itself rather than the CV: every key listed here does something real, so
 * the list cannot drift out of date the way a "features" panel would. The
 * `Ctrl / Cmd + K` binding is registered by `usePaletteHotkey`; `?` is the
 * key that opens this dialog.
 */

import { useEffect, useState } from 'react'
import { t, ui } from '@/lib/portfolio-data'
import { Modal } from './modal'

export function ShortcutsDialog({
  open,
  onClose,
  lang,
}: {
  open: boolean
  onClose: () => void
  lang: 'fr' | 'en'
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(ui.shortcuts.title, lang)}
      eyebrow={t(ui.shortcuts.trigger, lang)}
      closeLabel={t(ui.close, lang)}
    >
      <p className="body-copy text-[0.95rem]">{t(ui.shortcuts.lead, lang)}</p>

      <dl
        data-stagger
        data-stagger-step="55"
        className="mt-6 divide-y divide-line-soft border-y border-line-soft"
      >
        {ui.shortcuts.rows.map((row) => (
          <div key={row.id} className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3.5">
            <dt className="flex items-center gap-1.5">
              {row.keys.map((key) => (
                <kbd
                  key={key}
                  className="mono min-w-7 border border-line bg-bg px-1.5 py-1 text-center text-[0.68rem] tracking-[0.06em] text-sable"
                >
                  {key}
                </kbd>
              ))}
            </dt>
            <dd className="text-[0.9rem] text-menthe/90">{t(row.action, lang)}</dd>
          </div>
        ))}
      </dl>

      <p className="mono mt-5 text-[0.65rem] leading-relaxed tracking-[0.06em] text-muted uppercase">
        {t(ui.shortcuts.note, lang)}
      </p>
    </Modal>
  )
}

/**
 * Registers the `?` key and owns the dialog's open state.
 *
 * Bails out whenever the reader is typing, so a question mark inside the
 * contact form does not throw a dialog over the form.
 */
export function useShortcutsHotkey() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '?' || event.metaKey || event.ctrlKey || event.altKey) return
      const el = document.activeElement as HTMLElement | null
      const tag = el?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || el?.isContentEditable) return
      event.preventDefault()
      setOpen((value) => !value)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return { open, setOpen }
}
