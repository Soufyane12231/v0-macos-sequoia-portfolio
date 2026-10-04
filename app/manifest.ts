import type { MetadataRoute } from 'next'
import { seo, site } from '@/lib/portfolio-data'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.specialty.fr}`,
    short_name: site.name,
    description: seo.description.fr,
    start_url: '/',
    display: 'standalone',
    background_color: '#05181a',
    theme_color: '#05181a',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon-light-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
  }
}