import type { MetadataRoute } from 'next'
import { site } from '@/lib/portfolio-data'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // /os is deliberately NOT disallowed: a crawler has to be able to fetch
        // the page to read its `noindex, follow` directive. Blocking it here
        // would hide the instruction and let the route be indexed anyway. The
        // recruiter-first page stays canonical through the page-level robots
        // meta tag in app/os/page.tsx.
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
