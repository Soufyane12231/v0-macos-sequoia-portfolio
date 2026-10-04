import type { MetadataRoute } from 'next'
import { site } from '@/lib/portfolio-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}