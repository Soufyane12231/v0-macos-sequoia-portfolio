'use client'

/**
 * The one modal implementation on this site.
 *
 * Seven dialogs (four experience cards, three project cards) plus the
 * command palette share this component, so the accessibility contract is
 * written once:
 *   - role="dialog" + aria-modal + aria-labelledby
 *   - focus moves into the dialog on open
 *   - Tab / Shift+Tab cycle inside it (focus trap)
 *   - Escape closes
 *   - focus returns to the trigger on close
 *   - background scroll is locked
 *   - backdrop click closes
 *   - reduced motion turns the transition off (see globals.css)
 */

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE = [
  'a[href]',
  // `tabindex="-1"` is excluded so the decorative backdrop button (which must
  // stay clickable but must never be the first thing focused) is skipped.
  'button:not([disabled]):not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function Modal({
  open,
  onClose,
  title,
  eyebrow,
  children,
  size = 'md',
  initialFocus,
  closeLabel,
}: {
  open: boolean
  onClose: () => void
  title: string
  eyebrow?: string
  children: React.ReactNode
  size?: 'md' | 'lg'
  /** Selector for the element that should receive focus on open. */
  initialFocus?: string
  /** Localised label for the close button's screen-reader text. */
  closeLabel: string
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  useEffect(() => setMounted(true), [])

  // Remember the trigger before the dialog steals focus.
  useEffect(() => {
    if (open && !triggerRef.current) {
      triggerRef.current = document.activeElement as HTMLElement | null
    }
  }, [open])

  // Move focus in, lock the page, and put focus back on close.
  useEffect(() => {
    if (!open) return

    const previouslyFocused = triggerRef.current
    const { body } = document
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`

    const raf = requestAnimationFrame(() => {
      const preferred = initialFocus ? panelRef.current?.querySelector<HTMLElement>(initialFocus) : null
      const first = preferred ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      ;(first ?? panelRef.current)?.focus()
    })

    return () => {
      cancelAnimationFrame(raf)
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      previouslyFocused?.focus?.()
      triggerRef.current = null
    }
  }, [open, initialFocus])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return

      const nodes = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      )
      if (nodes.length === 0) {
        event.preventDefault()
        panelRef.current?.focus()
        return
      }
      const first = nodes[0]
      const last = nodes[nodes.length - 1]
      const active = document.activeElement

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    },
    [onClose],
  )

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain p-4 py-8 sm:p-6 sm:py-12"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 cursor-default bg-brin-deep/80 backdrop-blur-sm"
        style={{ animation: 'modal-veil 200ms ease-out both' }}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={`relative w-full border border-line bg-surface shadow-2xl shadow-brin-deep/60 ${
          size === 'lg' ? 'max-w-4xl' : 'max-w-2xl'
        }`}
        style={{ animation: 'modal-in 260ms var(--ease-out-soft) both' }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-line-soft px-5 py-4 sm:px-7">
          <div className="min-w-0">
            {eyebrow ? <p className="eyebrow mb-1.5">{eyebrow}</p> : null}
            <h2 id={titleId} className="font-display text-xl leading-tight font-medium text-paper sm:text-2xl">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mt-1 shrink-0 border border-line p-2 text-muted transition-colors duration-200 hover:border-tan hover:text-sable"
          >
            <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3 L13 13 M13 3 L3 13" />
            </svg>
            <span className="sr-only">{closeLabel}</span>
          </button>
        </div>
        <div className="px-5 py-6 sm:px-7">{children}</div>
      </div>
    </div>,
    document.body,
  )
}