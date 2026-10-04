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
 * Three kinds of target, one callback:
 *   - `[data-reveal]` starts hidden (see globals.css) and gets `data-revealed`
 *     the first time it enters the viewport, after which it is left alone.
 *   - `[data-draw]` is the decorative plate behind a section. It takes the same
 *     attribute so the same observer can start its stroke draw-in.
 *   - the direct children of `[data-stagger]` each get their own
 *     `--reveal-delay`, written here rather than in the markup, and each child
 *     is observed on its own so a long list cascades in instead of arriving as
 *     one block.
 *
 * The revealed flag is `data-revealed` and never a class. React owns `className`
 * on any element whose className is a conditional template, and it rewrites
 * the whole attribute the moment the condition flips — which strips a class the
 * observer had added and drops the element straight back to opacity 0. Clicking
 * a skill tab used to hide the tab you had just clicked. React does not render
 * `data-revealed`, so it cannot be clobbered that way.
 *
 * Under `prefers-reduced-motion: reduce` none of the hiding rules apply, so
 * the same markup renders in its final state with no observer effect at all.
 */
export function RevealObserver() {
  useEffect(() => {
    // No IntersectionObserver at all: the reveal styles would then hide content
    // forever, so the only safe move is to reveal everything immediately.
    if (typeof IntersectionObserver === 'undefined') {
      document
        .querySelectorAll('[data-reveal], [data-stagger] > *, [data-draw]')
        .forEach((el) => el.setAttribute('data-revealed', ''))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // `top < 0` means the element is already above the viewport. That case
          // matters: a reader who lands on #contact, or jumps with an instant
          // scroll, never receives an intersecting callback for the sections
          // above, and they would stay permanently invisible.
          if (!entry.isIntersecting && entry.boundingClientRect.top >= 0) continue
          ;(entry.target as HTMLElement).setAttribute('data-revealed', '')
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )

    const scan = () => {
      document
        .querySelectorAll('[data-reveal]:not([data-revealed]), [data-draw]:not([data-revealed])')
        .forEach((el) => io.observe(el))

      document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
        const step = Number(group.dataset.staggerStep ?? 70)
        const base = Number(group.dataset.staggerBase ?? 0)
        Array.from(group.children).forEach((child, index) => {
          if (!(child instanceof HTMLElement) || child.hasAttribute('data-revealed')) return
          // An explicit inline delay always wins, so a hand-tuned child keeps
          // its own timing inside an auto-staggered group.
          if (!child.style.getPropertyValue('--reveal-delay')) {
            child.style.setProperty('--reveal-delay', `${base + index * step}ms`)
          }
          io.observe(child)
        })
      })
    }
    scan()

    // Dialogs and filtered cards mount later; pick them up too. Attribute changes
    // are observed as well, because a React re-render can drop a node that has
    // not been revealed yet into the page without any childList record.
    //
    // Attribute watching also picks up the per-frame inline-style writes from
    // the cursor, the parallax plates and the pointer spotlight, so scan is
    // coalesced onto one animation frame instead of running on every write.
    let pending = 0
    const schedule = () => {
      if (pending) return
      pending = requestAnimationFrame(() => {
        pending = 0
        scan()
      })
    }
    const mo = new MutationObserver(schedule)
    mo.observe(document.body, { childList: true, subtree: true, attributes: true })

    return () => {
      if (pending) cancelAnimationFrame(pending)
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

/**
 * Scroll-linked depth for the decorative plates behind the sections.
 *
 * Each `[data-parallax]` element carries a factor in its attribute; its
 * transform is a pure translate3d clamped to +/-80px. The plates are
 * deliberately oversized (`.plate-parallax`) so that clamp can never expose
 * the edge of the pattern underneath.
 *
 * Off entirely under `prefers-reduced-motion: reduce`, and it listens for the
 * preference changing mid-session rather than only at mount: a reader who
 * switches the setting on with the page open must not be left with plates
 * frozen at a half-scrolled offset.
 */
export function Parallax() {
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let nodes: HTMLElement[] = []

    const measure = () => {
      frame = 0
      // Guarded here as well as in `sync`: the MutationObserver below keeps
      // calling `collect` for the lifetime of the page, and `collect` schedules
      // a measure. Without this check a reader who turns the preference on
      // mid-session keeps getting plates written at scroll offsets.
      if (calm.matches) return
      const vh = window.innerHeight
      for (const el of nodes) {
        const factor = Number(el.dataset.parallax ?? 0)
        if (!factor) continue
        const box = el.getBoundingClientRect()
        // Offscreen plates are skipped: no work for sections nobody is near.
        if (box.bottom < -240 || box.top > vh + 240) continue
        const shift = Math.max(-80, Math.min(80, (box.top + box.height / 2 - vh / 2) * -factor))
        el.style.transform = `translate3d(0, ${shift.toFixed(2)}px, 0)`
      }
    }

    const schedule = () => {
      if (calm.matches || frame) return
      frame = requestAnimationFrame(measure)
    }

    const collect = () => {
      nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
      schedule()
    }

    const sync = () => {
      if (frame) {
        cancelAnimationFrame(frame)
        frame = 0
      }
      if (calm.matches) {
        nodes.forEach((el) => {
          el.style.transform = ''
        })
        window.removeEventListener('scroll', schedule)
        window.removeEventListener('resize', schedule)
        return
      }
      collect()
      window.addEventListener('scroll', schedule, { passive: true })
      window.addEventListener('resize', schedule)
    }

    collect()
    sync()
    calm.addEventListener('change', sync)

    // A language flip or a dialog can remount a section; re-read the list.
    const mo = new MutationObserver(collect)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      if (frame) cancelAnimationFrame(frame)
      calm.removeEventListener('change', sync)
      mo.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])
  return null
}

/**
 * One pointermove listener for every `[data-spot]` card on the page.
 *
 * Writes `--mx` / `--my` as percentages of the hovered card, which the
 * `.card.spot` background gradient reads. Deliberately global rather than a
 * hook per card: there are about a dozen cards and one listener.
 *
 * The write is rAF-batched and only happens for the card actually under the
 * pointer, so this costs at most one getBoundingClientRect per frame.
 */
export function PointerSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let frame = 0
    let host: HTMLElement | null = null
    let x = 0
    let y = 0

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const next = target?.closest?.<HTMLElement>('[data-spot]') ?? null
      host = next
      if (!host) return
      x = event.clientX
      y = event.clientY
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!host) return
        const box = host.getBoundingClientRect()
        if (!box.width || !box.height) return
        host.style.setProperty('--mx', `${(((x - box.left) / box.width) * 100).toFixed(2)}%`)
        host.style.setProperty('--my', `${(((y - box.top) / box.height) * 100).toFixed(2)}%`)
      })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])
  return null
}