import type { MetadataRoute } from 'next'
import { site } from '@/lib/portfolio-data'

export default function sitemap(): MetadataRoute.Sitemap {
  // One page, one URL. The desktop experience at /os was removed.
  return [
    {
      url: site.url,
      // Pinned to the last content revision rather than `new Date()`: a
      // redeploy that changes no copy should not claim a fresh lastmod.
      lastModified: new Date('2026-10-04'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}