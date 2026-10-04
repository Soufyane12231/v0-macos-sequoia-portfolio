'use client'

/**
 * Motion primitives.
 *
 * Rule for this file: every effect has a static equivalent. The CSS in
 * globals.css does the heavy lifting through `data-reveal`, so when
 * `prefers-reduced-motion: reduce` is set the reveal attributes are simply
 * never added and the page renders in its final state.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

/** Shared matchMedia read, SSR-safe. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])
  return reduced
}

/**
 * One-shot viewport entry. `amount` 0..1 of the element that must be visible.
 * Returns a ref to attach and a boolean that flips exactly once.
 */
export function useInView<T extends HTMLElement>(amount = 0.35, once = true) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setSeen(true)
            if (once) io.disconnect()
          } else if (!once) {
            setSeen(false)
          }
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [amount, once])

  return { ref, seen }
}

/**
 * Counts an integer up once the holder scrolls in.
 *
 * The state starts at `target`, not at zero, and that ordering is deliberate:
 * the server renders the real number, so the HTML a crawler, an ATS or a
 * print job reads says "19" rather than "0". Hydration therefore matches, and
 * only then does the layout effect zero the value — before the browser has
 * painted, so no flash of the final number is visible. From there the count
 * runs when the figure enters the viewport.
 *
 * Under `prefers-reduced-motion: reduce` the value is never zeroed, so the
 * figure simply reads as its final number.
 */
export function useCountUp(target: number, duration = 1100) {
  const { ref, seen } = useInView<HTMLSpanElement>(0.6)
  const [value, setValue] = useState(target)
  const reduced = usePrefersReducedMotion()

  // Zero it before the first paint, but only when the reader wants motion.
  useLayoutEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setValue(0)
  }, [])

  useEffect(() => {
    if (!seen) return
    if (reduced) {
      setValue(target)
      return
    }
    let frame = 0
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // easeOutExpo: fast arrival, soft landing.
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -9 * t)
      setValue(Math.round(target * eased))
      if (t < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [seen, target, duration, reduced])

  return { ref, value }
}

/**
 * One shared IntersectionObserver drives every scroll reveal on the page.
 *
 * Any element carrying `data-reveal` starts hidden (see globals.css) and gets
 * `reveal-in` the first time it enters the viewport, after which it is left
 * alone. Per-element staggering comes from the `--reveal-delay` custom
 * property, not from a separate observer.
 *
 * Under `prefers-reduced-motion: reduce` the hiding rule does not apply, so
 * the same markup renders in its final state with no observer effect at all.
 */
export function RevealObserver() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // `top < 0` means the element is already above the viewport. That case
          // matters: a reader who lands on #contact, or jumps with an instant
          // scroll, never receives an intersecting callback for the sections
          // above, and they would stay permanently invisible.
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) continue
          entry.target.classList.add('reveal-in')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )

    const scan = () => {
      document.querySelectorAll('[data-reveal]:not(.reveal-in)').forEach((el) => io.observe(el))
    }
    scan()

    // Dialogs and filtered cards mount later; pick them up too.
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return null
}

/**
 * Magnetic hover: the element leans towards the pointer, up to `strength`
 * pixels, and springs back on leave. Pointer-fine and motion-allowed only.
 */
export function Magnetic({
  children,
  strength = 5,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || calm.matches) return

    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const box = el.getBoundingClientRect()
        const dx = event.clientX - (box.left + box.width / 2)
        const dy = event.clientY - (box.top + box.height / 2)
        el.style.transform = `translate3d(${(dx / 12) * strength}px, ${(dy / 12) * strength}px, 0)`
      })
    }
    const onLeave = () => {
      el.style.transform = 'translate3d(0, 0, 0)'
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [strength])

  return (
    <span ref={ref} className={`magnetic inline-flex ${className ?? ''}`}>
      {children}
    </span>
  )
}

/** Toggles the optical annotation state used by the project cards. */
export function useHoverState() {
  const [hovered, setHovered] = useState(false)
  const on = useCallback(() => setHovered(true), [])
  const off = useCallback(() => setHovered(false), [])
  return { hovered, on, off }
}