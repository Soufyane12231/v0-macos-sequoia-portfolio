'use client'

import dynamic from 'next/dynamic'

/**
 * The desktop shell decides between the window manager and the mobile app from
 * the viewport, which the server cannot know. Rendering it on the server would
 * ship desktop markup that every phone then throws away as a hydration
 * mismatch — and the version that paints first is the wrong one. So this route
 * is client-rendered: it is noindex, and an interactive experience, not a page
 * a crawler or a no-JS visitor needs to read.
 */
const Desktop = dynamic(() => import('@/components/desktop/desktop').then((mod) => mod.Desktop), {
  ssr: false,
  loading: () => (
    <main
      aria-label="SoufyaneOS interactive desktop"
      className="flex min-h-screen items-center justify-center bg-[#07070f] font-mono text-sm text-[#8b91a3]"
    >
      <p>Chargement de SoufyaneOS…</p>
    </main>
  ),
})

export function OsDesktop() {
  return <Desktop />
}
