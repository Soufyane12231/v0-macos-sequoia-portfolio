import type { MetadataRoute } from 'next'
import { site } from '@/lib/portfolio-data'

export default function sitemap(): MetadataRoute.Sitemap {
  // Only the recruiter-first home page is indexable; /os is noindex.
  return [
    {
      url: site.url,
      // Pinned to the last content revision rather than `new Date()`: a
      // redeploy that changes no copy should not claim a fresh lastmod.
      lastModified: new Date('2026-09-25'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
