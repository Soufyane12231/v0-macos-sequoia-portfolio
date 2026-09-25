import type { MetadataRoute } from 'next'
import { site } from '@/lib/portfolio-data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.system} — ${site.name}`,
    short_name: site.system,
    description: "Portfolio de Soufyane Elaouni, élève ingénieur en Mécatronique (automatisme industriel & systèmes embarqués).",
    start_url: '/',
    display: 'standalone',
    background_color: '#07070f',
    theme_color: '#07070f',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  }
}
